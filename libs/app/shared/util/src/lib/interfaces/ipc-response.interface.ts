export interface IpcResponse {
  success?: string;
  error?: string;
  targetName?: string;
  workspacePath?: string;
}

export interface IpcResponseData<T> {
  data: T;
  success?: string;
  error?: string;
  targetName?: string;
  workspacePath?: string;
}
