
import { Prisma } from "@prisma/client"
import prisma from "../../libs/prisma"

export const createTask = async (task: Prisma.TaskCreateInput) => {
    return await prisma.task.create({
        data: task
    })
}

export const findTask = async (taskID: number) => {
    return await prisma.task.findUnique({
        where: { taskID: taskID }
    })
}

export const findAllTasksByUserID = async (userID: number) => {
    return await prisma.task.findMany({
        where: { 
            users: {
                some: {
                    userID: userID
                }
            }
        }
    })
}

export const findAllUsersByTaskID = async (taskID: number) => {
    return await prisma.userTask.findMany({
        where: {
            taskID: taskID
        },
        include: {
            user: true
        }
    })
}

export const findAllTasksByTreeID = async (treeID: number) => {
    return await prisma.task.findMany({
        where: {
            trees: {
                some: {
                    treeID: treeID
                }
            }
        }
    })
}

export const updateTask = async (taskID: number, task: Prisma.TaskUpdateInput) => {
    return await prisma.task.update({
        where: { taskID: taskID },
        data: task
    })
}

export const deleteTask = async (taskID: number) => {
    return await prisma.task.delete({
        where: { taskID: taskID }
    })
}
