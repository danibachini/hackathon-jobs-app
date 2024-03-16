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
