// product.model.ts
export interface Product {
  editing: boolean;
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface IdResponse {
  id: string;
}

// Product Version Models
export interface ProductVersion {
  id: string; // GUID - this is ProductVersionId
  productId: string;
  version: string; // Display string like "V1.4", "V1.5", etc.
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductVersionResponse {
  id: string; // GUID - this is ProductVersionId
  productId: string;
  version: string; // Display string like "V1.4", "V1.5", etc.
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductVersionRequest {
  version: string; // Display string like "V1.4"
  isActive?: boolean;
}

// Helper interface for UI dropdown
export interface VersionOption {
  id: string; // ProductVersionId (GUID)
  version: string; // Display text like "V1.4"
  isActive: boolean;
}
