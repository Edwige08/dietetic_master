import { api } from "./api";

type LoginResponse = {
  access: string;
  refresh: string;
};

type RegisterPayload = {
  username: string;
  email?: string;
  password: string;
  first_name?: string;
  last_name?: string;
};

export async function register(payload: RegisterPayload) {
  const { data } = await api.post("/register/", payload);
  return data;
}

export async function login(username: string, password: string) {
  const { data } = await api.post<LoginResponse>("/token/", { username, password });
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) throw new Error("No refresh token");
  const { data } = await api.post<{ access: string }>("/token/refresh/", { refresh });
  localStorage.setItem("access_token", data.access);
  return data.access;
}