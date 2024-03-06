
import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"
import { 
    createTask, 
    updateTask, 
    deleteTask, 
    findTask, 
    findAllTasksByUserID,
    findAllUsersByTaskID
} from '../../app/Repositories/taskRepository';
import { Prisma } from "@prisma/client";

vi.mock("../../libs/prisma")

describe("Unit test", () => {
    let task:any;

    it("should create a new task", async () => {
        const mockTask = {
            description: "This is a test task",
            difficultyLevel: 3,
            users: [
                {
                    userID: 1,
                    completionDate: new Date().toISOString(),
                    status: "Completed"
                }
            ]
        }

        prisma.task.create.mockResolvedValue({...mockTask, id: 1})
        task = await createTask(mockTask as Prisma.TaskCreateInput)
        expect(task.id).toBe(1)
        expect(task).not.toBe(null)
    })
    
    it("should find the task by its ID", async () => {
        const mockTask = task
        prisma.task.findUnique.mockResolvedValue(mockTask)
        const taskExist = await findTask(1)
        expect(taskExist).not.toBe(null)
        expect(taskExist).toEqual(task)
    })
    
    it("should find all the existing tasks executed by a specific user", async () => {
        prisma.task.findMany.mockResolvedValue(task)
        const getAllUserTasks = await findAllTasksByUserID(1) 
        expect(getAllUserTasks).not.toBe(null)
    })

    it("should find all users who executed a specific task", async () => {
        prisma.task.findMany.mockResolvedValue(task)
        const findAllTasks = await findAllUsersByTaskID(task.taskID)
        expect(findAllTasks).not.toBe(null)
    })

    it("should find the task by its ID and update it", async () => {
        const taskDescriptionUpdate = { description: "This is the updated description" }
        const taskUpdated = { ...task, ...taskDescriptionUpdate }
        prisma.task.update.mockResolvedValue(taskUpdated)
        const updatedTaskFromDb = await updateTask(1, taskUpdated)
        expect(updatedTaskFromDb).toEqual(taskUpdated)
    })

    it("should find the task by its ID and delete it", async () => {
        prisma.task.delete.mockResolvedValue(task)
        const taskToBeDeleted = await deleteTask(1)
        expect(taskToBeDeleted).toEqual(task);
    })
})