import ICustomer from "../../../domain/customer/entity/customer.interface"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface"
import Address from "../../../domain/customer/value-object/address"
import { InputUpdateCustomerDTO } from "./update-customer.dto"
import UpdateCustomerUseCase from "./update-customer.usecase"

describe('Test update customer usecase', () => {
    
    let mockCustomerRepository: ICustomerRepository
    let customer: ICustomer
    let input: InputUpdateCustomerDTO

    beforeEach(() => {
        customer = CustomerFactory.createWithAddress('Customer 1', new Address('Street 1', 1, 'Zip 1', 'City 1'))

        mockCustomerRepository = {
            create: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(customer)),
            update: jest.fn(),
            findAll: jest.fn()
        }

        input = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                city: customer.Address.city,
                zip: customer.Address.zip
            }
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('should update a customer', () => {

        it('name', async () => {            
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            input.name = 'Customer 2'
            const result = await usecase.execute(input)
            expect(result).toEqual(input)
        })

        it('address street', async () => {
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            input.address.street = 'Street 2'
            const result = await usecase.execute(input)
            expect(result).toEqual(input)
        })

        it('address number', async () => {
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            input.address.number = 2
            const result = await usecase.execute(input)
            expect(result).toEqual(input)
        })

        it('address city', async () => {
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            input.address.city = 'City 2'
            const result = await usecase.execute(input)
            expect(result).toEqual(input)
        })

        it('address zip', async () => {
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            input.address.zip = 'Zip 2'
            const result = await usecase.execute(input)
            expect(result).toEqual(input)
        })

    })

    describe('should throw an error', () => {
        
        it('when id is empty', async () => {
            jest.spyOn(mockCustomerRepository, 'find').mockRejectedValue(new Error('Customer not found'))
            input.id = ''
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Customer not found')
        })

        it('when name is empty', async () => {
            input.name = ''
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Name is required')
        })

        it('when address street is empty', async () => {
            input.address.street = ''
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Street is required')
        })

        it('when address number is empty', async () => {
            input.address.number = 0
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Number is required')
        })

        it('when address city is empty', async () => {
            input.address.city = ''
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            await expect(usecase.execute(input)).rejects.toThrow('City is required')
        })

        it('when address zip is empty', async () => {
            input.address.zip = ''
            const usecase = new UpdateCustomerUseCase(mockCustomerRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Zip is required')
        })

    })
})