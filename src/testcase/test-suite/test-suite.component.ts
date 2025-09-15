import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestSuiteService } from '../../app/shared/services/test-suite.service';
import { LeftnavIcon } from '../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';
import { TestCaseService } from '../../app/shared/services/test-case.service';
import { 
  TestSuiteResponse, 
  CreateTestSuiteRequest, 
  AssignTestCasesRequest, 
  TestSuiteWithCasesResponse,
  TestSuiteTestCaseItem
} from '../../app/shared/modles/test-suite.model';
import { 
  TestCaseDetailResponse, 
  TestCaseResponse,
  ExecutionDetails
} from '../../app/shared/modles/test-case.model';
import { AlertComponent } from '../../app/shared/alert/alert.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModule } from '../../app/shared/modles/module.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { 
  catchError, 
  of, 
  tap, 
  forkJoin, 
  map, 
  switchMap, 
  finalize, 
  Observable, 
  EMPTY,
  throwError
} from 'rxjs';

@Component({
  selector: 'app-test-suite',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertComponent, MatSnackBarModule],
  templateUrl: './test-suite.component.html',
  styleUrls: ['./test-suite.component.css']
})
export class TestSuiteComponent {
  private testSuiteService = inject(TestSuiteService);
  private testCaseService = inject(TestCaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  public icons : any = LeftnavIcon;

  // Form fields
  suiteName = '';
  suiteDescription = '';
  selectedModuleId = '';

  // State signals
  mode = signal<'list' | 'add' | 'edit'>('list');
  selectedSuiteId = signal<string>('');
  selectedTestCases = signal<TestCaseDetailResponse[]>([]);
  testSuites = signal<TestSuiteResponse[]>([]);
  currentProductId = signal<string>('');
  modules = signal<ProductModule[]>([]);
  availableTestCases = signal<TestCaseDetailResponse[]>([]);

  // Enhanced test suite data with test case counts
  testSuitesWithCounts = signal<(TestSuiteResponse & { testCaseCount: number })[]>([]);

  // Alert signals
  showAlert = signal(false);
  alertMessage = signal('');
  alertType = signal<'success' | 'error' | 'warning'>('success');
  isConfirmAlert = signal(false);
  pendingDeleteId = signal<string | null>(null);

  // Loading states
  isLoadingSuites = signal(false);
  isLoadingModules = signal(false);
  isLoadingTestCases = signal(false);
  isSaving = signal(false);
  isDeleting = signal(false);

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const productId = params.get('productId');
      if (productId) {
        this.currentProductId.set(productId);
        this.loadTestSuites();
        this.loadModulesForCurrentProduct();
      } else {
        console.error('No productId found in query parameters');
        this.showAlertMessage('Product ID is required', 'error');
      }
    });
  }

  private loadTestSuites(): void {
    if (!this.currentProductId()) {
      console.error('Cannot load test suites: Product ID is missing');
      return;
    }

    this.isLoadingSuites.set(true);
    
    // First get the basic test suites
    this.testSuiteService.getTestSuites(this.currentProductId()).pipe(
      switchMap(suites => {
        if (!suites || suites.length === 0) {
          return of([]);
        }

        // For each suite, get the test cases count
        const suiteRequests = suites.map(suite => 
          this.testSuiteService.getTestSuiteWithCases(suite.id!).pipe(
            map(suiteWithCases => ({
              ...suite,
              testCaseCount: suiteWithCases?.testCases?.length || 0
            })),
            catchError(error => {
              console.error(`Error loading test cases for suite ${suite.id}:`, error);
              return of({
                ...suite,
                testCaseCount: 0
              });
            })
          )
        );

        return forkJoin(suiteRequests);
      }),
      tap((suitesWithCounts) => {
        console.log('Loaded test suites with counts:', suitesWithCounts);
        this.testSuites.set(suitesWithCounts.map(s => ({ ...s })));
        this.testSuitesWithCounts.set(suitesWithCounts);
      }),
      catchError(err => {
        console.error('Failed to load test suites:', err);
        this.showAlertMessage('Failed to load test suites: ' + (err.message || 'Unknown error'), 'error');
        this.testSuites.set([]);
        this.testSuitesWithCounts.set([]);
        return of([]);
      }),
      finalize(() => this.isLoadingSuites.set(false))
    ).subscribe();
  }

  private loadModulesForCurrentProduct(): void {
    if (!this.currentProductId()) {
      console.error('Cannot load modules: Product ID is missing');
      return;
    }

    this.isLoadingModules.set(true);
    this.testCaseService.getModulesByProduct(this.currentProductId()).pipe(
      tap((modules) => {
        console.log('Loaded modules:', modules);
        this.modules.set(modules || []);
      }),
      catchError(err => {
        console.error('Failed to load modules:', err);
        this.showAlertMessage('Failed to load modules: ' + (err.message || 'Unknown error'), 'error');
        this.modules.set([]);
        return of([]);
      }),
      finalize(() => this.isLoadingModules.set(false))
    ).subscribe();
  }

  startAddNewSuite(): void {
    this.mode.set('add');
    this.resetForm();
  }

  private resetForm(): void {
    this.suiteName = '';
    this.suiteDescription = '';
    this.selectedModuleId = '';
    this.selectedTestCases.set([]);
    this.availableTestCases.set([]);
    this.selectedSuiteId.set('');
  }


startEditSuite(suiteId: string): void {
  if (!suiteId) {
    this.showAlertMessage('Invalid test suite ID', 'error');
    return;
  }

  this.isLoadingSuites.set(true);
  this.selectedSuiteId.set(suiteId);
  this.mode.set('edit');

  forkJoin([
    this.testSuiteService.getTestSuiteById(this.currentProductId(), suiteId),
    this.testSuiteService.getTestSuiteWithCases(suiteId)
  ]).pipe(
    tap(([suite, suiteWithCases]) => {
      console.log('Editing suite:', suite);
      console.log('Suite with cases:', suiteWithCases);
      
      this.suiteName = suite.name || '';
      this.suiteDescription = suite.description || '';

      const testCases = suiteWithCases?.testCases || [];
      console.log('Processing test cases:', testCases);

      if (testCases.length > 0) {
        const mappedTestCases = testCases.map((item: TestSuiteTestCaseItem) => {
          const baseTestCase = item.testCase;
          const execDetails = item.executionDetails || {};
          
          return {
            id: baseTestCase.id,
            moduleId: baseTestCase.moduleId,
            productVersionId: baseTestCase.productVersionId,
            version: baseTestCase.version || baseTestCase.productVersionName,
            productVersionName: baseTestCase.productVersionName || baseTestCase.version,
            testCaseId: baseTestCase.testCaseId,
            useCase: baseTestCase.useCase,
            scenario: baseTestCase.scenario,
            testType: baseTestCase.testType,
            testTool: baseTestCase.testTool,
            result: execDetails.result || baseTestCase.result,
            actual: execDetails.actual,
            remarks: execDetails.remarks,
            createdAt: baseTestCase.createdAt,
            updatedAt: baseTestCase.updatedAt,
            steps: [],
            expected: [],
            attributes: [],
            uploads: execDetails.uploads?.map(u => u.filePath) || [],
            testSuiteIds: [suiteId],
            executionDetails: execDetails
          } as TestCaseDetailResponse;
        });

        console.log('Mapped test cases:', mappedTestCases);
        this.selectedTestCases.set(mappedTestCases);

        const firstTestCase = mappedTestCases[0];
        if (firstTestCase?.moduleId) {
          this.selectedModuleId = firstTestCase.moduleId;
          this.loadTestCasesForModule(this.selectedModuleId);
        }
      } else {
        this.selectedTestCases.set([]);
      }
    }),
    catchError(err => {
      console.error('Failed to load test suite for editing:', err);
      this.showAlertMessage('Failed to load test suite: ' + (err.message || 'Unknown error'), 'error');
      this.mode.set('list');
      return of(null);
    }),
    finalize(() => this.isLoadingSuites.set(false))
  ).subscribe();
}

  cancelEdit(): void {
    this.mode.set('list');
    this.resetForm();
  }

  onModuleSelect(moduleId: string): void {
    console.log('Module selected:', moduleId);
    this.selectedModuleId = moduleId;
    
    if (moduleId) {
      this.loadTestCasesForModule(moduleId);
    } else {
      this.availableTestCases.set([]);
    }
  }

  private loadTestCasesForModule(moduleId: string): void {
    if (!moduleId) return;

    this.isLoadingTestCases.set(true);
    this.availableTestCases.set([]);

    this.testCaseService.getTestCaseDetailByModule(moduleId, this.currentProductId()).pipe(
      tap(testCases => {
        console.log('Loaded test cases for module:', testCases);
        this.availableTestCases.set(testCases || []);
      }),
      catchError(err => {
        console.error('Failed to load test cases:', err);
        this.showAlertMessage('Failed to load test cases: ' + (err.message || 'Unknown error'), 'error');
        this.availableTestCases.set([]);
        return of([]);
      }),
      finalize(() => this.isLoadingTestCases.set(false))
    ).subscribe();
  }

  // Track functions
  trackBySuiteId(index: number, suite: TestSuiteResponse): string {
    return suite.id || index.toString();
  }

  trackByModuleId(index: number, module: ProductModule): string {
    return module.id || index.toString();
  }

  trackByTestCaseId(index: number, testCase: TestCaseDetailResponse): string {
    return testCase.id || index.toString();
  }

  // Test case selection methods
  areAllTestCasesSelected(): boolean {
    const available = this.availableTestCases();
    const selected = this.selectedTestCases();
    return available.length > 0 && available.every(tc => 
      selected.some(stc => stc.id === tc.id)
    );
  }

  areSomeTestCasesSelected(): boolean {
    const available = this.availableTestCases();
    const selected = this.selectedTestCases();
    const selectedCount = available.filter(tc => 
      selected.some(stc => stc.id === tc.id)
    ).length;
    return selectedCount > 0 && selectedCount < available.length;
  }

  toggleAllTestCases(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    
    if (isChecked) {
      // Select all available test cases
      const allTestCases = this.availableTestCases();
      const currentSelected = this.selectedTestCases();
      
      // Add only those that are not already selected
      const newSelections = allTestCases.filter(tc => 
        !currentSelected.some(stc => stc.id === tc.id)
      );
      
      this.selectedTestCases.update(current => [...current, ...newSelections]);
    } else {
      // Deselect all available test cases
      const availableIds = this.availableTestCases().map(tc => tc.id);
      this.selectedTestCases.update(current => 
        current.filter(tc => !availableIds.includes(tc.id))
      );
    }
  }

  handleCheckboxChange(testCase: TestCaseDetailResponse, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target) return;
    
    const isChecked = target.checked;
    this.toggleTestCaseSelection(testCase, isChecked);
  }

  toggleTestCaseSelection(testCase: TestCaseDetailResponse, isChecked: boolean): void {
    this.selectedTestCases.update(current => {
      if (isChecked) {
        return current.some(tc => tc.id === testCase.id) 
          ? current 
          : [...current, testCase];
      } else {
        return current.filter(tc => tc.id !== testCase.id);
      }
    });
  }

  isTestCaseSelected(testCase: TestCaseDetailResponse): boolean {
    if (!testCase?.id) return false;
    return this.selectedTestCases().some(tc => tc.id === testCase.id);
  }

  removeSelectedTestCase(testCaseId: string): void {
    if (!testCaseId) return;
    
    this.selectedTestCases.update(current =>
      current.filter(tc => tc.id !== testCaseId)
    );
  }

  // Save functionality
  saveTestSuite(): void {
    // Validation
    if (!this.suiteName.trim()) {
      this.showAlertMessage('Test suite name is required', 'error');
      return;
    }

    if (!this.currentProductId()) {
      this.showAlertMessage('Product ID is required', 'error');
      return;
    }

    this.isSaving.set(true);

    if (this.mode() === 'add') {
      this.createTestSuite();
    } else {
      this.updateTestSuite();
    }
  }

  private createTestSuite(): void {
    const request: CreateTestSuiteRequest = {
      name: this.suiteName.trim(),
      description: this.suiteDescription.trim() || undefined,
      isActive: true
    };

    console.log('Creating test suite with request:', request);

    this.testSuiteService.createTestSuite(this.currentProductId(), request).pipe(
      switchMap(response => {
        console.log('Test suite created successfully:', response);
        
        if (response?.id && this.selectedTestCases().length > 0) {
          return this.assignTestCasesToSuite(response.id).pipe(
            map(() => response),
            catchError(err => {
              console.error('Failed to assign test cases to new suite:', err);
              this.showAlertMessage('Test suite created but failed to assign some test cases: ' + (err.message || 'Unknown error'), 'warning');
              return of(response);
            })
          );
        }
        return of(response);
      }),
      tap(response => {
        if (response?.id) {
          const message = this.selectedTestCases().length === 0 
            ? 'Test suite created successfully' 
            : 'Test suite created and test cases assigned successfully';
          this.showAlertMessage(message, 'success');
          this.loadTestSuites();
          setTimeout(() => this.cancelEdit(), 1500);
        }
      }),
      catchError(err => {
        console.error('Failed to create test suite:', err);
        this.showAlertMessage('Failed to create test suite: ' + (err.message || 'Unknown error'), 'error');
        return of(null);
      }),
      finalize(() => this.isSaving.set(false))
    ).subscribe();
  }

  private updateTestSuite(): void {
    const suiteId = this.selectedSuiteId();
    if (!suiteId) return;

    const request: CreateTestSuiteRequest = {
      name: this.suiteName.trim(),
      description: this.suiteDescription.trim() || undefined,
      isActive: true
    };

    // First update the suite info
    this.testSuiteService.updateTestSuite(this.currentProductId(), suiteId, request).pipe(
      switchMap(() => {
        // Then handle test case assignments
        const testCaseIds = this.selectedTestCases()
          .map(tc => tc.id)
          .filter(id => id && id.trim() !== '') as string[];
        
        console.log('Updating test suite with test case IDs:', testCaseIds);
        
        return this.testSuiteService.updateTestSuiteTestCases(suiteId, testCaseIds);
      }),
      tap(() => {
        this.showAlertMessage('Test suite updated successfully', 'success');
        this.loadTestSuites();
        setTimeout(() => this.cancelEdit(), 1500);
      }),
      catchError(err => {
        console.error('Failed to update test suite:', err);
        this.showAlertMessage('Failed to update test suite: ' + (err.message || 'Unknown error'), 'error');
        return of(null);
      }),
      finalize(() => this.isSaving.set(false))
    ).subscribe();
  }

  private assignTestCasesToSuite(suiteId: string): Observable<void> {
    if (!suiteId) {
      return throwError(() => new Error('Suite ID is required for test case assignment'));
    }

    const testCaseIds = this.selectedTestCases()
      .map(tc => tc.id)
      .filter(id => id && id.trim() !== '') as string[];
    
    if (testCaseIds.length === 0) {
      return of(void 0);
    }

    const request: AssignTestCasesRequest = {
      testCaseIds: testCaseIds
    };

    return this.testSuiteService.assignTestCasesToSuite(suiteId, request);
  }

  // Delete functionality
  confirmDeleteSuite(suiteId: string): void {
    if (!suiteId) {
      this.showAlertMessage('Invalid test suite ID for deletion', 'error');
      return;
    }

    this.pendingDeleteId.set(suiteId);
    this.alertMessage.set('Are you sure you want to delete this test suite? This action cannot be undone.');
    this.alertType.set('warning');
    this.isConfirmAlert.set(true);
    this.showAlert.set(true);
  }

  handleConfirmDelete(): void {
    const suiteId = this.pendingDeleteId();
    if (!suiteId || !this.currentProductId()) {
      this.showAlert.set(false);
      this.pendingDeleteId.set(null);
      return;
    }

    this.isDeleting.set(true);
    this.showAlert.set(false);

    this.testSuiteService.deleteTestSuite(this.currentProductId(), suiteId, false).pipe(
      tap(() => {
        this.showAlertMessage('Test suite deleted successfully', 'success');
        this.loadTestSuites();
      }),
      catchError(err => {
        console.error('Failed to delete test suite:', err);
        
        if (err.message && err.message.includes('reference')) {
          // Ask for force delete
          this.alertMessage.set('This test suite contains references. Force delete anyway?');
          this.alertType.set('warning');
          this.isConfirmAlert.set(true);
          this.showAlert.set(true);
          return of(null);
        } else {
          this.showAlertMessage('Failed to delete test suite: ' + (err.message || 'Unknown error'), 'error');
          return of(null);
        }
      }),
      finalize(() => {
        this.isDeleting.set(false);
        this.pendingDeleteId.set(null);
      })
    ).subscribe();
  }

  handleCancelDelete(): void {
    this.showAlert.set(false);
    this.isConfirmAlert.set(false);
    this.pendingDeleteId.set(null);
  }

  // Utility methods
  private showAlertMessage(message: string, type: 'success' | 'error' | 'warning'): void {
    console.log(`Alert [${type}]:`, message);
    this.alertMessage.set(message);
    this.alertType.set(type);
    this.isConfirmAlert.set(false);
    this.showAlert.set(true);
    
    // Auto-hide success and error messages
    if (type === 'success' || type === 'error') {
      setTimeout(() => {
        this.showAlert.set(false);
      }, 4000);
    }
  }

  getModuleName(moduleId: string): string {
    if (!moduleId) return 'Unknown Module';
    const module = this.modules().find(m => m.id === moduleId);
    return module?.name || 'Unknown Module';
  }

  getTestCaseCount(suite: TestSuiteResponse): number {
    // Use the enhanced data with counts if available
    const suiteWithCount = this.testSuitesWithCounts().find(s => s.id === suite.id);
    if (suiteWithCount) {
      return suiteWithCount.testCaseCount;
    }
    
    // Fallback to original method
    if (!suite?.testCases) return 0;
    return Array.isArray(suite.testCases) ? suite.testCases.length : 0;
  }

  formatDate(dateString: string | Date | undefined | null): string {
    if (!dateString) return '-';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '-';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '-';
    }
  }

  isLoading(): boolean {
    return this.isLoadingSuites() || this.isLoadingModules() || this.isLoadingTestCases() || this.isSaving() || this.isDeleting();
  }

  canSave(): boolean {
    return !this.isSaving() && this.suiteName.trim().length > 0;
  }
  // Add this method to your component class
getSelectedTestCaseIds(): string {
  return this.selectedTestCases().map(tc => tc.id).join(', ');
}
}