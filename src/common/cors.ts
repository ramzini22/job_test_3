import { NestFastifyApplication } from "@nestjs/platform-fastify";
import cors from "@fastify/cors";
import { FastifyPluginOptions } from "fastify";

export const useCors = (app: NestFastifyApplication): Promise<FastifyPluginOptions> => {
  return app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH", "OPTIONS"],
    preflightContinue: true,
    optionsSuccessStatus: 204,
  });
};
