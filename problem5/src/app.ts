import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "middlewares";
import { userRouter } from "module/users";


import { Application } from "express";

export interface ModuleRouter {
  register(app: Application): void;
}

const app = express();
app.use(cors());
app.use(express.json());

const moduleRouters: ModuleRouter[] = [
  userRouter,
];
moduleRouters.forEach((moduleRouter: ModuleRouter) => {
  moduleRouter.register(app);
});

app.use(errorHandler);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log(`App is running on port: ${port}`));
