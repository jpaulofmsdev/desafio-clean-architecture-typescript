import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDTO, OutputListCustomerDTO } from "./list-customer.dto";

export default class ListCustomerUseCase {

    private customerRepository: ICustomerRepository

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
        
        const customers = await this.customerRepository.findAll()
        return {
            customers: customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    city: customer.Address.city,
                    zip: customer.Address.zip
                }
            }))
        }
    }
}