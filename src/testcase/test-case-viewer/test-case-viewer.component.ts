import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TestCaseService } from '../../app/shared/services/test-case.service';
import { TestCaseDetailResponse } from '../../app/shared/modles/test-case.model';
import { ModuleService } from '../../app/shared/services/module.service';
import { ProductService } from '../../app/shared/services/product.service';
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
  private moduleService = inject(ModuleService);
   private snackBar = inject(MatSnackBar);
  private productService = inject(ProductService);
 
   testCase = signal<TestCaseDetailResponse | null>(null);
   isLoading = signal(true);
   error = signal<string | null>(null);
  moduleName: string = '';
  moduleId: string = '';
  productId: string = '';
  productName: string = '';
  testCaseId: string = '';
  testSuiteNames: string = '';
 
   ngOnInit(): void {
     this.loadTestCase();
   }
 
   private loadTestCase(): void {
     const dbTestCaseId = this.route.snapshot.paramMap.get('testCaseId'); // This is now the actual DB id
     const moduleId = this.route.snapshot.paramMap.get('moduleId');
     const productId = this.route.snapshot.queryParamMap.get('productId');
     const testSuiteId = this.route.snapshot.queryParamMap.get('testSuiteId');

     this.productId = productId || '';
     this.moduleId = moduleId || '';
     this.testCaseId = dbTestCaseId || '';

     if (!dbTestCaseId || !moduleId) {
       this.error.set('Invalid test case or module ID');
       this.isLoading.set(false);
       return;
     }

     this.isLoading.set(true);
     this.error.set(null);

     this.testCaseService.getTestCaseDetail(moduleId, dbTestCaseId).subscribe({
       next: (testCase) => {
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
         // Fetch module name using productId and moduleId if productId is present
         if (productId) {
           this.moduleService.getModuleById(productId, moduleId).subscribe({
             next: (module) => {
               this.moduleName = module.name || '';
             },
             error: () => {
               this.moduleName = '';
             }
           });
          // Fetch product name
          this.productService.getProductById(productId).subscribe({
            next: (product) => {
              this.productName = product.name || '';
            },
            error: () => {
              this.productName = '';
            }
          });
         } else {
           this.moduleName = '';
          this.productName = '';
         }
         if (testSuiteId) {
           this.testSuiteNames = testSuiteId;
         } else if (testCase.testSuiteIds && Array.isArray(testCase.testSuiteIds)) {
           this.testSuiteNames = (testCase as any).testSuiteNames || testCase.testSuiteIds.join(', ');
         } else {
           this.testSuiteNames = '';
         }
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
 
   copyTestCaseLink(): void {
     const tc = this.testCase();
     if (!tc) { return; }
     let url = '';
     if (tc.moduleId && tc.id) {
       url = `${window.location.origin}/tester/public-view/${tc.moduleId}/${tc.id}`;
     } else {
       url = `${window.location.origin}/tester/view-testcase/${tc.id || tc.testCaseId}`;
     }
     navigator.clipboard.writeText(url)
       .then(() => {
         this.snackBar.open('Link copied to clipboard!', 'Close', { duration: 2000 });
       })
       .catch(err => {
         console.error('Failed to copy: ', err);
         this.snackBar.open('Failed to copy link', 'Close', { duration: 2000 });
       });
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
 
  goToLogin() {
    this.router.navigate(['/login']);
  }
}