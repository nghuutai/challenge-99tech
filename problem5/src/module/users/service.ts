import { User, Prisma } from "@prisma/client";
import { CreateUserDto, GetUserListQueryDto, GetUserListResponseDto, UpdateUserDto } from "./dto";
import prisma from "clients/prisma";

const model = prisma.user;

export const getUserList = async ({ keyword, limit, page }: GetUserListQueryDto): Promise<GetUserListResponseDto> => {
  const condition: Prisma.UserWhereInput = {};

  if (keyword) {
    condition.fullname = {
      contains: keyword,
    }
  }
  
  const [users, count] = await Promise.all([
    model.findMany({
      where: condition,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    model.count({
      where: condition,
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  return {
    data: users,
    count,
  }
};


export const getUserDetail = async (id: number): Promise<User | null> => {
  const user = await model.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const createUser = async (body: CreateUserDto): Promise<number> => {
  
  const user = await model.create({
    data: body,
  });

  return user.id;
};

export const updateUser = async (id: number, body: UpdateUserDto): Promise<void> => {
  await model.update({
    data: body,
    where: {
      id,
    }
  });
};

export const deleteUser = async (id: number): Promise<void> => {
  await model.delete({
    where: {
      id,
    }
  });
};

