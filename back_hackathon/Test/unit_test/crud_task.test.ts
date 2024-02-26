
import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"
import { 
    createTask, 
    updateTask, 
    deleteTask, 
    findTask, 
    findAllTasks 
} from '../../app/Services/taskService';

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
                    completionDate: "2021-09-27",
                    status: "Completed"
                }
            ]
        }

        prisma.task.create.mockResolvedValue({...mockTask, taskID: 1})
        task = await createTask(mockTask)
        expect(task.taskID).toBe(1)
        expect(task).not.toBe(null)
    })
    
    it("should find the task by its ID", async () => {
        const taskExist = await findTask(task.taskID)
        expect(taskExist).not.toBe(null)
        expect(taskExist).toEqual(task)
    })
    
    it("should find all the existing tasks", async () => {
        const getAllTasks = await findAllTasks()
        expect(getAllTasks).not.toBe(null)
    })

    it("should find the task by its ID and update it", async () => {
        const taskDescriptionUpdate = { description: "This is the updated description" }
        const taskUpdated = { ...task, ...taskDescriptionUpdate }
        prisma.task.update.mockResolvedValue(taskUpdated)
        const updatedTaskFromDb = await updateTask(task.taskID, taskUpdated)
        expect(updatedTaskFromDb).toEqual(taskUpdated)
    })

    it("should find the task by its ID and delete it", async () => {
        const taskToBeDeleted = await deleteTask(task.taskID)
        expect(taskToBeDeleted).toBeUndefined();
    })
})