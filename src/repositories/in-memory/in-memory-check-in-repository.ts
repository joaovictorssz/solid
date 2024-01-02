import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepositoryInterface } from "../interfaces/check-in-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";
export class InMemoryCheckInRepository implements CheckInRepositoryInterface {

    public checkIns: CheckIn[] = []

    async findByUserIdOnDay(userId: string, date: Date): Promise<CheckIn | null> {

        const startofTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')
        
        const checkInAtSameDay = this.checkIns.find((check_in)=>{
            const checkInDate = dayjs(check_in.createdAt)

            const isSameDate = checkInDate.isAfter(startofTheDay) && checkInDate.isBefore(endOfTheDay)


            return check_in.userId === userId && isSameDate 
        })

        if(!checkInAtSameDay){
            return null
        }

        return checkInAtSameDay
        
        
    }
    async create(data: Prisma.CheckInUncheckedCreateInput) {


        const checkInAtSameDay = await this.findByUserIdOnDay(data.userId, new Date())
        
        if(checkInAtSameDay){
            throw new Error()
        }
        
        const checkIn : CheckIn= {
            id: randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            createdAt: new Date(),
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null
        }

        this.checkIns.push(checkIn)

        return checkIn



    }
}