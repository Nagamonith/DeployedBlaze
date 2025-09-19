import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TestCaseService } from '../../app/shared/services/test-case.service';
import { ManualTestCaseStep, TestCaseDetailResponse, CreateTestCaseRequest, UpdateTestCaseRequest, TestCaseAttributeRequest } from '../../app/shared/modles/test-case.model';
import { ModuleAttribute, ModuleAttributeRequest, ProductModule } from '../../app/shared/modles/module.model';
import { VersionOption } from '../../app/shared/modles/product.model';
import { AlertComponent } from "../../app/shared/alert/alert.component";
import { ChangeDetectorRef } from '@angular/core';
import { ModuleService } from '../../app/shared/services/module.service';
import { catchError, forkJoin, map, Observable, of, switchMap, tap, throwError, Subject, takeUntil, finalize } from 'rxjs';
import { IdResponse } from '../../app/shared/modles/product.model';
import { LeftnavIcon } from '../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';


interface TestCaseFilter {
  testCaseId: string;
  useCase: string;
  version: string; 
}


@Component({
  selector: 'app-edit-testcases',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, AlertComponent],
  templateUrl: './edit-testcases.component.html',
  styleUrls: ['./edit-testcases.component.css']
})
export class EditTestcasesComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private testCaseService = inject(TestCaseService);
  private moduleService = inject(ModuleService);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  // public leftNavIcon = LeftnavIcon;
  public icons : any = LeftnavIcon;


  selectedModule = signal<string>('');
  productId = signal<string>('');
  modules = signal<ProductModule[]>([]);
  isEditing = signal(false);
  loading = signal(false);
  testCases = signal<TestCaseDetailResponse[]>([]);
  filteredTestCases = signal<TestCaseDetailResponse[]>([]);
  
  // Version options for dropdown
  versionOptions = signal<VersionOption[]>([]);
  
  filter = signal<TestCaseFilter>({
    testCaseId: '',
    useCase: '',
    version: ''
  });

  // Alert handling
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' | 'warning' = 'warning';
  isConfirmAlert = false;
  pendingDeleteId: string | null = null;

  // Module attributes
  moduleAttributes = signal<ModuleAttribute[]>([]);
  showModuleAttributesForm = signal(false);
  currentModuleAttribute = signal<ModuleAttribute | null>(null);

  // Form definition - FIXED: Only use productVersionId (the GUID)
form = this.fb.group({
  id: [''],
  moduleId: ['', Validators.required],
  productVersionId: ['', Validators.required],
  testCaseId: ['', [Validators.required]], // Removed Validators.pattern(/^TC\d+/)
  useCase: ['', [Validators.minLength(2)]], // Removed Validators.required
  scenario: ['', [Validators.required, Validators.minLength(10)]],
  testType: ['Manual', Validators.required],
  testTool: [''],
  result: ['Pending'],
  actual: [''],
  remarks: [''],
  steps: this.fb.array<FormGroup>([]),
  attributes: this.fb.array<FormGroup>([])
});

  ngOnInit(): void {
    // Subscribe to route parameters
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const moduleId = params.get('moduleId');
      if (moduleId && moduleId !== this.selectedModule()) {
        this.selectedModule.set(moduleId);
        this.form.patchValue({ moduleId });
        // Load version options first, then test cases
        this.loadVersionOptions().subscribe(() => {
          this.loadTestCases(moduleId);
          this.loadModuleAttributes(moduleId);
        });
      }
    });

    this.route.queryParamMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const productId = params.get('productId');
      if (productId && productId !== this.productId()) {
        this.productId.set(productId);
        this.loadModules(productId);
        // Version options will be loaded when module is selected
      }
    });
    
  }

  // FIXED: Return Observable and handle subscription properly
  loadVersionOptions(): Observable<VersionOption[]> {
    const productId = this.productId();
    if (!productId) return of([]);

    console.log('Loading version options for productId:', productId);

    return this.testCaseService.getVersionOptions(productId).pipe(
      tap(options => {
        console.log('Loaded version options:', options);
        this.versionOptions.set(options);
        // Set default version if form is empty
        if (!this.form.get('productVersionId')?.value && options.length > 0) {
          const defaultVersion = options.find(v => v.isActive) || options[0];
          this.form.patchValue({ productVersionId: defaultVersion.id });
          console.log('Set default version:', defaultVersion);
        }
      }),
      catchError(error => {
        console.error('Error loading version options:', error);
        this.showAlertMessage('Failed to load version options', 'error');
        return of([]);
      })
    );
  }

  // FIXED: Proper form control disabling
  private updateFormControlsState(): void {
    const isDisabled = this.loading();
    const versionControl = this.form.get('productVersionId');
    if (versionControl) {
      if (isDisabled) {
        versionControl.disable();
      } else {
        versionControl.enable();
      }
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Form array getters with proper typing
  get steps(): FormArray<FormGroup> {
    return this.form.get('steps') as FormArray<FormGroup>;
  }

  get attributes(): FormArray<FormGroup> {
    return this.form.get('attributes') as FormArray<FormGroup>;
  }

  // Step management
  createStep(step?: ManualTestCaseStep): FormGroup {
  return this.fb.group({
    id: [step?.id || null],
    steps: [step?.steps || '', Validators.required],
    expectedResult: [step?.expectedResult || '', Validators.required]
  });
}

  addStep(step?: ManualTestCaseStep): void {
  // Always add the new step at the end of the array
  this.steps.push(this.createStep(step));
}

  removeStep(index: number): void {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  // Data loading methods
  loadModules(productId: string): void {
    if (!productId) {
      this.showAlertMessage('Product ID is required', 'error');
      return;
    }

    this.moduleService.getModulesByProduct(productId).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error loading modules:', error);
        this.showAlertMessage('Failed to load modules', 'error');
        return of([]);
      })
    ).subscribe(modules => {
      this.modules.set(modules);
    });
  }



  loadTestCases(moduleId: string): void {
    if (!moduleId) {
      this.showAlertMessage('Module ID is required', 'error');
      return;
    }

    this.loading.set(true);
    this.updateFormControlsState();
    
    // Pass productId to get version enrichment
    this.testCaseService.getTestCaseDetailByModule(moduleId, this.productId()).pipe(
      takeUntil(this.destroy$),
      tap(testCases => {
        console.log('Loaded test cases:', testCases);
      }),
      catchError(error => {
        console.error('Error loading test cases:', error);
        this.showAlertMessage('Failed to load test cases', 'error');
        return of([]);
      })
    ).subscribe({
      next: (testCases) => {
        this.testCases.set(testCases);
        this.applyFilters();
        this.loading.set(false);
        this.updateFormControlsState();
      },
      error: (err) => {
        console.error('Error in test cases subscription:', err);
        this.showAlertMessage('Failed to load test cases', 'error');
        this.loading.set(false);
        this.updateFormControlsState();
      }
    });
  }

  loadModuleAttributes(moduleId: string): void {
    if (!moduleId) {
      console.warn('Module ID is required for loading attributes');
      return;
    }

    this.moduleService.getModuleAttributes(moduleId).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error loading module attributes:', error);
        this.showAlertMessage('Failed to load module attributes', 'error');
        return of([]);
      })
    ).subscribe(attributes => {
      this.moduleAttributes.set(attributes);
    });
  }

  // Form handling
  openForm(): void {
    // Ensure version options are loaded and valid before opening form
    if (!this.areVersionOptionsValid()) {
      this.loadVersionOptions().subscribe({
        next: () => {
          if (this.areVersionOptionsValid()) {
            this.resetForm();
            this.setupFormForNew();
            this.isEditing.set(true);
          } else {
            this.showAlertMessage('No valid version options available. Please refresh versions.', 'error');
          }
        },
        error: () => {
          this.showAlertMessage('Failed to load version options. Please try again.', 'error');
        }
      });
    } else {
      this.resetForm();
      this.setupFormForNew();
      this.isEditing.set(true);
    }
  }

  // FIXED: Reset form with proper default version
  private resetForm(): void {
    const defaultVersion = this.versionOptions().find(v => v.isActive) || this.versionOptions()[0];
    
    console.log('Resetting form with default version:', defaultVersion);
    
    // Ensure we have a valid version ID
    const versionId = defaultVersion?.id;
    if (!versionId && this.versionOptions().length > 0) {
      console.warn('Default version has no ID, trying first available version');
      const firstVersion = this.versionOptions()[0];
      if (firstVersion?.id) {
        console.log('Using first available version:', firstVersion);
      }
    }
    
    this.form.reset({
      moduleId: this.selectedModule(),
      productVersionId: versionId || '', // Use the GUID
      testType: 'Manual',
      result: 'Pending'
    });

    // Clear form arrays
    while (this.steps.length !== 0) {
      this.steps.removeAt(0);
    }
    while (this.attributes.length !== 0) {
      this.attributes.removeAt(0);
    }
  }

  private setupFormForNew(): void {
    // Add one empty step by default
    this.addStep();

    // Add attribute fields based on module attributes
    this.moduleAttributes().forEach(attr => {
      this.attributes.push(this.fb.group({
        key: [attr.key, Validators.required],
        value: ['', attr.isRequired ? Validators.required : null]
      }));
    });
  }

  // FIXED: Start editing with proper version handling
startEditing(testCase: TestCaseDetailResponse): void {
  this.resetForm();
  
  // If version options are not loaded yet, try to load them first
  if (this.versionOptions().length === 0) {
    this.loadVersionOptions().subscribe({
      next: () => {
        // Retry editing after loading version options
        this.startEditing(testCase);
      },
      error: () => {
        this.showAlertMessage('Failed to load version options. Please try again.', 'error');
      }
    });
    return;
  }

  // Find matching version by productVersionId first, then by version string
  let matchingVersionId = testCase.productVersionId;
  
  // Debug logging
  console.log('Editing test case:', testCase);
  console.log('Available version options:', this.versionOptions());
  console.log('Test case productVersionId:', testCase.productVersionId);
  console.log('Test case version:', testCase.version);
  
  if (!matchingVersionId && testCase.version) {
    // Fallback: find by version string
    const versionOption = this.versionOptions().find(v => v.version === testCase.version);
    matchingVersionId = versionOption?.id;
    console.log('Found version by string:', versionOption);
  }
  
  // If still no match, use the active version or first available as fallback
  if (!matchingVersionId) {
    const defaultVersion = this.versionOptions().find(v => v.isActive) || this.versionOptions()[0];
    matchingVersionId = defaultVersion?.id;
    
    if (testCase.version || testCase.productVersionId) {
      this.showAlertMessage(
        `Original version not found. Using default version instead.`,
        'warning'
      );
    }
    console.log('Using default version:', defaultVersion);
  }
  
  console.log('Final matching version ID:', matchingVersionId);

  // Set form values with proper null checks
  this.form.patchValue({
    id: testCase.id || '',
    moduleId: testCase.moduleId || this.selectedModule(),
    productVersionId: matchingVersionId || '', // Use the GUID directly
    testCaseId: testCase.testCaseId || '',
    useCase: testCase.useCase || '',
    scenario: testCase.scenario || '',
    testType: testCase.testType || 'Manual',
    testTool: testCase.testTool || '',
    result: testCase.result || 'Pending',
    actual: testCase.actual || '',
    remarks: testCase.remarks || ''
  });

  // Clear existing steps before adding new ones
  while (this.steps.length > 0) {
    this.steps.removeAt(0);
  }

  // FIXED: Add steps with validation - SORTED BY ID to ensure correct order
  if (testCase.steps && testCase.steps.length > 0) {
    // Sort steps by their ID to ensure correct order
    const sortedSteps = [...testCase.steps].sort((a, b) => (a.id || 0) - (b.id || 0));
    sortedSteps.forEach(step => {
      this.addStep({
        id: step.id,
        steps: step.steps || '',
        expectedResult: step.expectedResult || ''
      });
    });
  } else {
    // Add one empty step if none exist
    this.addStep();
  }

  // Clear existing attributes before adding new ones
  while (this.attributes.length > 0) {
    this.attributes.removeAt(0);
  }

  // Handle attributes with proper validation
  this.moduleAttributes().forEach(attr => {
    const existingValue = testCase.attributes?.find(a => a.key === attr.key)?.value || '';
    this.attributes.push(this.fb.group({
      key: [attr.key || '', Validators.required],
      value: [existingValue, attr.isRequired ? Validators.required : null]
    }));
  });

  // Mark as editing
  this.isEditing.set(true);
  
  // Trigger change detection if needed
  this.cdr.detectChanges();
}

  cancelEditing(): void {
    this.resetForm();
    this.isEditing.set(false);
  }


saveTestCase(): void {
  if (this.form.invalid) {
    this.markFormGroupTouched(this.form);
    this.showAlertMessage('Please fill all required fields correctly', 'error');
    return;
  }

  const formValue = this.form.getRawValue();
  
  // Handle empty use case - set to "NA" if empty to satisfy backend requirement
  if (!formValue.useCase || formValue.useCase.trim() === '') {
    formValue.useCase = 'NA';
    this.form.patchValue({ useCase: 'NA' });
  }
  
  // Validate required fields
  if (!this.validateFormValues(formValue)) {
    return;
  }

  const isUpdate = !!formValue.id;
  
  // Prepare steps data
  const stepsData: ManualTestCaseStep[] = this.steps.controls.map((stepGroup, index) => ({
    id: stepGroup.get('id')?.value || index + 1,
    steps: stepGroup.get('steps')?.value || '',
    expectedResult: stepGroup.get('expectedResult')?.value || ''
  }));

  // Prepare attributes data
  const attributesData: TestCaseAttributeRequest[] = this.attributes.controls
    .map(attrGroup => ({
      key: attrGroup.get('key')?.value || '',
      value: attrGroup.get('value')?.value || ''
    }))
    .filter(attr => attr.key);

  this.loading.set(true);

  if (isUpdate) {
    this.handleUpdateOperation(formValue, stepsData, attributesData);
  } else {
    this.handleCreateOperation(formValue, stepsData, attributesData);
  }
}

  // FIXED: Simplified validation with better version handling
private validateFormValues(formValue: any): boolean {
  // Validate productVersionId (the GUID)
  if (!formValue.productVersionId) {
    this.showAlertMessage('Please select a version', 'error');
    return false;
  }

  // Validate module ID
  if (!formValue.moduleId) {
    this.showAlertMessage('Module ID is required', 'error');
    return false;
  }

  // Validate test case ID for new test cases
  if (!formValue.id && !formValue.testCaseId) {
    this.showAlertMessage('Test Case ID is required for new test cases', 'error');
    return false;
  }

  // Validate scenario
  if (!formValue.scenario) {
    this.showAlertMessage('Scenario is required', 'error');
    return false;
  }

  // Validate minimum lengths
  if (formValue.useCase && formValue.useCase !== 'NA' && formValue.useCase.length < 5) {
    this.showAlertMessage('Use Case must be at least 5 characters', 'error');
    return false;
  }

  if (formValue.scenario.length < 10) {
    this.showAlertMessage('Scenario must be at least 10 characters', 'error');
    return false;
  }

  // Validate steps
  const stepsValidation = this.validateSteps();
  if (!stepsValidation.isValid) {
    if (stepsValidation.message) {
      this.showAlertMessage(stepsValidation.message, 'error');
    }
    return false;
  }

  // Validate attributes
  const attributesValidation = this.validateAttributes();
  if (!attributesValidation.isValid) {
    if (attributesValidation.message) {
      this.showAlertMessage(attributesValidation.message, 'error');
    }
    return false;
  }

  return true;
}

  private validateSteps(): { isValid: boolean; message?: string } {
    if (this.steps.length === 0) {
      return {
        isValid: false,
        message: 'At least one test step is required'
      };
    }

    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps.at(i);
      const stepValue = step.get('steps')?.value;
      const expectedResult = step.get('expectedResult')?.value;
      
      if (!stepValue?.trim()) {
        return {
          isValid: false,
          message: `Step ${i + 1}: Description is required`
        };
      }

      if (!expectedResult?.trim()) {
        return {
          isValid: false,
          message: `Step ${i + 1}: Expected result is required`
        };
      }

      if (stepValue.trim().length < 3) {
        return {
          isValid: false,
          message: `Step ${i + 1}: Description must be at least 3 characters`
        };
      }

      if (expectedResult.trim().length < 3) {
        return {
          isValid: false,
          message: `Step ${i + 1}: Expected result must be at least 3 characters`
        };
      }
    }

    return { isValid: true };
  }

  private validateAttributes(): { isValid: boolean; message?: string } {
    if (this.attributes.length === 0) {
      return { isValid: true };
    }

    for (let i = 0; i < this.attributes.length; i++) {
      const attr = this.attributes.at(i);
      const attrKey = attr.get('key')?.value;
      const attrDef = this.moduleAttributes().find(a => a.key === attrKey);
      
      if (!attrDef) {
        continue;
      }

      const rawValue = attr.get('value')?.value;
      const attrValue = (rawValue ?? '').toString().trim();
      
      if (attrDef.isRequired && !attrValue) {
        return {
          isValid: false,
          message: `Attribute "${attrDef.name}" is required`
        };
      }

      // Number validation
      if (attrDef.type === 'number' && attrValue && isNaN(Number(attrValue))) {
        return {
          isValid: false,
          message: `Attribute "${attrDef.name}" must be a number`
        };
      }

      // Options validation: handle comma-separated string or JSON array of {value}
      if (attrDef.options) {
        let validOptions: string[] = [];
        const opt = attrDef.options;
        try {
          const parsed = JSON.parse(opt as unknown as string);
          if (Array.isArray(parsed)) {
            // Accept array of strings or array of { value }
            validOptions = parsed.map((item: any) => typeof item === 'string' ? item : item?.value).filter(Boolean);
          }
        } catch {
          // Treat as comma-separated values
          validOptions = (opt as unknown as string).split(',').map(s => s.trim()).filter(Boolean);
        }
        if (validOptions.length > 0 && attrValue && !validOptions.includes(attrValue)) {
          return {
            isValid: false,
            message: `Attribute "${attrDef.name}" has invalid value. Valid options are: ${validOptions.join(', ')}`
          };
        }
      }
    }

    return { isValid: true };
  }

  private handleUpdateOperation(
  formValue: any,
  stepsData: ManualTestCaseStep[],
  attributesData: TestCaseAttributeRequest[]
): void {
  if (!formValue.productVersionId) {
    this.showAlertMessage('Cannot update test case: No valid version selected', 'error');
    this.loading.set(false);
    return;
  }

  const updatePayload: UpdateTestCaseRequest = {
    productVersionId: formValue.productVersionId,
    testCaseId: formValue.testCaseId,
    useCase: formValue.useCase,
    scenario: formValue.scenario,
    testType: formValue.testType,
    testTool: formValue.testTool,
    result: formValue.result,
    actual: formValue.actual,
    remarks: formValue.remarks
  };

  this.testCaseService.updateTestCase(formValue.moduleId, formValue.id, updatePayload).pipe(
    switchMap(() => {
      const operations: Observable<any>[] = [];
      
      if (stepsData.length > 0) {
        operations.push(
          this.testCaseService.replaceTestCaseSteps(formValue.id, stepsData).pipe(
            catchError(error => {
              console.error('Error replacing steps:', error);
              return of(null);
            })
          )
        );
      }
      
      if (attributesData.length > 0) {
        operations.push(
          this.testCaseService.updateTestCaseAttributes(
            formValue.moduleId,
            formValue.id,
            attributesData
          ).pipe(
            catchError(error => {
              console.error('Error updating attributes:', error);
              return of(null);
            })
          )
        );
      }
      
      return operations.length > 0 ? forkJoin(operations) : of([]);
    }),
    takeUntil(this.destroy$),
    finalize(() => {
      this.loading.set(false);
      this.cdr.detectChanges(); // Trigger change detection
    })
  ).subscribe({
    next: () => {
      this.showAlertMessage('Test case updated successfully', 'success');
      this.loadTestCases(formValue.moduleId);
      this.cancelEditing();
      this.cdr.detectChanges(); // Ensure UI updates immediately
    },
    error: (error) => this.handleOperationError(error, 'update')
  });
}

private handleCreateOperation(
  formValue: any,
  stepsData: ManualTestCaseStep[],
  attributesData: TestCaseAttributeRequest[]
): void {
  if (!formValue.productVersionId) {
    this.showAlertMessage('Cannot create test case: No valid version selected', 'error');
    this.loading.set(false);
    return;
  }

  const createPayload: CreateTestCaseRequest = {
    moduleId: formValue.moduleId,
    productVersionId: formValue.productVersionId,
    testCaseId: formValue.testCaseId,
    useCase: formValue.useCase,
    scenario: formValue.scenario,
    testType: formValue.testType,
    testTool: formValue.testTool
  };

  this.testCaseService.createTestCase(formValue.moduleId, createPayload).pipe(
    switchMap((response: IdResponse) => {
      if (!response.id) {
        throw new Error('Test case created but no ID returned');
      }

      const operations: Observable<any>[] = [];
      
      if (stepsData.length > 0) {
        operations.push(
          this.testCaseService.replaceTestCaseSteps(response.id, stepsData).pipe(
            catchError(error => {
              console.error('Error adding steps:', error);
              return of(null);
            })
          )
        );
      }

      if (attributesData.length > 0) {
        operations.push(
          this.testCaseService.updateTestCaseAttributes(
            formValue.moduleId,
            response.id,
            attributesData
          ).pipe(
            catchError(error => {
              console.error('Error adding attributes:', error);
              return of(null);
            })
          )
        );
      }

      return operations.length > 0 ? forkJoin(operations) : of(response);
    }),
    takeUntil(this.destroy$),
    finalize(() => {
      this.loading.set(false);
      this.cdr.detectChanges(); // Trigger change detection
    })
  ).subscribe({
    next: () => {
      this.showAlertMessage('Test case created successfully', 'success');
      this.loadTestCases(formValue.moduleId);
      this.cancelEditing();
      this.cdr.detectChanges(); // Ensure UI updates immediately
    },
    error: (error) => this.handleOperationError(error, 'create')
  });
}

  private handleOperationError(error: any, operation: 'create' | 'update'): void {
    console.error(`Error ${operation}ing test case:`, error);

    let errorMessage = `Failed to ${operation} test case`;
    if (error?.error?.message) {
      errorMessage += `: ${error.error.message}`;
    } else if (error?.message) {
      errorMessage += `: ${error.message}`;
    }

    this.showAlertMessage(errorMessage, 'error');
    this.loading.set(false);
  }

  // Module attribute management
openModuleAttributes(): void {
  console.log('Opening module attributes modal');
  this.showModuleAttributesForm.set(true);
}

  addModuleAttribute(): void {
  console.log('Adding new module attribute');
  this.currentModuleAttribute.set({
    id: '', // Will be generated by backend
    moduleId: this.selectedModule(),
    name: '',
    key: '',
    type: 'text',
    isRequired: false,
    
  });
}

 editModuleAttribute(attribute: ModuleAttribute): void {
  console.log('Editing module attribute:', attribute);
  // Create a copy to avoid reference issues
  this.currentModuleAttribute.set({ 
    ...attribute,
  
  });
}

saveModuleAttribute(): void {
  const attribute = this.currentModuleAttribute();
  if (!attribute) {
    this.showAlertMessage('No attribute to save', 'error');
    return;
  }

  // 🚫 Removed all frontend validation
  const request: ModuleAttributeRequest = {
    name: attribute.name || '',
    key: attribute.key || '',
    type: attribute.type || 'text',
    isRequired: attribute.isRequired || false,
  };

  console.log('Saving module attribute (no FE validation):', request);

  const isUpdate = !!(attribute.id && attribute.id.trim());
  const operation = isUpdate
    ? this.moduleService.updateModuleAttribute(this.selectedModule(), attribute.id!, request)
    : this.moduleService.createModuleAttribute(this.selectedModule(), request);

  const operationType = isUpdate ? 'updated' : 'created';

  this.loading.set(true);

  operation.pipe(
    takeUntil(this.destroy$)
  ).subscribe({
    next: (response) => {
      console.log(`Module attribute ${operationType} successfully:`, response);
      this.showAlertMessage(`Attribute ${operationType} successfully`, 'success');
      this.currentModuleAttribute.set(null);
      this.loadModuleAttributes(this.selectedModule());

      this.testCaseService.syncModuleAttributesToTestCases(this.selectedModule()).pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Error syncing module attributes to test cases:', err);
          this.showAlertMessage('Attribute saved but failed to sync to test cases', 'warning');
          return of(void 0);
        })
      ).subscribe(() => {
        this.loadTestCases(this.selectedModule());
        this.loading.set(false);
      });
    },
    error: (error) => {
      console.error(`Error ${operationType.slice(0, -1)}ing attribute:`, error);
      let errorMessage = `Failed to ${operationType.slice(0, -1)} attribute`;
      if (error?.message) {
        errorMessage += `: ${error.message}`;
      }
      this.showAlertMessage(errorMessage, 'error');
      this.loading.set(false);
    }
  });
}

trackByAttributeId(index: number, attribute: any): string {
  return attribute.id || index;
}


deleteModuleAttribute(attributeId: string): void {
  console.log('Attempting to delete module attribute:', attributeId);
  
  if (!attributeId || !attributeId.trim()) {
    this.showAlertMessage('Cannot delete attribute: Invalid attribute ID', 'error');
    return;
  }

  // Confirm deletion
  const confirmDelete = confirm('Are you sure you want to delete this attribute? This will remove it from all test cases in this module.');
  if (!confirmDelete) {
    return;
  }

  this.loading.set(true);
  
  this.moduleService.deleteModuleAttribute(this.selectedModule(), attributeId).pipe(
    takeUntil(this.destroy$)
  ).subscribe({
    next: () => {
      console.log('Module attribute deleted successfully');
      this.showAlertMessage('Attribute deleted successfully', 'success');
      
      // Reload module attributes
      this.loadModuleAttributes(this.selectedModule());
      
      // Sync the removal to test cases (this will remove the attribute from all test cases)
      this.testCaseService.syncModuleAttributesToTestCases(this.selectedModule()).pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Error syncing module attributes after delete:', err);
          this.showAlertMessage('Attribute deleted but failed to sync changes to test cases', 'warning');
          return of(void 0);
        })
      ).subscribe(() => {
        console.log('Attribute removal synced to test cases');
        // Reload test cases to reflect removed attribute
        this.loadTestCases(this.selectedModule());
        this.loading.set(false);
      });
    },
    error: (error) => {
      console.error('Error deleting module attribute:', error);
      let errorMessage = 'Failed to delete attribute';
      
      if (error?.message) {
        errorMessage += `: ${error.message}`;
      }
      
      this.showAlertMessage(errorMessage, 'error');
      this.loading.set(false);
    }
  });
}

 closeModuleAttributeForm(): void {
  console.log('Closing module attribute form');
  this.currentModuleAttribute.set(null);
  this.showModuleAttributesForm.set(false);
}



  // Test case deletion
  deleteTestCase(id: string, event?: Event): void {
    event?.stopPropagation();
    
    this.pendingDeleteId = id;
    this.alertMessage = 'Are you sure you want to delete this test case?';
    this.alertType = 'warning';
    this.isConfirmAlert = true;
    this.showAlert = true;
  }

  handleConfirmDelete(): void {
    if (!this.pendingDeleteId) return;
    
    this.loading.set(true);
    this.testCaseService.deleteTestCase(this.selectedModule(), this.pendingDeleteId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.showAlertMessage('Test case deleted successfully', 'success');
        this.loadTestCases(this.selectedModule());
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error deleting test case:', error);
        this.showAlertMessage('Failed to delete test case', 'error');
        this.loading.set(false);
      },
      complete: () => {
        this.pendingDeleteId = null;
        this.showAlert = false;
      }
    });
  }

  handleCancelDelete(): void {
    this.pendingDeleteId = null;
    this.showAlert = false;
  }

  // Utility methods
  getModuleName(moduleId: string): string {
    const module = this.modules().find(m => m.id === moduleId);
    return module?.name || 'Unknown Module';
  }

  getAttributeValue(testCase: TestCaseDetailResponse, key: string): string {
    const attribute = testCase.attributes?.find(a => a.key === key);
    return attribute?.value || '-';
  }

  getUniqueAttributeNames(): string[] {
    return [...new Set(this.moduleAttributes().map(attr => attr.key))];
  }

  // FIXED: Helper method to get version display text
  getVersionDisplayText(productVersionId: string): string {
    if (!productVersionId) return 'N/A';
    
    const version = this.versionOptions().find(v => v.id === productVersionId);
    return version?.version || 'Unknown';
  }

  // Filtering - Updated to work with version strings
applyFilters(): void {
  const { testCaseId, useCase, version } = this.filter();
  
  const filtered = this.testCases().filter(tc => {
    const matchesId = !testCaseId || tc.testCaseId?.toLowerCase().includes(testCaseId.toLowerCase());
    const matchesUseCase = !useCase || tc.useCase?.toLowerCase().includes(useCase.toLowerCase());
    const matchesVersion = !version || tc.version === version || tc.productVersionName === version;
    
    return matchesId && matchesUseCase && matchesVersion;
  });

  // Sort by the last numeric part of Test Case ID in ascending order
  const sortedFiltered = filtered.sort((a, b) => {
    const aId = a.testCaseId || '';
    const bId = b.testCaseId || '';
    
    // Extract the last numeric part from Test Case ID
    const extractLastNumber = (id: string): number => {
      // Match one or more digits at the end of the string
      const match = id.match(/(\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    const aNum = extractLastNumber(aId);
    const bNum = extractLastNumber(bId);
    
    // If both have numbers at the end, sort numerically
    if (aNum !== 0 && bNum !== 0) {
      return aNum - bNum;
    }
    
    // If only one has a number, put the one with number first
    if (aNum !== 0 && bNum === 0) return -1;
    if (aNum === 0 && bNum !== 0) return 1;
    
    // If neither has numbers, sort alphabetically
    return aId.localeCompare(bId);
  });

  this.filteredTestCases.set(sortedFiltered);
}
  updateFilter<K extends keyof TestCaseFilter>(key: K, value: string): void {
    this.filter.update(current => ({ ...current, [key]: value }));
    this.applyFilters();
  }

  // Get unique version strings for filter dropdown
  getUniqueVersions(): string[] {
    const versions = new Set<string>();
    this.testCases().forEach(tc => {
      if (tc.version) versions.add(tc.version);
      if (tc.productVersionName) versions.add(tc.productVersionName);
    });
    return Array.from(versions).sort().reverse();
  }

  // Navigation
  goBack(): void {
    this.router.navigate(['/tester/add-testcases'], {
      queryParams: this.productId() ? { productId: this.productId() } : undefined
    });
  }

  // Debug method to refresh version options
  refreshVersionOptions(): void {
    console.log('Manually refreshing version options...');
    this.loadVersionOptions().subscribe({
      next: (options) => {
        console.log('Refreshed version options:', options);
        
        // Check if all options have valid IDs
        const invalidOptions = options.filter(opt => !opt.id);
        if (invalidOptions.length > 0) {
          console.warn('Found version options without IDs:', invalidOptions);
          this.showAlertMessage(`Warning: ${invalidOptions.length} version options have no ID`, 'warning');
        } else {
          this.showAlertMessage(`Loaded ${options.length} version options`, 'success');
        }
      },
      error: (error) => {
        console.error('Error refreshing version options:', error);
        this.showAlertMessage('Failed to refresh version options', 'error');
      }
    });
  }

  // Helper method to check if version options are valid
  private areVersionOptionsValid(): boolean {
    const options = this.versionOptions();
    if (options.length === 0) return false;
    
    const validOptions = options.filter(opt => opt.id);
    return validOptions.length > 0;
  }

  // Helper methods
  private showAlertMessage(message: string, type: 'success' | 'error' | 'warning'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.isConfirmAlert = false;
    this.showAlert = true;
    
    if (type !== 'warning') {
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        } else if (control instanceof FormArray) {
          control.controls.forEach(c => {
            if (c instanceof FormGroup) {
              this.markFormGroupTouched(c);
            } else {
              c.markAsTouched();
            }
          });
        }
      }
    });
  }

  // Getters for template
  get isFormValid(): boolean {
    return this.form.valid;
  }

  get hasTestCases(): boolean {
    return this.testCases().length > 0;
  }

  get hasFilteredResults(): boolean {
    return this.filteredTestCases().length > 0;
  }

  get isLoadingData(): boolean {
    return this.loading();
  }
}