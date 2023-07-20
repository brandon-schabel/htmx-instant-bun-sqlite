import { Database } from "bun:sqlite";
import { createSqliteFactory } from "instant-bun/modules/sqlite-factory";

const sqlite = new Database("data.db");

const notesSchema = {
  id: "string",
  text: "string",
};

const {
  create: createNote,
  read: readAllNotes,
  update: updateNote,
} = createSqliteFactory({
  db: sqlite,
  debug: true,
  schema: notesSchema,
  tableName: "notes",
});

//  list all tables
const result = sqlite.query(
  "SELECT name FROM sqlite_master WHERE type='table';"
);

const columnsQuery = sqlite.query("PRAGMA table_info(notes);");
const columns = columnsQuery.all();

console.log(columns);
const columnNames = columns.map((column) => column.name);
console.log(columnNames);

export { createNote, readAllNotes, updateNote };
