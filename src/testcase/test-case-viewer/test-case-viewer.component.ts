import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TestCaseService } from '../../app/shared/services/test-case.service';
import { TestCaseDetailResponse } from '../../app/shared/modles/test-case.model';

@Component({
  selector: 'app-test-case-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './test-case-viewer.component.html',
  styleUrls: ['./test-case-viewer.component.css']
})
export class TestCaseViewerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private testCaseService = inject(TestCaseService);
  private snackBar = inject(MatSnackBar);

  testCase = signal<TestCaseDetailResponse | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadTestCase();
  }

  private loadTestCase(): void {
    const testCaseId = this.route.snapshot.paramMap.get('testCaseId');
    const moduleId = this.route.snapshot.paramMap.get('moduleId');

    if (!testCaseId || !moduleId) {
      this.error.set('Invalid test case or module ID');
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    // Use getTestCaseDetail for consistent enrichment (steps, executionDetails, etc)
    this.testCaseService.getTestCaseDetail(moduleId, testCaseId).subscribe({
      next: (testCase) => {
        // If executionDetails present, overlay actual/remarks/result
        if (testCase.executionDetails) {
          this.testCase.set({
            ...testCase,
            actual: testCase.executionDetails.actual || testCase.actual,
            remarks: testCase.executionDetails.remarks || testCase.remarks,
            result: testCase.executionDetails.result || testCase.result
          });
        } else {
          this.testCase.set(testCase);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load test case:', err);
        this.error.set('Failed to load test case details');
        this.isLoading.set(false);
        this.snackBar.open('Failed to load test case', 'Close', { duration: 3000 });
      }
    });
  }

  navigateToEdit(): void {
    const moduleId = this.route.snapshot.paramMap.get('moduleId');
    const testCaseId = this.route.snapshot.paramMap.get('testCaseId');
    if (moduleId && testCaseId) {
      this.router.navigate(['/tester/modules', moduleId, 'testcases', testCaseId, 'edit']);
    }
  }

  navigateBack(): void {
    const moduleId = this.route.snapshot.paramMap.get('moduleId');
    if (moduleId) {
      this.router.navigate(['/tester/modules', moduleId]);
    } else {
      this.router.navigate(['/tester/testcases']);
    }
  }

  formatResult(result?: string): string {
    if (!result) return '—';
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  }
}