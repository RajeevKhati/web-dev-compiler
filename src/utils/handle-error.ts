export interface ApiError {
  error: string;
}

export const handleError = (error: ApiError) => {
  console.log(error);
};
