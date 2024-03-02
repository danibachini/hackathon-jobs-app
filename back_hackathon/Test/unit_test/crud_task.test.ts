
import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"
import { 
    createTask, 
    updateTask, 
    deleteTask, 
    findTask, 
    findAllTasksByUserID,
    findAllTasksByTreeID 
} from '../../app/Services/taskService';
import { Prisma } from "@prisma/client";

vi.mock("../../libs/prisma")

describe("Unit test", () => {
    let task:any;

    it("should create a new task", async () => {
        const mockTask = {
            description: "This is a test task",
            niveauDifficulte: 3, 
            trees: [
                {
                    treeID: 1,
                    statusTask: "Completed"
                }
            ],
            users: [
                {
                    userID: 1,
                    completionDate: new Date().toISOString(),
                    status: "Completed"
                }
            ]
        }

        prisma.task.create.mockResolvedValue({...mockTask, taskID: 1})
        task = await createTask(mockTask as Prisma.TaskCreateInput)
        expect(task.taskID).toBe(1)
        expect(task).not.toBe(null)
    })
    
    it("should find the task by its ID", async () => {
        const mockTask = task
        prisma.task.findUnique.mockResolvedValue(mockTask)
        const taskExist = await findTask(mockTask.taskID)
        expect(taskExist).not.toBe(null)
        expect(taskExist).toEqual(task)
    })
    
    it("should find all the existing tasks by userID", async () => {
        prisma.task.findMany.mockResolvedValue(task)
        const getAllUserTasks = await findAllTasksByUserID(task.users.userID) 
        expect(getAllUserTasks).not.toBe(null)
    })
    
    it("should find all the existing tasks by skilltreeID", async () => {
        prisma.task.findMany.mockResolvedValue(task)
        const getAllTreeTasks = await findAllTasksByTreeID(task.trees.treeID)
        expect(getAllTreeTasks).not.toBe(null)
    })

    it("should find the task by its ID and update it", async () => {
        const taskDescriptionUpdate = { description: "This is the updated description" }
        const taskUpdated = { ...task, ...taskDescriptionUpdate }
        prisma.task.update.mockResolvedValue(taskUpdated)
        const updatedTaskFromDb = await updateTask(task.taskID, taskUpdated)
        expect(updatedTaskFromDb).toEqual(taskUpdated)
    })

    it("should find the task by its ID and delete it", async () => {
        prisma.task.delete.mockResolvedValue(task)
        const taskToBeDeleted = await deleteTask(task.taskID)
        expect(taskToBeDeleted).toEqual(task);
    })
})