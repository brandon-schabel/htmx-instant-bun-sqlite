import { Database } from "bun:sqlite";
import { createSqliteFactory } from "instant-bun/modules/sqlite-factory";

const sqlite = new Database("data.db");

type Note = {
  id: string;
  text: string;
};

const { createSqliteTableFactory } = createSqliteFactory(sqlite);

const { create: createNote, read: readNotes } =
  createSqliteTableFactory<Note>("notes");

export { createNote, readNotes };
