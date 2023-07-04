export interface InputListCustomerDTO {
}

type Customer = {
    id: string
    name: string
    address: {
        street: string
        number: number
        city: string
        zip: string
    }
}

export interface OutputListCustomerDTO {
    customers: Customer[]
}