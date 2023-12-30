import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { usePipes } from "./common/conf/pipes";
import { contentParser } from "fastify-file-interceptor";
import { useCors } from "./common/cors";
import { useContainer } from "class-validator";
import { useSwagger } from "./common/conf/swagger";

export class App {
  private readonly ADDRESS: string;
  private readonly PORT: number;

  private app: NestFastifyApplication;

  constructor(PORT: number, ADDRESS: string) {
    this.PORT = PORT;
    this.ADDRESS = ADDRESS;
  }

  private static createNestApp(): Promise<NestFastifyApplication> {
    return NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
      bufferLogs: true,
    });
  }

  public async run() {
    this.app = await App.createNestApp();

    const information = await this.setUpApp();

    await this.app.listen(this.PORT, this.ADDRESS);

    await this.logInformationAfterStartServer(information);
  }

  private async setUpApp() {
    // Enable functional
    await useCors(this.app);

    // FileFastifyInterceptor
    await this.app.register(contentParser);

    // Add use services
    const swaggerInfo = await useSwagger(this.app);

    // Validation. Add transform
    usePipes(this.app);

    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });

    return { swaggerInfo };
  }

  private async logInformationAfterStartServer(information: Record<string, string>) {
    const url = await this.app.getUrl();
    // eslint-disable-next-line no-console
    console.log(`Server is running on url: ${url} at ${new Date()}.`, information);
  }
}
