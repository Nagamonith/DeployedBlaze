import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
// Update the import path below if the actual location is different
import { TestCaseService } from '../../app/shared/services/test-case.service';
// Update the import path below if the actual location is different
import { ModuleService } from '../../app/shared/services/module.service';
import { ProductModule } from '../../app/shared/modles/module.model';
import { ProductVersionRequest, IdResponse } from '../../app/shared/modles/product.model';
import { catchError, of } from 'rxjs';
import { ManualTestCaseStep, TestCaseAttribute, TestCaseDetailResponse } from '../../app/shared/modles/test-case.model';
// TODO: Update the path below to the correct location of leftnavigationbar-icon.enum.ts
// import { LeftnavIcon } from 'src/app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';
import { LeftnavIcon } from '../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';

@Component({
  selector: 'app-add-testcases',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-testcases.component.html',
  styleUrls: ['./add-testcases.component.css']
})
export class AddTestcasesComponent implements OnInit {
  private testCaseService = inject(TestCaseService);
  private moduleService = inject(ModuleService);
  private route = inject(ActivatedRoute);
  public icons = LeftnavIcon;

  selectedModule = signal<string | null>(null);
  selectedVersion = signal<string | null>(null);
  showAddModuleForm = false;
  showAddVersionForm = false;
  newModuleName = '';
  newVersionName = 'v1.0';
  productId = signal<string | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  modules = signal<ProductModule[]>([]);
  versions = signal<string[]>([]);

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.productId.set(params.get('productId'));
      this.loadModules();
    });
  }

  loadModules() {
    const productId = this.productId();
    if (productId) {
      this.isLoading.set(true);
      this.moduleService.getModulesByProduct(productId).pipe(
        catchError(err => {
          this.errorMessage.set('Failed to load modules');
          console.error(err);
          return of([]);
        })
      ).subscribe(modules => {
        this.modules.set(modules);
        this.isLoading.set(false);
      });
    }
  }

  onModuleChange(moduleId: string): void {
    this.selectedModule.set(moduleId);
    this.selectedVersion.set(null);
    this.loadVersionsForModule(moduleId);
    this.resetForms();
  }

loadVersionsForModule(moduleId: string) {
    this.isLoading.set(true);
    this.testCaseService.getTestCasesByModule(moduleId).pipe(
      catchError(err => {
        this.errorMessage.set('Failed to load versions');
        console.error(err);
        return of([]);
      })
    ).subscribe(testCases => {
      // Filter out undefined versions and ensure we only have strings
      const uniqueVersions = [...new Set(
        testCases
          .map(tc => tc.version)
          .filter((version): version is string => version !== undefined)
      )];
      this.versions.set(uniqueVersions);
      this.isLoading.set(false);
    });
  }

  addNewVersion(): void {
    if (!this.newVersionName.trim()) {
      this.errorMessage.set('Version name is required');
      return;
    }

    if (!this.selectedModule()) {
      this.errorMessage.set('Please select a module first');
      return;
    }

    const module = this.modules().find(m => m.id === this.selectedModule());
    if (!module) return;

    this.isLoading.set(true);
    // Create a new module version as API doesn't expose product version add for modules directly
    this.moduleService.createModule(module.productId, {
      productId: module.productId,
      name: this.newModuleName,
      version: this.newVersionName,
      isActive: true
    }).pipe(
      catchError(err => {
        this.errorMessage.set('Failed to add version');
        console.error(err);
        return of({ id: '' } as IdResponse);
      })
    ).subscribe(response => {
      if (response.id) {
        this.selectedVersion.set(this.newVersionName);
        this.loadModules(); // Refresh modules list
        this.loadVersionsForModule(this.selectedModule()!); // Refresh versions list
      }
      this.isLoading.set(false);
      this.resetForms();
    });
  }

exportToExcel(): void {
  if (!this.selectedModule()) {
    this.errorMessage.set('Please select a module first');
    return;
  }

  const module = this.modules().find(m => m.id === this.selectedModule());
  if (!module) return;

  this.isLoading.set(true);
  this.testCaseService.getTestCaseDetailByModule(module.id).pipe(
    catchError(err => {
      this.errorMessage.set('Failed to load test cases');
      console.error(err);
      return of([]);
    })
  ).subscribe((testCases: TestCaseDetailResponse[]) => {
    const wb = XLSX.utils.book_new();

    // Flatten all test cases into a single array, adding Version column
    const formattedData = testCases.map((tc, index) => {
      // Format steps with expected results
      const stepText = tc.steps?.map((step: ManualTestCaseStep, idx: number) =>
        `${idx + 1}. ${step.steps}`
      ).join('\n') || '';

      // Format expected results separately
      const expectedResults = tc.steps?.map((step: ManualTestCaseStep, idx: number) =>
        `${idx + 1}. ${step.expectedResult}`
      ).join('\n') || '';

      const attributes = tc.attributes?.reduce((acc: Record<string, string>, attr: TestCaseAttribute) => {
        acc[attr.key] = attr.value;
        return acc;
      }, {}) || {};

      return {
        'S.No': index + 1, // Serial number
        'Version': tc.productVersionName || 'Unversioned',
        'Test Case ID': tc.testCaseId,
        'Use Case': tc.useCase,
        'Scenario': tc.scenario,
        'Steps': stepText,
        'Expected Results': expectedResults, // New column for expected results
        'Result': tc.result || '',
        'Actual': tc.actual || '',
        'Remarks': tc.remarks || '',
        ...attributes
      };
    });

    if (formattedData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(formattedData);
      // Set column widths for better readability
      const colWidths = [
        { wch: 5 },    // S.No
        { wch: 15 },   // Version
        { wch: 15 },   // Test Case ID
        { wch: 30 },   // Use Case
        { wch: 30 },   // Scenario
        { wch: 50 },   // Steps
        { wch: 50 },   // Expected Results
        { wch: 10 },   // Result
        { wch: 30 },   // Actual
        { wch: 30 }    // Remarks
      ];
      ws['!cols'] = colWidths;
      // Sheet name is module name (max 31 chars, valid chars only)
      const sheetName = module.name.substring(0, 31).replace(/[\\/*\[\]:?]/g, '');
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    }

    XLSX.writeFile(wb, `${module.name.replace(/\s+/g, '_')}_Test_Cases.xlsx`);
    this.isLoading.set(false);
  });
}

  private resetForms(): void {
    this.showAddModuleForm = false;
    this.showAddVersionForm = false;
    this.newModuleName = '';
    this.newVersionName = 'v1.0';
    this.errorMessage.set(null);
  }
}