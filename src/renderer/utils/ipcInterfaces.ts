export interface OpenFileResult {
  status: "canceled" | "error" | "success";
  JSONDocument: string;
}
