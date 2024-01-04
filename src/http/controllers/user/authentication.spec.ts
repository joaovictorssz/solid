import 'dotenv/config'

import { test } from "vitest";

test('test', ()=>{
    console.log(process.env.DATABASE_URL)
})