export interface PDFResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  fileSize: number;
  createdAt: string;
}

export interface UploadPDFResponse {
  message: string;
  document: PDFResponse;
}
