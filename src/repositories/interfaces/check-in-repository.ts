import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepositoryInterface {
    findById(id: string) : Promise<CheckIn | null> ,
    create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn | null> ,
    findByUserIdOnDay(userId: string, date: Date) : Promise<CheckIn | null>,
    getUserMetrics(userId: string) : Promise<number>,
    findManyByUserId(userId: string, page: number) : Promise<CheckIn[]>,
    save(checkIn : CheckIn) : Promise<CheckIn>

}