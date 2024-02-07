export abstract class UseCase<Parameters, ReturnValue> {
    public abstract execute (params?: Parameters): Promise<ReturnValue>;
}