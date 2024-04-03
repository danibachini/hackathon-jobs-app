
import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"
import { 
    createJobOffer, 
    updateJobOffer, 
    deleteJobOffer, 
    getJobOfferById, 
    getAllTasksFromJobOffer,
    getAllJobOffersApplied
} from '../../app/Repositories/jobOffersRepository';
import { Role } from "@prisma/client";

vi.mock("../../libs/prisma")

describe("Unit test for job offers", () => {
    let jobOffer:any;
    
    it("should create a job offer", async ()=>{
        const mockJobOfferInput = {
            title: "front-end job offer",
            description: "fron-end mission description",
        }

        prisma.jobOffer.create.mockResolvedValue({id: 1, ...mockJobOfferInput})
        jobOffer = await createJobOffer(mockJobOfferInput)
        expect(jobOffer).toStrictEqual({
            id: 1,
            ...mockJobOfferInput
        })
    })

    it("should find a specific job offer by its ID", async () => {
        prisma.jobOffer.findUnique.mockResolvedValue(jobOffer)
        const jobOfferExist = await getJobOfferById(1)
        expect(jobOfferExist).not.toBe(null)
        expect(jobOfferExist).toEqual(jobOffer)
    })
   
    it("should find all tasks from a specific job offer", async () => {
        prisma.jobOffer.findFirst.mockResolvedValue(jobOffer)
        const allTasksFromJobOffer = await getAllTasksFromJobOffer(1)
        expect(allTasksFromJobOffer).toEqual(jobOffer)
    })

    // FIND ALL JOBOFFERS THAT A CERTAIN USER APPLIED TO
    // create a user mock

    // WRITE THIS IN THE OFFERS
    it("should find all the job offers the user applied to", async () => {
        const mockUser = {
            firstname: "Adam", 
            lastname: "Silver", 
            email: "adam@prisma.com", 
            password: "hashedpass", 
            role: Role.CANDIDATE,
            jobApplied: [
                {
                    jobOffer: {
                        id: 1,
                        title: "Title of the job offer",
                        description: "this is the job offer description"
                    }
                }
            ]
        }
        prisma.user.findUnique.mockResolvedValue(mockUser);
        prisma.user.create.mockResolvedValue({...mockUser, id: 1})

        const jobOffersApplied = await getAllJobOffersApplied(1)
        console.log(jobOffersApplied);
        expect(jobOffersApplied).not.toBe(null)
    })

    // FIND ALL USERS THAT APPLIED TO A CERTAIN JOBOFFER
    

    it("should find the job offer by its ID and update it", async () => {
        const newDescription = { description: "This is the updated description" }
        const jobOfferWithNewDescription = { ...newDescription, ...jobOffer}
        prisma.jobOffer.update.mockResolvedValue(jobOfferWithNewDescription)
        const jobOfferUpdatedFromDb = await updateJobOffer(1, jobOfferWithNewDescription)
        expect(jobOfferUpdatedFromDb).toEqual(jobOfferWithNewDescription)
    })

    it("should find the job offer byy its ID and delete it", async () => {
        prisma.jobOffer.delete.mockResolvedValue(jobOffer)
        const jobOfferDeletedFromDb = await deleteJobOffer(1)
        expect(jobOfferDeletedFromDb).toEqual(jobOffer)
    })
})