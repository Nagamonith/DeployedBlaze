// test-run.model.ts
import { TestCaseResult } from "./test-case.model";
import { TestSuite } from "./test-suite.model";

export type TestRunStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface TestRun {
  id: string;
  productId: string;
  name: string;
  description?: string;
  status: TestRunStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  testSuites: TestSuite[];
}

export interface TestRunResponse {
  id: string;
  productId: string;
  name: string;
  description?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  testSuites: TestSuite[]; // Add this line
}

export interface CreateTestRunRequest {
  name: string;
  description?: string;
}

export interface TestRunResultResponse {
  testRunId: string;
  testSuiteId: string;
  testCaseId: string;
  executedAt: Date;
  executedBy: string;
  result?: TestCaseResult;
}

export interface AssignTestSuitesRequest {
  testSuiteIds: string[];

}

// test-run.model.ts
export interface UpdateTestRunRequest {
  name: string;
  description?: string;
  status?: TestRunStatus;
}