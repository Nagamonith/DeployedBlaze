// sheet-matching.component.ts
import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TestCaseService } from '../../app/shared/services/test-case.service';
import { ProductService } from '../../app/shared/services/product.service';
import { ModuleService } from '../../app/shared/services/module.service';
import { CreateModuleRequest, ModuleAttributeRequest, ModuleAttribute, ProductModule } from '../../app/shared/modles/module.model';
import { CreateTestCaseRequest, ManualTestCaseStep, TestCaseAttributeRequest } from '../../app/shared/modles/test-case.model';
import { Product, type ProductVersion, ProductVersionResponse } from '../../app/shared/modles/product.model';
import { catchError, firstValueFrom, of } from 'rxjs';

interface FieldMapping {
  field: string;
  label: string;
  mappedTo: string;
  required: boolean;
}

interface ImportResult {
  success: number;
  errors: number;
  errorMessages: string[];
}

@Component({
  selector: 'app-sheet-matching',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './sheet-matching.component.html',
  styleUrls: ['./sheet-matching.component.css']
})
export class SheetMatchingComponent {
  // Allow user to reset/cancel selected module and re-select or create
  resetModuleSelection(): void {
    this.moduleCreated.set(false);
    this.createdModuleId.set(null);
    this.createdModuleName.set('');
    this.selectedExistingModule.set(null);
    this.moduleAttributes.set([]);
    this.customAttributes.set([]);
    this.attributeMappings.set({});
    this.showModuleForm.set(false);
  }
  // Helper for select (change) event to get value safely
  getSelectValue(event: Event): string {
    const target = event.target as HTMLSelectElement | null;
    return target ? target.value : '';
  }
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private testCaseService = inject(TestCaseService);
  private productService = inject(ProductService);
  private moduleService = inject(ModuleService);

  // Existing signals
  sheetName = signal<string>('Untitled');
  sheetColumns = signal<string[]>([]);
  sheetData = signal<any[]>([]);
  customAttributes = signal<string[]>([]);
  attributeMappings = signal<Record<string, string>>({});
  isProcessing = signal(false);
  errorMessage = signal<string | null>(null);
  currentProduct = signal<Product | null>(null);

  // Module selection/creation signals
  moduleSelection = signal<'create' | 'select'>('select');
  showModuleForm = signal(false);
  moduleCreated = signal(false);
  createdModuleId = signal<string | null>(null);
  createdModuleName = signal<string>('');

  // Existing modules dropdown
  existingModules = signal<ProductModule[]>([]);
  selectedExistingModule = signal<ProductModule | null>(null);

  // Module form data
  moduleForm = {
    name: '',
    description: '',
    version: '1.0'
  };

  // Module attributes signals
  showModuleAttributesForm = signal(false);
  moduleAttributes = signal<ModuleAttribute[]>([]);
  currentModuleAttribute = signal<ModuleAttribute | null>(null);

  // New module attribute form
  newModuleAttribute = {
    name: '',
    key: '',
    type: 'text',
    isRequired: false,
    options: ''
  };

  coreMappings = signal<FieldMapping[]>([
    { field: 'testCaseId', label: 'Test Case ID', mappedTo: '', required: true },
    { field: 'useCase', label: 'Use Case', mappedTo: '', required: true },
    { field: 'scenario', label: 'Scenario', mappedTo: '', required: true },
    { field: 'steps', label: 'Steps', mappedTo: '', required: true },
    { field: 'expectedResult', label: 'Expected Result', mappedTo: '', required: true },
    { field: 'version', label: 'Version', mappedTo: '', required: false },
    { field: 'testType', label: 'Test Type', mappedTo: '', required: false },
    { field: 'result', label: 'Result', mappedTo: '', required: false },
    { field: 'actual', label: 'Actual', mappedTo: '', required: false },
    { field: 'remarks', label: 'Remarks', mappedTo: '', required: false }
  ]);

  versionMapping = '';
  productVersions: ProductVersion[] = [];

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (state) {
      const sheetNameParam = this.route.snapshot.paramMap.get('sheetName');
      this.sheetName.set(sheetNameParam ? decodeURIComponent(sheetNameParam) : 'Untitled');
      this.sheetColumns.set(state['sheetColumns'] || []);
      this.sheetData.set(state['sheetData'] || []);

      // Pre-populate module form with sheet name
      this.moduleForm.name = this.generateModuleName();
      this.moduleForm.description = `Module created from imported sheet: ${this.sheetName()}`;

      if (state['productId']) {
        const productId = state['productId'];
        this.loadProductDetails(productId);
        this.loadProductVersions(productId);
        this.loadExistingModules(productId);
      }
      setTimeout(() => this.autoMapColumns(), 0);
    } else {
      this.router.navigate(['/tester/import-excel']);
    }
  }

  // Load all modules for the product
  private loadExistingModules(productId: string): void {
    this.moduleService.getModulesByProduct(productId).subscribe({
      next: (modules) => {
        this.existingModules.set(modules);
      },
      error: (err) => {
        this.existingModules.set([]);
        this.snackBar.open('Failed to load existing modules', 'Close', { duration: 3000 });
      }
    });
  }

  // Handler for dropdown selection
  onExistingModuleSelect(moduleId: string): void {
    const module = this.existingModules().find(m => m.id === moduleId);
    if (module) {
      this.selectedExistingModule.set(module);
      this.createdModuleId.set(module.id);
      this.createdModuleName.set(module.name);
      this.moduleCreated.set(true);
      this.loadModuleAttributes();
      // --- FIX: Ensure product context is set when selecting existing module ---
      if (!this.currentProduct() || this.currentProduct()?.id !== module.productId) {
        this.loadProductDetails(module.productId);
        this.loadProductVersions(module.productId);
      }
      this.snackBar.open(`Selected module: ${module.name}`, 'Close', { duration: 2000 });
    }
  }

  private loadProductDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => this.currentProduct.set(product),
      error: (err) => {
        console.error('Failed to load product details:', err);
        this.snackBar.open('Failed to load product details', 'Close', { duration: 3000 });
      }
    });
  }

private loadProductVersions(productId: string): void {
  this.testCaseService.getProductVersions(productId).subscribe({
    next: (versions: ProductVersion[]) => {
      this.productVersions = versions;
      if (versions.length > 0) {
        // Set default version mapping to the first active version
        const activeVersion = versions.find(v => v.isActive) || versions[0];
        this.versionMapping = '__pv__' + activeVersion.version;
        
        this.coreMappings.update((mappings: FieldMapping[]) =>
          mappings.map((m: FieldMapping) => 
            m.field === 'version' ? { ...m, mappedTo: this.versionMapping } : m
          )
        );
      }
    },
    error: (err) => {
      console.error('Failed to load product versions:', err);
      this.snackBar.open('Failed to load product versions', 'Close', { duration: 3000 });
    }
  });
}

  // Module Creation Methods
  openModuleForm(): void {
    this.showModuleForm.set(true);
  }

  closeModuleForm(): void {
    this.showModuleForm.set(false);
  }

  async createModule(): Promise<void> {
    const product = this.currentProduct();
    if (!product || !product.id) {
      this.snackBar.open('No product selected', 'Close', { duration: 3000 });
      return;
    }

    if (!this.moduleForm.name.trim()) {
      this.snackBar.open('Module name is required', 'Close', { duration: 3000 });
      return;
    }

    this.isProcessing.set(true);

    try {
      const moduleRequest: CreateModuleRequest = {
        productId: product.id,
        name: this.moduleForm.name.trim(),
        description: this.moduleForm.description.trim(),
        isActive: true,
        version: this.moduleForm.version.trim() || '1.0'
      };

      const module = await firstValueFrom(this.moduleService.createModule(product.id, moduleRequest));
      
      if (!module || !module.id) {
        throw new Error('Failed to create module');
      }

      this.createdModuleId.set(module.id);
      this.createdModuleName.set(this.moduleForm.name);
      this.moduleCreated.set(true);
      this.showModuleForm.set(false);

      this.snackBar.open(`Module "${this.moduleForm.name}" created successfully!`, 'Close', { duration: 3000 });

      // Load module attributes after creation
      this.loadModuleAttributes();

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to create module';
      this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      console.error('Module creation error:', error);
    } finally {
      this.isProcessing.set(false);
    }
  }

  // Module Attributes Methods
  openModuleAttributesForm(): void {
    if (!this.moduleCreated()) {
      this.snackBar.open('Please create a module first before adding attributes', 'Close', { duration: 3000 });
      return;
    }
    this.showModuleAttributesForm.set(true);
  }

  closeModuleAttributesForm(): void {
    this.showModuleAttributesForm.set(false);
    this.currentModuleAttribute.set(null);
  }

  addModuleAttribute(): void {
    this.currentModuleAttribute.set({
      id: '',
      moduleId: this.createdModuleId() || '',
      name: '',
      key: '',
      type: 'text',
      isRequired: false,
      options: ''
    });
  }

  editModuleAttribute(attribute: ModuleAttribute): void {
    this.currentModuleAttribute.set({ ...attribute });
  }

  async saveModuleAttribute(): Promise<void> {
    const attribute = this.currentModuleAttribute();
    const moduleId = this.createdModuleId();
    
    if (!attribute || !moduleId) {
      this.snackBar.open('No attribute or module available', 'Close', { duration: 3000 });
      return;
    }

    if (!attribute.name.trim() || !attribute.key.trim()) {
      this.snackBar.open('Name and key are required', 'Close', { duration: 3000 });
      return;
    }

    // Basic key validation
    const keyPattern = /^[a-z_][a-z0-9_]*$/;
    if (!keyPattern.test(attribute.key)) {
      this.snackBar.open('Key must use lowercase letters, numbers, and underscores only', 'Close', { duration: 3000 });
      return;
    }

    this.isProcessing.set(true);

    try {
      const request: ModuleAttributeRequest = {
        name: attribute.name.trim(),
        key: attribute.key.trim(),
        type: attribute.type,
        isRequired: attribute.isRequired,
        options: attribute.options?.trim()
      };

      const isUpdate = !!(attribute.id && attribute.id.trim());
      
      if (isUpdate) {
        await firstValueFrom(this.moduleService.updateModuleAttribute(moduleId, attribute.id!, request));
        this.snackBar.open('Attribute updated successfully', 'Close', { duration: 2000 });
      } else {
        await firstValueFrom(this.moduleService.createModuleAttribute(moduleId, request));
        this.snackBar.open('Attribute created successfully', 'Close', { duration: 2000 });
      }

      this.currentModuleAttribute.set(null);
      this.loadModuleAttributes();

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to save attribute';
      this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      console.error('Save attribute error:', error);
    } finally {
      this.isProcessing.set(false);
    }
  }

  async deleteModuleAttribute(attributeId: string): Promise<void> {
    const moduleId = this.createdModuleId();
    if (!moduleId || !attributeId) return;

    const confirmDelete = confirm('Are you sure you want to delete this attribute?');
    if (!confirmDelete) return;

    this.isProcessing.set(true);

    try {
      await firstValueFrom(this.moduleService.deleteModuleAttribute(moduleId, attributeId));
      this.snackBar.open('Attribute deleted successfully', 'Close', { duration: 2000 });
      this.loadModuleAttributes();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete attribute';
      this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      console.error('Delete attribute error:', error);
    } finally {
      this.isProcessing.set(false);
    }
  }

  private loadModuleAttributes(): void {
    const moduleId = this.createdModuleId();
    if (!moduleId) return;

    this.moduleService.getModuleAttributes(moduleId).subscribe({
      next: (attributes) => {
        this.moduleAttributes.set(attributes);
        // Update custom attributes signal for mapping
        this.customAttributes.set(attributes.map(attr => attr.key));
      },
      error: (err) => {
        console.error('Failed to load module attributes:', err);
      }
    });
  }

  // Existing mapping methods
  onVersionMappingChange(value: string): void {
    this.versionMapping = value;
    this.coreMappings.update((mappings: FieldMapping[]) =>
      mappings.map((m: FieldMapping) => m.field === 'version' ? { ...m, mappedTo: value } : m)
    );
  }

  updateMapping(field: string, column: string): void {
    this.coreMappings.update(mappings =>
      mappings.map(m => m.field === field ? { ...m, mappedTo: column } : m)
    );
  }

  getAttributeMapping(attr: string): string {
    return this.attributeMappings()[attr] || '';
  }

  updateAttributeMapping(attr: string, column: string): void {
    this.attributeMappings.update(mappings => ({
      ...mappings,
      [attr]: column
    }));
  }

  goBack(): void {
    this.router.navigate(['/tester/import-excel']);
  }

  async importTestCases(): Promise<void> {
    if (!this.moduleCreated()) {
      this.snackBar.open('Please create a module before importing test cases', 'Close', { duration: 3000 });
      return;
    }

    this.isProcessing.set(true);
    this.errorMessage.set(null);

    try {
      console.debug('[IMPORT] Starting importTestCases');
      console.debug('[IMPORT] moduleCreated:', this.moduleCreated());
      console.debug('[IMPORT] createdModuleId:', this.createdModuleId());
      console.debug('[IMPORT] createdModuleName:', this.createdModuleName());
      console.debug('[IMPORT] currentProduct:', this.currentProduct());
      console.debug('[IMPORT] coreMappings:', this.coreMappings());
      console.debug('[IMPORT] attributeMappings:', this.attributeMappings());
      console.debug('[IMPORT] sheetColumns:', this.sheetColumns());
      console.debug('[IMPORT] sheetData:', this.sheetData());

      // Defensive: If product context is missing, try to recover from selected module
      if (!this.currentProduct() && this.selectedExistingModule()) {
        this.loadProductDetails(this.selectedExistingModule()!.productId);
        this.loadProductVersions(this.selectedExistingModule()!.productId);
        // Wait a tick for signals to update
        await new Promise(res => setTimeout(res, 200));
      }

      const missingRequired = this.coreMappings()
        .filter(m => m.required && !m.mappedTo);

      if (missingRequired.length > 0) {
        console.error('[IMPORT] Missing required mappings:', missingRequired);
        throw new Error(`Please map all required fields: ${missingRequired.map(m => m.label).join(', ')}`);
      }

      const importResult = await this.createTestCases();
      
      this.snackBar.open(
        `Successfully imported ${importResult.success} test cases. ${importResult.errors} failed.`,
        'Close',
        { duration: 5000 }
      );

      if (importResult.errorMessages.length > 0) {
        console.error('[IMPORT] Import errors:', importResult.errorMessages);
      }

      // Navigate to the new module
      this.router.navigate(['/tester/modules', this.createdModuleId()], {
        state: { refresh: true }
      });

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to import test cases';
      this.errorMessage.set(errorMsg);
      console.error('[IMPORT] Import error:', error);
      this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
    } finally {
      this.isProcessing.set(false);
    }
  }

 private async createTestCases(): Promise<ImportResult> {
  const result: ImportResult = {
    success: 0,
    errors: 0,
    errorMessages: []
  };

  const moduleId = this.createdModuleId();
  if (!moduleId) {
    result.errorMessages.push('No module created');
    return result;
  }

  // Get product context
  let product = this.currentProduct();
  if ((!product || !product.id) && this.selectedExistingModule()) {
    product = { id: this.selectedExistingModule()!.productId, name: '', description: '', isActive: true } as any;
    this.currentProduct.set(product);
  }
  if (!product || !product.id) {
    result.errorMessages.push('No product selected');
    return result;
  }

  // Load product versions
  const productVersions = await firstValueFrom(
    this.testCaseService.getProductVersions(product.id).pipe(
      catchError(() => {
        result.errorMessages.push('Failed to load product versions');
        return of([] as ProductVersion[]);
      })
    )
  );

  for (const [index, row] of this.sheetData().entries()) {
    try {
      // Handle version mapping - FIXED LOGIC
      let productVersionId = '';
      
      if (this.versionMapping.startsWith('__pv__')) {
        // Fixed version from dropdown
        const versionString = this.versionMapping.replace('__pv__', '');
        const productVersion = productVersions.find(v => v.version === versionString);
        if (!productVersion) {
          throw new Error(`Product version "${versionString}" not found`);
        }
        productVersionId = productVersion.id;
      } else if (this.versionMapping) {
        // Version from column mapping
        const versionString = row[this.versionMapping]?.toString() || '';
        if (versionString) {
          const productVersion = productVersions.find(v => v.version === versionString);
          if (!productVersion) {
            throw new Error(`Version "${versionString}" not found in product versions`);
          }
          productVersionId = productVersion.id;
        }
      }
      
      // If no version mapped, use the first available version
      if (!productVersionId && productVersions.length > 0) {
        productVersionId = productVersions[0].id;
      }

      // Build test case payload with productVersionId
      const testCaseRequest: CreateTestCaseRequest = {
        moduleId: moduleId,
        productVersionId: productVersionId, // This is the key fix
        testCaseId: this.getRowValue(row, 'testCaseId') || this.generateTestCaseId(),
        useCase: this.getRowValue(row, 'useCase') || '',
        scenario: this.getRowValue(row, 'scenario') || '',
        testType: 'Manual',
        testTool: '',
        steps: this.parseSteps(row),
        result: this.getRowValue(row, 'result'),
        actual: this.getRowValue(row, 'actual'),
        remarks: this.getRowValue(row, 'remarks')
      };

      // Log for debugging
      console.debug(`[IMPORT] Row ${index + 1}: ProductVersionId = ${productVersionId}`);

      // Send to API
      const createdTestCase = await firstValueFrom(
        this.testCaseService.createTestCase(moduleId, testCaseRequest).pipe(
          catchError(err => {
            throw new Error(`API Error: ${err.message}`);
          })
        )
      );
      
      // Add custom attributes
      await this.addTestCaseAttributes(createdTestCase.id, row);
      
      result.success++;

    } catch (error: any) {
      result.errors++;
      const errorMsg = error.message || 'Unknown error';
      result.errorMessages.push(`Row ${index + 1}: ${errorMsg}`);
      console.error(`Error at row ${index + 1}:`, error);
    }
  }

  return result;
}

  private async addTestCaseAttributes(testCaseId: string, row: any): Promise<void> {
    const moduleId = this.createdModuleId();
    if (!moduleId) return;

    for (const attr of this.moduleAttributes()) {
      const column = this.attributeMappings()[attr.key];
      if (column && row[column]) {
        try {
          const request: TestCaseAttributeRequest = {
            key: attr.key,
            value: row[column].toString()
          };
          await firstValueFrom(this.testCaseService.addTestCaseAttribute(moduleId, testCaseId, request));
        } catch (error) {
          console.error(`Failed to add attribute ${attr.key} to test case ${testCaseId}:`, error);
        }
      }
    }
  }

  private generateTestCaseId(): string {
    return `TC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }

  private parseSteps(row: any): ManualTestCaseStep[] | undefined {
    const stepsValue = this.getRowValue(row, 'steps');
    const expectedValue = this.getRowValue(row, 'expectedResult');
    
    if (!stepsValue && !expectedValue) {
      return undefined;
    }

    return [{
      testCaseId: '',
      steps: stepsValue || '',
      expectedResult: expectedValue || ''
    }];
  }

 public getRowValue(row: any, field: string): string {
  if (field === 'testType') {
    return 'Manual';
  }
  
  // Don't handle version field here - it's handled in createTestCases
  if (field === 'version') {
    return ''; // Version is handled separately
  }
  
  const mapping = this.coreMappings().find(m => m.field === field);
  if (!mapping || !mapping.mappedTo) return '';
  return row[mapping.mappedTo]?.toString() || '';
}

  private generateModuleName(): string {
    return this.sheetName()
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private autoMapColumns(): void {
    const availableColumns = this.sheetColumns().map(col => col.toLowerCase().trim());

    this.coreMappings.update(mappings =>
      mappings.map(mapping => {
        const exactMatch = availableColumns.findIndex(col => 
          col === mapping.label.toLowerCase().trim() ||
          col === mapping.field.toLowerCase().trim()
        );

        if (exactMatch >= 0) {
          return { ...mapping, mappedTo: this.sheetColumns()[exactMatch] };
        }

        const partialMatch = availableColumns.findIndex(col => 
          col.includes(mapping.label.toLowerCase().trim()) ||
          col.includes(mapping.field.toLowerCase().trim())
        );

        if (partialMatch >= 0) {
          return { ...mapping, mappedTo: this.sheetColumns()[partialMatch] };
        }

        return mapping;
      })
    );
  }
}