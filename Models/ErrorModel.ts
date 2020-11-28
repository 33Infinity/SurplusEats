export class ErrorModel{
    private constructor(aMessage){
        this.Message=aMessage
    }

    Message:string;

    public static NewError(aMessage:string):ErrorModel{
        return new ErrorModel(aMessage);
    }
}