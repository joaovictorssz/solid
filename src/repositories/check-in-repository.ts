import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepositoryInterface } from "./interfaces/check-in-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class CheckInRepository implements CheckInRepositoryInterface{
    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                userId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return checkIns
    }

    async findByUserIdOnDay(_userId: string, _date: Date): Promise<CheckIn | null> {

        const startOfDate = dayjs(_date).startOf('date')
        const endOfDate = dayjs(_date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where:{
                userId: _userId,
                createdAt: {
                    gte: startOfDate.toDate(),
                    lte: endOfDate.toDate()
                }
            },

        })
        
        return checkIn
    }

    async getUserMetrics(userId: string): Promise<number> {
        return (await prisma.checkIn.findMany({
            where:{
                userId
            }
        })).length
    }

     async findById(id: string): Promise<CheckIn | null> {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return checkIn
    }
   
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn | null>{

        const check_in = await prisma.checkIn.create({data})
        return check_in
    }   

    async save(checkIn: CheckIn): Promise<CheckIn > {
        const checkInUpdated = await prisma.checkIn.update({
            
            data:{
                validatedAt: checkIn.validatedAt
            },
            where: {
                id: checkIn.id
            }
        })

        return checkInUpdated
    }
    
    

}