// module.model.ts
export interface ProductModule {
  id: string;
  productId: string;
  version: string;
  name: string;
  description: string;
  createdAt: Date;
  isActive: boolean;
}

export interface CreateModuleRequest {
  productId: string;
  version?: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ModuleAttribute {
  id: string;
  moduleId: string;
  name: string;
  key: string;
  type: string;
  isRequired: boolean;
  options?: string;
  value?: string;
}
export interface UpdateModuleRequest {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ModuleAttributeRequest {
  name: string;
  key: string;
  type: string;
  isRequired: boolean;
  options?: string;
}

interface ExtendedModule extends ProductModule {
  editing?: boolean;
  testCaseCount?: number;
  versionCount?: number;
}