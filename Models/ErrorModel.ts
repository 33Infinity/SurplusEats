export class ErrorModel{
    private constructor(aMessage){
        this.ErrorMessage=aMessage
    }

    ErrorMessage:string;

    public static NewError(aMessage:string):ErrorModel{
        return new ErrorModel(aMessage);
    }
}