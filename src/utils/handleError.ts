import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

interface ErrorResponse {
  error: string;
}

function handleError(error: Error | AxiosError | unknown) {
  console.log('HANDLE ERROR', error);
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ErrorResponse;

    toast.error(data.error);
    return;
  }

  if (error instanceof Error) {
    toast.error('An error occurred, please try again later.');
    return;
  }
}

export default handleError;
