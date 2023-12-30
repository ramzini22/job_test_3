import { Envs } from "./common/conf/envs";

import { App } from "./index";

const app = new App(Envs.PORT, "0.0.0.0");
app.run();
