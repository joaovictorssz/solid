import 'dotenv/config'
import z from 'zod'
const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'), // o enum() define que o valor tem que ser UM dos fornecidos
    PORT: z.coerce.number().default(3333) // o coerce() converte para number, caso o valor seja uma string
})

const _env = envSchema.safeParse(process.env) //o safeParse compara o schema pre-definido com algum desejado, e confirma se a estrutura está igual


if (_env.success === false) {
    console.error("Invalid Environment Variables", _env.error.format())
    // Caso exista algum erro, ele não deixa a apllicação rodar
    throw new Error('Invalid Environment Variables.')

}

export const env = _env.data

