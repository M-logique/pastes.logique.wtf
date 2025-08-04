export interface CloudflareBindings {
  DB: D1Database
  PASSWORD?: string
  MAX_FILES?: string
}

export interface CreatePasteRequest {
  files: Array<{
    filename?: string
    language?: string
    content: string
  }>
}

export interface PasteResponse {
  namespace: string
  accessKey: string
  success: boolean
}

export interface PasswordCheckResponse {
  passwordEnabled: boolean
}

export interface FileData {
  fileIndex: number
  filename: string | null
  language: string | null
  content: string
}

export interface PasteData {
  namespace: string
  accessKey: string
  files: FileData[]
  createdAt: string | number | Date
  updatedAt: string | number | Date
}