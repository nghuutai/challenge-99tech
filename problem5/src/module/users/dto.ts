import { User } from '@prisma/client';
import Joi from 'joi';

export type GetUserListQueryDto = {
  keyword?: string;
  page: number;
  limit: number;
}

export type GetUserListResponseDto = {
  data: User[];
  count: number;
}

export type CreateUserDto = {
  email: string;
  fullname: string;
}

export type UpdateUserDto = {
  email?: string;
  fullname?: string;
}

export const getUserListValidate = Joi.object({
  keyword: Joi.string(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(500).default(10),
});

export const getUserDetailValidate = Joi.object({
  id: Joi.string().required(),
});


export const createUserValidate = Joi.object({
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
});

export const updateUserValidate = Joi.object({
  email: Joi.string().email(),
  fullname: Joi.string(),
});
