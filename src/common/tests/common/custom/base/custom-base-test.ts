import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Type } from "@nestjs/common/interfaces/type.interface";
import { InjectOptions } from "fastify";
import { BeforeAllTestingReturnMutatedApp } from "../helpers/before-all-testing-app-init.func";
import { ResponseFromControllerType } from "../types/response-from-controller.type";

export class CustomBaseTest {
  private app: NestFastifyApplication;

  public async build(modules: Type[]) {

    this.app = await BeforeAllTestingReturnMutatedApp(undefined, modules);
    return this;
  }

  public async request<T = any>(
    url: string,
    { body, ...params }: InjectOptions = {
      method: "GET",
    },
  ): Promise<ResponseFromControllerType<T>> {
    const result = await this.app.inject({
      url: `v1${url}`,
      ...params,
      headers: {
        accept: "application/json",
        "content-type": "application/json; charset=utf-8",
      },
      payload: JSON.stringify(body),
    });
    return { ...result, body: result.body ? result?.json<T>() : undefined };
  }

  public async close(): Promise<void> {
    return this.app.close();
  }
}
