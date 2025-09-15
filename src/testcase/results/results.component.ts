import { Component, computed, inject, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { TestCaseService } from '../../app/shared/services/test-case.service';
import { TestRunService } from '../../app/shared/services/test-run.service';
import { TestSuiteService } from '../../app/shared/services/test-suite.service';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject, switchMap, combineLatest, firstValueFrom, forkJoin, map, catchError } from 'rxjs';
import { TestCaseDetailResponse } from '../../app/shared/modles/test-case.model';
import { LeftnavIcon } from '../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  private testCaseService = inject(TestCaseService);
  private testRunService = inject(TestRunService);
  private testSuiteService = inject(TestSuiteService);
  private route = inject(ActivatedRoute);
  public icons = LeftnavIcon;

  // Private signals for selections and UI state
  private _selectedModule = signal<string>('');
  private _filterStatus = signal<'All' | 'Pass' | 'Fail' | 'Pending'>('All');
  private _selectedTestRunId = signal<string>('');
  suiteTestCasesMap = signal<Map<string, any[]>>(new Map());

  // Public properties to bind in template (two-way friendly)
  get selectedModule(): string { return this._selectedModule(); }
  set selectedModule(value: string) { this._selectedModule.set(value || ''); }

  get filterStatus(): 'All' | 'Pass' | 'Fail' | 'Pending' { return this._filterStatus(); }
  set filterStatus(value: 'All' | 'Pass' | 'Fail' | 'Pending') { this._filterStatus.set(value || 'All'); }

  get selectedTestRunId(): string { return this._selectedTestRunId(); }
  set selectedTestRunId(value: string) { this._selectedTestRunId.set(value || ''); }

  selectedProductId = signal<string>('');
  showTestRunResults = signal(true);
  selectedSuiteId = signal<string>('');
  expandedSuites = signal<Set<string>>(new Set());

  // BehaviorSubjects to trigger API calls
  private productId$ = new BehaviorSubject<string>('');
  private moduleId$ = new BehaviorSubject<string>('');

  // Data streams
  modules$ = this.productId$.pipe(
    switchMap(productId => productId ? this.testCaseService.getModulesByProduct(productId) : of([]))
  );

  testCases$ = this.moduleId$.pipe(
    switchMap(moduleId => moduleId 
      ? this.testCaseService.getTestCasesByModule(moduleId).pipe(
          switchMap(list => list && list.length
            ? forkJoin(list.map(tc => this.testCaseService.getTestCaseDetail(moduleId, tc.id)))
            : of([])
          )
        )
      : of([])
    )
  );

  testRuns$ = this.productId$.pipe(
    switchMap(productId => productId ? this.testRunService.getTestRuns(productId) : of([]))
  );

  // Signals holding the latest fetched data
  modules = signal<any[]>([]);
  testCases = signal<any[]>([]);
  testRuns = signal<any[]>([]);

  // Computed filtered test cases based on filterStatus
  filteredTestCases = computed(() => {
    const status = this._filterStatus();
    return this.testCases().filter(tc =>
      status === 'All' ? true : tc.result === status
    );
  });

  // Stats based on testCases signal
  stats = computed(() => {
    const cases = this.testCases();
    return {
      total: cases.length,
      pass: cases.filter(tc => tc.result === 'Pass').length,
      fail: cases.filter(tc => tc.result === 'Fail').length,
      pending: cases.filter(tc => !tc.result || tc.result === 'Pending').length
    };
  });

  // Computed test run stats for selected test run
  testRunStats = signal<any | null>(null);

  // Computed test cases of selected suite
  suiteTestCases = signal<any[]>([]);

  constructor() {
    // Sync BehaviorSubjects with signals
    effect(() => {
      this.productId$.next(this.selectedProductId());
    });

    effect(() => {
      this.moduleId$.next(this._selectedModule());
    });

    // Subscribe to observables and update signals
    this.modules$.subscribe(modules => this.modules.set(modules));
    this.testCases$.subscribe(testCases => this.testCases.set(testCases));
    this.testRuns$.subscribe(testRuns => this.testRuns.set(testRuns));

    // Watch for selectedTestRunId changes to update testRunStats
    effect(() => {
      const runId = this._selectedTestRunId();
      const productId = this.selectedProductId();
      if (!runId || !productId) {
        this.testRunStats.set(null);
        this.suiteTestCases.set([]);
        return;
      }
      // Load detailed test run stats asynchronously
      this.loadTestRunStats(productId, runId);
    });

    // Watch selectedSuiteId to load suite test cases
    effect(() => {
      const suiteId = this.selectedSuiteId();
      if (!suiteId) {
        this.suiteTestCases.set([]);
        return;
      }
      this.loadSuiteTestCases(suiteId);
    });

    // Set selectedProductId from query params on initialization
    this.route.queryParams.subscribe(params => {
      if (params['productId']) {
        this.selectedProductId.set(params['productId']);
      }
    });
  }

  ngOnInit() {}

  private async loadTestRunStats(productId: string, runId: string) {
    try {
      const testRun = await firstValueFrom(this.testRunService.getTestRunById(productId, runId));
      if (!testRun) {
        this.testRunStats.set(null);
        return;
      }

      let totalCases = 0;
      let passedCases = 0;
      let failedCases = 0;
      let pendingCases = 0;

      const suiteStatsPromises = (testRun.testSuites || []).map(async (suite: any) => {
        const suiteResponse = await firstValueFrom(
          this.testSuiteService.getTestSuiteWithCases(suite.id).pipe(
            catchError(() => of({ testCases: [] }))
          )
        );

        const suiteCases = suiteResponse.testCases || [];
        const testCaseDetails = suiteCases.map(tcItem => ({
          ...tcItem.testCase,
          result: tcItem.executionDetails?.result || tcItem.testCase.result
        }));

        const suiteTotal = testCaseDetails.length;
        const suitePassed = testCaseDetails.filter(tc => tc.result === 'Pass').length;
        const suiteFailed = testCaseDetails.filter(tc => tc.result === 'Fail').length;
        const suitePending = suiteTotal - suitePassed - suiteFailed;

        totalCases += suiteTotal;
        passedCases += suitePassed;
        failedCases += suiteFailed;
        pendingCases += suitePending;

        return {
          suiteId: suite.id,
          suiteName: suite.name,
          total: suiteTotal,
          passed: suitePassed,
          failed: suiteFailed,
          pending: suitePending,
          completion: suiteTotal > 0 ? Math.round((suitePassed / suiteTotal) * 100) : 0
        };
      });

      const suiteStats = await Promise.all(suiteStatsPromises);

      this.testRunStats.set({
        runName: testRun.name,
        total: totalCases,
        passed: passedCases,
        failed: failedCases,
        pending: pendingCases,
        completion: totalCases > 0 ? Math.round((passedCases / totalCases) * 100) : 0,
        suiteStats: suiteStats,
        metadata: {
          description: testRun.description || '',
          createdBy: testRun.createdBy || '',
          createdAt: testRun.createdAt ? new Date(testRun.createdAt).toLocaleDateString() : '',
          updatedAt: testRun.updatedAt ? new Date(testRun.updatedAt).toLocaleDateString() : '',
          status: testRun.status || ''
        }
      });
    } catch (error) {
      console.error('Error loading test run stats:', error);
      this.testRunStats.set(null);
    }
  }

  // Update the loadSuiteTestCases method
  private async loadSuiteTestCases(suiteId: string): Promise<void> {
    try {
      // Use the same approach as ModulesComponent
      const response = await firstValueFrom(
        this.testSuiteService.getTestSuiteWithCases(suiteId).pipe(
          catchError(() => of({ testCases: [] }))
        )
      );

      console.log('Test Suite Response:', response);

      const items = response.testCases || [];
      if (items.length === 0) {
        this.suiteTestCasesMap.set(new Map([[suiteId, []]]));
        return;
      }

      // Fetch detailed test case information for each test case in the suite
      const detailedTestCases = await forkJoin(
        items.map((tcItem: any) => {
          const testCase = tcItem.testCase || tcItem;
          const executionDetails = tcItem.executionDetails || {};
          
          return this.testCaseService.getTestCaseDetail(testCase.moduleId, testCase.id).pipe(
            map((detail: TestCaseDetailResponse) => {
              // Merge execution details with test case detail (same as ModulesComponent)
              const mergedTestCase = {
                ...detail,
                result: executionDetails.result || detail.result || 'Pending',
                actual: executionDetails.actual || detail.actual || '-',
                remarks: executionDetails.remarks || detail.remarks || '-',
                executionDetails: executionDetails
              };
              
              return this.convertToResultsFormat(mergedTestCase);
            }),
            catchError((error) => {
              console.error(`Error fetching detail for test case ${testCase.id}:`, error);
              // Fallback: use basic test case info if detailed fetch fails
              const fallbackTestCase = {
                ...testCase,
                result: executionDetails.result || testCase.result || 'Pending',
                actual: executionDetails.actual || testCase.actual || '-',
                remarks: executionDetails.remarks || testCase.remarks || '-',
                executionDetails: executionDetails,
                steps: testCase.steps || [] // Try to use whatever steps we have
              };
              return of(this.convertToResultsFormat(fallbackTestCase));
            })
          );
        })
      ).toPromise();

      // Update the map with this suite's test cases
      const currentMap = new Map(this.suiteTestCasesMap());
      currentMap.set(suiteId, detailedTestCases || []);
      this.suiteTestCasesMap.set(currentMap);
      
    } catch (error) {
      console.error('Error loading suite test cases:', error);
      const currentMap = new Map(this.suiteTestCasesMap());
      currentMap.set(suiteId, []);
      this.suiteTestCasesMap.set(currentMap);
    }
  }

  private convertToResultsFormat(testCase: any): any {
    // Ensure steps are properly formatted
    let steps: any[] = [];
    
    if (testCase.steps && Array.isArray(testCase.steps)) {
      if (testCase.steps.length > 0 && typeof testCase.steps[0] === 'object') {
        // Already in object format: {steps: string, expectedResult: string}
        steps = testCase.steps.map((step: any, index: number) => ({
          id: index + 1,
          steps: step.steps || step.step || '',
          expectedResult: step.expectedResult || step.expected || ''
        }));
      } else if (typeof testCase.steps[0] === 'string') {
        // Convert string array to step objects
        steps = testCase.steps.map((step: string, index: number) => ({
          id: index + 1,
          steps: step,
          expectedResult: Array.isArray(testCase.expected) ? testCase.expected[index] || '' : ''
        }));
      }
    }

    return {
      ...testCase,
      slNo: 0, // This will be set by the template using index
      steps: steps,
      // Ensure these fields have fallback values
      actual: testCase.actual || '-',
      result: testCase.result || 'Pending',
      remarks: testCase.remarks || '-'
    };
  }

  getTestCasesForSuite(suiteId: string): any[] {
    return this.suiteTestCasesMap().get(suiteId) || [];
  }

  async getModuleName(moduleId: string): Promise<string> {
    const modules = this.modules();
    return modules.find(m => m.id === moduleId)?.name || 'Unknown Module';
  }

  async getSelectedSuiteName(): Promise<string> {
    const stats = this.testRunStats();
    if (!stats) return '';
      const suite = stats.suiteStats.find((s: any) => s.suiteId === this.selectedSuiteId());
    return suite ? suite.suiteName : '';
  }

  async toggleSuiteExpansion(suiteId: string): Promise<void> {
    const expanded = new Set(this.expandedSuites());
    
    if (expanded.has(suiteId)) {
      expanded.delete(suiteId);
    } else {
      expanded.add(suiteId);
      // Load test cases for this specific suite
      await this.loadSuiteTestCases(suiteId);
    }
    
    this.expandedSuites.set(expanded);
  }

  isSuiteExpanded(suiteId: string): boolean {
    return this.expandedSuites().has(suiteId);
  }

  copyTestCaseLink(testCaseId: string): void {
    const baseUrl = window.location.origin;
    const copyUrl = `${baseUrl}/tester/view-testcase/${testCaseId}`;

    navigator.clipboard.writeText(copyUrl).then(() => {
      alert('Test case link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  async exportResults(): Promise<void> {
    const modules = this.modules();
    const module = modules.find(m => m.id === this._selectedModule());
    if (!module) return;

    // Use the detailed test cases that we already have loaded
    const testCases = this.filteredTestCases();

    const data = testCases.map((tc, index) => {
      // Extract steps and expected results properly
      const steps = tc.steps || [];
      const stepTexts = steps.map((s: any) => s.steps || '').join('\n');
      const expectedTexts = steps.map((s: any) => s.expectedResult || '').join('\n');
      
      return {
        'Sl.No': index + 1,
        'Test Case ID': tc.testCaseId,
        'Use Case': tc.useCase,
        'Scenario': tc.scenario,
        'Steps': stepTexts,
        'Expected': expectedTexts,
        'Result': tc.result || '',
        'Actual': tc.actual || '',
        'Remarks': tc.remarks || '',
        ...(tc.attributes?.reduce((acc: Record<string, string>, attr: any) => {
          acc[attr.key] = attr.value;
          return acc;
        }, {} as Record<string, string>) || {})
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Test Results');
    XLSX.writeFile(wb, `${module.name}_Test_Results.xlsx`);
  }

  async exportAllTestSuites(): Promise<void> {
    const stats = this.testRunStats();
    if (!stats) return;

    const wb = XLSX.utils.book_new();

    // Summary sheet
    const summaryData = [
      ['Test Run Name', stats.runName],
      ['Description', stats.metadata.description],
      ['Created By', stats.metadata.createdBy],
      ['Created At', stats.metadata.createdAt],
      ['Updated At', stats.metadata.updatedAt],
      ['Status', stats.metadata.status],
      [],
      ['Total Test Cases', stats.total],
      ['Passed', stats.passed],
      ['Failed', stats.failed],
      ['Pending', stats.pending],
      ['Completion %', stats.completion]
    ];

    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

    // Add sheets for each suite
    for (const suite of stats.suiteStats) {
      // Use the already loaded test cases from the suiteTestCasesMap
      const suiteTestCases = this.suiteTestCasesMap().get(suite.suiteId) || [];
      
      if (suiteTestCases.length === 0) {
        // If we don't have the test cases loaded, fetch them
        await this.loadSuiteTestCases(suite.suiteId);
        const updatedTestCases = this.suiteTestCasesMap().get(suite.suiteId) || [];
        if (updatedTestCases.length === 0) continue;
      }

      const suiteData = suiteTestCases.map((testCase: any, index: number) => {
        // Extract steps and expected results properly
        const steps = testCase.steps || [];
        const stepTexts = steps.map((s: any) => s.steps || '').join('\n');
        const expectedTexts = steps.map((s: any) => s.expectedResult || '').join('\n');
        
        return {
          'Sl.No': index + 1,
          'Test Case ID': testCase.testCaseId || '',
          'Use Case': testCase.useCase || '',
          'Scenario': testCase.scenario || '',
          'Steps': stepTexts,
          'Expected': expectedTexts,
          'Result': testCase.result || 'Pending',
          'Actual': testCase.actual || '',
          'Remarks': testCase.remarks || ''
        };
      });

      const suiteWs = XLSX.utils.json_to_sheet(suiteData);
      XLSX.utils.book_append_sheet(wb, suiteWs, suite.suiteName.substring(0, 31));
    }

    XLSX.writeFile(wb, `${stats.runName}_All_Test_Suites.xlsx`);
  }

  async exportSingleSuite(suiteId: string): Promise<void> {
    const stats = this.testRunStats();
    if (!stats) return;

    const suite = stats.suiteStats.find((s: any) => s.suiteId === suiteId);
    if (!suite) return;

    // Use the already loaded test cases from the suiteTestCasesMap
    let suiteTestCases = this.suiteTestCasesMap().get(suiteId) || [];
    
    if (suiteTestCases.length === 0) {
      // If we don't have the test cases loaded, fetch them
      await this.loadSuiteTestCases(suiteId);
      suiteTestCases = this.suiteTestCasesMap().get(suiteId) || [];
    }

    if (suiteTestCases.length === 0) {
      alert('No test cases found in this suite');
      return;
    }

    const data = suiteTestCases.map((testCase: any, index: number) => {
      // Extract steps and expected results properly
      const steps = testCase.steps || [];
      const stepTexts = steps.map((s: any) => s.steps || '').join('\n');
      const expectedTexts = steps.map((s: any) => s.expectedResult || '').join('\n');
      
      return {
        'Sl.No': index + 1,
        'Test Case ID': testCase.testCaseId || '',
        'Use Case': testCase.useCase || '',
        'Scenario': testCase.scenario || '',
        'Steps': stepTexts,
        'Expected': expectedTexts,
        'Result': testCase.result || 'Pending',
        'Actual': testCase.actual || '',
        'Remarks': testCase.remarks || ''
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, suite.suiteName.substring(0, 31));
    XLSX.writeFile(wb, `${suite.suiteName}_Test_Cases.xlsx`);
  }
}