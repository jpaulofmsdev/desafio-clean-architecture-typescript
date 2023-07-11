import INotification from '../notification/notification.interface';

export default interface IEntity extends INotification {
    get id(): string
}