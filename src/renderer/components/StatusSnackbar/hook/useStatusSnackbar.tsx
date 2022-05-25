import React, { useCallback } from "react";
import { StatusSnackbarVariant, StatusSnackBarState } from "../types";
import { closeSnackbar } from "../utils/closeSnackbar";
import { initSnackbarState } from "../utils/initSnackbarState";
import { setSnackbarStatus } from "../utils/setSnackbarStatus";

interface SetSnackbarStatus {
  (variant: StatusSnackbarVariant, message: string): void;
}

interface CloseSnackbarStatus {
  (): void;
}

export function useStatusSnackbar(): [ StatusSnackBarState, SetSnackbarStatus,  CloseSnackbarStatus ] {
  const [snackState, setSnackState] = React.useState<StatusSnackBarState>(initSnackbarState);

  const handleSetStatus = useCallback(
    (varian: StatusSnackbarVariant, message: string) => setSnackbarStatus(varian, message, setSnackState),
    []
  );
  const handleCloseSnackbar = useCallback(() => closeSnackbar(setSnackState), []);

  return [snackState, handleSetStatus, handleCloseSnackbar];
}
