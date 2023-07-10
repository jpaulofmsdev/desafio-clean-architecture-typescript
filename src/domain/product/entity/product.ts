import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error"
import IProduct from "./product.interface"

export default class Product extends Entity implements IProduct {
    private _name: string
    private _price: number

    constructor(id: string, name: string, price: number) {
        super()
        this._id = id
        this._name = name
        this._price = price
        this.validate(true)
    }

    get id(): string {
        return this._id
    }
    
    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    validate(isThrowError: boolean = false): boolean {
        if (!this._id || this._id.length === 0) {
            this.notification.addError({
                message: 'Id is required',
                context: 'product'
            })
        }
        if(!this._name || this._name.trim().length === 0) {
            this.notification.addError({
                message: 'Name is required',
                context: 'product'
            })
        }
        if(!this._price || this._price <= 0) {
            this.notification.addError({
                message: 'Price must be greater than zero',
                context: 'product'
            })
        }

        if(isThrowError && this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors)
        }

        return true
    }

    changeName(name: string): void {
        this._name = name
        this.validate(true)
    }

    changePrice(price: number): void {
        this._price = price
        this.validate(true)
    }
}