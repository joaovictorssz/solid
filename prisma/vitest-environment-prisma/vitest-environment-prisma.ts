import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'

import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const generateDatabaseURL = (schema: string) => {
    if(!process.env.DATABASE_URL){
        throw new Error("Please provide DATABASE_URL Environment Variable.")
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
    name: 'prisma',
    transformMode: 'web',
    async setup() {
        
        const schema = randomUUID()
        const url = generateDatabaseURL(schema)

        process.env.DATABASE_URL = url

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    }
}