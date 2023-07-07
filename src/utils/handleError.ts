import axios, { Axios, AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

interface ErrorResponse {
  error: string;
}

function handleError(error: Error | AxiosError | unknown) {
  if (error instanceof Error) {
    console.error(error);
  }

  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ErrorResponse;

    toast.error(data.error);
  }
}

export default handleError;
