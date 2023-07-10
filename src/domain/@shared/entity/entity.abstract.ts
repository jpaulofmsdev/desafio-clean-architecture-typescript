import Notification from '../notification/notification'
import IEntity from './entity.interface'

export default abstract class Entity implements IEntity {

    protected _id: string
    protected notification: Notification

    constructor(){
        this.notification = new Notification()
    }

    get id(): string {
        return this._id
    }
}