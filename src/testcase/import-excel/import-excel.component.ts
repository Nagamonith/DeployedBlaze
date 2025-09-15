// ...existing code...
// import-excel.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { TestCaseService } from '../../app/shared/services/test-case.service';
import { ModuleService } from '../../app/shared/services/module.service';
import { ProductService } from '../../app/shared/services/product.service';
import { CreateTestCaseRequest, TestCaseAttributeRequest, ManualTestCaseStep, TestCaseDetailResponse } from '../../app/shared/modles/test-case.model';
import { ProductModule } from '../../app/shared/modles/module.model';
import { IdResponse } from '../../app/shared/modles/product.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-import-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent {
  // Helper to get a value from a row by field name, case-insensitive
  getRowValue(row: any, field: string): string {
    if (!row || !field) return '';
    // Try direct
    if (row[field] !== undefined && row[field] !== null) return row[field].toString();
    // Try case-insensitive
    const key = Object.keys(row).find(k => k.toLowerCase() === field.toLowerCase());
    if (key && row[key] !== undefined && row[key] !== null) return row[key].toString();
    return '';
  }
  cancelFile(fileInput: HTMLInputElement) {
    // Only clear file input and state if user clicks Remove, not on navigation
    fileInput.value = '';
    this.fileName.set('');
    this.sheetNames.set([]);
    this.sheetData.set(null);
    this.errorMessage.set('');
    this.isLoading.set(false);
    // Do NOT clear sessionStorage here, so navigation state is preserved
  }
  fileName = signal<string>('');
  sheetNames = signal<string[]>([]);
  sheetData = signal<Record<string, any[]> | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  currentProduct = signal<{ id: string, name: string } | null>(null);
  modules = signal<ProductModule[]>([]);
  selectedModule = signal<string>('');
  version = signal<string>('1.0'); // Default version

  private router = inject(Router);
  private testCaseService = inject(TestCaseService);
  private moduleService = inject(ModuleService);
  private productService = inject(ProductService);
  snackBar: any;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { productId: string, productName: string };

    let productId = '';
    let productName = '';
    if (state && state.productId) {
      productId = state.productId;
      productName = state.productName || '';
      sessionStorage.setItem('importExcelProductId', productId);
      sessionStorage.setItem('importExcelProductName', productName);
    } else {
      productId = sessionStorage.getItem('importExcelProductId') || '';
      productName = sessionStorage.getItem('importExcelProductName') || '';
    }

    if (productId) {
      this.currentProduct.set({ id: productId, name: productName });
      this.loadModules(productId);
    }
  }

  private loadModules(productId: string) {
    this.moduleService.getModulesByProduct(productId).subscribe({
      next: (modules) => this.modules.set(modules),
      error: (err) => this.errorMessage.set('Failed to load modules')
    });
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.fileName.set(file.name);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const binary = e.target.result;
        const workbook = XLSX.read(binary, { type: 'binary' });

        const allSheets: Record<string, any[]> = {};
        workbook.SheetNames.forEach((sheet) => {
          const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: '' });
          allSheets[sheet] = rows;
        });

        this.sheetNames.set(workbook.SheetNames);
        this.sheetData.set(allSheets);
      } catch (error) {
        this.errorMessage.set('Error processing Excel file. Please try again.');
        console.error('Error processing Excel:', error);
      } finally {
        this.isLoading.set(false);
      }
    };

    reader.onerror = () => {
      this.errorMessage.set('Error reading file. Please try again.');
      this.isLoading.set(false);
    };

    reader.readAsBinaryString(file);
  }

  onSelectSheet(sheetName: string) {
    let product = this.currentProduct();
    const data = this.sheetData();

    // Always try to restore product if missing
    if (!product) {
      const productId = sessionStorage.getItem('importExcelProductId') || '';
      const productName = sessionStorage.getItem('importExcelProductName') || '';
      if (productId) {
        product = { id: productId, name: productName };
        this.currentProduct.set(product);
      }
    }

    if (!product) {
      this.errorMessage.set('No product selected. Please select a product first.');
      return;
    }

    if (!data || !data[sheetName]) {
      this.errorMessage.set('Selected sheet has no data or sheet not found');
      return;
    }

    const firstRow = data[sheetName][0];
    const navigationData = {
      sheetColumns: Object.keys(firstRow),
      sheetData: data[sheetName],
      productId: product.id,
      productName: product.name,
      moduleId: this.selectedModule(),
      version: this.version()
    };

    // Always persist product info for mapping page
    sessionStorage.setItem('sheetMatchingProductId', product.id);
    sessionStorage.setItem('sheetMatchingProductName', product.name);

    // Do NOT clear file input or state here; just navigate
    this.router.navigate(['/tester/mapping', encodeURIComponent(sheetName)], {
      state: navigationData
    }).catch(error => {
      console.error('Navigation error:', error);
      this.errorMessage.set('Failed to navigate. Please try again.');
    });
  }
async saveData() {
  if (!this.sheetData()) {
    this.errorMessage.set('No data to save');
    return;
  }

  if (!this.selectedModule()) {
    this.errorMessage.set('Please select a module first');
    return;
  }

  this.isLoading.set(true);
  this.errorMessage.set('');

  try {
    const moduleId = this.selectedModule();
    const versionDisplayString = this.version(); // This should be the display version like "V1.4"
    const data = this.sheetData();

    if (!data) return;

    // First get the product version ID for the display version
    const product = this.currentProduct();
    if (!product || !product.id) {
      throw new Error('No product selected');
    }

    const productVersions = await firstValueFrom(
      this.testCaseService.getProductVersions(product.id)
    );
    const productVersion = productVersions.find(v => v.version === versionDisplayString);
    if (!productVersion) {
      throw new Error(`Version "${versionDisplayString}" not found`);
    }

    // Process each sheet
    for (const sheetName of Object.keys(data)) {
      const rows = data[sheetName];
      
      // Process each row in the sheet
      for (const row of rows) {
        // First create the test case
        const testCaseRequest: CreateTestCaseRequest = {
          moduleId: moduleId,
          productVersionId: productVersion.id, // Use the GUID here
          testCaseId: row['TestCaseID'] || row['testCaseId'] || this.generateTestCaseId(),
          useCase: this.getRowValue(row, 'useCase') || '',
          scenario: row['Scenario'] || '',
          testType: row['TestType'] || 'Manual',
          testTool: row['TestTool'] || '',
          steps: this.parseSteps(row),
          result: this.getRowValue(row, 'result'),
          actual: this.getRowValue(row, 'actual'),
          remarks: this.getRowValue(row, 'remarks')
        };

        const createdTestCase = await firstValueFrom(
          this.testCaseService.createTestCase(moduleId, testCaseRequest)
        );
        
        // Then add attributes if they exist
        const attributes = this.parseAttributes(row);
        if (attributes.length > 0) {
          await firstValueFrom(
            this.testCaseService.updateTestCaseAttributes(
              moduleId,
              createdTestCase.id,
              attributes
            )
          );
        }
      }
    }

    this.snackBar.open('Test cases imported successfully!', 'Close', { duration: 5000 });
  } catch (error) {
    console.error('Error saving data:', error);
    this.errorMessage.set(error instanceof Error ? error.message : 'Failed to save test cases');
  } finally {
    this.isLoading.set(false);
  }
}

  private async createTestCase(request: CreateTestCaseRequest): Promise<TestCaseDetailResponse> {
  try {
    // First create the test case and get the ID
    const { firstValueFrom } = await import('rxjs');
    const idResponse = await firstValueFrom(this.testCaseService.createTestCaseAndSteps(request.moduleId, request));
    
    if (!idResponse) {
      throw new Error('Failed to create test case');
    }

    // Then fetch the full details using the ID
    const testCaseDetail = await firstValueFrom(this.testCaseService.getTestCaseById(request.moduleId, idResponse.id));
    
    if (!testCaseDetail) {
      throw new Error('Failed to fetch created test case');
    }

    return testCaseDetail;
  } catch (error) {
    console.error('Error creating test case:', error);
    throw error;
  }
}
private addAttributes(moduleId: string, testCaseId: string, attributes: TestCaseAttributeRequest[]): Promise<void[]> {
  return Promise.all(
    attributes.map(attr => 
      new Promise<void>((resolve, reject) => {
        this.testCaseService.addTestCaseAttribute(moduleId, testCaseId, attr).subscribe({
          next: () => resolve(),
          error: (err) => reject(err)
        });
      })
    )
  );
}

  private generateTestCaseId(): string {
    return 'TC-' + Math.random().toString(36).substring(2, 9);
  }

  private parseSteps(row: any): ManualTestCaseStep[] {
    if (!row['Steps']) return [];
    
    try {
      return JSON.parse(row['Steps']);
    } catch {
      // If not JSON, try to parse as string
      return [{
        testCaseId: '',
        steps: row['Steps'] || '',
        expectedResult: row['ExpectedResult'] || ''
      }];
    }
  }

  private parseAttributes(row: any): TestCaseAttributeRequest[] {
    const attributes: TestCaseAttributeRequest[] = [];
    
    // Add all non-standard fields as attributes
    const standardFields = ['TestCaseID', 'UseCase', 'Scenario', 'TestType', 'TestTool', 'Steps', 'ExpectedResult'];
    
    for (const key in row) {
      if (!standardFields.includes(key) && row[key]) {
        attributes.push({
          key: key,
          value: row[key].toString()
        });
      }
    }
    
    return attributes;
  }



  onCancelSheet(sheetName: string) {
    const updated = this.sheetNames().filter((name) => name !== sheetName);
    this.sheetNames.set(updated);

    const updatedData = { ...this.sheetData() };
    delete updatedData[sheetName];
    this.sheetData.set(Object.keys(updatedData).length ? updatedData : null);
  }
}