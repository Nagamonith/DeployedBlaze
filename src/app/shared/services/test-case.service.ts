import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../../services/app-config.service';
import { 
  TestCase, 
  TestCaseResponse, 
  TestCaseDetailResponse, 
  CreateTestCaseRequest, 
  UpdateTestCaseRequest,
  ManualTestCaseStep,
  TestCaseAttribute,
  TestCaseAttributeRequest,
  TestCaseAttributeResponse,
  ProductVersion
} from '../modles/test-case.model';
import { map, Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { IdResponse, ProductVersionResponse, VersionOption } from '../modles/product.model';
import { CreateModuleRequest, ProductModule, UpdateModuleRequest } from '../modles/module.model';
import { ModuleService } from './module.service';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private moduleService: ModuleService,
    private appConfig: AppConfigService
  ) {
    this.apiUrl = `${this.appConfig.apiUrl}/api`;
  }

  // Get Product Versions for a product
  getProductVersions(productId: string): Observable<ProductVersionResponse[]> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }
    
    return this.http.get<ProductVersionResponse[]>(`${this.apiUrl}/products/${productId}/versions`).pipe(
      catchError(error => {
        console.error('Error fetching product versions:', error);
        return of([]);
      })
    );
  }

  // Get version options for UI dropdown
  getVersionOptions(productId: string): Observable<VersionOption[]> {
    return this.getProductVersions(productId).pipe(
      tap(versions => {
        console.log('Raw product versions from API:', versions);
      }),
      map(versions => versions.map(v => {
        const option = {
          id: v.id, // ProductVersionId (GUID)
          version: v.version, // Display text like "V1.4"
          isActive: v.isActive
        };
        console.log('Mapped version option:', option);
        return option;
      }))
    );
  }

  // Helper method to get ProductVersionId by version string
  getProductVersionIdByVersion(productId: string, versionString: string): Observable<string | null> {
    return this.getProductVersions(productId).pipe(
      map(versions => {
        const found = versions.find(v => v.version === versionString);
        return found ? found.id : null;
      })
    );
  }

  // Helper method to get version string by ProductVersionId
  getVersionStringById(productId: string, productVersionId: string): Observable<string | null> {
    return this.getProductVersions(productId).pipe(
      map(versions => {
        const found = versions.find(v => v.id === productVersionId);
        return found ? found.version : null;
      })
    );
  }

  getTestCasesByModule(moduleId: string): Observable<TestCaseResponse[]> {
    if (!moduleId) {
      return throwError(() => new Error('Module ID is required'));
    }
    return this.http.get<TestCaseResponse[]>(
      `${this.apiUrl}/modules/${moduleId}/testcases`
    ).pipe(
      catchError(error => {
        console.error('Error fetching test cases:', error);
        return of([]);
      })
    );
  }

  getTestCaseById(moduleId: string, id: string): Observable<TestCaseDetailResponse> {
    if (!moduleId || !id) {
      return throwError(() => new Error('Module ID and Test Case ID are required'));
    }
    
    return this.http.get<TestCaseDetailResponse>(`${this.apiUrl}/modules/${moduleId}/testcases/${id}`).pipe(
      map((response: any) => {
        let combinedSteps: ManualTestCaseStep[] = [];
        
        if (response.steps && Array.isArray(response.steps)) {
          if (response.steps.length > 0 && typeof response.steps[0] === 'object' && 'steps' in response.steps[0]) {
            combinedSteps = response.steps;
          } else {
            const stepTexts: string[] = response.steps;
            const expectedTexts: string[] = Array.isArray(response.expected) ? response.expected : [];
            combinedSteps = stepTexts.map((text, idx) => ({
              id: idx + 1,
              steps: text || '',
              expectedResult: expectedTexts[idx] || ''
            }));
          }
        }
        
        return { 
          ...response, 
          steps: combinedSteps,
          attributes: response.attributes || []
        } as TestCaseDetailResponse;
      }),
      catchError(error => {
        console.error('Error fetching test case detail:', error);
        return throwError(() => error);
      })
    );
  }

  updateTestCase(moduleId: string, id: string, testCase: UpdateTestCaseRequest): Observable<void> {
    if (!moduleId || !id) {
      return throwError(() => new Error('Module ID and Test Case ID are required'));
    }
    
    return this.http.put<void>(`${this.apiUrl}/modules/${moduleId}/testcases/${id}`, testCase, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  createTestCase(moduleId: string, testCase: CreateTestCaseRequest): Observable<IdResponse> {
    if (!moduleId) {
      return throwError(() => new Error('Module ID is required'));
    }
    
    // Ensure required fields are present
    const payload = {
      ...testCase,
      moduleId: moduleId,
      testType: testCase.testType || 'Manual'
    };
    
    return this.http.post<IdResponse>(`${this.apiUrl}/modules/${moduleId}/testcases`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateTestCaseAttributes(moduleId: string, testCaseId: string, attributes: TestCaseAttributeRequest[]): Observable<void> {
    if (!moduleId || !testCaseId) {
      return throwError(() => new Error('Module ID and Test Case ID are required'));
    }
    
    return this.http.put<void>(
      `${this.apiUrl}/modules/${moduleId}/testcases/${testCaseId}/attributes`, 
      attributes,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  deleteTestCase(moduleId: string, id: string): Observable<void> {
    if (!moduleId || !id) {
      return throwError(() => new Error('Module ID and Test Case ID are required'));
    }
    
    return this.http.delete<void>(`${this.apiUrl}/modules/${moduleId}/testcases/${id}`);
  }

  getTestCaseSteps(testCaseId: string): Observable<ManualTestCaseStep[]> {
    if (!testCaseId) {
      return throwError(() => new Error('Test Case ID is required'));
    }
    
    return this.http.get<ManualTestCaseStep[]>(`${this.apiUrl}/testcases/${testCaseId}/steps`).pipe(
      catchError(error => {
        console.error('Error fetching steps:', error);
        return of([]);
      })
    );
  }

  addTestCaseStep(testCaseId: string, step: ManualTestCaseStep): Observable<void> {
    if (!testCaseId) {
      return throwError(() => new Error('Test Case ID is required'));
    }
    
    const payload = {
      id: step.id || 0,
      steps: step.steps || '',
      expectedResult: step.expectedResult || ''
    };
    
    return this.http.post<void>(
      `${this.apiUrl}/testcases/${testCaseId}/steps`,
      payload,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': '*/*'
        })
      }
    ).pipe(
      catchError(error => {
        console.error('Error adding step:', error);
        return throwError(() => new Error('Failed to add step'));
      })
    );
  }

  updateTestCaseStep(testCaseId: string, stepId: number, step: ManualTestCaseStep): Observable<void> {
    if (!testCaseId || stepId === undefined) {
      return throwError(() => new Error('Test Case ID and Step ID are required'));
    }
    
    const payload = {
      steps: step.steps || '',
      expectedResult: step.expectedResult || ''
    };
    
    return this.http.put<void>(`${this.apiUrl}/testcases/${testCaseId}/steps/${stepId}`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteTestCaseStep(testCaseId: string, stepId: number): Observable<void> {
    if (!testCaseId || stepId === undefined) {
      return throwError(() => new Error('Test Case ID and Step ID are required'));
    }
    
    return this.http.delete<void>(`${this.apiUrl}/testcases/${testCaseId}/steps/${stepId}`);
  }

  replaceTestCaseSteps(testCaseId: string, steps: ManualTestCaseStep[]): Observable<void> {
    if (!testCaseId) {
      console.error('Missing testCaseId for steps replacement');
      return throwError(() => new Error('Test Case ID is required'));
    }

    console.log('Replacing steps for test case:', testCaseId, steps);

    return this.getTestCaseSteps(testCaseId).pipe(
      switchMap(existingSteps => {
        const deleteOperations = existingSteps.map((step, index) => 
          this.deleteTestCaseStep(testCaseId, step.id || index + 1).pipe(
            catchError(() => of(null))
          )
        );
        
        return deleteOperations.length > 0 ? forkJoin(deleteOperations) : of([]);
      }),
      switchMap(() => {
        const addOperations = steps.map(step => 
          this.addTestCaseStep(testCaseId, {
            steps: step.steps || '',
            expectedResult: step.expectedResult || ''
          })
        );
        
        return addOperations.length > 0 ? forkJoin(addOperations) : of([]);
      }),
      map(() => void 0),
      tap(() => console.log('Steps replaced successfully')),
      catchError(error => {
        console.error('Detailed steps replacement error:', error);
        return throwError(() => new Error('Failed to replace steps'));
      })
    );
  }

  getTestCaseDetail(moduleId: string, testCaseId: string): Observable<TestCaseDetailResponse> {
    if (!moduleId || !testCaseId) {
      return throwError(() => new Error('Module ID and Test Case ID are required'));
    }
    
    return forkJoin([
      this.http.get<TestCaseDetailResponse>(`${this.apiUrl}/modules/${moduleId}/testcases/${testCaseId}`),
      this.http.get<ManualTestCaseStep[]>(`${this.apiUrl}/testcases/${testCaseId}/steps`).pipe(
        catchError(() => of([]))
      )
    ]).pipe(
      map(([testCase, steps]) => {
        return {
          ...testCase,
          steps: steps || [],
          attributes: testCase.attributes || []
        } as TestCaseDetailResponse;
      }),
      catchError(error => {
        console.error('Error fetching test case detail:', error);
        return throwError(() => error);
      })
    );
  }

  getTestCaseAttributes(moduleId: string, testCaseId: string): Observable<TestCaseAttributeResponse[]> {
    if (!moduleId || !testCaseId) {
      return throwError(() => new Error('Module ID and Test Case ID are required'));
    }
    
    return this.http.get<TestCaseAttributeResponse[]>(
      `${this.apiUrl}/modules/${moduleId}/testcases/${testCaseId}/attributes`
    ).pipe(
      catchError(error => {
        console.error('Error fetching attributes:', error);
        return of([]);
      })
    );
  }

  addTestCaseAttribute(moduleId: string, testCaseId: string, attribute: TestCaseAttributeRequest): Observable<void> {
    if (!moduleId || !testCaseId) {
      return throwError(() => new Error('Module ID and Test Case ID are required'));
    }
    
    return this.http.post<void>(`${this.apiUrl}/modules/${moduleId}/testcases/${testCaseId}/attributes`, attribute, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteTestCaseAttribute(moduleId: string, testCaseId: string, key: string): Observable<void> {
    if (!moduleId || !testCaseId || !key) {
      return throwError(() => new Error('Module ID, Test Case ID, and key are required'));
    }
    
    return this.http.delete<void>(`${this.apiUrl}/modules/${moduleId}/testcases/${testCaseId}/attributes/${key}`);
  }

  // Enhanced method that enriches TestCaseResponses with version information
  getTestCaseDetailByModule(moduleId: string, productId?: string): Observable<TestCaseDetailResponse[]> {
    if (!moduleId) {
      return throwError(() => new Error('Module ID is required'));
    }
    
    return this.getTestCasesByModule(moduleId).pipe(
      map(list => list || []),
      switchMap(list => {
        if (list.length === 0) {
          return of([] as TestCaseDetailResponse[]);
        }
        
        const detailRequests = list.map(tc => 
          this.getTestCaseDetail(moduleId, tc.id).pipe(
            switchMap(detail => {
              // If we have productId and productVersionId, get the version string
              if (productId && detail.productVersionId) {
                return this.getVersionStringById(productId, detail.productVersionId).pipe(
                  map(versionString => ({
                    ...detail,
                    version: versionString || detail.version || 'Unknown',
                    productVersionName: versionString || detail.version || 'Unknown'
                  }))
                );
              }
              return of(detail);
            }),
            catchError(error => {
              console.error(`Error fetching detail for test case ${tc.id}:`, error);
              return of(null);
            })
          )
        );
        
        return forkJoin(detailRequests).pipe(
          map(details => details.filter(detail => detail !== null) as TestCaseDetailResponse[])
        );
      }),
      catchError(error => {
        console.error('Error in getTestCaseDetailByModule:', error);
        return of([]);
      })
    );
  }

  createTestCaseAndSteps(moduleId: string, request: CreateTestCaseRequest): Observable<IdResponse> {
    if (!moduleId) {
      return throwError(() => new Error('Module ID is required'));
    }
    
    const { steps, ...createOnly } = request as any;
    return this.createTestCase(moduleId, createOnly).pipe(
      switchMap((idRes: IdResponse) => {
        if (steps && Array.isArray(steps) && steps.length > 0 && idRes?.id) {
          const addSteps$ = steps.map((s: ManualTestCaseStep) =>
            this.addTestCaseStep(idRes.id!, { steps: s.steps, expectedResult: s.expectedResult } as ManualTestCaseStep).pipe(
              catchError(error => {
                console.error('Error adding step:', error);
                return of(null);
              })
            )
          );
          return forkJoin(addSteps$).pipe(map(() => idRes));
        }
        return of(idRes);
      })
    );
  }

  getModulesByProduct(productId: string): Observable<ProductModule[]> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }
    return this.moduleService.getModulesByProduct(productId);
  }

  getTestCasesByProduct(productId: string): Observable<TestCaseResponse[]> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }
    
    return this.moduleService.getModulesByProduct(productId).pipe(
      switchMap((modules: ProductModule[]) => {
        if (!modules || modules.length === 0) {
          return of([] as TestCaseResponse[]);
        }
        const requests = modules.map(m => 
          this.getTestCasesByModule(m.id).pipe(
            catchError(() => of([]))
          )
        );
        return forkJoin(requests).pipe(map(arr => arr.flat()));
      }),
      catchError(error => {
        console.error('Error getting test cases by product:', error);
        return of([]);
      })
    );
  }

  createModule(productId: string, module: CreateModuleRequest): Observable<IdResponse> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }
    
    return this.http.post<IdResponse>(
      `${this.apiUrl}/products/${productId}/modules`, 
      module,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  // Get available versions for a specific module based on existing test cases and product versions
  getVersionsByModule(moduleId: string, productId?: string): Observable<VersionOption[]> {
    if (!moduleId) {
      return throwError(() => new Error('Module ID is required'));
    }

    // If productId is provided, get all available product versions
    if (productId) {
      return this.getVersionOptions(productId).pipe(
        catchError(error => {
          console.error('Error getting product versions:', error);
          return of([{ id: 'default', version: 'V1.0', isActive: true }]);
        })
      );
    }

    // Fallback: Get versions from existing test cases
    return this.getTestCasesByModule(moduleId).pipe(
      map((testCases: TestCaseResponse[]) => {
        const versionMap = new Map<string, string>();
        versionMap.set('default', 'V1.0'); // Always include default

        testCases.forEach(tc => {
          if (tc.productVersionId && tc.version) {
            versionMap.set(tc.productVersionId, tc.version);
          }
        });

        return Array.from(versionMap.entries()).map(([id, version]) => ({
          id,
          version,
          isActive: true
        })).sort((a, b) => b.version.localeCompare(a.version));
      }),
      catchError(error => {
        console.error('Error getting versions by module:', error);
        return of([{ id: 'default', version: 'V1.0', isActive: true }]);
      })
    );
  }

  updateModule(productId: string, moduleId: string, request: UpdateModuleRequest): Observable<ProductModule> {
    if (!productId || !moduleId) {
      return throwError(() => new Error('Product ID and Module ID are required'));
    }
    
    return this.http.put<ProductModule>(
      `${this.apiUrl}/products/${productId}/modules/${moduleId}`, 
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  deleteModule(productId: string, moduleId: string): Observable<void> {
    if (!productId || !moduleId) {
      return throwError(() => new Error('Product ID and Module ID are required'));
    }
    
    return this.http.delete<void>(
      `${this.apiUrl}/products/${productId}/modules/${moduleId}`
    );
  }
  uploadFile(formData: FormData) {
  return this.http.post<any>(`${this.apiUrl}/uploads/file`, formData);
}

// Fixed TestCaseService - Sync Module Attributes Method
// Replace the existing syncModuleAttributesToTestCases method in your TestCaseService

syncModuleAttributesToTestCases(moduleId: string): Observable<void> {
  if (!moduleId) {
    return throwError(() => new Error('Module ID is required'));
  }
  
  console.log('Starting sync of module attributes to test cases for module:', moduleId);
  
  return this.moduleService.getModuleAttributes(moduleId).pipe(
    tap(moduleAttributes => {
      console.log('Module attributes to sync:', moduleAttributes);
    }),
    switchMap(moduleAttributes => {
      if (moduleAttributes.length === 0) {
        console.log('No module attributes to sync');
        return of(void 0);
      }
      
      return this.getTestCaseDetailByModule(moduleId).pipe(
        tap(testCases => {
          console.log('Test cases to update:', testCases.length);
        }),
        switchMap(testCases => {
          if (testCases.length === 0) {
            console.log('No test cases to update');
            return of(void 0);
          }
          
          const updateRequests = testCases.map(testCase => {
            const currentAttributes = testCase.attributes || [];
            console.log(`Processing test case ${testCase.testCaseId} with current attributes:`, currentAttributes);
            
            // Create attributes based on module attributes
            const newAttributes = moduleAttributes.map(moduleAttr => {
              const existingAttr = currentAttributes.find(a => a.key === moduleAttr.key);
              
              return {
                key: moduleAttr.key,
                value: existingAttr?.value || (moduleAttr.isRequired ? '' : '')
              };
            });

            // Keep non-module attributes (custom attributes added directly to test case)
            const nonModuleAttributes = currentAttributes.filter(
              attr => !moduleAttributes.some(mAttr => mAttr.key === attr.key)
            );
            
            // Merge all attributes
            const mergedAttributes = [...newAttributes, ...nonModuleAttributes];
            console.log(`Merged attributes for test case ${testCase.testCaseId}:`, mergedAttributes);

            return this.updateTestCaseAttributes(
              moduleId, 
              testCase.id, 
              mergedAttributes.map(a => ({ 
                key: a.key, 
                value: a.value || ''
              }))
            ).pipe(
              tap(() => {
                console.log(`Successfully updated attributes for test case: ${testCase.testCaseId}`);
              }),
              catchError(error => {
                console.error(`Error updating attributes for test case ${testCase.id} (${testCase.testCaseId}):`, error);
                // Don't fail the entire operation for one test case
                return of(null);
              })
            );
          });
          
          return forkJoin(updateRequests).pipe(
            map(() => {
              console.log('Completed syncing module attributes to all test cases');
              return void 0;
            })
          );
        })
      );
    }),
    catchError(error => {
      console.error('Error syncing module attributes:', error);
      return throwError(() => new Error(`Failed to sync module attributes: ${error.message}`));
    })
  );
}
}

export type { ProductModule };