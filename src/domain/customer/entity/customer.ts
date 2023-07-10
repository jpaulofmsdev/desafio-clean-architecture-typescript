import Entity from "../../@shared/entity/entity.abstract"
import IEventDispatcher from "../../@shared/event/event-dispatcher.interface"
import NotificationError from "../../@shared/notification/notification.error"
import CustomerAddressChangedEvent from "../event/customer-address-changed.event"
import Address from "../value-object/address"
import ICustomer from "./customer.interface"

export default class Customer extends Entity implements ICustomer{

    private _eventDispatcher: IEventDispatcher

    private _name: string = ""
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0

    constructor(id: string, name: string, address?: Address, eventDispatcher?: IEventDispatcher) {
        super()
        this._id = id
        this._name = name
        this.validate(true)
        if(address) {
            this.changeAddress(address)
        }
        if(eventDispatcher) {
            this._eventDispatcher = eventDispatcher
        }
    }

    get name(): string {
        return this._name
    }

    get Address(): Address {
        return this._address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    validate(isThrowError: boolean = false): void {
        if(this._id.length === 0) {
            this.notification.addError({
                message: "Id is required",
                context: "customer"
            })
        }
        if(this._name.length === 0) {
            this.notification.addError({
                message: "Name is required",
                context: "customer"
            })
        }

        if(isThrowError && this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors)
        }
    }

    changeName(name: string) {
        this._name = name
        this.validate(true)
    }

    changeAddress(address: Address) {
        this._address = address
        if(this._eventDispatcher) {
            this._eventDispatcher.notify(new CustomerAddressChangedEvent({id: this.id, name: this.name, address: this.Address.toString()}))
        }
    }

    isActive(): boolean {
        return this._active
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }

}