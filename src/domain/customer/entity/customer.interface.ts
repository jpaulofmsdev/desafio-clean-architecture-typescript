import IAddress from "./address.interface";

export default interface ICustomer {
    get id(): string
    get name(): string
    get Address(): IAddress
    get rewardPoints(): number
    changeAddress(address: IAddress): void
    changeName(name: string): void
    isActive(): boolean
}