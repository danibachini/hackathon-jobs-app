import {Prisma} from "@prisma/client"
import prisma from "../../libs/prisma"

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user
  })
}

export const updateUser = async (user: Prisma.UserUpdateInput, id: number) => {
  return await prisma.user.update({
    where: {id: id},
    data: user
  })
}

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: {id: id}
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {email: email}
  })
}

export const getAllUsers = async () => {
  return await prisma.user.findMany()
}

export const getAllUsersWithTasks = async () => {
  return await prisma.user.findMany({
    include: {
      tasks: true
    }
  })
}