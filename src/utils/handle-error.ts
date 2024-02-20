import { toast } from "sonner";

export interface ApiError {
  response: { data: { error: string } };
}

export const handleError = (error: ApiError) => {
  toast("Error: " + error.response.data.error);
};
