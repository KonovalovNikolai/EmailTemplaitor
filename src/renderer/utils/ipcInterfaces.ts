export interface OpenFileResult {
  status: "canceled" | "error" | "success";
  JSONDocument: string;
}

export interface SendEmailResult {
  to: string;
  status: "error" | "success";
  url: string;
}
