export const API_PORT = 8010;
export const DEV_API_BASE_URL = `http://localhost:${API_PORT}`;
export const PROD_API_BASE_URL = `http://api.example.com`;

export const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? PROD_API_BASE_URL : DEV_API_BASE_URL;

export const GET_MEMBERS_API = `${API_BASE_URL}/members`;
export const GET_WAITING_APPOINTMENTS_API = `${API_BASE_URL}/appointments`;
export const GET_APPOINTMENTS_BY_MEMBERS_DATE_API = `${API_BASE_URL}/appointments`;
export const POST_ASSIGN_APPOINTMENT_API = `${API_BASE_URL}/appointments/assign`;
export const POST_MOVE_APPOINTMENT_API = `${API_BASE_URL}/appointments/move`;
export const POST_PUT_BACK_APPOINTMENT_API = `${API_BASE_URL}/appointments/back`;
export const POST_CANCEL_APPOINTMENT_API = `${API_BASE_URL}/appointments/cancel`;
export const POST_STATUS_APPOINTMENT_API = `${API_BASE_URL}/appointments/status`;
