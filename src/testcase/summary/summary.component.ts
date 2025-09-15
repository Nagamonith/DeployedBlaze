import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TestCaseService } from '../../app/shared/services/test-case.service';
import { ProductService } from '../../app/shared/services/product.service';
import { combineLatest, map } from 'rxjs';
import { ProductModule } from '../../app/shared/modles/module.model';
import { Product } from '../../app/shared/modles/product.model';
import { VersionOption } from '../../app/shared/modles/product.model';

interface SummaryData {
  modules: ProductModule[];
  versions: string[];
  testMatrix: Record<string, Record<string, number>>; // Changed to nested record
  versionTotals: Record<string, number>;
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  private testCaseService = inject(TestCaseService);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private router = inject(Router);

  selectedProductId = signal<string>('');

  // Data signals
  summaryData = signal<SummaryData | null>(null);
  currentProduct = signal<Product | null>(null);

  // Computed properties for template
  modules = computed(() => this.summaryData()?.modules || []);
  versions = computed(() => this.summaryData()?.versions || []);
  testMatrix = computed(() => this.summaryData()?.testMatrix || {});
  versionTotals = computed(() => this.summaryData()?.versionTotals || {});

  constructor() {
    // Watch for productId changes
    effect(() => {
      const productId = this.selectedProductId();
      if (productId) {
        this.loadData(productId);
        this.loadProduct(productId);
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['productId']) {
        this.selectedProductId.set(params['productId']);
      }
    });
  }

  private loadData(productId: string): void {
    combineLatest([
      this.testCaseService.getModulesByProduct(productId),
      this.testCaseService.getTestCasesByProduct(productId),
      this.testCaseService.getVersionOptions(productId)
    ]).pipe(
      map(([modules, testCases, versionOptions]) => {
        if (!modules || !testCases) return null;

        const options = (versionOptions || []) as VersionOption[];
        const versionIdToName = new Map<string, string>();
        options.forEach(opt => { if (opt?.id && opt?.version) versionIdToName.set(opt.id, opt.version); });

        // Build the full version list from options and any versions present on test cases
        const versionSet = new Set<string>();
        options.forEach(opt => { if (opt.version) versionSet.add(opt.version); });
        testCases.forEach(tc => {
          const ver = (tc as any).version || (tc as any).productVersionName || (tc as any).productVersionId && versionIdToName.get((tc as any).productVersionId);
          if (ver) versionSet.add(ver);
        });
        const versions = Array.from(versionSet).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

        // Initialize test matrix and version totals
        const testMatrix: Record<string, Record<string, number>> = {};
        const versionTotals: Record<string, number> = {};

        versions.forEach(ver => {
          versionTotals[ver] = 0;
        });

        modules.forEach(mod => {
          if (!testMatrix[mod.id]) testMatrix[mod.id] = {};
          versions.forEach(ver => { testMatrix[mod.id][ver] = 0; });
        });

        // Count test cases per module per version (normalize version)
        testCases.forEach(tc => {
          const moduleId = (tc as any).moduleId;
          const normalizedVersion = (tc as any).version || (tc as any).productVersionName || ((tc as any).productVersionId && versionIdToName.get((tc as any).productVersionId));
          if (moduleId && normalizedVersion) {
            if (!testMatrix[moduleId]) testMatrix[moduleId] = {};
            if (typeof testMatrix[moduleId][normalizedVersion] !== 'number') testMatrix[moduleId][normalizedVersion] = 0;
            testMatrix[moduleId][normalizedVersion]++;
            versionTotals[normalizedVersion] = (versionTotals[normalizedVersion] || 0) + 1;
          }
        });

        return {
          modules,
          versions,
          testMatrix,
          versionTotals
        };
      })
    ).subscribe({
      next: (data) => this.summaryData.set(data),
      error: (err) => console.error('Error loading summary data:', err)
    });
  }

  private loadProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => this.currentProduct.set(product),
      error: (err) => console.error('Error loading product:', err)
    });
  }

  // Template helper methods
  getCount(modId: string, ver: string): number {
    return this.testMatrix()[modId]?.[ver] || 0;
  }

  getVersionTotal(ver: string): number {
    return this.versionTotals()[ver] || 0;
  }

  getProductName(): string {
    return this.currentProduct()?.name || 'Selected Product';
  }

  navigateToModule(moduleId: string): void {
    this.router.navigate(['/tester/modules', moduleId], {
      queryParams: { 
        productId: this.selectedProductId(),
        loadAllVersions: true 
      }
    });
  }
}