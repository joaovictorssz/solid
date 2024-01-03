import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepositoryInterface } from "./interfaces/check-in-repository";
import { prisma } from "@/lib/prisma";

export class CheckInRepository implements CheckInRepositoryInterface{
    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                userId
            }
        })

        return checkIns.slice((page - 1)*20, page*20)
    }

    async findByUserIdOnDay(_userId: string, _date: Date): Promise<CheckIn | null> {

        return null
        
    }

    async getUserMetrics(userId: string): Promise<number> {
        return (await prisma.checkIn.findMany({
            where:{
                userId
            }
        })).length
    }

    async findById(id: string): Promise<CheckIn | null> {
        return null
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