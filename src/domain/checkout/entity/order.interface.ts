import IOrderItem from "./order-item.interface";

export default interface IOrder {
    get id(): string
    get customerId(): string
    get items(): IOrderItem[]
}