import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// URL de conexión a MySQL
const connectionUrl =
  process.env.DATABASE_URL || "mysql://root:@localhost:3306/pokeee";

// Crear la conexión usando la URL (esto retorna una Promise)
let connection: mysql.Connection;

// Inicializar la conexión
async function initConnection() {
  if (!connection) {
    connection = await mysql.createConnection(connectionUrl);
  }
  return connection;
}

// Crear la instancia de Drizzle - se inicializará cuando se use
export const db = drizzle(connectionUrl);

// Función para probar la conexión
export async function testConnection() {
  try {
    const conn = await initConnection();
    await conn.execute("SELECT 1");
    console.log("✅ Conexión a MySQL establecida correctamente");
    return true;
  } catch (error) {
    console.error("❌ Error al conectar con MySQL:", error);
    return false;
  }
}

// Función para cerrar la conexión
export async function closeConnection() {
  try {
    if (connection) {
      await connection.end();
      console.log("🔐 Conexión a MySQL cerrada");
    }
  } catch (error) {
    console.error("❌ Error al cerrar la conexión:", error);
  }
}
