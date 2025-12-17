import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TestSuiteService } from '../../app/shared/services/test-suite.service';
import { TestSuiteResponse } from '../../app/shared/modles/test-suite.model';
import { AlertComponent } from '../../app/shared/alert/alert.component';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-archived-test-suite',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './archived-test-suite.component.html',
  styleUrls: ['./archived-test-suite.component.css']
})
export class ArchivedTestSuiteComponent {

  private testSuiteService = inject(TestSuiteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  archivedSuites = signal<TestSuiteResponse[]>([]);
  currentProductId = signal<string>('');

  // alert
  showAlert = signal(false);
  alertMessage = signal('');
  alertType = signal<'success' | 'error' | 'warning'>('success');
  isConfirmAlert = signal(false);

  pendingUnarchiveId = signal<string | null>(null);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const productId = params.get('productId');
      if (productId) {
        this.currentProductId.set(productId);
        this.loadArchivedSuites();
      }
    });
  }

  loadArchivedSuites(): void {
    this.testSuiteService.getTestSuites(this.currentProductId()).pipe(
      tap(suites => {
        this.archivedSuites.set(
          suites.filter(s => s.isArchived)
        );
      }),
      catchError(err => {
        console.error(err);
        this.showMessage('Failed to load archived test suites', 'error');
        return of([]);
      })
    ).subscribe();
  }

  confirmUnarchive(suiteId: string): void {
    this.pendingUnarchiveId.set(suiteId);
    this.alertMessage.set('Are you sure you want to unarchive this test suite?');
    this.alertType.set('warning');
    this.isConfirmAlert.set(true);
    this.showAlert.set(true);
  }

  handleConfirm(): void {
    const productId = this.currentProductId();
    const suiteId = this.pendingUnarchiveId();

    if (!suiteId) return;

    this.testSuiteService
      .setArchiveStatus(productId, suiteId, false)
      .subscribe(() => {
        this.showMessage('Test suite unarchived successfully', 'success');
        this.loadArchivedSuites();
      });

    this.resetConfirm();
  }

  handleCancel(): void {
    this.resetConfirm();
  }

  private resetConfirm(): void {
    this.pendingUnarchiveId.set(null);
    this.isConfirmAlert.set(false);
    this.showAlert.set(false);
  }

  private showMessage(msg: string, type: 'success' | 'error' | 'warning') {
    this.alertMessage.set(msg);
    this.alertType.set(type);
    this.showAlert.set(true);
    setTimeout(() => this.showAlert.set(false), 3000);
  }

  goBack(): void {
    this.router.navigate(
      ['/tester/test-suite'],
      { queryParams: { productId: this.currentProductId() } }
    );
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  }
}
