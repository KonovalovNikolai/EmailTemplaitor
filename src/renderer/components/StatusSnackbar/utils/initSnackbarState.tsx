import { StatusSnackBarState } from "../types";

export function initSnackbarState(): StatusSnackBarState {
  return {
    variant: undefined,
    message: "",
    isOpen: false,
  };
}
