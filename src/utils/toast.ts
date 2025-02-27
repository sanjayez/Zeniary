import { toast, ToastOptions, Id } from "react-toastify";

// Default toast configuration
const defaultOptions: ToastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Toast utility functions with proper return types
export const toastSuccess = (message: string, options?: ToastOptions): Id => {
  return toast.success(message, { ...defaultOptions, ...options });
};

export const toastError = (message: string, options?: ToastOptions): Id => {
  return toast.error(message, { ...defaultOptions, ...options });
};

export const toastWarning = (message: string, options?: ToastOptions): Id => {
  return toast.warning(message, { ...defaultOptions, ...options });
};

export const toastInfo = (message: string, options?: ToastOptions): Id => {
  return toast.info(message, { ...defaultOptions, ...options });
};
