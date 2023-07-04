import { v4 } from "uuid"
import Customer from "../../../domain/customer/entity/customer"
import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface"
import Address from "../../../domain/customer/value-object/address"
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create-customer.dto"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"

export default class CreateCustomerUseCase {

    private customerRepository: ICustomerRepository

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
        const customer = CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.number, input.address.zip, input.address.city))
        await this.customerRepository.create(customer)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city
            }
        }
    }
}