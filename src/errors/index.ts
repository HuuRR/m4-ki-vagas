export default class ErrorHTTP {
    statusCode: number
    message: string
  
    constructor(message: string, statusCode: number = 400){
      this.message = message
      this.statusCode = statusCode
    }
}