export interface IPageableRequest {
  page?: number;
  pageSize?: number;
  search?: string | null;
  filters?: Record<string, string | number | boolean>;
}

export interface IPageableResult<T> {
  totalData: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalRecords: number;
  records: T[];
}
