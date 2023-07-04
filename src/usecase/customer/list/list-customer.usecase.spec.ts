import ICustomer from "../../../domain/customer/entity/customer.interface"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface"
import Address from "../../../domain/customer/value-object/address"
import ListCustomerUseCase from "./list-customer.usecase"

describe("Test list customer usecase", () => {
    
    let mockCustomerRepository: ICustomerRepository
    let customer1: ICustomer
    let customer2: ICustomer

    beforeEach(() => {
        
        customer1 = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zip 1", "City 1"))
        customer2 = CustomerFactory.createWithAddress("Customer 2", new Address("Street 2", 2, "Zip 2", "City 2"))

        mockCustomerRepository = {
            create: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
        }

    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should list all customers", async () => {
        
        const usecase = new ListCustomerUseCase(mockCustomerRepository)

        const output = await usecase.execute({})

        expect(output).toHaveProperty('customers')
        expect(output.customers).toHaveProperty('length', 2)

        expect(output.customers[0]).toHaveProperty('id', customer1.id)
        expect(output.customers[0]).toHaveProperty('name', customer1.name)
        expect(output.customers[0]).toHaveProperty('address')
        expect(output.customers[0]).toHaveProperty('address.street', customer1.Address.street)
        expect(output.customers[0]).toHaveProperty('address.number', customer1.Address.number)
        expect(output.customers[0]).toHaveProperty('address.city', customer1.Address.city)
        expect(output.customers[0]).toHaveProperty('address.zip', customer1.Address.zip)

        expect(output.customers[1]).toHaveProperty('id', customer2.id)
        expect(output.customers[1]).toHaveProperty('name', customer2.name)
        expect(output.customers[1]).toHaveProperty('address')
        expect(output.customers[1]).toHaveProperty('address.street', customer2.Address.street)
        expect(output.customers[1]).toHaveProperty('address.number', customer2.Address.number)
        expect(output.customers[1]).toHaveProperty('address.city', customer2.Address.city)
        expect(output.customers[1]).toHaveProperty('address.zip', customer2.Address.zip)
    })
})