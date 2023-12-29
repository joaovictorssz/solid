import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepositoryInterface } from "./interfaces/check-in-repository";
import { prisma } from "@/lib/prisma";

export class CheckInRepository implements CheckInRepositoryInterface{
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        
        const check_in = await prisma.checkIn.create({data})
        return check_in
    }   
    
    

}