import React from "react";
import { StatusSnackBarState } from "../types";

export function closeSnackbar(
  dispatch: React.Dispatch<React.SetStateAction<StatusSnackBarState>>
) {
  dispatch(prev => {
    return {
      ...prev,
      isOpen: false,
    }
  })
}
