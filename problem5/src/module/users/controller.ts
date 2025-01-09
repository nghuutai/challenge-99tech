import { presentPagination } from 'utils';
import * as UserService from './service';
import { Request, Response } from 'express';
import { CreateUserDto, GetUserListQueryDto, UpdateUserDto } from './dto';
import createHttpError from 'http-errors';

export const getUserList = async (req: Request, res: Response) => {
  const { data, count } = await UserService.getUserList(req.query as unknown as GetUserListQueryDto);

  return res.json({
    data,
    pageInfo: presentPagination({
      total: count,
      perPage: parseInt(req.query.limit as string),
      currentPage: parseInt(req.query.page as string),
    }),
  });
};

export const getUserDetail = async (req: Request, res: Response) => {
  const userId = +req.params.id;

  const user = await UserService.getUserDetail(userId);

  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  return res.json({
    data: user,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const body = req.body as unknown as CreateUserDto;

  const userId = await UserService.createUser(body);

  return res.json({
    data: userId,
  });
};


export const updateUser = async (req: Request, res: Response) => {
  const userId = +req.params.id;
  const body = req.body as unknown as UpdateUserDto;

  const user = await UserService.getUserDetail(userId);

  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  await UserService.updateUser(user.id, body);

  return res.json({
    success: true, 
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = +req.params.id;

  const user = await UserService.getUserDetail(userId);

  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  await UserService.deleteUser(user.id);

  return res.json({
    success: true, 
  });
};