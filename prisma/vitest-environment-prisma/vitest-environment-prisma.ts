import { Environment } from 'vitest'

export default <Environment>{
    name: 'prisma',
    transformMode: 'web',
    async setup() {
        console.log("setup")
        return {
            teardown() {
                console.log("teatdown")
            }
        }
    }
}