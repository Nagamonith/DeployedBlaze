// test-case.model.ts
export type TestCaseResult = 'Pass' | 'Fail' | 'Pending' | 'Blocked';

export interface ManualTestCaseStep {
  id?: number;
  testCaseId?: string;
  steps: string;
  expectedResult: string;
}

export interface TestCaseAttribute {
  key: string;
  value: string;
  type?: string;
  isRequired?: boolean;
}

export interface TestCase {
  id: string;
  moduleId: string;
  productVersionId?: string;
  version?: string;
  testCaseId: string;
  useCase: string;
  scenario: string;
  testType: 'Manual' | 'Automation';
  testTool?: string;
  steps?: ManualTestCaseStep[];
  result?: TestCaseResult;
  actual?: string;
  remarks?: string;
  attributes?: TestCaseAttribute[];
  uploads?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  // Add executionDetails to TestCase interface
  executionDetails?: ExecutionDetails;
}


export interface ProductVersion {
  id: string; // This is the GUID ProductVersionId
  productId: string;
  version: string; // This is the display string like "V1.4"
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TestCaseResponse {
  id: string;
  moduleId: string;
  productVersionId?: string; // The GUID from database
  version?: string; // The display version like "V1.4"
  productVersionName?: string; // Same as version for backward compatibility
  testCaseId: string;
  useCase: string;
  scenario: string;
  testType: string;
  testTool?: string;
  result?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TestCaseDetailResponse extends TestCaseResponse {
  expected?: any;
  steps?: ManualTestCaseStep[];
  attributes?: TestCaseAttribute[];
  uploads?: string[];
  testSuiteIds?: string[];
  actual?: string;
  remarks?: string;
   executionDetails?: ExecutionDetails;
}

export interface CreateTestCaseRequest {
  moduleId: string;
  productVersionId: string; // Required GUID - this goes to backend
  testCaseId: string;
  useCase: string;
  scenario: string;
  testType: string;
  testTool?: string;
  steps?: ManualTestCaseStep[];
  result?: string;
  actual?: string;
  remarks?: string;
}

export interface UpdateTestCaseRequest {
  productVersionId?: string; // Optional GUID for updates
  testCaseId?: string; // Allow updating testCaseId
  useCase?: string;
  scenario?: string;
  testType?: string;
  testTool?: string;
  result?: string;
  actual?: string;
  remarks?: string;
  steps?: ManualTestCaseStep[];
  attributes?: TestCaseAttribute[];
}

export interface TestCaseAttributeRequest {
  key: string;
  value: string;
}

export interface TestCaseAttributeResponse {
  key: string;
  value: string;
}

/* ************** NEW INTERFACES FOR TEST SUITE EXECUTION CONTEXT ************** */

export interface ExecutionUpload {
  id: string;
  fileName: string;
  filePath: string;
  fileType?: string;
  fileSize: number;
  uploadedAt: Date;
  uploadedBy?: string;
}

export interface ExecutionDetails {
  testSuiteTestCaseId?: number;
  result?: TestCaseResult;
  actual?: string;
  remarks?: string;
  addedAt?: Date;
  updatedAt?: Date;
  uploads?: ExecutionUpload[];
}

export interface TestSuiteTestCase {
  id: number;
  testSuiteId: string;
  testCase: TestCase;
  executionDetails: ExecutionDetails;
}

export interface UpdateExecutionDetailsRequest {
  result?: TestCaseResult;
  actual?: string;
  remarks?: string;
}

export interface AddExecutionUploadRequest {
  fileName: string;
  filePath: string;
  fileType?: string;
  fileSize: number;
  uploadedBy?: string;
}