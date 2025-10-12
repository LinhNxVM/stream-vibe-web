import { toast } from 'sonner';

export const showSuccessToast = (message: string) => {
    toast.success(message);
};

export const showErrorToast = (message: string) => {
    toast.error(message);
};

export const showInfoToast = (message: string) => {
    toast.info(message);
};

export const showLoadingToast = (message: string) => {
    return toast.loading(message);
};

export const dismissToast = (toastId: string | number) => {
    toast.dismiss(toastId);
};