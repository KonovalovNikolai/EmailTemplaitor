export type StatusSnackbarVariant = "success" | "info" | "error";

export interface StatusSnackBarState {
  message: string;
  variant: StatusSnackbarVariant;
  isOpen: boolean;
}
