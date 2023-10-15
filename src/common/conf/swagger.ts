/**
 * @author: valeevtr
 * @created: 01.12.2022
 * @Time: 18:18
 * @IDE: WebStorm
 */

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Envs } from "./envs";

const projectInfo={
  name:"API Documentation",
  author:{
    name:"Ramil",
    url:"ramzini22",
    email:"ramil.zinnatullin.02@mail.ru"
  },
  description:
    "Documentation was created for"
    +"<a href='https://docs.google.com/document/d/1qL1Zsufg8dxblpj1i2EoMZ4y0M88WG9aokMYUKv5R-8/edit'>"
    +" test's task"
    +"</a>"
    +"<br/>" 
    +"You can find me <a href = 'https://t.me/ramzini'>here</a>"
    ,
  version:"0.0.1"
}

export const useSwagger = async (app: NestFastifyApplication): Promise<string> => {
  const documentBuilder = new DocumentBuilder();
  Envs.SWAGGER_HOSTS.map((hostInfo) =>
    documentBuilder.addServer(hostInfo.URL, hostInfo.DESCRIPTION),
  );

  const config = documentBuilder
    .setTitle(projectInfo.name)
    .setContact(projectInfo.author.name, projectInfo.author.url, projectInfo.author.email)
    .setDescription(projectInfo.description)
    .setVersion(projectInfo.version)
    .addSecurity("bearer", { type: "http" })
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, { deepScanRoutes: true });

  SwaggerModule.setup("documentation", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha",
      persistAuthorization: true,
    },
  });

  if (Envs.IS_WRITE_SWAGGER_CONFIG) {
    await writeFileSync("./api/swagger.json", JSON.stringify(document, null, "\t"));
    return "swagger.json was generated";
  }

  return "swagger.json wasn't generated";
};
