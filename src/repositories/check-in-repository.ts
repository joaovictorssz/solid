import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepositoryInterface } from "./interfaces/check-in-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class CheckInRepository implements CheckInRepositoryInterface{

    async findByUserIdOnDay(_userId: string, _date: Date): Promise<CheckIn | null> {

        return null
        
    }
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn | null>{

        const check_in = await prisma.checkIn.create({data})
        return check_in
    }   
    
    

}