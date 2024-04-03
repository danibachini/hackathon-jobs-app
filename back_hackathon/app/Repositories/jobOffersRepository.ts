import {Prisma} from "@prisma/client"
import prisma from "../../libs/prisma"

export const createJobOffer = async (jobOffer: Prisma.JobOfferCreateInput) => {
  return await prisma.jobOffer.create({
    data: jobOffer
  })
}

export const updateJobOffer = async (id: number, jobOffer: Prisma.JobOfferUpdateInput) => {
  return await prisma.jobOffer.update({
    where: {id},
    data: jobOffer
  })
}

export const deleteJobOffer = async (id: number) => {
  return await prisma.jobOffer.delete({
    where: {id}
  })
}

export const getJobOfferById = async (id: number) => {
  return await prisma.jobOffer.findUnique({
    where: {id}
  })
}

export const getAllTasksFromJobOffer = async (jobOfferId: number) => {
  return await prisma.jobOffer.findFirst({
    where: {
      id: jobOfferId
    }, 
    include: {
      tasks: true
    }
  })
}

export const getAllJobOffersApplied = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {id: id},
    include: {
      jobApplied: {
        include: {
          jobOffer: true
        }
      }
    }
  })

  return user?.jobApplied?.map((application) => application.jobOffer) ?? [];
}
