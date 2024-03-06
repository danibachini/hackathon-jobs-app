
import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"
import { 
    createJobOffer, 
    updateJobOffer, 
    deleteJobOffer, 
    getJobOfferById, 
    getAllJobOffers 
} from '../../app/Repositories/jobOffersRepository';

vi.mock("../../libs/prisma")

describe("Unit test for job offers", () => {
    
    it("should create a job offer", async ()=>{
        const mockJobOfferInput = {
            title: "front-end job offer",
            description: "fron-end mission description",
        }

        prisma.jobOffer.create.mockResolvedValue({id: 1, ...mockJobOfferInput})

        const jobOffer = await createJobOffer(mockJobOfferInput)

        expect(jobOffer).toStrictEqual({
            id: 1,
            ...mockJobOfferInput
        })
    })
   
})