import { Alert, Snackbar } from "@mui/material";
import { StatusSnackBarState } from "../types";

interface StatusSnackbarProps {
  state: StatusSnackBarState;
  onClose: () => void;
}

export const StatusSnackbar = ({state, onClose} : StatusSnackbarProps) => {
  return (
    <Snackbar
      key={state.message}
      open={state.isOpen}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={state.variant}>{state.message}</Alert>
    </Snackbar>
  );
};
