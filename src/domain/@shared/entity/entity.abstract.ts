import Notification from '../notification/notification'
import IEntity from './entity.interface'

export default abstract class Entity implements IEntity {

    protected _id: string
    protected _notification: Notification

    constructor(){
        this._notification = new Notification()
    }

    get id(): string {
        return this._id
    }

    get notification(): Notification {
        return this._notification
    }
}