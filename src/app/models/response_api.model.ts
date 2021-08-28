export interface ResponseApi {
  success: boolean;
  status: string;
  payload: any;
  errors: string | object;
}
