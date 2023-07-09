import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { ZodError } from 'zod';

interface ErrorResponse {
  error: string | { error: ZodError };
}

function handleError(error: Error | AxiosError | unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ErrorResponse;

    const errorMessage =
      typeof data?.error === 'string' ? data.error : error.message;

    toast.error(errorMessage);
    return;
  }

  if (error instanceof Error) {
    toast.error('An error occurred, please try again later.');
  }
}

export default handleError;
