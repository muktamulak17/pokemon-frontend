import { useState } from "react";

interface ToastData {
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string | null;
}

export const useToast = () => {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastData>({
    severity: undefined,
    message: null,
  });

  return {
    openToast,
    toastData,
    setOpenToast,
    setToastData,
  };
};
