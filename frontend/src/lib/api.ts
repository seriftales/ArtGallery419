// Backend API'sine yapılan tüm istekleri tek noktadan yönetir.
// - Otomatik olarak Authorization header ekler (token varsa)
// - JSON parse ve hata yakalama merkezi
// - VITE_API_URL .env'den alınır

import { auth } from "./auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005/api";

interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  // Auth header'ı atlamak isteyen endpoint'ler için (login/register gibi)
  skipAuth?: boolean;
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, skipAuth, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (!skipAuth) {
    const token = auth.getToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 204 No Content gibi gövdesiz yanıtlar
  const text = await response.text();
  const data = text ? safeJson(text) : null;

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && "message" in data && typeof (data as any).message === "string"
        ? (data as any).message
        : `İstek başarısız (${response.status})`);
    throw new ApiError(response.status, message, data);
  }

  return data as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const api = {
  get: <T = unknown>(path: string, options?: ApiOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T = unknown>(path: string, body?: unknown, options?: ApiOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  patch: <T = unknown>(path: string, body?: unknown, options?: ApiOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  put: <T = unknown>(path: string, body?: unknown, options?: ApiOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),
  delete: <T = unknown>(path: string, options?: ApiOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
