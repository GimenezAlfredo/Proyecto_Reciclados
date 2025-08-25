import { Request, Response } from "express";
import { obtenerParadasDB } from "../models/paradas-model.js";

export const getParadas = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const paradas = await obtenerParadasDB();
    res.json(paradas);
  } catch (error: any) {
    console.error("Error al obtener paradas:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
