import Notification from "../notification/notification";
import IValueObject from "./value-object.interface";

export default abstract class ValueObject implements IValueObject {
    protected _notification: Notification

    constructor(){
        this._notification = new Notification()
    }

    get notification(): Notification {
        return this._notification
    }

}