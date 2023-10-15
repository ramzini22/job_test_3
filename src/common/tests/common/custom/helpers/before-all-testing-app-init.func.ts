import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import { Type } from "@nestjs/common/interfaces/type.interface";
import { usePipes } from "../../../../conf/pipes";

export const BeforeAllTestingReturnMutatedApp = async (
  app: NestFastifyApplication,
  modules: Type[],
) => {
  const moduleRef = await Test.createTestingModule({
    imports: [...modules],
  }).compile();

  app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

  // Validation. Add transform
  usePipes(app);

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return app;
};
