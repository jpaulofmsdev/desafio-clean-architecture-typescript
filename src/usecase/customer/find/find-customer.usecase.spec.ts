import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find-customer.usecase"
import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface"

describe('Test find customer usecase', () => {

    let mockCustomerRepository: ICustomerRepository

    beforeEach(() => {
        mockCustomerRepository = {
            find: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should find a customer', async () => {
        
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zip 1', 'City 1')
        customer.changeAddress(address)
        
        jest.spyOn(mockCustomerRepository, 'find').mockReturnValue(Promise.resolve(customer))

        const input = {
            id: '1'
        }

        const usecase = new FindCustomerUseCase(mockCustomerRepository)
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: '1',
            name: 'Customer 1',
            address: {
                street: 'Street 1',
                number: 1,
                city: 'City 1',
                zip: 'Zip 1'
            }
        })
    })

    it('should throw an error when customer not found', async () => {
        jest.spyOn(mockCustomerRepository, 'find').mockImplementation(() => {
            throw new Error('Customer not found')
        })

        const input = {
            id: '1'
        }

        const usecase = new FindCustomerUseCase(mockCustomerRepository)
        await expect(usecase.execute(input)).rejects.toThrow('Customer not found')
    })

})