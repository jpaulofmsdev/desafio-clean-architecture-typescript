import NotificationError from "../../@shared/notification/notification.error"
import ValueObject from "../../@shared/value-object/value-object.abstract"
import AddressValidatorFactory from "../factory/address.validator.factory"
import IAddress from "./address.interface"

export default class Address extends ValueObject implements IAddress{
    private _street: string = ""
    private _number: number = 0
    private _zip: string = ""
    private _city: string = ""

    constructor(street: string, number: number, zip: string, city: string) {
        super();
        this._street = street
        this._number = number
        this._zip = zip
        this._city = city

        this.validate(true)
    }

    get street(): string {
        return this._street
    }

    get number(): number {
        return this._number
    }

    get zip(): string {
        return this._zip
    }

    get city(): string {
        return this._city
    }

    validate(isThrowError: boolean = false): void {
        
        AddressValidatorFactory.create().validate(this)

        if(isThrowError && this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors)
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`
    }
}