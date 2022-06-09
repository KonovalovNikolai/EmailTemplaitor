export interface OpenFileResult {
  status: "canceled" | "error" | "success";
  JSONDocument: string;
}

export interface SendEmailResult {
  status: "error" | "success";
  url: string;
}
