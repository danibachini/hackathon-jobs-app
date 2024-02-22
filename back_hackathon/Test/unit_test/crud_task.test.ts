
import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"

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
        task = await prisma.task.create({ data: mockTask as any })
        expect(task.taskID).toBe(1)
        expect(task).not.toBe(null)
    })

    it("should update the created task", async () => {
        const taskDescriptionUpdate = { description: "This is the updated description" }
        const updatedTask = { ...task, ...taskDescriptionUpdate }
        prisma.task.update.mockResolvedValue(updatedTask)

        const updatedTaskFromDb = await prisma.task.update({
            where: {
                taskID: task.taskID,
            },
            data: updatedTask
        })
        expect(updatedTaskFromDb).toEqual(updatedTask)
    })

    it("should delete the task created", async () => {
        const deleteTask = await prisma.task.delete({
            where: {
                taskID: task.taskID
            },
        })
    })
})