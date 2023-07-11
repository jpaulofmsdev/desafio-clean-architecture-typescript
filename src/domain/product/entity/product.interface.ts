import IEntity from "../../@shared/entity/entity.interface"

export default interface IProduct extends IEntity {
    get id(): string
    get name(): string
    get price(): number

    changeName(name: string): void
    changePrice(price: number): void
}