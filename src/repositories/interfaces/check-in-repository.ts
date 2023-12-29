import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepositoryInterface {

    create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>

}