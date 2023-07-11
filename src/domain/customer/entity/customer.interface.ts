import IEntity from "../../@shared/entity/entity.interface";
import IAddress from "../value-object/address.interface";

export default interface ICustomer extends IEntity {
    get name(): string
    get Address(): IAddress
    get rewardPoints(): number
    changeAddress(address: IAddress): void
    changeName(name: string): void
    isActive(): boolean
}