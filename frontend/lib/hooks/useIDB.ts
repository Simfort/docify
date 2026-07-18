"use client";

import { useEffect, useState } from "react";
import { openDB, IDBPDatabase } from "idb";

export default function useIDB() {
  const [db, setDb] = useState<IDBPDatabase<unknown> | null>(null);

  useEffect(() => {
    async function init() {
      const name = "docifydb";
      const version = 1;
      const db = await openDB(name, version, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("responses")) {
            db.createObjectStore("responses", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      setDb(db);
    }
    init();
  }, []);
  return db;
}
