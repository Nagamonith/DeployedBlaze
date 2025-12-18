import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
  inject,
  signal,
  computed,
  WritableSignal,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { TestCaseService } from '../../app/shared/services/test-case.service';
import { AlertComponent } from "../../app/shared/alert/alert.component";
import { TestSuiteService } from '../../app/shared/services/test-suite.service';
import { TestRunService } from '../../app/shared/services/test-run.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductModule } from '../../app/shared/modles/module.model';
import { ModuleService } from '../../app/shared/services/module.service';
import { ProductService } from '../../app/shared/services/product.service';
import { TestCase, TestCaseDetailResponse, TestCaseResponse, UpdateTestCaseRequest, TestCaseAttributeResponse, TestCaseResult } from '../../app/shared/modles/test-case.model';
import { TestSuite, TestSuiteResponse, TestSuiteWithCasesResponse } from '../../app/shared/modles/test-suite.model';
import { TestRun, TestRunResponse, TestRunStatus } from '../../app/shared/modles/test-run.model';
import { IdResponse } from '../../app/shared/modles/product.model';
import { catchError, forkJoin, map, of, switchMap, tap, finalize } from 'rxjs';
import { AutoSaveService } from '../../app/shared/services/auto-save.service';

interface Filter {
  slNo: string;
  testCaseId: string;
  useCase: string;
  result: string;
  attributeKey?: string;
  attributeValue?: string;
}

type TestCaseField = keyof Omit<TestCase, 'attributes'> | `attr_${string}`;

interface TableColumn {
  field: TestCaseField | 'attributes' | string;
  header: string;
  width: number;
  noResize?: boolean;
  isAttribute?: boolean;
}

interface UploadedFile {
  id: string;
  fileType: string;
  fileName: string;
  loaded: boolean;
}

interface TestRunProgress {
  total: number;
  completed: number;
}

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, AlertComponent],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private testCaseService = inject(TestCaseService);
  private testSuiteService = inject(TestSuiteService);
  private testRunService = inject(TestRunService);
  private moduleService = inject(ModuleService);
  private productService = inject(ProductService);
  private cdRef = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);
  private autoSaveService = inject(AutoSaveService);

  // State signals
  selectedModule = signal<string | null>(null);
  selectedVersion = '';
  availableVersions: string[] = [];
  versionTestCases = signal<TestCase[]>([]);
  showViewTestCases = false;
  showStartTesting = false;
  showTestSuites = false;
  showTestRuns = false;
  availableAttributes: string[] = [];
  attributeColumns: TableColumn[] = [];
  testRunProgress: WritableSignal<TestRunProgress> = signal({ total: 0, completed: 0 });
  isLoading = signal(false);

  // Data signals
  modules = signal<ProductModule[]>([]);
  testSuites = signal<TestSuite[]>([]);
  testCasePool = signal<TestCase[]>([]);
 testRuns = signal<TestRunResponse[]>([]);

  formArray = new FormArray<FormGroup>([]);
  uploads: UploadedFile[][] = [];
  selectedTestRunId = signal<string | null>(null);
  viewingSuiteId = signal<string | null>(null);


  // Suite selection
  selectedSuiteIds: string[] = [];
  allSuitesSelected = false;
  

  // Computed properties
  selectedTestSuite = computed(() => {
    if (!this.selectedModule() || !this.showTestSuites) return null;
    return this.testSuites().find(s => s.id === this.selectedModule());
  });

  selectedTestRun = computed(() => {
    if (!this.selectedTestRunId()) return null;
    return this.testRuns().find(r => r.id === this.selectedTestRunId());
  });

  filteredModules = computed(() => {
    const pid = this.selectedProductId();
    const allModules = this.modules();
    
    if (!pid) return allModules;
    return allModules.filter(m => m.productId === pid);
  });

  filter: Filter = {
    slNo: '',
    testCaseId: '',
    useCase: '',
    result: '',
  };

  popupIndex: number | null = null;
  popupField: 'actual' | 'remarks' | null = null;
  isPopupOpen: boolean = false;

  isResizing = false;
  currentResizeColumn: TableColumn | null = null;
  startX = 0;
  startWidth = 0;

  scrollContainer: HTMLElement | null = null;
  canScrollLeft = false;
  canScrollRight = false;

  // Alert properties
  alertMessage = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'success';
  showAlert = false;
  alertDuration = 3000;
  private alertTimeout: any;

  // Save success popup properties
  showSaveSuccessAlert = false;
  saveSuccessMessage = '';
  private saveAlertTimeout: any;

  private boundHandleClick = this.handleDocumentClick.bind(this);
  private boundOnResize = this.onResize.bind(this);
  private boundStopResize = this.stopResize.bind(this);
  private productId = signal<string | null>(null);
  selectedProductId = signal<string | null>(null);

  // Fixed column definitions with proper field mappings
  viewColumns: TableColumn[] = [
    { field: 'slNo', header: 'Sl No', width: 40, noResize: true },
    { field: 'version', header: 'Version', width: 70 },
    { field: 'useCase', header: 'Use Case', width: 100 },
    { field: 'testCaseId', header: 'Test Case ID', width: 80 },
    { field: 'scenario', header: 'Scenario', width: 200 },
    { field: 'steps', header: 'Steps', width: 200 },
    { field: 'expected', header: 'Expected', width: 200 }
  ];

  testColumns: TableColumn[] = [
    { field: 'slNo', header: 'Sl No', width: 40, noResize: true },
    { field: 'version', header: 'Version', width: 70 },
    { field: 'useCase', header: 'Use Case', width: 100 },
    { field: 'testCaseId', header: 'Test Case ID', width: 80 },
    { field: 'scenario', header: 'Scenario', width: 200 },
    { field: 'steps', header: 'Steps', width: 200 },
    { field: 'expected', header: 'Expected', width: 200 }
  ];

  ngOnInit(): void {
  // Select Test Suites by default when page loads
  this.showTestSuites = true;
  this.showTestRuns = false;
  this.initializeData();
    
    this.route.queryParamMap.subscribe(queryParams => {
      const productId = queryParams.get('productId');
      console.log('Product ID from query params:', productId);
      this.selectedProductId.set(productId);
      
      // Reload data when product ID changes
      if (productId) {
        this.loadAllData();
      }
      
      const shouldLoadAll = queryParams.get('loadAllVersions') === 'true';
      if (shouldLoadAll && this.selectedModule() && !this.showTestSuites) {
        this.selectedVersion = 'all';
        this.onVersionChange();
      }
    });

    this.route.paramMap.subscribe((pm: ParamMap) => {
      const modId = pm.get('moduleId');
      if (modId) {
        // Delay the selection to ensure data is loaded
        setTimeout(() => {
          const fallback = this.filteredModules().length ? this.filteredModules()[0].id : null;
          this.onSelectionChange(modId ?? fallback ?? '');
        }, 100);
      }
    });

    window.addEventListener('resize', this.updateScrollButtons.bind(this));
    // --- Auto Save Setup ---
    this.autoSaveService.setInterval(3000); // Default 3s, can be changed by user
    this.autoSaveService.start(() => this.autoSaveExecution(), false, true);
  }
  private autoSaveExecution(): void {
  // Only auto-save if in test execution mode and form is initialized
  if (!this.showStartTesting || !this.isFormInitialized()) return;

  const formValues = this.formArray.value;
  const testCases = this.versionTestCases();

  const updatedTestCases = testCases.map((tc, index) => ({
    ...tc,
    result: formValues[index]?.result || 'Pending',
    actual: (formValues[index]?.actual || '').trim(),
    remarks: (formValues[index]?.remarks || '').trim(),
    uploads: this.uploads[index]?.map(u => u.id) || [],
    testRunId: this.showTestRuns ? this.selectedTestRunId() : undefined
  }));

  const updateRequests = updatedTestCases.map(tc => {
    // When in suite/run context, update execution details against the suite
    if (this.showTestSuites || this.showTestRuns) {
      let suiteId: string | null = null;
      const caseSuiteIds = (tc as any).testSuiteIds as string[] | undefined;
      if (caseSuiteIds && caseSuiteIds.length > 0) {
        suiteId = caseSuiteIds[0];
      } else if (this.showTestSuites && this.selectedModule()) {
        suiteId = this.selectedModule()!;
      } else if (this.showTestRuns) {
        const selectedRun = this.selectedTestRun();
        if (this.selectedSuiteIds.length === 1) {
          suiteId = this.selectedSuiteIds[0];
        } else if (selectedRun?.testSuites?.length === 1) {
          suiteId = selectedRun.testSuites[0].id;
        }
      }
      if (!suiteId) return of(null);

      return this.testSuiteService.updateExecutionDetails(suiteId, tc.id, {
        result: tc.result,
        actual: tc.actual,
        remarks: tc.remarks
      }).pipe(
        catchError(() => of(null))
      );
    }

    // Module-only context updates the test case itself
    const updateData: UpdateTestCaseRequest = {
      useCase: tc.useCase,
      scenario: tc.scenario,
      testType: tc.testType,
      testTool: tc.testTool,
      result: tc.result,
      actual: tc.actual,
      remarks: tc.remarks,
      attributes: tc.attributes
    };

    return this.testCaseService.updateTestCase(tc.moduleId, tc.id, updateData)
      .pipe(
        catchError(() => of(null))
      );
  });

  // Fire all updates in parallel, but don't show UI alerts for auto-save
  forkJoin(updateRequests).subscribe();
}

  private initializeData(): void {
    const productId = this.selectedProductId();
    if (productId) {
      this.loadAllData();
    }
  }
selectSuite(suiteId: string): void {
  // If the same suite is clicked again, deselect it
  if (this.selectedSuiteIds.includes(suiteId)) {
    this.selectedSuiteIds = [];
  } else {
    // Select only this suite
    this.selectedSuiteIds = [suiteId];
  }
  
  // Automatically load the data for the selected suite
  if (this.selectedSuiteIds.length > 0) {
    this.loadSuiteData(suiteId);
  } else {
    this.versionTestCases.set([]);
    this.showViewTestCases = false;
    this.showStartTesting = false;
  }
}
private loadSuiteData(suiteId: string): void {
  this.isLoading.set(true);
  
  this.testSuiteService.getTestSuiteWithCases(suiteId)
    .pipe(
      catchError(() => of(this.getEmptyTestSuiteWithCases(suiteId))),
      switchMap(response => {
        const items = response.testCases || [];
        if (items.length === 0) return of([] as TestCase[]);
        
        return forkJoin(
          items.map(tcItem => 
            this.testCaseService.getTestCaseDetail(tcItem.testCase.moduleId, tcItem.testCase.id).pipe(
              map(detail => {
                const exec = tcItem.executionDetails || {} as any;
                const overlaid: TestCaseDetailResponse = {
                  ...detail,
                  result: exec.result || detail.result,
                  actual: exec.actual || detail.actual,
                  remarks: exec.remarks || detail.remarks,
                  executionDetails: exec,
                  uploads: exec.uploads?.map((u: any) => u.filePath) || 
                          (detail as any).attachments?.map((u: any) => u.filePath) || 
                          detail.uploads || []
                } as any;
                return this.convertTestCaseDetailToTestCase(overlaid);
              }),
              catchError(() => of(null as unknown as TestCase))
            )
          )
        ).pipe(
          map(cases => (cases || []).filter(Boolean) as TestCase[])
        );
      }),
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: cases => {
        this.versionTestCases.set(cases);
        this.ensureStepsForCases();
        this.showViewTestCases = true;
        this.showStartTesting = false;
        this.initializeFormForTestCases();
      },
      error: err => {
        console.error('Failed to load suite data:', err);
        this.showAlertMessage('Failed to load suite data', 'error');
      }
    });
} 
unarchivedTestRuns = computed(() =>
  this.testRuns().filter(run => run.isArchived !== true)
);

  private loadAllData(): void {
    this.isLoading.set(true);
    
    forkJoin({
      modules: this.loadModules(),
      testSuites: this.loadTestSuites(),
      testRuns: this.loadTestRuns()
    }).pipe(
      finalize(() => {
        this.isLoading.set(false);
        this.cdRef.detectChanges();
      })
    ).subscribe({
      next: (data) => {
        console.log('All data loaded:', data);
        this.extractAvailableAttributes();
        this.initializeAttributeColumns();
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.showAlertMessage('Failed to load data', 'error');
      }
    });
  }

  private loadModules(): any {
    const productId = this.selectedProductId();
    if (!productId) {
      this.modules.set([]);
      return of([]);
    }

    return this.moduleService.getModulesByProduct(productId)
      .pipe(
        tap(modules => {
          console.log('Loaded modules:', modules);
          this.modules.set(modules);
        }),
        catchError(error => {
          console.error('Failed to load modules:', error);
          this.showAlertMessage('Failed to load modules', 'error');
          this.modules.set([]);
          return of([]);
        })
      );
  }

private loadTestSuites(): any {
  const productId = this.selectedProductId();

  if (!productId) {
    this.testSuites.set([]);
    return of([]);
  }

  return this.testSuiteService.getTestSuites(productId).pipe(

    // ✅ STEP 1: FILTER UNARCHIVED HERE
    map((responses: TestSuiteResponse[]) =>
      responses.filter(suite => suite.isArchived !== true)
    ),

    // ✅ STEP 2: CONVERT AFTER FILTERING
    map((responses: TestSuiteResponse[]) =>
      responses.map(res => this.convertTestSuiteResponseToTestSuite(res))
    ),

    // ✅ STEP 3: EXISTING COUNT LOGIC (UNCHANGED)
    switchMap((suites: TestSuite[]) => {
      if (!suites || suites.length === 0) {
        return of([] as TestSuite[]);
      }

      const countRequests = suites.map(suite =>
        this.testSuiteService.getTestSuiteWithCases(suite.id).pipe(
          map(resp => ({
            id: suite.id,
            count: (resp.testCases || []).length
          })),
          catchError(() => of({ id: suite.id, count: 0 }))
        )
      );

      return forkJoin(countRequests).pipe(
        map(counts => {
          const idToCount = new Map<string, number>();
          counts.forEach(c => idToCount.set(c.id, c.count));

          return suites.map(s => ({
            ...s,
            testCases: new Array(idToCount.get(s.id) || 0) as any
          }));
        })
      );
    }),

    tap(suites => {
      console.log('Loaded UNARCHIVED test suites:', suites);
      this.testSuites.set(suites);
    }),

    catchError(error => {
      console.error('Failed to load test suites:', error);
      this.showAlertMessage('Failed to load test suites', 'error');
      this.testSuites.set([]);
      return of([]);
    })
  );
}


private loadTestRuns(): any {
  const productId = this.selectedProductId();

  if (!productId) {
    this.testRuns.set([]);
    return of([]);
  }

  return this.testRunService.getTestRuns(productId).pipe(
    tap((responses: TestRunResponse[]) => {
      console.log('Loaded test runs (raw):', responses);
      this.testRuns.set(responses);
    }),
    catchError(error => {
      console.error('Failed to load test runs:', error);
      this.showAlertMessage('Failed to load test runs', 'error');
      this.testRuns.set([]);
      return of([]);
    })
  );
}


  // Conversion methods
  private convertTestSuiteResponseToTestSuite(response: TestSuiteResponse): TestSuite {
    return {
      ...response,
      testCases: response.testCases?.map(tc => this.convertTestCaseResponseToTestCase(tc)) || []
    };
  }

  private convertTestCaseResponseToTestCase(response: TestCaseResponse): TestCase {
    return {
      ...response,
      testType: response.testType === 'Manual' || response.testType === 'Automation' 
        ? response.testType 
        : 'Manual',
      result: this.parseTestCaseResult(response.result),
      steps: [],
      attributes: [],
      uploads: [],
      actual: '',
      remarks: ''
    };
  }

  private convertTestRunResponseToTestRun(response: TestRunResponse): TestRun {
    return {
      ...response,
      status: response.status as TestRunStatus,
      testSuites: response.testSuites || []
    };
  }

 private convertTestCaseDetailToTestCase(response: TestCaseDetailResponse): TestCase {
  const testCase: TestCase = {
    ...response,
    testType: this.parseTestType(response.testType),
    result: this.parseTestCaseResult(response.result),
    steps: response.steps || [],
    attributes: response.attributes || [],
    uploads:
      (response as any)?.executionDetails?.uploads?.map((u: any) => u.filePath) ||
      (response as any)?.attachments?.map((u: any) => u.filePath) ||
      (response as any)?.uploads ||
      [],
    actual: response.actual || '',
    remarks: response.remarks || ''
  };

  // Version fallback: prefer explicit version, else productVersionName
  if (!(testCase as any).version && (response as any).productVersionName) {
    (testCase as any).version = (response as any).productVersionName;
  }

  console.log('Converted test case:', testCase);
  return testCase;
}

  private parseTestType(testType: string): 'Manual' | 'Automation' {
    return testType === 'Manual' || testType === 'Automation' ? testType : 'Manual';
  }

  private parseTestCaseResult(result?: string): TestCaseResult {
    return result === 'Pass' || result === 'Fail' || result === 'Blocked' 
      ? result 
      : 'Pending';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollContainer = document.querySelector('.table-container');
      this.updateScrollButtons();
    }, 200);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.boundHandleClick);
    document.removeEventListener('mousemove', this.boundOnResize);
    document.removeEventListener('mouseup', this.boundStopResize);
    window.removeEventListener('resize', this.updateScrollButtons.bind(this));
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
    this.autoSaveService.stop();
  }

  // Toggle selection mode methods
toggleSelectionMode(showSuites: boolean, showRuns: boolean): void {
  this.showTestSuites = showSuites;
  this.showTestRuns = showRuns;
  this.selectedModule.set(null);
  this.selectedTestRunId.set(null);
  this.viewingSuiteId.set(null);
  this.selectedVersion = '';
  this.versionTestCases.set([]);
  this.showViewTestCases = false;
  this.showStartTesting = false;
  this.formArray.clear();
  this.selectedSuiteIds = [];
  this.allSuitesSelected = false;
  this.uploads = [];
  
  console.log('Toggle selection mode:', { showSuites, showRuns });
  console.log('Available modules:', this.filteredModules());
  console.log('Available test suites:', this.testSuites());
  console.log('Available test runs:', this.testRuns());
}

  // Selection change method
  onSelectionChange(id: string): void {
  console.log('Selection changed to:', id);
  
  if (!id) {
    this.selectedModule.set(null);
    this.selectedTestRunId.set(null); // Clear test run ID when no selection
    return;
  }

  // Reset view states when changing selection
  this.showViewTestCases = false;
  this.showStartTesting = false;
  this.formArray.clear();
  this.uploads = [];

  if (this.showTestSuites) {
    this.handleTestSuiteSelection(id);
  } else if (this.showTestRuns) {
    // Don't call onTestRunChange here as it will cause recursion
    this.selectedTestRunId.set(id);
    this.selectedModule.set(null); // Clear module selection
    this.updateTestRunProgress();
  } else {
    this.handleModuleSelection(id);
  }
}


  private handleModuleSelection(id: string): void {
    console.log('Handling module selection:', id);
    console.log('Filtered modules:', this.filteredModules());
    
    const moduleExists = this.filteredModules().some(m => m.id === id);
    console.log('Module exists:', moduleExists);
    
    if (!moduleExists) {
      console.log('Module not found, resetting');
      this.selectedModule.set(null);
      return;
    }

    this.selectedModule.set(id);
    this.loadModuleVersions(id);
  }

  private loadModuleVersions(moduleId: string): void {
    const productId = this.selectedProductId();
    if (!productId) return;

    console.log('Loading versions for module:', moduleId);

    // Load available product versions for the product and show the version dropdown first
    this.testCaseService.getVersionsByModule(moduleId, productId)
      .pipe(
        catchError(error => {
          console.error('Failed to load module versions:', error);
          this.showAlertMessage('Failed to load module versions', 'error');
          return of([]);
        })
      )
      .subscribe(options => {
        this.availableVersions = (options || []).map(o => o.version);
        this.selectedVersion = '';
        this.versionTestCases.set([]);
        this.showViewTestCases = true; // expose version dropdown immediately
        this.cdRef.detectChanges();
      });
  }

  private loadTestCasesForModule(moduleId: string, version: string): void {
    console.log('Loading test cases for module:', moduleId, 'version:', version);
    
    this.testCaseService.getTestCasesByModule(moduleId)
      .pipe(
        catchError(() => of([])),
        switchMap(list => {
          console.log('Test cases list:', list);
          if (!list || list.length === 0) return of([] as TestCaseDetailResponse[]);
          
          return forkJoin(
            list.map(tc => this.testCaseService.getTestCaseDetail(moduleId, tc.id).pipe(
              catchError(() => of(null))
            ))
          ).pipe(map(details => details.filter(d => !!d) as TestCaseDetailResponse[]));
        })
      )
      .subscribe(casesDetail => {
        console.log('Test case details:', casesDetail);
        const cases = casesDetail.map(res => this.convertTestCaseDetailToTestCase(res));
        this.testCasePool.set(cases);
        const filteredCases = cases.filter(tc => tc.moduleId === moduleId && tc.version === version);
        this.versionTestCases.set(filteredCases);
        this.initializeFormForTestCases();
      });
  }

  private handleTestSuiteSelection(suiteId: string): void {
    console.log('Handling test suite selection:', suiteId);
    const productId = this.selectedProductId();
    if (!productId) return;
    
    const suiteExists = this.testSuites().some(s => s.id === suiteId);
    console.log('Suite exists:', suiteExists);
    
    if (!suiteExists) {
      this.selectedModule.set(null);
      return;
    }
    
    this.testSuiteService.getTestSuiteById(productId, suiteId)
      .pipe(
        catchError(error => {
          console.error('Failed to load test suite:', error);
          this.showAlertMessage('Failed to load test suite', 'error');
          return of(null);
        })
      )
      .subscribe(suite => {
        if (suite) {
          this.selectedModule.set(suiteId);
          this.selectedVersion = '';
          
          this.loadTestCasesForSuite(suiteId);
        }
      });
  }

private loadTestCasesForSuite(suiteId: string): void {
  console.log('Loading test cases for suite:', suiteId);
  
  this.testSuiteService.getTestSuiteWithCases(suiteId)
    .pipe(
      catchError(error => {
        console.error('Failed to load test cases for suite:', error);
        this.showAlertMessage('Failed to load test cases for suite', 'error');
        const productId = this.selectedProductId() || '';
        return of({
          id: suiteId,
          productId: productId,
          name: 'Error loading suite',
          description: '',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          testCases: []
        } as TestSuiteWithCasesResponse);
      }),
      switchMap((response: TestSuiteWithCasesResponse) => {
        const items = response.testCases || [];
        if (items.length === 0) {
          return of({ response, cases: [] as TestCase[] });
        }
        const detailRequests = items.map(tcItem =>
          this.testCaseService.getTestCaseDetail(tcItem.testCase.moduleId, tcItem.testCase.id).pipe(
            map(detail => {
              // overlay execution details
              const exec = tcItem.executionDetails || {} as any;
              const overlaid: TestCaseDetailResponse = {
                ...detail,
                result: exec.result || detail.result,
                actual: exec.actual || detail.actual,
                remarks: exec.remarks || detail.remarks,
                executionDetails: exec,
                // ensure we also expose uploads via execution
                uploads: exec.uploads?.map((u: any) => u.filePath) || (detail as any).attachments?.map((u: any) => u.filePath) || detail.uploads || []
              } as any;
              return this.convertTestCaseDetailToTestCase(overlaid);
            }),
            catchError(() => of(null as unknown as TestCase))
          )
        );
        return detailRequests.length ? forkJoin(detailRequests) : of([] as TestCase[]);
      }),
      map(allCases => {
        let validCases: TestCase[] = [];
        if (Array.isArray(allCases)) {
          validCases = (allCases || []).filter(Boolean) as TestCase[];
        } else if (allCases && 'cases' in allCases && Array.isArray(allCases.cases)) {
          validCases = (allCases.cases || []).filter(Boolean) as TestCase[];
        }
        // Group and sort test cases by module and numerical ID
        return this.groupAndSortTestCasesByModule(validCases);
      })
    )
    .subscribe(responseCases => {
      console.log('Suite test cases loaded and sorted:', responseCases.length);
      this.versionTestCases.set(responseCases);
      this.ensureStepsForCases();
      
      setTimeout(() => {
        this.initializeFormForTestCases();
        this.debugFormState();
      }, 100);
    });
}

private ensureStepsForCases(): void {
  const cases = this.versionTestCases();
  const missing = cases
    .map((tc, idx) => ({ tc, idx }))
    .filter(x => !x.tc.steps || x.tc.steps.length === 0);
  if (missing.length === 0) return;

  const requests = missing.map(x => 
    this.testCaseService.getTestCaseSteps(x.tc.id).pipe(
      catchError(() => of([] as any[])),
      map(steps => ({ idx: x.idx, steps }))
    )
  );

  forkJoin(requests).subscribe(updates => {
    const updated = [...this.versionTestCases()];
    updates.forEach(u => {
      const tc = updated[u.idx];
      if (tc) {
        (tc as any).steps = u.steps || [];
      }
    });
    this.versionTestCases.set(updated);
    this.cdRef.detectChanges();
  });
}

debugFormState(): void {
  console.log('=== FORM DEBUG INFO ===');
  console.log('Version test cases length:', this.versionTestCases().length);
  console.log('Form array length:', this.formArray.length);
  console.log('Form array valid:', this.formArray.valid);
  console.log('Form array value:', this.formArray.value);
  
  this.formArray.controls.forEach((control, index) => {
    const formGroup = control as FormGroup;
    console.log(`Form group ${index}:`, {
      value: formGroup.value,
      valid: formGroup.valid,
      controls: Object.keys(formGroup.controls)
    });
  });
  console.log('=== END FORM DEBUG ===');
}
onResultChange(index: number, newValue: string): void {
  console.log(`Result changed for index ${index}: ${newValue}`);
  try {
    const control = this.getFormControl(index, 'result');
    control.setValue(newValue);
    this.cdRef.detectChanges();
  } catch (error) {
    console.error('Error updating result:', error);
  }
}

  // Test Run methods
onTestRunChange(runId: string): void {
  console.log('Test run changed to:', runId);
  console.log('Available test runs:', this.testRuns());
  
  this.selectedTestRunId.set(runId);
  this.selectedModule.set(null); // Clear module selection
  this.viewingSuiteId.set(null);
  this.selectedSuiteIds = [];
  this.allSuitesSelected = false;
  
  if (runId) {
    const run = this.testRuns().find(r => r.id === runId);
    console.log('Selected test run:', run);
    this.updateTestRunProgress();
  } else {
    this.versionTestCases.set([]);
    this.showViewTestCases = false;
    this.showStartTesting = false;
  }
}

  // Suite selection methods
  isSuiteSelected(suiteId: string): boolean {
    return this.selectedSuiteIds.includes(suiteId);
  }

  toggleSuiteSelection(suiteId: string): void {
    if (this.isSuiteSelected(suiteId)) {
      this.selectedSuiteIds = this.selectedSuiteIds.filter(id => id !== suiteId);
    } else {
      this.selectedSuiteIds = [...this.selectedSuiteIds, suiteId];
    }
    this.allSuitesSelected = false;
  }

  // toggleSelectAllSuites(event: Event): void {
  //   const isChecked = (event.target as HTMLInputElement).checked;
  //   this.allSuitesSelected = isChecked;
    
  //   if (isChecked) {
  //     this.selectedSuiteIds = this.selectedTestRun()?.testSuites.map(s => s.id) || [];
  //   } else {
  //     this.selectedSuiteIds = [];
  //   }
  // }

  // areAllSuitesSelected(): boolean {
  //   if (!this.selectedTestRun()?.testSuites?.length) return false;
  //   return this.selectedSuiteIds.length === this.selectedTestRun()!.testSuites.length;
  // }

 hasSelectedSuites(): boolean {
  return this.selectedSuiteIds.length === 1;
}

  // Suite status methods
  isSuiteComplete(suiteId: string): boolean {
    const suiteCases = this.getTestCasesForSuite(suiteId);
    return suiteCases.length > 0 && suiteCases.every(tc => tc.result === 'Pass');
  }

  isSuiteInProgress(suiteId: string): boolean {
    const suiteCases = this.getTestCasesForSuite(suiteId);
    const completedCases = suiteCases.filter(tc => tc.result && tc.result !== 'Pending');
    return completedCases.length > 0 && completedCases.length < suiteCases.length;
  }

  isSuiteNotStarted(suiteId: string): boolean {
    const suiteCases = this.getTestCasesForSuite(suiteId);
    return suiteCases.every(tc => !tc.result || tc.result === 'Pending');
  }

  getSuiteCompletedCount(suiteId: string): number {
    const suiteCases = this.getTestCasesForSuite(suiteId);
    return suiteCases.filter(tc => tc.result === 'Pass' || tc.result === 'Fail').length;
  }

  getTestCasesForSuite(suiteId: string): TestCase[] {
    const suite = this.testSuites().find(s => s.id === suiteId);
    return suite?.testCases || [];
  }

  getSuiteName(suiteId: string): string {
    const suite = this.testSuites().find(s => s.id === suiteId);
    return suite?.name || 'Unknown Suite';
  }

  getSuiteDescription(suiteId: string): string {
    const suite = this.testSuites().find(s => s.id === suiteId);
    return suite?.description || '';
  }

  getSuiteTestCaseCount(suiteId: string): number {
    const suite = this.testSuites().find(s => s.id === suiteId);
    return suite?.testCases?.length || 0;
  }

  // View and start testing methods
  handleViewAction(): void {
  console.log('Handle view action');
  console.log('showTestRuns:', this.showTestRuns);
  console.log('selectedTestRun:', this.selectedTestRun());
  
  if (this.showTestRuns) {
    const selectedRun = this.selectedTestRun();
    if (selectedRun?.testSuites?.length) {
      this.viewAllSelectedCases();
    }
  } else if (this.showTestSuites) {
    const suite = this.testSuites().find(s => s.id === this.selectedModule());
    if (suite) {
      this.showViewTestCases = true;
      this.showStartTesting = false;
      this.loadTestCasesForSuite(suite.id); // ensure steps/expected are fetched
    }
  } else {
    this.showViewTestCases = true;
    this.showStartTesting = false;
  }
}

  handleStartTesting(): void {
  console.log('Handle start testing');
  console.log('showTestRuns:', this.showTestRuns);
  
  if (this.showTestRuns) {
    const selectedRun = this.selectedTestRun();
    if (selectedRun?.testSuites?.length) {
      this.startTestingSelected();
    }
  } else if (this.showTestSuites) {
    const suite = this.testSuites().find(s => s.id === this.selectedModule());
    if (suite) {
      this.showStartTesting = true;
      this.showViewTestCases = false;
      this.loadTestCasesForSuite(suite.id);
    }
  } else {
    this.showStartTesting = true;
    this.showViewTestCases = false;
    this.initializeFormForTestCases();
  }
}

hasTestCasesToView(): boolean {
  if (this.showTestRuns) {
    const selectedRun = this.selectedTestRun();
    return !!(selectedRun?.testSuites?.length);
  }
  
  if (this.selectedModule()) {
    if (this.showTestSuites) {
      // Enable buttons when a suite is selected; data will be fetched on demand
      return true;
    } else {
      // In module mode, enable once a version is chosen
      if (this.selectedVersion) {
        return true;
      }
      const moduleCases = this.testCasePool().filter(
        tc => tc.moduleId === this.selectedModule()
      );
      return moduleCases.length > 0;
    }
  }
  
  return false;
}
// Add this helper method to your component class
private getEmptyTestSuiteWithCases(suiteId?: string): TestSuiteWithCasesResponse {
  return {
    id: suiteId || '',
    productId: this.selectedProductId() || '',
    name: 'Error loading suite',
    description: '',
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    testCases: []
  };
}

viewAllSelectedCases(): void {
  const selectedRun = this.selectedTestRun();
  if (!selectedRun) {
    console.error('No test run selected');
    return;
  }

  // With single selection, we either have one suite selected or none
  const suiteId = this.selectedSuiteIds.length > 0 ? this.selectedSuiteIds[0] : null;

  if (!suiteId) {
    this.versionTestCases.set([]);
    this.showViewTestCases = false;
    return;
  }

  this.isLoading.set(true);
  
  this.testSuiteService.getTestSuiteWithCases(suiteId)
    .pipe(
      catchError(() => of(this.getEmptyTestSuiteWithCases(suiteId))),
      switchMap((response: TestSuiteWithCasesResponse) => {
        const items = response.testCases || [];
        if (items.length === 0) return of([] as TestCase[]);
        
        return forkJoin(
          items.map((tcItem: any) => 
            this.testCaseService.getTestCaseDetail(tcItem.testCase.moduleId, tcItem.testCase.id).pipe(
              map((detail: TestCaseDetailResponse) => {
                const exec = tcItem.executionDetails || {} as any;
                const overlaid: TestCaseDetailResponse = {
                  ...detail,
                  result: exec.result || detail.result,
                  actual: exec.actual || detail.actual,
                  remarks: exec.remarks || detail.remarks,
                  executionDetails: exec,
                  uploads: exec.uploads?.map((u: any) => u.filePath) || 
                          (detail as any).attachments?.map((u: any) => u.filePath) || 
                          detail.uploads || []
                } as any;
                return this.convertTestCaseDetailToTestCase(overlaid);
              }),
              catchError(() => of(null as unknown as TestCase))
            )
          )
        ).pipe(
          map((cases: (TestCase | null)[]) => {
            const validCases = (cases || []).filter(Boolean) as TestCase[];
            // Group and sort test cases by module and numerical ID
            return this.groupAndSortTestCasesByModule(validCases);
          })
        );
      }),
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (cases: TestCase[]) => {
        this.versionTestCases.set(cases);
        this.ensureStepsForCases();
        this.showViewTestCases = true;
        this.showStartTesting = false;
        this.initializeFormForTestCases();
      },
      error: (err: any) => {
        console.error('Failed to load test cases:', err);
        this.versionTestCases.set([]);
        this.showAlertMessage('Failed to load test cases', 'error');
      }
    });
}

startTestingSelected(): void {
  const selectedRun = this.selectedTestRun();
  if (!selectedRun) {
    console.error('No test run selected');
    return;
  }

  // With single selection, we either have one suite selected or none
  const suiteId = this.selectedSuiteIds.length > 0 ? this.selectedSuiteIds[0] : null;

  if (!suiteId) {
    this.versionTestCases.set([]);
    this.showStartTesting = false;
    return;
  }

  this.isLoading.set(true);
  
  this.testSuiteService.getTestSuiteWithCases(suiteId)
    .pipe(
      catchError(() => of(this.getEmptyTestSuiteWithCases(suiteId))),
      switchMap((response: TestSuiteWithCasesResponse) => {
        const items = response.testCases || [];
        if (items.length === 0) return of([] as TestCase[]);
        
        return forkJoin(
          items.map((tcItem: any) => 
            this.testCaseService.getTestCaseDetail(tcItem.testCase.moduleId, tcItem.testCase.id).pipe(
              map((detail: TestCaseDetailResponse) => {
                const exec = tcItem.executionDetails || {} as any;
                const overlaid: TestCaseDetailResponse = {
                  ...detail,
                  result: exec.result || detail.result,
                  actual: exec.actual || detail.actual,
                  remarks: exec.remarks || detail.remarks,
                  executionDetails: exec,
                  uploads: exec.uploads?.map((u: any) => u.filePath) || 
                          (detail as any).attachments?.map((u: any) => u.filePath) || 
                          detail.uploads || []
                } as any;
                return this.convertTestCaseDetailToTestCase(overlaid);
              }),
              catchError(() => of(null as unknown as TestCase))
            )
          )
        ).pipe(
          map((cases: (TestCase | null)[]) => {
            const validCases = (cases || []).filter(Boolean) as TestCase[];
            // Group and sort test cases by module and numerical ID
            return this.groupAndSortTestCasesByModule(validCases);
          })
        );
      }),
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (cases: TestCase[]) => {
        this.versionTestCases.set(cases);
        this.ensureStepsForCases();
        this.showStartTesting = true;
        this.showViewTestCases = false;
        this.initializeFormForTestCases();
      },
      error: (err: any) => {
        console.error('Failed to load test cases:', err);
        this.versionTestCases.set([]);
        this.showAlertMessage('Failed to load test cases', 'error');
      }
    });
}
// viewAllSelectedCases(): void {
//   const selectedRun = this.selectedTestRun();
//   if (!selectedRun) {
//     console.error('No test run selected');
//     return;
//   }

//   const suiteIds = this.selectedSuiteIds.length > 0
//     ? this.selectedSuiteIds
//     : (selectedRun.testSuites || []).map(s => s.id);

//   if (!suiteIds || suiteIds.length === 0) {
//     this.versionTestCases.set([]);
//     return;
//   }

//   const requests = suiteIds.map(suiteId => 
//     this.testSuiteService.getTestSuiteWithCases(suiteId).pipe(
//       catchError(() => of(this.getEmptyTestSuiteWithCases(suiteId)))
//     )
//   );

//   forkJoin(requests).pipe(
//     switchMap((responses: TestSuiteWithCasesResponse[]) => {
//       const detailRequests = responses.flatMap(response => {
//         const items = response.testCases || [];
//         return items.map(tcItem => 
//           this.testCaseService.getTestCaseDetail(tcItem.testCase.moduleId, tcItem.testCase.id).pipe(
//             map(detail => {
//               const exec = tcItem.executionDetails || {} as any;
//               const overlaid: TestCaseDetailResponse = {
//                 ...detail,
//                 result: exec.result || detail.result,
//                 actual: exec.actual || detail.actual,
//                 remarks: exec.remarks || detail.remarks,
//                 executionDetails: exec,
//                 uploads: exec.uploads?.map((u: any) => u.filePath) || (detail as any).attachments?.map((u: any) => u.filePath) || detail.uploads || []
//               } as any;
//               return this.convertTestCaseDetailToTestCase(overlaid);
//             }),
//             catchError(() => of(null as unknown as TestCase))
//           )
//         );
//       });
//       return detailRequests.length ? forkJoin(detailRequests) : of([] as TestCase[]);
//     }),
//     map(allCases => (allCases || []).filter(Boolean) as TestCase[])
//   ).subscribe({
//     next: allCases => {
//       this.versionTestCases.set(allCases);
//       this.ensureStepsForCases();
//       this.showViewTestCases = true;
//       this.showStartTesting = false;
//       this.initializeFormForTestCases();
//     },
//     error: err => {
//       console.error('Failed to load test cases:', err);
//       this.versionTestCases.set([]);
//     }
//   });
// }
// // Create a helper function for empty test suite response
// private getEmptyTestSuiteWithCases(suiteId?: string): TestSuiteWithCasesResponse {
//   return {
//     id: suiteId || '',
//     productId: this.selectedProductId() || '', // Use selectedProductId() instead
//     name: 'Error loading suite',
//     description: '',
//     isActive: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     testCases: []
//   };
// }

//   startTestingSelected(): void {
//   const selectedRun = this.selectedTestRun();
//   if (!selectedRun) {
//     console.error('No test run selected');
//     return;
//   }

//   const suiteIds = this.selectedSuiteIds.length > 0
//     ? this.selectedSuiteIds
//     : (selectedRun.testSuites || []).map(s => s.id);

//   if (!suiteIds || suiteIds.length === 0) {
//     this.versionTestCases.set([]);
//     return;
//   }

//   const requests = suiteIds.map(suiteId => 
//     this.testSuiteService.getTestSuiteWithCases(suiteId).pipe(
//       catchError(() => of(this.getEmptyTestSuiteWithCases(suiteId)))
//     )
//   );

//   forkJoin(requests).pipe(
//     switchMap((responses: TestSuiteWithCasesResponse[]) => {
//       const detailRequests = responses.flatMap(response => {
//         const items = response.testCases || [];
//         return items.map(tcItem => 
//           this.testCaseService.getTestCaseDetail(tcItem.testCase.moduleId, tcItem.testCase.id).pipe(
//             map(detail => {
//               const exec = tcItem.executionDetails || {} as any;
//               const overlaid: TestCaseDetailResponse = {
//                 ...detail,
//                 result: exec.result || detail.result,
//                 actual: exec.actual || detail.actual,
//                 remarks: exec.remarks || detail.remarks,
//                 executionDetails: exec,
//                 uploads: exec.uploads?.map((u: any) => u.filePath) || (detail as any).attachments?.map((u: any) => u.filePath) || detail.uploads || []
//               } as any;
//               return this.convertTestCaseDetailToTestCase(overlaid);
//             }),
//             catchError(() => of(null as unknown as TestCase))
//           )
//         );
//       });
//       return detailRequests.length ? forkJoin(detailRequests) : of([] as TestCase[]);
//     }),
//     map(allCases => (allCases || []).filter(Boolean) as TestCase[])
//   ).subscribe({
//     next: allCases => {
//       this.versionTestCases.set(allCases);
//       this.ensureStepsForCases();
//       this.showStartTesting = true;
//       this.showViewTestCases = false;
//       this.initializeFormForTestCases();
//     },
//     error: err => {
//       console.error('Failed to load test cases:', err);
//       this.versionTestCases.set([]);
//     }
//   });
// }

private initializeFormForTestCases(): void {
  this.formArray.clear();
  this.uploads = [];

  console.log('Initializing form for test cases:', this.versionTestCases().length);

  this.versionTestCases().forEach((testCase, index) => {
    const formGroup = this.fb.group({
      result: [testCase.result || 'Pending'],
      actual: [testCase.actual || ''],
      remarks: [testCase.remarks || '']
    });

    console.log(`Form group ${index}:`, formGroup.value);
    
    this.formArray.push(formGroup);
    
    // FIX: Properly extract upload IDs from execution details
    let uploadsWithIds: UploadedFile[] = [];
    
    if (testCase.executionDetails?.uploads) {
      // Extract uploads from execution details (contains proper IDs)
      uploadsWithIds = testCase.executionDetails.uploads.map((upload: any) => ({
        id: upload.id, // This is the crucial uploadId for deletion
        fileType: upload.fileType || '',
        fileName: upload.fileName || '',
        loaded: true
      }));
      console.log(`Test case ${index} uploads from execution details:`, uploadsWithIds);
    } else if (testCase.uploads && testCase.uploads.length > 0) {
      // Fallback: Handle legacy uploads (file paths)
      uploadsWithIds = testCase.uploads.map((upload: any) => {
        const uploadStr = typeof upload === 'string' ? upload : upload.filePath || '';
        // For legacy file paths, use the path as ID (not ideal but maintains compatibility)
        return {
          id: uploadStr, // Use full path as ID for legacy uploads
          fileType: typeof upload === 'string' ? '' : (upload.fileType || ''),
          fileName: typeof upload === 'string' 
            ? this.getFileName(uploadStr) 
            : (upload.fileName || ''),
          loaded: true
        };
      });
      console.log(`Test case ${index} uploads from legacy uploads:`, uploadsWithIds);
    }
    
    this.uploads.push(uploadsWithIds);
  });

  console.log('Form array length after initialization:', this.formArray.length);
  console.log('All uploads initialized:', this.uploads);

  this.extractAvailableAttributes();
  this.initializeAttributeColumns();

  setTimeout(() => {
    this.updateScrollButtons();
    this.cdRef.detectChanges();
  }, 300);
}

  onVersionChange(): void {
    const mod = this.selectedModule();
    if (mod) {
      if (!this.selectedVersion) {
        this.versionTestCases.set([]);
        this.formArray.clear();
        return;
      }
      if (this.selectedVersion === 'all') {
        // Fetch all test cases for the selected module from backend
        this.testCaseService.getTestCasesByModule(mod)
          .pipe(
            catchError(() => of([])),
            switchMap(list => {
              if (!list || !list.length) return of([]);
              // Fetch details for each test case
              const detailRequests = list.map(tc =>
                this.testCaseService.getTestCaseDetail(tc.moduleId, tc.id).pipe(
                  map(detail => this.convertTestCaseDetailToTestCase(detail)),
                  catchError(() => of(null as unknown as TestCase))
                )
              );
              return detailRequests.length ? forkJoin(detailRequests) : of([] as TestCase[]);
            })
          )
          .subscribe(casesDetail => {
            this.versionTestCases.set((casesDetail || []).filter(Boolean) as TestCase[]);
            this.ensureStepsForCases();
            this.initializeFormForTestCases();
          });
      } else {
        this.loadTestCasesForModule(mod, this.selectedVersion);
      }
    }
  }

  // Save method
  onSave(): void {
    const formValues = this.formArray.value;
    const testCases = this.versionTestCases();

    const updatedTestCases = testCases.map((tc, index) => ({
      ...tc,
      result: formValues[index]?.result || 'Pending',
      actual: (formValues[index]?.actual || '').trim(),
      remarks: (formValues[index]?.remarks || '').trim(),
      uploads: this.uploads[index]?.map(u => u.id) || [],
      testRunId: this.showTestRuns ? this.selectedTestRunId() : undefined
    }));

    const updateRequests = updatedTestCases.map(tc => {
      // When in suite/run context, update execution details against the suite
      if (this.showTestSuites || this.showTestRuns) {
        // Resolve suiteId priority: explicit on case -> selected suite (suite mode) -> single selected suite (run mode) -> only suite in run
        let suiteId: string | null = null;
        const caseSuiteIds = (tc as any).testSuiteIds as string[] | undefined;
        if (caseSuiteIds && caseSuiteIds.length > 0) {
          suiteId = caseSuiteIds[0];
        } else if (this.showTestSuites && this.selectedModule()) {
          suiteId = this.selectedModule()!; // suite mode stores suite id here
        } else if (this.showTestRuns) {
          const selectedRun = this.selectedTestRun();
          if (this.selectedSuiteIds.length === 1) {
            suiteId = this.selectedSuiteIds[0];
          } else if (selectedRun?.testSuites?.length === 1) {
            suiteId = selectedRun.testSuites[0].id;
          }
        }

        if (!suiteId) {
          console.warn('Skipping save: unable to resolve suiteId for test case', tc.id);
          return of(null);
        }

        return this.testSuiteService.updateExecutionDetails(suiteId, tc.id, {
          result: tc.result,
          actual: tc.actual,
          remarks: tc.remarks
        }).pipe(
          catchError(error => {
            console.error('Failed to update execution details:', { error, suiteId, testCaseId: tc.id });
            return of(null);
          })
        );
      }

      // Module-only context updates the test case itself
      const updateData: UpdateTestCaseRequest = {
        useCase: tc.useCase,
        scenario: tc.scenario,
        testType: tc.testType,
        testTool: tc.testTool,
        result: tc.result,
        actual: tc.actual,
        remarks: tc.remarks,
        attributes: tc.attributes
      };

      return this.testCaseService.updateTestCase(tc.moduleId, tc.id, updateData)
        .pipe(
          catchError(error => {
            console.error('Failed to update test case:', error);
            return of(null);
          })
        );
    });

    forkJoin(updateRequests).subscribe(results => {
      this.saveSuccessMessage = 'Saved Result';
      this.showSaveSuccessAlert = true;
      
      // Auto-hide the alert after 3 seconds
      if (this.saveAlertTimeout) {
        clearTimeout(this.saveAlertTimeout);
      }
      this.saveAlertTimeout = setTimeout(() => {
        this.showSaveSuccessAlert = false;
        this.cdRef.detectChanges();
      }, 3000);

      if (this.showTestRuns && this.selectedTestRunId()) {
        this.updateTestRunProgress();
      }

      // Reload test cases to get fresh data
      if (this.selectedModule()) {
        if (this.showTestSuites) {
          this.loadTestCasesForSuite(this.selectedModule()!);
        } else if (!this.showTestRuns) {
          this.loadTestCasesForModule(this.selectedModule()!, this.selectedVersion);
        } else if (this.showTestRuns && this.selectedTestRunId()) {
          // Refresh run view
          if (this.selectedSuiteIds.length > 0) {
            this.startTestingSelected();
          } else {
            this.viewAllSelectedCases();
          }
        }
      }
    });
  }

private updateTestRunProgress(): void {
    const selectedRun = this.selectedTestRun();
    if (!selectedRun) return;

    const suiteIds = selectedRun.testSuites.map(suite => suite.id);
    const runCases: TestCase[] = [];
    const productId = selectedRun.productId;
    
    const suiteRequests = suiteIds.map(suiteId => 
      this.testSuiteService.getTestSuiteWithCases(suiteId)
        .pipe(
          catchError(error => {
            console.error('Failed to load test suite cases:', error);
            return of({
              id: suiteId,
              productId: productId,
              name: 'Error loading suite',
              description: '',
              isActive: false,
              createdAt: new Date(),
              updatedAt: new Date(),
              testCases: []
            } as TestSuiteWithCasesResponse);
          }),
          map(response => ({
            ...response,
            testCases: (response.testCases || []).map(tcItem => {
              // Convert TestSuiteTestCaseItem to TestCaseDetailResponse
              const testCaseDetail: TestCaseDetailResponse = {
                id: tcItem.testCase.id,
                moduleId: tcItem.testCase.moduleId,
                productVersionId: tcItem.testCase.productVersionId,
                version: tcItem.testCase.version || tcItem.testCase.productVersionName,
                productVersionName: tcItem.testCase.productVersionName || tcItem.testCase.version,
                testCaseId: tcItem.testCase.testCaseId,
                useCase: tcItem.testCase.useCase,
                scenario: tcItem.testCase.scenario,
                testType: tcItem.testCase.testType,
                testTool: tcItem.testCase.testTool,
                result: tcItem.executionDetails?.result || tcItem.testCase.result,
                actual: tcItem.executionDetails?.actual,
                remarks: tcItem.executionDetails?.remarks,
                createdAt: tcItem.testCase.createdAt,
                updatedAt: tcItem.testCase.updatedAt,
                expected: '',
                steps: [],
                attributes: [],
                uploads: tcItem.executionDetails?.uploads?.map(u => u.filePath) || [],
                testSuiteIds: [suiteId],
                executionDetails: tcItem.executionDetails
              };
              return this.convertTestCaseDetailToTestCase(testCaseDetail);
            })
          }))
        )
    );

    forkJoin(suiteRequests).subscribe({
      next: responses => {
        responses.forEach(response => {
          runCases.push(...response.testCases);
        });

        const total = runCases.length;
        const completed = runCases.filter(tc =>
          tc.result === 'Pass' || tc.result === 'Fail'
        ).length;

        this.testRunProgress.set({ total, completed });

        let status: TestRunStatus = 'Not Started';
        if (total > 0 && completed === total) {
          status = 'Completed';
        } else if (completed > 0) {
          status = 'In Progress';
        }

        this.testRunService.updateTestRunStatus(
          productId,
          this.selectedTestRunId()!,
          status 
        ).pipe(
          catchError(error => {
            console.error('Failed to update test run status:', error);
            return of(null);
          })
        ).subscribe(() => this.loadTestRuns());
      },
      error: error => {
        console.error('Error loading test suite cases:', error);
      }
    });
  }
  // Attribute handling methods
  extractAvailableAttributes(): void {
    const allAttributes = new Set<string>();
    this.versionTestCases().forEach(tc => {
      tc.attributes?.forEach(attr => {
        allAttributes.add(attr.key);
      });
    });
    this.availableAttributes = Array.from(allAttributes);
  }

  private initializeAttributeColumns(): void {
    this.attributeColumns = [];
    this.availableAttributes.forEach(key => {
      this.addAttributeColumn(key);
    });
  }

  addAttributeColumn(key: string): void {
    if (!this.attributeColumns.some(col => col.field === `attr_${key}`)) {
      this.attributeColumns.push({
        field: `attr_${key}`,
        header: key,
        width: 150,
        isAttribute: true
      });
    }
  }

  removeAttributeColumn(key: string): void {
    this.attributeColumns = this.attributeColumns.filter(
      col => col.field !== `attr_${key}`
    );
  }

  getAttributeValue(testCase: TestCase, key: string): string {
    const attr = testCase.attributes?.find(a => a.key === key);
    return attr ? attr.value : '';
  }

  // Cell value method with proper field handling
  getCellValue(testCase: TestCase, field: string, index?: number): string {
    if (field === 'slNo' && index !== undefined) {
      return (index + 1).toString();
    }
    
    if (field.startsWith('attr_')) {
      const attrKey = field.substring(5);
      return this.getAttributeValue(testCase, attrKey);
    }

    // Handle steps field specially as numbered list
    if (field === 'steps') {
      if (testCase.steps && testCase.steps.length > 0) {
        return testCase.steps
          .map((step, idx) => `${idx + 1}. ${step.steps || ''}`)
          .join('\n');
      }
      return '';
    }

    // Handle expected field as numbered list
    if (field === 'expected') {
      if (testCase.steps && testCase.steps.length > 0) {
        return testCase.steps
          .map((step, idx) => `${idx + 1}. ${step.expectedResult || ''}`)
          .join('\n');
      }
      return '';
    }

    const value = (testCase as any)[field as keyof TestCase];
    return value !== undefined && value !== null ? value.toString() : '';
  }

  // Form methods
  formGroups(): FormGroup[] {
    return this.formArray.controls as FormGroup[];
  }

 getFormControl(index: number, controlName: string): FormControl {
  if (index >= this.formArray.length) {
    console.error(`Form group at index ${index} does not exist. Array length: ${this.formArray.length}`);
    throw new Error(`Form group at index ${index} does not exist`);
  }

  const formGroup = this.formArray.at(index) as FormGroup;
  const control = formGroup.get(controlName);
  
  if (!control) {
    console.error(`Form control '${controlName}' not found in group at index ${index}`);
    console.error('Available controls:', Object.keys(formGroup.controls));
    throw new Error(`Form control '${controlName}' not found`);
  }
  
  return control as FormControl;
}
isFormInitialized(): boolean {
  return this.formArray.length === this.versionTestCases().length;
}

  // Filtering methods
  filteredTestCases(): TestCase[] {
    const mod = this.selectedModule();
    return mod && !this.showTestSuites && !this.showTestRuns
      ? this.testCasePool().filter(tc => tc.moduleId === mod) 
      : [];
  }

  filteredAndSearchedTestCases(): TestCase[] {
    return (this.showTestSuites || this.showTestRuns ? this.versionTestCases() : this.filteredTestCases())
      .filter((tc, i) => {
        const form = this.formGroups()[i];
        if (!form) return true;
        
        const matchesSlNo = !this.filter.slNo || 
          (i + 1).toString().includes(this.filter.slNo);
        const matchesTestCaseId = !this.filter.testCaseId || 
          tc.testCaseId.toLowerCase().includes(this.filter.testCaseId.toLowerCase());
        const matchesUseCase = !this.filter.useCase || 
          tc.useCase.toLowerCase().includes(this.filter.useCase.toLowerCase());
        const matchesResult = !this.filter.result || 
          form.get('result')?.value === this.filter.result;
        
        const matchesAttribute = !this.filter.attributeKey || !this.filter.attributeValue ||
          this.getAttributeValue(tc, this.filter.attributeKey)
            .toLowerCase()
            .includes(this.filter.attributeValue.toLowerCase());

        return matchesSlNo && matchesTestCaseId && matchesUseCase && matchesResult && matchesAttribute;
      });
  }

  // Upload methods
onUpload(event: Event, rowIndex: number): void {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const testCase = this.versionTestCases()[rowIndex];
  if (!testCase) return;

  // Determine suite ID based on current context
  let suiteId = '';
  if (this.showTestSuites && this.selectedModule()) {
    suiteId = this.selectedModule()!;
  } else if (this.showTestRuns && this.selectedSuiteIds.length === 1) {
    suiteId = this.selectedSuiteIds[0];
  }

  if (!suiteId && (this.showTestSuites || this.showTestRuns)) {
    this.showAlertMessage('Cannot determine test suite context for upload', 'error');
    return;
  }

  // Show loading spinner in UI
  if (!this.uploads[rowIndex]) this.uploads[rowIndex] = [];
  const tempUpload: UploadedFile = { 
    id: 'temp-' + Date.now(), 
    fileType: file.type, 
    fileName: file.name, 
    loaded: false 
  };
  this.uploads[rowIndex].push(tempUpload);

  if (this.showTestSuites || this.showTestRuns) {
    // Use suite upload API
    this.testSuiteService.uploadTestCaseFile(suiteId, testCase.id, file, 'frontend-user')
      .subscribe({
        next: (uploadResp: any) => {
          // Remove loading spinner
          const tempIndex = this.uploads[rowIndex].findIndex(u => u.id.startsWith('temp-'));
          if (tempIndex !== -1) {
            this.uploads[rowIndex].splice(tempIndex, 1);
          }
          
          // Add uploaded file with proper ID from response
          const newUpload: UploadedFile = {
            id: uploadResp.uploadId || uploadResp.id, // Use uploadId from API response
            fileType: uploadResp.fileType || file.type,
            fileName: uploadResp.fileName || file.name,
            loaded: true
          };
          this.uploads[rowIndex].push(newUpload);
          
          console.log('Upload successful:', newUpload);
          this.cdRef.detectChanges();
        },
        error: err => {
          // Remove loading spinner on error
          const tempIndex = this.uploads[rowIndex].findIndex(u => u.id.startsWith('temp-'));
          if (tempIndex !== -1) {
            this.uploads[rowIndex].splice(tempIndex, 1);
          }
          console.error('Upload failed:', err);
          this.showAlertMessage('Upload failed: ' + (err.message || 'Unknown error'), 'error');
          this.cdRef.detectChanges();
        }
      });
  } else {
    // Use module upload API (existing logic)
    const formData = new FormData();
    formData.append('File', file);
    formData.append('TestCaseId', testCase.id);
    formData.append('UploadedBy', 'frontend-user');

    this.testCaseService.uploadFile(formData)
      .subscribe({
        next: (uploadResp: any) => {
          const tempIndex = this.uploads[rowIndex].findIndex(u => u.id.startsWith('temp-'));
          if (tempIndex !== -1) {
            this.uploads[rowIndex].splice(tempIndex, 1);
          }
          
          this.uploads[rowIndex].push({
            id: uploadResp.filePath || uploadResp.fileUrl,
            fileType: uploadResp.fileType || file.type,
            fileName: this.getFileName(uploadResp.filePath || uploadResp.fileUrl),
            loaded: true
          });
          
          if (!testCase.uploads) testCase.uploads = [];
          testCase.uploads.push(uploadResp.filePath || uploadResp.fileUrl);
          this.cdRef.detectChanges();
        },
        error: err => {
          const tempIndex = this.uploads[rowIndex].findIndex(u => u.id.startsWith('temp-'));
          if (tempIndex !== -1) {
            this.uploads[rowIndex].splice(tempIndex, 1);
          }
          this.showAlertMessage('Upload failed: ' + (err.message || 'Unknown error'), 'error');
          this.cdRef.detectChanges();
        }
      });
  }

  input.value = '';
}
  onImageLoad(event: Event, rowIndex: number, fileIndex: number): void {
    if (this.uploads[rowIndex] && this.uploads[rowIndex][fileIndex]) {
      this.uploads[rowIndex][fileIndex].loaded = true;
      this.cdRef.detectChanges();
    }
  }

removeUpload(rowIndex: number, fileIndex: number): void {
  const upload = this.uploads[rowIndex]?.[fileIndex];
  if (!upload) {
    this.showAlertMessage('Upload not found', 'error');
    return;
  }

  // If we're in suite/run context, use the suite deletion method
  if (this.showTestSuites || this.showTestRuns) {
    this.deleteSuiteUpload(rowIndex, fileIndex, upload.id);
  } else {
    // For module context, just remove from UI (legacy behavior)
    if (this.uploads[rowIndex]) {
      this.uploads[rowIndex].splice(fileIndex, 1);
      this.cdRef.detectChanges();
    }
  }
}

  // removed legacy isImage(url)

  getFileName(url: any): string {
  if (!url || typeof url !== 'string') return '';
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const filenamePart = lastPart.split(';')[0];
  return filenamePart.length > 20 
    ? filenamePart.substring(0, 17) + '...' 
    : filenamePart;
}

  // Popup methods
  openPopup(index: number, field: 'actual' | 'remarks', event: MouseEvent): void {
    event.stopPropagation();

    if (!(this.isPopupOpen && this.popupIndex === index && this.popupField === field)) {
      if (this.popupIndex !== null) {
        this.closePopup(this.popupIndex);
      }
      
      this.popupIndex = index;
      this.popupField = field;
      this.isPopupOpen = true;

      setTimeout(() => {
        document.addEventListener('click', this.boundHandleClick);
      });
    }
  }

  saveAndClosePopup(index: number): void {
    if (this.popupIndex === index) {
      this.cdRef.detectChanges();
      this.closePopup(index);
    }
  }

  closePopup(index: number): void {
    if (this.popupIndex === index) {
      this.isPopupOpen = false;
      this.popupIndex = null;
      this.popupField = null;
      document.removeEventListener('click', this.boundHandleClick);
      this.cdRef.detectChanges();
    }
  }

  private handleDocumentClick(event: MouseEvent): void {
    if (this.isPopupOpen && this.popupIndex !== null) {
      const target = event.target as HTMLElement;
      const isInsidePopup = target.closest('.popup-box');
      const isPopupTrigger = target.closest('.popup-cell');
      
      if (!isInsidePopup && !isPopupTrigger) {
        this.closePopup(this.popupIndex);
      }
    }
  }

  // Table scroll and resize methods
  scrollTable(offset: number): void {
    if (!this.scrollContainer) return;
    this.scrollContainer.scrollLeft += offset;
    this.updateScrollButtons();
  }

  updateScrollButtons(): void {
    if (!this.scrollContainer) return;
    const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
    this.canScrollLeft = scrollLeft > 0;
    this.canScrollRight = scrollLeft + clientWidth < scrollWidth;
    this.cdRef.detectChanges();
  }

  startResize(event: MouseEvent, column: TableColumn): void {
    if (column.noResize) return;

    this.isResizing = true;
    this.currentResizeColumn = column;
    this.startX = event.pageX;
    this.startWidth = column.width;

    event.preventDefault();
    event.stopPropagation();

    document.addEventListener('mousemove', this.boundOnResize);
    document.addEventListener('mouseup', this.boundStopResize);
  }

  onResize(event: MouseEvent): void {
    if (this.isResizing && this.currentResizeColumn) {
      const dx = event.pageX - this.startX;
      this.currentResizeColumn.width = Math.max(50, this.startWidth + dx);
      this.cdRef.detectChanges();
    }
  }

  stopResize(): void {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.boundOnResize);
    document.removeEventListener('mouseup', this.boundStopResize);
  }

  // Utility methods
  /**
   * Copy a link to the clipboard that will open the test case viewer for the given test case.
   * The link will include both moduleId and testCaseId for correct routing, and productId as a query param.
   * @param testCaseId The test case's id (database id, not testCaseId string)
   */
  copyTestCaseLink(testCaseId: string, moduleId: string): void {
    const productId = this.selectedProductId();
    let url = `${window.location.origin}/tester/public-view/${moduleId}/${testCaseId}`;
    if (productId) {
      url += `?productId=${productId}`;
    }
    navigator.clipboard.writeText(url)
      .then(() => {
        this.showAlertMessage('Link copied to clipboard!', 'success');
      })
      .catch(() => {
        this.showAlertMessage('Failed to copy link', 'error');
      });
  }

  backToSuiteList(): void {
    this.showStartTesting = false;
    this.showViewTestCases = false;
    this.formArray.clear();
    this.uploads = [];
    this.selectedSuiteIds = [];
    this.allSuitesSelected = false;
  }

  // Progress methods for test runs
  getRunCompletionPercentage(): number {
    if (!this.selectedTestRunId()) return 0;
    
    const total = this.testRunProgress().total;
    const completed = this.testRunProgress().completed;
    
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  getCompletedCaseCount(): number {
    return this.testRunProgress().completed;
  }

  getTotalCaseCount(): number {
    return this.testRunProgress().total;
  }

  // Alert methods
  showAlertMessage(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
    
    this.alertTimeout = setTimeout(() => {
      this.showAlert = false;
      this.cdRef.detectChanges();
    }, this.alertDuration);
  }

  onAlertClose(): void {
    this.showAlert = false;
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }

  onSaveSuccessAlertClose(): void {
    this.showSaveSuccessAlert = false;
    if (this.saveAlertTimeout) {
      clearTimeout(this.saveAlertTimeout);
    }
  }

  // Additional utility methods for attribute management
  onAttributeFilterChange(): void {
    this.cdRef.detectChanges();
  }

  getAvailableAttributeKeys(): string[] {
    return this.availableAttributes;
  }

  addAttributeFilter(key: string): void {
    this.filter.attributeKey = key;
    this.filter.attributeValue = '';
  }

  removeAttributeFilter(): void {
    this.filter.attributeKey = undefined;
    this.filter.attributeValue = undefined;
  }

  hasAttributeFilter(): boolean {
    return !!this.filter.attributeKey;
  }

  getAttributeValues(key: string): string[] {
    const values = new Set<string>();
    this.versionTestCases().forEach(tc => {
      const attr = tc.attributes?.find(a => a.key === key);
      if (attr && attr.value) {
        values.add(attr.value);
      }
    });
    return Array.from(values).sort();
  }

  toggleAttributeColumn(key: string): void {
    const exists = this.attributeColumns.some(col => col.field === `attr_${key}`);
    if (exists) {
      this.removeAttributeColumn(key);
    } else {
      this.addAttributeColumn(key);
    }
  }

  isAttributeColumnVisible(key: string): boolean {
    return this.attributeColumns.some(col => col.field === `attr_${key}`);
  }

  getAllViewColumns(): TableColumn[] {
    return [...this.viewColumns, ...this.attributeColumns];
  }

  getAllTestColumns(): TableColumn[] {
    return [...this.testColumns, ...this.attributeColumns];
  }

  getModuleName(moduleId: string): string {
    const module = this.modules().find(m => m.id === moduleId);
    return module?.name || 'Unknown Module';
  }

  hasTestCasesWithAttributes(): boolean {
    return this.versionTestCases().some(tc => tc.attributes && tc.attributes.length > 0);
  }

  getAttributeStats(): { [key: string]: { [value: string]: number } } {
    const stats: { [key: string]: { [value: string]: number } } = {};
    
    this.versionTestCases().forEach(tc => {
      tc.attributes?.forEach(attr => {
        if (!stats[attr.key]) {
          stats[attr.key] = {};
        }
        if (!stats[attr.key][attr.value]) {
          stats[attr.key][attr.value] = 0;
        }
        stats[attr.key][attr.value]++;
      });
    });
    
    return stats;
  }

  exportTestCasesWithAttributes(): void {
    const cases = this.filteredAndSearchedTestCases();
    const csvContent = this.generateCsvContent(cases);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test_cases_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private generateCsvContent(testCases: TestCase[]): string {
    const headers = [
      'Test Case ID', 'Use Case', 'Scenario', 'Version', 'Result', 'Actual', 'Remarks'
    ];
    
    // Add attribute headers
    this.availableAttributes.forEach(attr => {
      headers.push(`Attribute: ${attr}`);
    });

    const rows = testCases.map(tc => {
      const row = [
        tc.testCaseId,
        tc.useCase,
        tc.scenario,
        tc.version,
        tc.result || 'Pending',
        tc.actual || '',
        tc.remarks || ''
      ];

      // Add attribute values
      this.availableAttributes.forEach(attr => {
        row.push(this.getAttributeValue(tc, attr));
      });

      return row.map(cell => {
        // Handle undefined or null values by converting them to empty string
        const cellValue = cell !== undefined && cell !== null ? cell.toString() : '';
        return `"${cellValue.replace(/"/g, '""')}"`;
      }).join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  clearAllFilters(): void {
    this.filter = {
      slNo: '',
      testCaseId: '',
      useCase: '',
      result: '',
      attributeKey: undefined,
      attributeValue: undefined
    };
  }

  hasActiveFilters(): boolean {
    return !!(
      this.filter.slNo ||
      this.filter.testCaseId ||
      this.filter.useCase ||
      this.filter.result ||
      this.filter.attributeKey ||
      this.filter.attributeValue
    );
  }
  /**
   * Upload a file for a test suite test case and update the UI state.
   * @param file The file to upload
   * @param suiteId The test suite ID
   * @param testCaseId The test case ID (DB id)
   * @param rowIndex The row index in the table (for UI state)
   */
uploadTes(file: File, suiteId: string, testCaseId: string, rowIndex: number): void {
  if (!file || !suiteId || !testCaseId) {
    this.showAlertMessage('Missing file, suite, or test case information', 'error');
    return;
  }
  
  if (!this.uploads[rowIndex]) this.uploads[rowIndex] = [];
  
  // Add a temporary upload object
  this.uploads[rowIndex].push({ 
    id: 'temp-' + Date.now(), 
    fileType: file.type, 
    fileName: file.name, 
    loaded: false 
  });
  
  this.testSuiteService.uploadTestCaseFile(suiteId, testCaseId, file, 'frontend-user')
    .subscribe({
      next: (uploadResp: any) => {
        // Find and update the temporary upload
        const tempIndex = this.uploads[rowIndex].findIndex(u => u.id.startsWith('temp-'));
        if (tempIndex !== -1) {
          this.uploads[rowIndex][tempIndex] = {
            id: uploadResp.id,
            fileType: uploadResp.fileType || file.type,
            fileName: uploadResp.fileName || file.name,
            loaded: true
          };
        }
        
        // Update the test case uploads array
        const testCase = this.versionTestCases()[rowIndex];
        if (testCase) {
          if (!testCase.uploads) testCase.uploads = [];
          testCase.uploads.push(uploadResp.id);
        }
        
        this.cdRef.detectChanges();
      },
      error: err => {
        // Remove the temporary upload on error
        this.uploads[rowIndex] = this.uploads[rowIndex].filter(u => !u.id.startsWith('temp-'));
        this.showAlertMessage('Upload failed: ' + err.message, 'error');
        this.cdRef.detectChanges();
      }
    });
}
    /**
   * Handles file input change for suite/run context and calls uploadTes.
   */
  onSuiteUpload(event: Event, rowIndex: number, testCaseId: string): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      let suiteId = this.showTestSuites ? this.selectedModule() : (this.showTestRuns && this.selectedSuiteIds.length === 1 ? this.selectedSuiteIds[0] : '');
      if (!suiteId) suiteId = '';
      this.uploadTes(input.files[0], suiteId, testCaseId, rowIndex);
      input.value = '';
    }
  }
  getTestSuiteUploadUrl(uploadId: string, suiteId: string): string {
  return `/api/testsuites/${suiteId}/testcases/uploads/${uploadId}`;
}
deleteSuiteUpload(rowIndex: number, fileIndex: number, uploadId: string): void {
  console.log('Attempting to delete upload:', { rowIndex, fileIndex, uploadId });
  
  if (!uploadId || uploadId.trim() === '') {
    this.showAlertMessage('Upload ID is missing or invalid', 'error');
    return;
  }

  // Determine the suite ID based on context
  let suiteId = '';
  
  if (this.showTestSuites && this.selectedModule()) {
    suiteId = this.selectedModule()!;
  } else if (this.showTestRuns && this.selectedSuiteIds.length === 1) {
    suiteId = this.selectedSuiteIds[0];
  }

  if (!suiteId) {
    this.showAlertMessage('Cannot determine test suite context for deletion', 'error');
    return;
  }

  console.log('Deleting upload with suite ID:', suiteId, 'upload ID:', uploadId);

  // Use the correct API endpoint: DELETE /api/testsuites/{testSuiteId}/testcases/uploads/{uploadId}
  this.testSuiteService.deleteExecutionUpload(suiteId, uploadId).subscribe({
    next: () => {
      // Remove from UI uploads array
      if (this.uploads[rowIndex] && this.uploads[rowIndex][fileIndex]) {
        this.uploads[rowIndex].splice(fileIndex, 1);
      }
      
      // Remove from test case uploads array
      const testCase = this.versionTestCases()[rowIndex];
      if (testCase?.uploads) {
        testCase.uploads = testCase.uploads.filter((id: string) => id !== uploadId);
      }
      
      // Also remove from execution details if present
      if (testCase?.executionDetails?.uploads) {
        testCase.executionDetails.uploads = testCase.executionDetails.uploads.filter(
          (upload: any) => upload.id !== uploadId
        );
      }
      
      this.cdRef.detectChanges();
      this.showAlertMessage('Upload deleted successfully', 'success');
      console.log('Upload deleted successfully');
    },
    error: err => {
      console.error('Failed to delete upload:', err);
      this.showAlertMessage('Failed to delete upload: ' + (err.message || 'Unknown error'), 'error');
    }
  });
}

  isImage(fileType: string | undefined): boolean {
    return typeof fileType === 'string' && fileType.startsWith('image/');
  }
  debugUploads(): void {
  console.log('=== UPLOADS DEBUG INFO ===');
  this.versionTestCases().forEach((testCase, index) => {
    console.log(`Test Case ${index}:`, testCase.testCaseId);
    console.log('  - Execution Details:', testCase.executionDetails);
    console.log('  - Uploads from API:', testCase.uploads);
    console.log('  - Component Uploads:', this.uploads[index]);
  });
  console.log('=== END UPLOADS DEBUG ===');
}
private groupAndSortTestCasesByModule(testCases: TestCase[]): TestCase[] {
  // Group test cases by moduleId
  const groupedByModule: { [moduleId: string]: TestCase[] } = {};
  
  testCases.forEach(testCase => {
    const moduleId = testCase.moduleId || 'unknown';
    if (!groupedByModule[moduleId]) {
      groupedByModule[moduleId] = [];
    }
    groupedByModule[moduleId].push(testCase);
  });

  // Sort each module group numerically by testCaseId
  Object.keys(groupedByModule).forEach(moduleId => {
    groupedByModule[moduleId].sort((a, b) => {
      const extractNumber = (testCaseId: string | undefined): number => {
        if (!testCaseId) return 0;
        const match = testCaseId.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const numA = extractNumber(a.testCaseId);
      const numB = extractNumber(b.testCaseId);
      return numA - numB;
    });
  });

  // Get module names for sorting (sort modules alphabetically)
  const sortedModules = Object.keys(groupedByModule).sort((a, b) => {
    const moduleA = this.getModuleName(a);
    const moduleB = this.getModuleName(b);
    return moduleA.localeCompare(moduleB);
  });

  // Flatten the grouped array back to single array
  const result: TestCase[] = [];
  sortedModules.forEach(moduleId => {
    result.push(...groupedByModule[moduleId]);
  });

  return result;
}
}