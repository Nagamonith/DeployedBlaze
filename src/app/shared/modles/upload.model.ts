// upload.model.ts
export interface UploadResponse {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: Date;
  testCaseId?: string;
  
}