export class ErrorHandler {

   readonly statusCode: number;
   readonly message:  string;

  constructor(statusCode: number, message: string){
    this.message = message;
    this.statusCode = statusCode;
  }

}