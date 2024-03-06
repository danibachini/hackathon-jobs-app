
import { Prisma } from "@prisma/client"
import prisma from "../../libs/prisma"

export const createTask = async (task: Prisma.TaskCreateInput) => {
    return await prisma.task.create({
        data: task
    })
}

export const findTask = async (taskID: number) => {
    return await prisma.task.findUnique({
        where: { id: taskID }
    })
}

export const findAllTasksByUserID = async (userID: number) => {
    return await prisma.task.findMany({
        where: {
            userTasks: {
                some: {
                    userId: userID
                }
            }
        }
    })
}

export const findAllUsersByTaskID = async (taskID: number) => {
    return await prisma.userTask.findMany({
        where: {
            taskId: taskID
        },
        include: {
            user: true
        }
    })
}



export const updateTask = async (taskID: number, task: Prisma.TaskUpdateInput) => {
    return await prisma.task.update({
        where: { id: taskID },
        data: task
    })
}

export const deleteTask = async (taskID: number) => {
    return await prisma.task.delete({
        where: { id: taskID }
    })
}
