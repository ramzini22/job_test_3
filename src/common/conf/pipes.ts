import { BadRequestException, INestApplication, ValidationPipe } from "@nestjs/common";
import { ValidationPipeOptions } from "@nestjs/common/pipes/validation.pipe";

const getDetails = (details) => {
  if (typeof details == "string") return [{ error: details }];
  const allDetails = [];
  details.map((detail) => {
    if (detail.constraints)
      Object.keys(detail.constraints).map((key) =>
        allDetails.push({ error: detail.constraints[key] }),
      );

    if (detail.children?.length) allDetails.push(...getDetails(detail.children));
  });
  return allDetails;
};

export const usePipes = (app: INestApplication): INestApplication => {
  return app.useGlobalPipes(new ValidationPipe(pipeConfig));
};

export const pipeConfig: ValidationPipeOptions = {
  validateCustomDecorators: true,
  whitelist: true,
  validationError: {
    target: true,
    value: true,
  },
  transformOptions: {
    enableImplicitConversion: false,
  },
  skipMissingProperties: false,
  transform: true,
  exceptionFactory: (details) => {
    return new BadRequestException({
      error: {
        error: "Invalid Input.",
        localized_error: "Невалидный ввод.",
        details: getDetails(details),
      },
    });
  },
};
