import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestRunService } from '../../app/shared/services/test-run.service';
import { TestSuiteService } from '../../app/shared/services/test-suite.service';
import { TestRunResponse, CreateTestRunRequest, AssignTestSuitesRequest } from '../../app/shared/modles/test-run.model';
import { TestSuiteResponse } from '../../app/shared/modles/test-suite.model';
import { AlertComponent } from '../../app/shared/alert/alert.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, finalize, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeftnavIcon } from '../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';

@Component({
  selector: 'app-test-run',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    AlertComponent, 
    MatInputModule, 
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './test-run.component.html',
  styleUrls: ['./test-run.component.css']
})
export class TestRunComponent implements OnInit {
  private testRunService = inject(TestRunService);
  private testSuiteService = inject(TestSuiteService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  public icons: any = LeftnavIcon;

  // Form fields
  runName = '';
  runDescription = '';

  // State signals
  mode = signal<'list' | 'add' | 'edit'>('list');
  selectedRunId = signal<string>('');
  selectedSuiteIds = signal<string[]>([]);
  testRuns = signal<TestRunResponse[]>([]);
  testSuites = signal<TestSuiteResponse[]>([]);
  filteredTestSuites = signal<TestSuiteResponse[]>([]);
  currentProductId = signal<string>('');
  suiteSearchTerm = signal<string>('');

  // Alert signals
  showAlert = signal(false);
  alertMessage = signal('');
  alertType = signal<'success' | 'error' | 'warning'>('success');
  isConfirmAlert = signal(false);
  pendingDeleteId = signal<string | null>(null);

  // Loading states
  isLoadingRuns = signal(false);
  isLoadingSuites = signal(false);
  isSaving = signal(false);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const productId = params.get('productId');
      if (productId) {
        this.currentProductId.set(productId);
        this.loadTestRuns();
        this.loadTestSuites();
      }
    });
  }

  filterTestSuites(): void {
    const searchTerm = this.suiteSearchTerm().toLowerCase();
    if (!searchTerm) {
      this.filteredTestSuites.set(this.testSuites());
      return;
    }
    
    this.filteredTestSuites.set(
      this.testSuites().filter(suite => 
        suite.name.toLowerCase().includes(searchTerm) ||
        (suite.description && suite.description.toLowerCase().includes(searchTerm))
    ));
  }

  private loadTestRuns(): void {
    if (!this.currentProductId()) return;

    this.isLoadingRuns.set(true);
    this.testRunService.getTestRuns(this.currentProductId()).pipe(
      tap((runs) => {
        this.testRuns.set(runs);
        this.isLoadingRuns.set(false);
      }),
      catchError(err => {
        console.error('Failed to load test runs:', err);
        this.showAlertMessage('Failed to load test runs', 'error');
        this.isLoadingRuns.set(false);
        return of([]);
      })
    ).subscribe();
  }

// In your test-run.component.ts
private loadTestSuites(): void {
  if (!this.currentProductId()) return;

  this.isLoadingSuites.set(true);
  this.testSuiteService.getTestSuites(this.currentProductId()).pipe(
    switchMap(suites => {
      if (!suites || suites.length === 0) {
        return of([]);
      }

      // Load test cases for each suite
      const suiteRequests = suites.map(suite => 
        this.testSuiteService.getTestSuiteWithCases(suite.id).pipe(
          catchError(() => of({...suite, testCases: []})),
          map(suiteWithCases => ({
            ...suite,
            testCases: suiteWithCases.testCases?.map(tc => tc.testCase) || []
          }))
        )
      );
      return forkJoin(suiteRequests);
    }),
    tap(suitesWithCases => {
      this.testSuites.set(suitesWithCases);
      this.filteredTestSuites.set(suitesWithCases);
    }),
    catchError(err => {
      console.error('Failed to load test suites:', err);
      this.showAlertMessage('Failed to load test suites', 'error');
      return of([]);
    }),
    finalize(() => this.isLoadingSuites.set(false))
  ).subscribe();
}
// In your TestRunComponent class
testSuitesWithCounts = computed(() => 
  this.testSuites().map(suite => ({
    ...suite,
    testCaseCount: suite.testCases?.length || 0
  }))
);
// In your TestRunComponent class
testRunsWithCounts = computed(() => 
  this.testRuns().map(run => ({
    ...run,
    totalTestCases: run.testSuites?.reduce((sum, suite) => sum + (suite.testCases?.length || 0), 0) || 0
  }))
);
  startAddNewRun(): void {
    this.mode.set('add');
    this.runName = '';
    this.runDescription = '';
    this.selectedSuiteIds.set([]);
    this.suiteSearchTerm.set('');
    this.filterTestSuites();
  }

  startEditRun(runId: string): void {
    this.isLoadingRuns.set(true);
    this.testRunService.getTestRunById(this.currentProductId(), runId).pipe(
      tap((run) => {
        if (run) {
          this.mode.set('edit');
          this.selectedRunId.set(runId);
          this.runName = run.name;
          this.runDescription = run.description || '';
          this.selectedSuiteIds.set(run.testSuites?.map(suite => suite.id) || []);
        }
      }),
      catchError(err => {
        console.error('Failed to load test run:', err);
        this.showAlertMessage('Failed to load test run details', 'error');
        return of(null);
      }),
      tap(() => this.isLoadingRuns.set(false))
    ).subscribe();
  }

  cancelEdit(): void {
    this.mode.set('list');
    this.selectedRunId.set('');
    this.selectedSuiteIds.set([]);
  }

  handleCheckboxChange(suiteId: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.toggleSuiteSelection(suiteId, checkbox.checked);
  }

  toggleSuiteSelection(suiteId: string, isChecked: boolean | null): void {
    if (isChecked === null || isChecked === undefined) return;
    
    this.selectedSuiteIds.update(current => {
      if (isChecked) {
        return current.includes(suiteId) ? current : [...current, suiteId];
      } else {
        return current.filter(id => id !== suiteId);
      }
    });
  }

  isSuiteSelected(suiteId: string): boolean {
    return this.selectedSuiteIds().includes(suiteId);
  }

  saveTestRun(): void {
    if (!this.runName.trim()) {
      this.showAlertMessage('Test run name is required', 'error');
      return;
    }

    if (!this.currentProductId()) {
      this.showAlertMessage('Product ID is required', 'error');
      return;
    }

    if (this.selectedSuiteIds().length === 0) {
      this.showAlertMessage('At least one test suite must be selected', 'error');
      return;
    }

    this.isSaving.set(true);

    const request: CreateTestRunRequest = {
      name: this.runName,
      description: this.runDescription
    };

    if (this.mode() === 'add') {
      this.createTestRun(request);
    } else {
      this.updateTestRun(request);
    }
  }

  private createTestRun(request: CreateTestRunRequest): void {
    this.testRunService.createTestRun(this.currentProductId(), request).pipe(
      tap((response) => {
        if (response && response.id) {
          this.assignTestSuites(response.id);
        }
      }),
      catchError(err => {
        console.error('Failed to create test run:', err);
        this.showAlertMessage('Failed to create test run', 'error');
        this.isSaving.set(false);
        return of(null);
      })
    ).subscribe();
  }

  private updateTestRun(request: CreateTestRunRequest): void {
    // Swagger exposes only status update; update suites and keep status as-is
    this.assignTestSuites(this.selectedRunId());
  }

  private assignTestSuites(runId: string): void {
    const request: AssignTestSuitesRequest = {
      testSuiteIds: this.selectedSuiteIds()
    };

    this.testRunService.assignTestSuitesToRun(runId, request).pipe(
      tap(() => {
        this.showAlertMessage(
          `Test run ${this.mode() === 'add' ? 'created' : 'updated'} successfully`,
          'success'
        );
        this.loadTestRuns();
        this.isSaving.set(false);
        setTimeout(() => this.cancelEdit(), 1000);
      }),
      catchError(err => {
        console.error('Failed to assign test suites:', err);
        this.showAlertMessage(
          `Test run ${this.mode() === 'add' ? 'created' : 'updated'} but failed to assign suites`,
          'warning'
        );
        this.loadTestRuns();
        this.isSaving.set(false);
        setTimeout(() => this.cancelEdit(), 1000);
        return of(null);
      })
    ).subscribe();
  }

  confirmDeleteRun(runId: string): void {
    this.pendingDeleteId.set(runId);
    this.alertMessage.set('Are you sure you want to delete this test run?');
    this.alertType.set('warning');
    this.isConfirmAlert.set(true);
    this.showAlert.set(true);
  }

  handleConfirmDelete(): void {
    const runId = this.pendingDeleteId();
    if (!runId || !this.currentProductId()) {
      this.showAlert.set(false);
      return;
    }

    this.testRunService.deleteTestRun(this.currentProductId(), runId).pipe(
      tap(() => {
        this.showAlertMessage('Test run deleted successfully', 'success');
        this.loadTestRuns();
      }),
      catchError(err => {
        console.error('Failed to delete test run:', err);
        this.showAlertMessage('Failed to delete test run', 'error');
        return of(null);
      })
    ).subscribe();

    this.pendingDeleteId.set(null);
    this.isConfirmAlert.set(false);
    this.showAlert.set(false);
  }

  handleCancelDelete(): void {
    this.showAlert.set(false);
    this.isConfirmAlert.set(false);
    this.pendingDeleteId.set(null);
  }

  private showAlertMessage(message: string, type: 'success' | 'error' | 'warning'): void {
    this.alertMessage.set(message);
    this.alertType.set(type);
    this.showAlert.set(true);
    setTimeout(() => this.showAlert.set(false), 3000);
  }

 formatDate(date: Date | string): string {
  // Handle both string and Date inputs
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check for invalid dates
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
}