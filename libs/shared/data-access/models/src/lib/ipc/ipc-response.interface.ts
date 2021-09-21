// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcResponses {
  export interface Response {
    success?: string;
    error?: string;
    targetName?: string;
    workspacePath?: string;
  }

  export interface ResponseWithData<T> {
    data: T;
    success?: string;
    error?: string;
    targetName?: string;
    workspacePath?: string;
  }

  export interface LogResponse {
    logs: string[];
    workspacePath: string;
  }

  export interface ResponseWithLogs {
    result: Response;
    logResponse: LogResponse;
  }
}



