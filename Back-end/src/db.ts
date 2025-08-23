import mysql2, { Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || DB_PASSWORD === undefined || !DB_NAME) {
  throw new Error("Faaltan variables de entorno para la base de datos");
}

export const connection: Connection = await mysql2.createConnection({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD || undefined,
  database: DB_NAME,
});
