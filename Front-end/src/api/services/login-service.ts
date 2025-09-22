import apiPublic from '../clients/api-public';
import { AxiosError } from "axios";

// Tipamos la respuesta esperada del backend
export type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol?: number; // opcional, si tu backend lo devuelve
  };
};

// Tipamos lo que devuelve la función
export type LoginResultOk = {
  ok: true;
  mensaje: string;
  token: string;
  user: LoginResponse["user"];
};

export type LoginResultError = {
  ok: false;
  mensaje: string;
};

export type LoginResult = LoginResultOk | LoginResultError;

export const loginUsuario = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  try {
    // 🔹 quitamos withCredentials porque no se usan cookies en RN
    const response = await apiPublic.post<LoginResponse>(
      "/user/login",
      {
        email,
        password: String(password), // aseguramos que siempre vaya como string
      }
    );

    return {
      ok: true,
      mensaje: response.data.message,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (err: unknown) {
    console.error("❌ Error en login:", err);

    const error = err as AxiosError<{ message?: string }>;

    return {
      ok: false,
      mensaje: error.response?.data?.message || "Error desconocido en el servidor",
    };
  }
};
