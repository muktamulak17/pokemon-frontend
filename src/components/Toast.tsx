import { Snackbar, Alert } from "@mui/material";

interface ToastProps {
  message: string | null | undefined;
  severity: "success" | "info" | "warning" | "error" | undefined;
  open: boolean;
  onClose: () => void;
}

export const Toast = ({ message, severity, open, onClose }: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
