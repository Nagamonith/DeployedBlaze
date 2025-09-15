// Updated test-suite.model.ts with proper interfaces

import { TestCase, TestCaseResponse, ExecutionDetails } from "./test-case.model";

export interface TestSuite {
  id: string;
  productId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  testCases?: TestCase[];
}

export interface TestSuiteResponse {
  id: string;
  productId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  testCases?: TestCaseResponse[];
  testCaseCount?: number;
}

// Enhanced interface for test suite with test case items
export interface TestSuiteTestCaseItem {
  testCase: TestCaseResponse;
  executionDetails?: ExecutionDetails;
}
export interface TestSuiteWithCasesResponse extends Omit<TestSuiteResponse, 'testCases'> {
  id: string;
  productId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  testCases: TestSuiteTestCaseItem[];
}
export interface CreateTestSuiteRequest {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface AssignTestCasesRequest {
  testCaseIds: string[];
}

export interface TestSuiteExecutionResponse {
  id: string;
  testSuite: TestSuite;
  testCases: TestSuiteTestCase[];
  startedAt: Date;
  completedAt?: Date;
  status: 'NotStarted' | 'InProgress' | 'Completed';
}

export interface TestSuiteTestCase {
  id: number;
  testSuiteId: string;
  testCase: TestCase;
  executionDetails: ExecutionDetails;
}

export interface UpdateTestSuiteExecutionRequest {
  status?: 'NotStarted' | 'InProgress' | 'Completed';
  completedAt?: Date;
}

export interface TestSuiteExecutionSummary {
  totalTestCases: number;
  passed: number;
  failed: number;
  pending: number;
  blocked: number;
  completionPercentage: number;
}

export interface TestSuiteExecutionHistoryItem {
  id: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'NotStarted' | 'InProgress' | 'Completed';
  summary: TestSuiteExecutionSummary;
}

// Export TestCase type for convenience
export type { TestCase };