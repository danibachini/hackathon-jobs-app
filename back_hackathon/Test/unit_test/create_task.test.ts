
import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"

vi.mock("../../libs/prisma")

describe("Unit test", () => {
    it("should create a new task", async () => {
        const mockTask = {
            description: "This is a test task",
            niveauDifficulte: 3, 
            trees: [
                {
                    treeID: 1,
                    // taskID: 1,
                    statusTask: "Completed"
                }
            ],
            users: [
                {
                    userID: 1,
                    // taskID: 1,
                    completionDate: "2021-09-27",
                    status: "Completed"
                }
            ]
        }

        prisma.task.create.mockResolvedValue({...mockTask, taskID: 1})
        const task = await prisma.task.create({data: mockTask as any})
        expect(task.taskID).toBe(1)
        expect(task).not.toBe(null)
    })
})