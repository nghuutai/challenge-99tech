import { Router, Application } from "express";
import { asyncHandler, jwtAuth, validateQuery, validateSchema } from "middlewares";
import { createUser, deleteUser, getUserDetail, getUserList, updateUser } from "./controller";
import { createUserValidate, getUserDetailValidate, getUserListValidate } from "./dto";

const register = (app: Application) => {
  const router = Router();
  router.use(jwtAuth);

  router.post('', validateSchema(createUserValidate, 'body'), asyncHandler(createUser));
  router.get('', validateQuery(getUserListValidate), asyncHandler(getUserList));
  router.get('/:id', validateSchema(getUserDetailValidate, 'params'), asyncHandler(getUserDetail));
  router.put('/:id', validateSchema(getUserDetailValidate, 'params'), asyncHandler(updateUser));
  router.delete('/:id', validateSchema(getUserDetailValidate, 'params'), asyncHandler(deleteUser));

  app.use("/v1/users", router);
};

export const userRouter = {
  register,
};