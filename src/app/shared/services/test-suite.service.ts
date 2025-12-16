import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../../services/app-config.service';
import { 
  TestSuite, 
  TestSuiteResponse, 
  TestSuiteWithCasesResponse, 
  CreateTestSuiteRequest,
  AssignTestCasesRequest,
  TestSuiteTestCaseItem
} from '../modles/test-suite.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { IdResponse } from '../modles/product.model';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteService {
  private apiUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.apiUrl = `${this.appConfig.apiUrl}`;
    console.log('TestSuiteService initialized with API URL:', this.apiUrl);
  }

 // In your test-suite.service.ts
getTestSuites(productId: string): Observable<TestSuiteResponse[]> {
  if (!productId?.trim()) {
    return throwError(() => new Error('Product ID is required'));
  }
  
  const url = `${this.apiUrl}/api/products/${productId}/testsuites`;
  
  return this.http.get<TestSuiteResponse[]>(url, this.httpOptions).pipe(
    map(response => {
      if (!response) return [];
      return response.map(suite => ({
        ...suite,
        testCaseCount: suite.testCases?.length || 0
      }));
    }),
    catchError(this.handleError('getTestSuites'))
  );
}

  getTestSuiteById(productId: string, id: string): Observable<TestSuiteResponse> {
    if (!productId?.trim() || !id?.trim()) {
      return throwError(() => new Error('Product ID and Test Suite ID are required'));
    }
    
    const url = `${this.apiUrl}/api/products/${productId}/testsuites/${id}`;
    console.log('Fetching test suite by ID from:', url);
    
    return this.http.get<TestSuiteResponse>(url, this.httpOptions).pipe(
      tap(response => {
        console.log('Test suite by ID response:', response);
      }),
      catchError(this.handleError('getTestSuiteById'))
    );
  }

  // Execution details and uploads for TestSuite test cases
  getExecutionDetails(testSuiteId: string, testCaseId: string): Observable<any> {
    if (!testSuiteId?.trim() || !testCaseId?.trim()) {
      return throwError(() => new Error('Test Suite ID and Test Case ID are required'));
    }
    const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases/${testCaseId}/execution`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError('getExecutionDetails'))
    );
  }

  updateExecutionDetails(testSuiteId: string, testCaseId: string, request: { result?: string; actual?: string; remarks?: string; }): Observable<void> {
    if (!testSuiteId?.trim() || !testCaseId?.trim()) {
      return throwError(() => new Error('Test Suite ID and Test Case ID are required'));
    }
    const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases/${testCaseId}/execution`;
    return this.http.put<void>(url, request, this.httpOptions).pipe(
      catchError(this.handleError('updateExecutionDetails'))
    );
  }

  addExecutionUpload(testSuiteId: string, testCaseId: string, request: { fileName: string; filePath: string; fileType?: string; fileSize: number; uploadedBy?: string; }): Observable<void> {
    if (!testSuiteId?.trim() || !testCaseId?.trim()) {
      return throwError(() => new Error('Test Suite ID and Test Case ID are required'));
    }
    const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases/${testCaseId}/uploads`;
    return this.http.post<void>(url, request, this.httpOptions).pipe(
      catchError(this.handleError('addExecutionUpload'))
    );
  }

  // deleteExecutionUpload(testSuiteId: string, uploadId: string): Observable<void> {
  //   if (!testSuiteId?.trim() || !uploadId?.trim()) {
  //     return throwError(() => new Error('Test Suite ID and Upload ID are required'));
  //   }
  //   const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases/uploads/${uploadId}`;
  //   return this.http.delete<void>(url, this.httpOptions).pipe(
  //     catchError(this.handleError('deleteExecutionUpload'))
  //   );
  // }

  getTestSuiteWithCases(testSuiteId: string): Observable<TestSuiteWithCasesResponse> {
    if (!testSuiteId?.trim()) {
      return throwError(() => new Error('Test Suite ID is required'));
    }
    
    const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases`;
    console.log('Fetching test suite with cases from:', url);
    
    return this.http.get<any>(url, this.httpOptions).pipe(
      tap(response => {
        console.log('Raw test suite with cases response:', response);
      }),
      map(response => {
        // Handle the response structure properly
        if (!response) {
          return {
            id: testSuiteId,
            productId: '',
            name: '',
            description: '',
            isActive: true,
            testCases: []
          } as TestSuiteWithCasesResponse;
        }

        // Map the response to the expected structure
        const mappedResponse: TestSuiteWithCasesResponse = {
          id: response.id || testSuiteId,
          productId: response.productId || '',
          name: response.name || '',
          description: response.description || '',
          isActive: response.isActive !== false,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          testCases: []
        };

        // Handle test cases mapping
        if (response.testCases && Array.isArray(response.testCases)) {
          mappedResponse.testCases = response.testCases.map((item: any) => {
            // Handle both possible response structures
            if (item.testCase && item.executionDetails) {
              // Structure: { testCase: {...}, executionDetails: {...} }
              return {
                testCase: item.testCase,
                executionDetails: item.executionDetails
              } as TestSuiteTestCaseItem;
            } else if (item.id && (item.useCase || item.scenario)) {
              // Structure: direct test case object
              return {
                testCase: item,
                executionDetails: item.executionDetails || {}
              } as TestSuiteTestCaseItem;
            } else {
              console.warn('Unexpected test case structure:', item);
              return {
                testCase: item,
                executionDetails: {}
              } as TestSuiteTestCaseItem;
            }
          });
        }

        console.log('Mapped test suite with cases:', mappedResponse);
        return mappedResponse;
      }),
      catchError(this.handleError('getTestSuiteWithCases'))
    );
  }

  createTestSuite(productId: string, suite: CreateTestSuiteRequest): Observable<IdResponse> {
    if (!productId?.trim()) {
      return throwError(() => new Error('Product ID is required'));
    }
    
    if (!suite.name?.trim()) {
      return throwError(() => new Error('Test suite name is required'));
    }
    
    const cleanRequest: CreateTestSuiteRequest = {
      name: suite.name.trim(),
      description: suite.description?.trim() || '',
      isActive: suite.isActive !== false
    };
    
    const url = `${this.apiUrl}/api/products/${productId}/testsuites`;
    console.log('Creating test suite at:', url, 'with request:', cleanRequest);
    
    return this.http.post<IdResponse>(url, cleanRequest, this.httpOptions).pipe(
      tap(response => {
        console.log('Test suite created successfully:', response);
      }),
      catchError(this.handleError('createTestSuite'))
    );
  }

  updateTestSuite(productId: string, id: string, suite: CreateTestSuiteRequest): Observable<void> {
    if (!productId?.trim() || !id?.trim()) {
      return throwError(() => new Error('Product ID and Test Suite ID are required'));
    }
    
    if (!suite.name?.trim()) {
      return throwError(() => new Error('Test suite name is required'));
    }
    
    const cleanRequest: CreateTestSuiteRequest = {
      name: suite.name.trim(),
      description: suite.description?.trim() || '',
      isActive: suite.isActive !== false
    };
    
    const url = `${this.apiUrl}/api/products/${productId}/testsuites/${id}`;
    console.log('Updating test suite at:', url, 'with request:', cleanRequest);
    
    return this.http.put<void>(url, cleanRequest, this.httpOptions).pipe(
      tap(() => {
        console.log('Test suite updated successfully');
      }),
      catchError(this.handleError('updateTestSuite'))
    );
  }

deleteTestSuite(
  productId: string,
  testSuiteId: string,
  forceDelete: boolean = false
): Observable<void> {

  if (!productId?.trim() || !testSuiteId?.trim()) {
    return throwError(() =>
      new Error('Product ID and Test Suite ID are required')
    );
  }

  const url = `${this.apiUrl}/api/products/${productId}/testsuites/${testSuiteId}`;
  const options = {
    ...this.httpOptions,
    params: { forceDelete: forceDelete.toString() }
  };

  console.log(
    'Deleting test suite at:',
    url,
    'with forceDelete:',
    forceDelete
  );

  return this.http.delete<void>(url, options).pipe(
    tap(() => {
      console.log('Test suite deleted successfully');
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Delete test suite error:', error);

      // ✅ DO NOT MODIFY THE ERROR
      // ✅ DO NOT WRAP IT
      // ✅ PASS IT AS IS
      return throwError(() => error);
    })
  );
}

  // Add this method to TestSuiteService
// In your TestSuiteService
// Alternative method using Base64 endpoint
// Alternative method using Base64 endpoint
uploadTestCaseFile(suiteId: string, testCaseId: string, file: File, uploadedBy: string): Observable<any> {
  if (!suiteId?.trim() || !testCaseId?.trim()) {
    return throwError(() => new Error('Suite ID and Test Case ID are required'));
  }

  return new Observable<any>(observer => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      
      const payload = {
        fileName: file.name,
        filePath: `C:\\Uploads\\${file.name}`, // Temporary path
        fileType: file.type,
        fileSize: file.size,
        uploadedBy: uploadedBy || 'frontend-user'
      };

      // Use the direct suite upload endpoint from your API documentation
      const url = `${this.apiUrl}/api/testsuites/${suiteId}/testcases/${testCaseId}/uploads`;
      console.log('Uploading to:', url, 'with payload:', payload);

      this.http.post<any>(url, payload, this.httpOptions).subscribe({
        next: (response) => {
          console.log('Upload response:', response);
          // The response should contain uploadId according to your API documentation
          observer.next({
            uploadId: response.uploadId,
            id: response.uploadId, // Also set id for backward compatibility
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size
          });
          observer.complete();
        },
        error: (err) => {
          console.error('Upload error:', err);
          observer.error(err);
        }
      });
    };
    
    reader.onerror = (err) => observer.error(err);
    reader.readAsDataURL(file);
  });
}

private associateUploadWithTestCase(suiteId: string, testCaseId: string, uploadId: string): Observable<void> {
  const request = {
    fileName: '', // This will be filled by backend from the upload
    filePath: '', // This will be filled by backend from the upload
    fileType: '', // This will be filled by backend from the upload
    fileSize: 0,  // This will be filled by backend from the upload
    uploadedBy: 'frontend-user'
  };

  return this.http.post<void>(
    `${this.apiUrl}/api/testsuites/${suiteId}/testcases/${testCaseId}/uploads`,
    request,
    this.httpOptions
  );
}

deleteExecutionUpload(testSuiteId: string, uploadId: string): Observable<void> {
  if (!testSuiteId?.trim()) {
    return throwError(() => new Error('Test Suite ID is required'));
  }
  
  if (!uploadId?.trim()) {
    return throwError(() => new Error('Upload ID is required'));
  }
  
  // Use the correct API endpoint from your documentation
  const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases/uploads/${uploadId}`;
  console.log('Deleting upload from:', url);
  
  return this.http.delete<void>(url, this.httpOptions).pipe(
    tap(() => {
      console.log('Upload deleted successfully:', uploadId);
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Delete upload error:', error);
      
      let errorMessage = 'Failed to delete upload';
      
      if (error.status === 404) {
        errorMessage = 'Upload not found or already deleted';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Invalid upload ID or test suite ID';
      } else if (error.status === 500) {
        errorMessage = 'Server error while deleting upload';
      } else if (error.status === 0) {
        errorMessage = 'Network error - please check your connection';
      }
      
      return throwError(() => new Error(errorMessage));
    })
  );
}
getTestSuiteUploadUrl(uploadId: string, suiteId: string): string {
  return `${this.apiUrl}/api/uploads/${uploadId}`;
}

  assignTestCasesToSuite(testSuiteId: string, request: AssignTestCasesRequest): Observable<void> {
    if (!testSuiteId?.trim()) {
      return throwError(() => new Error('Test Suite ID is required'));
    }
    
    if (!request.testCaseIds || !Array.isArray(request.testCaseIds) || request.testCaseIds.length === 0) {
      return throwError(() => new Error('At least one test case ID is required'));
    }

    const validTestCaseIds = request.testCaseIds.filter((id: string) => id?.trim());
    
    if (validTestCaseIds.length === 0) {
      return throwError(() => new Error('No valid test case IDs provided'));
    }

    const cleanRequest: AssignTestCasesRequest = {
      testCaseIds: validTestCaseIds
    };

    const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases`;
    console.log('Assigning test cases to suite at:', url, 'with request:', cleanRequest);
    
    return this.http.post<void>(url, cleanRequest, this.httpOptions).pipe(
      tap(() => {
        console.log('Test cases assigned successfully to suite:', testSuiteId);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error assigning test cases:', error);
        
        let errorMessage = 'Failed to assign test cases';
        
        if (error.status === 400) {
          errorMessage = error.error?.message || error.error?.error || 'Bad request - check test case IDs';
        } else if (error.status === 404) {
          errorMessage = 'Test suite not found';
        } else if (error.status === 409) {
          errorMessage = error.error?.message || 'Conflict - some test cases may already be assigned';
        } else if (error.status === 500) {
          errorMessage = 'Server error occurred while assigning test cases';
        } else if (error.status === 0) {
          errorMessage = 'Network error - please check your connection';
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  removeTestCaseFromSuite(testSuiteId: string, testCaseId: string): Observable<void> {
    if (!testSuiteId?.trim() || !testCaseId?.trim()) {
      return throwError(() => new Error('Test Suite ID and Test Case ID are required'));
    }
    
    const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases/${testCaseId}`;
    console.log('Removing test case from suite at:', url);
    
    return this.http.delete<void>(url, this.httpOptions).pipe(
      tap(() => {
        console.log('Test case removed from suite successfully');
      }),
      catchError(this.handleError('removeTestCaseFromSuite'))
    );
  }

  removeAllTestCasesFromSuite(testSuiteId: string): Observable<void> {
    if (!testSuiteId?.trim()) {
      return throwError(() => new Error('Test Suite ID is required'));
    }
    
    const url = `${this.apiUrl}/api/testsuites/${testSuiteId}/testcases`;
    console.log('Removing all test cases from suite at:', url);
    
    return this.http.delete<void>(url, this.httpOptions).pipe(
      tap(() => {
        console.log('All test cases removed from suite successfully');
      }),
      catchError(this.handleError('removeAllTestCasesFromSuite'))
    );
  }

  updateTestSuiteTestCases(testSuiteId: string, testCaseIds: string[]): Observable<void> {
    if (!testSuiteId?.trim()) {
      return throwError(() => new Error('Test Suite ID is required'));
    }

    console.log('Updating test suite test cases:', testSuiteId, testCaseIds);

    // First remove all existing test cases
    return this.removeAllTestCasesFromSuite(testSuiteId).pipe(
      // Then add the new test cases if any
      tap(() => {
        if (testCaseIds && testCaseIds.length > 0) {
          console.log('Removed all test cases, now assigning new ones:', testCaseIds);
        } else {
          console.log('Removed all test cases, no new ones to assign');
        }
      }),
      // Chain the assignment if we have test cases to add
      catchError(error => {
        console.error('Error removing test cases:', error);
        // Continue even if removal fails (might be empty already)
        return new Observable<void>(observer => {
          observer.next();
          observer.complete();
        });
      })
    ).pipe(
      // Now assign new test cases if provided
      tap(() => {
        if (testCaseIds?.length > 0) {
          this.assignTestCasesToSuite(testSuiteId, { testCaseIds }).subscribe({
            next: () => console.log('Successfully assigned new test cases'),
            error: (error) => console.error('Error assigning new test cases:', error)
          });
        }
      })
    );
  }

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed:`, error);
      let userMessage = `${operation} failed`;
      
      if (error.error instanceof ErrorEvent) {
        userMessage = `Network error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 0:
            userMessage = 'Network error - please check your connection';
            break;
          case 400:
            userMessage = error.error?.message || error.error?.error || 'Bad request';
            break;
          case 401:
            userMessage = 'Unauthorized - please login again';
            break;
          case 403:
            userMessage = 'Forbidden - insufficient permissions';
            break;
          case 404:
            userMessage = 'Resource not found';
            break;
          case 409:
            userMessage = error.error?.message || error.error?.error || 'Conflict occurred';
            break;
          case 500:
            userMessage = 'Internal server error';
            break;
          default:
            userMessage = error.error?.message || error.message || `Server error (${error.status})`;
        }
      }
      return throwError(() => new Error(userMessage));
    };
  }


}