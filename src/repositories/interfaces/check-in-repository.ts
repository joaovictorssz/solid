import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepositoryInterface {

    create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn | null> ,
    findByUserIdOnDay(userId: string, date: Date) : Promise<CheckIn | null>,
    findManyByUserId(userId: string, page: number) : Promise<CheckIn[]>,

}