export class LateValidationCheckInError extends Error {
    constructor() {
        super('The check-in only can be validated until 20 minutes of its creation.')
    }

}