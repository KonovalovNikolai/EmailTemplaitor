import React from "react";
import { StatusSnackbarVariant, StatusSnackBarState } from "../types";

export function setSnackbarStatus(
  variant: StatusSnackbarVariant,
  message: string,
  dispatch: React.Dispatch<React.SetStateAction<StatusSnackBarState>>
) {
  dispatch({
    variant: variant,
    message: message,
    isOpen: true,
  })
}
