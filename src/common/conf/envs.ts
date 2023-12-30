import * as process from "process";

export const Envs = {
    PORT : Number(process.env.APP_PORT ?? 3000),
    UPDATE_POSTS_TIME : Number(process.env.UPDATE_POSTS_TIME_SEC ?? 300),

    SWAGGER_HOSTS: [
        // hosts information
        {
          URL: `http://localhost:${process.env.APP_PORT ?? 3000}>`,
          DESCRIPTION: "localhost",
        },
    ],
    IS_WRITE_SWAGGER_CONFIG : true,
}