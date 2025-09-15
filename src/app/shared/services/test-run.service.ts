import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/app-config.service';
import { 
  TestRun, 
  TestRunResponse, 
  CreateTestRunRequest,
  TestRunResultResponse,
  AssignTestSuitesRequest,
  TestRunStatus
} from '../modles/test-run.model';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { IdResponse } from '../modles/product.model';

@Injectable({
  providedIn: 'root'
})
export class TestRunService {
  private apiUrl: string;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.apiUrl = `${this.appConfig.apiUrl}/api`;
  }

  getTestRuns(productId: string): Observable<TestRunResponse[]> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }
    
    return this.http.get<TestRunResponse[]>(
      `${this.apiUrl}/products/${productId}/testruns`
    ).pipe(
      switchMap((runs: TestRunResponse[]) => {
        if (!runs || runs.length === 0) return of([]);
        const withSuites$ = runs.map(run => this.getAssignedTestSuites(run.id!).pipe(
          catchError(() => of([] as any)),
          map((suites: any) => ({ ...run, testSuites: suites as any }))
        ));
        return forkJoin(withSuites$);
      }),
      catchError(error => {
        console.error('Error fetching test runs:', error);
        return throwError(() => new Error('Failed to fetch test runs'));
      })
    );
  }

  getTestRunById(productId: string, id: string): Observable<TestRunResponse> {
    if (!productId || !id) {
      return throwError(() => new Error('Product ID and Test Run ID are required'));
    }
    
    return this.http.get<TestRunResponse>(
      `${this.apiUrl}/products/${productId}/testruns/${id}`
    ).pipe(
      switchMap((run: TestRunResponse) =>
        this.getAssignedTestSuites(id).pipe(
          catchError(() => of([] as any)),
          map(suites => ({ ...run, testSuites: suites as any }))
        )
      ),
      catchError(error => {
        console.error('Error fetching test run:', error);
        return throwError(() => new Error('Failed to fetch test run'));
      })
    );
  }

  createTestRun(productId: string, run: CreateTestRunRequest): Observable<IdResponse> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }
    
    return this.http.post<IdResponse>(
      `${this.apiUrl}/products/${productId}/testruns`, 
      run
    ).pipe(
      catchError(error => {
        console.error('Error creating test run:', error);
        return throwError(() => new Error('Failed to create test run'));
      })
    );
  }

  deleteTestRun(productId: string, id: string): Observable<void> {
    if (!productId || !id) {
      return throwError(() => new Error('Product ID and Test Run ID are required'));
    }
    
    return this.http.delete<void>(
      `${this.apiUrl}/products/${productId}/testruns/${id}`
    ).pipe(
      catchError(error => {
        console.error('Error deleting test run:', error);
        return throwError(() => new Error('Failed to delete test run'));
      })
    );
  }

  updateTestRunStatus(
    productId: string, 
    testRunId: string, 
    status: TestRunStatus
  ): Observable<void> {
    if (!productId || !testRunId) {
      return throwError(() => new Error('Product ID and Test Run ID are required'));
    }
    
    return this.http.put<void>(
      `${this.apiUrl}/products/${productId}/testruns/${testRunId}/status`,
      status
    ).pipe(
      catchError(error => {
        console.error('Error updating test run status:', error);
        return throwError(() => new Error('Failed to update test run status'));
      })
    );
  }

  getTestRunResults(testRunId: string): Observable<TestRunResultResponse[]> {
    if (!testRunId) {
      return throwError(() => new Error('Test Run ID is required'));
    }
    
    return this.http.get<TestRunResultResponse[]>(
      `${this.apiUrl}/testruns/${testRunId}/results`
    ).pipe(
      catchError(error => {
        console.error('Error fetching test run results:', error);
        return throwError(() => new Error('Failed to fetch test run results'));
      })
    );
  }

  addTestRunResult(
    testRunId: string, 
    result: TestRunResultResponse
  ): Observable<void> {
    if (!testRunId) {
      return throwError(() => new Error('Test Run ID is required'));
    }
    
    return this.http.post<void>(
      `${this.apiUrl}/testruns/${testRunId}/results`, 
      result
    ).pipe(
      catchError(error => {
        console.error('Error adding test run result:', error);
        return throwError(() => new Error('Failed to add test run result'));
      })
    );
  }

  assignTestSuitesToRun(
    testRunId: string, 
    request: AssignTestSuitesRequest
  ): Observable<void> {
    if (!testRunId) {
      return throwError(() => new Error('Test Run ID is required'));
    }
    
    return this.http.post<void>(
      `${this.apiUrl}/testruns/${testRunId}/testsuites`, 
      request
    ).pipe(
      catchError(error => {
        console.error('Error assigning test suites:', error);
        return throwError(() => new Error('Failed to assign test suites'));
      })
    );
  }

  removeTestSuiteFromRun(
    testRunId: string, 
    testSuiteId: string
  ): Observable<void> {
    if (!testRunId || !testSuiteId) {
      return throwError(() => new Error('Test Run ID and Test Suite ID are required'));
    }
    
    return this.http.delete<void>(
      `${this.apiUrl}/testruns/${testRunId}/testsuites/${testSuiteId}`
    ).pipe(
      catchError(error => {
        console.error('Error removing test suite:', error);
        return throwError(() => new Error('Failed to remove test suite'));
      })
    );
  }

  updateTestRun(
    productId: string,
    testRunId: string,
    _run: CreateTestRunRequest,
    status: { status: TestRunStatus }
  ): Observable<void> {
    return this.updateTestRunStatus(productId, testRunId, status.status);
  }

// In your test-run.service.ts
getAssignedTestSuites(testRunId: string): Observable<any[]> {
  if (!testRunId) {
    return throwError(() => new Error('Test Run ID is required'));
  }
  
  return this.http.get<any[]>(
    `${this.apiUrl}/testruns/${testRunId}/testsuites`
  ).pipe(
    map(suites => suites.map(suite => ({
      ...suite,
      testCaseCount: suite.testCases?.length || 0
    }))),
    catchError(error => {
      console.error('Error fetching assigned test suites:', error);
      return throwError(() => new Error('Failed to fetch assigned test suites'));
    })
  );
}

  assignTestSuites(testRunId: string, suiteIds: string[]): Observable<void> {
    if (!testRunId) {
      return throwError(() => new Error('Test Run ID is required'));
    }
    
    return this.http.post<void>(
      `${this.apiUrl}/testruns/${testRunId}/testsuites`,
      { testSuiteIds: suiteIds }
    ).pipe(
      catchError(error => {
        console.error('Error assigning test suites:', error);
        return throwError(() => new Error('Failed to assign test suites'));
      })
    );
  }
}