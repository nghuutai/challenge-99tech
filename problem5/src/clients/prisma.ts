import { PrismaClient } from "@prisma/client";

const isEnableLog = process.env.PRISMA_LOG === "true";

const initClient = () => {
  let client;
  if (isEnableLog) {
    client = new PrismaClient({
      log: [
        {
          emit: "event",
          level: "query",
        },
        "info",
        "warn",
        "error",
      ],
    });
    client.$on("query", (e) => {
      console.log({
        query: e.query,
        params: e.params,
        duration: e.duration,
        timestamp: e.timestamp,
      });
    });
  } else {
    client = new PrismaClient();
  }

  return client;
};

const prisma = initClient();

export default prisma;
