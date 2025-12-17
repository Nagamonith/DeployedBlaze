import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

import { TestRunService } from '../../app/shared/services/test-run.service';
import { TestRunResponse } from '../../app/shared/modles/test-run.model';
import { AlertComponent } from '../../app/shared/alert/alert.component';

@Component({
  selector: 'app-archived-test-run',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './archived-test-run.component.html',
  styleUrls: ['./archived-test-run.component.css']
})
export class ArchivedTestRunComponent implements OnInit {

  // services
  private testRunService = inject(TestRunService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // state
  archivedRuns = signal<TestRunResponse[]>([]);
  currentProductId = signal<string>('');

  // alert / confirmation
  showAlert = signal(false);
  alertMessage = signal('');
  alertType = signal<'success' | 'error' | 'warning'>('success');
  isConfirmAlert = signal(false);

  pendingUnarchiveId = signal<string | null>(null);
  pendingDeleteId = signal<string | null>(null);

  // -------------------------
  // lifecycle
  // -------------------------
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const productId = params.get('productId');
      if (productId) {
        this.currentProductId.set(productId);
        this.loadArchivedRuns();
      }
    });
  }

  // -------------------------
  // data loading
  // -------------------------
  loadArchivedRuns(): void {
    const productId = this.currentProductId();
    if (!productId) return;

    this.testRunService.getTestRuns(productId).pipe(
      tap(runs => {
        // ONLY archived runs
        this.archivedRuns.set(runs.filter(r => r.isArchived === true));
      }),
      catchError(err => {
        console.error('Failed to load archived test runs', err);
        this.showMessage('Failed to load archived test runs', 'error');
        return of([]);
      })
    ).subscribe();
  }

  // -------------------------
  // confirmation handlers
  // -------------------------
  confirmUnarchive(runId: string): void {
    this.pendingUnarchiveId.set(runId);
    this.alertMessage.set('Are you sure you want to unarchive this test run?');
    this.alertType.set('warning');
    this.isConfirmAlert.set(true);
    this.showAlert.set(true);
  }

  confirmDelete(runId: string): void {
    this.pendingDeleteId.set(runId);
    this.alertMessage.set('Are you sure you want to delete this test run?');
    this.alertType.set('warning');
    this.isConfirmAlert.set(true);
    this.showAlert.set(true);
  }

  handleConfirm(): void {
    const productId = this.currentProductId();

    // unarchive
    if (this.pendingUnarchiveId()) {
      this.testRunService
        .setArchiveStatus(productId, this.pendingUnarchiveId()!, false)
        .subscribe(() => {
          this.showMessage('Test run unarchived successfully', 'success');
          this.loadArchivedRuns();
        });
    }

    // delete
    if (this.pendingDeleteId()) {
      this.testRunService
        .deleteTestRun(productId, this.pendingDeleteId()!)
        .subscribe(() => {
          this.showMessage('Test run deleted successfully', 'success');
          this.loadArchivedRuns();
        });
    }

    this.resetConfirm();
  }

  handleCancel(): void {
    this.resetConfirm();
  }

  private resetConfirm(): void {
    this.pendingDeleteId.set(null);
    this.pendingUnarchiveId.set(null);
    this.isConfirmAlert.set(false);
    this.showAlert.set(false);
  }

  // -------------------------
  // helpers
  // -------------------------
  private showMessage(
    message: string,
    type: 'success' | 'error' | 'warning'
  ): void {
    this.alertMessage.set(message);
    this.alertType.set(type);
    this.showAlert.set(true);

    setTimeout(() => {
      this.showAlert.set(false);
    }, 3000);
  }

  // -------------------------
  // navigation
  // -------------------------
  goBack(): void {
    this.router.navigate(
      ['/tester/test-runs'],
      { queryParams: { productId: this.currentProductId() } }
    );
  }
}
