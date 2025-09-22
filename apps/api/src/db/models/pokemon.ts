import { mysqlTable, serial, text, int } from "drizzle-orm/mysql-core";

export const pokemonSchema = mysqlTable("pokemon", {
  id: serial("id").primaryKey().autoincrement(),
  pkName: text("name").notNull(),
  pkId: int("pkId").notNull(),
  bufferQrCode: text("bufferQrCode").notNull(),
});
