class AppError extends Error {
    statusCode: number
    message: string
    
    constructor( message: string, statusCode: number = 400 ) {
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

export { AppError }