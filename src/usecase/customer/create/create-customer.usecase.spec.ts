import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface"
import { InputCreateCustomerDTO } from "./create-customer.dto"
import CreateCustomerUseCase from "./create-customer.usecase"

describe("Test create customer usecase", () => {
    
    let mockCustomerRepository: ICustomerRepository

    beforeEach(() => {
        mockCustomerRepository = {
            create: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should create a customer", async () => {

        const usecase = new CreateCustomerUseCase(mockCustomerRepository)

        const input = {
            name: "Customer Test",
            address: {
                street: "Street Test",
                number: 123,
                zip: "12345-678",
                city: "City Test"
            }
        }

        const output = await usecase.execute(input)

        expect(output).toStrictEqual({
            id: expect.any(String),
            name: "Customer Test",
            address: {
                street: "Street Test",
                number: 123,
                zip: "12345-678",
                city: "City Test"
            }
        })
    })

    describe('should throw an error when', () => {

        let input: InputCreateCustomerDTO
        beforeEach(() => {
            jest.clearAllMocks()
            input = {
                name: "",
                address: {
                    street: "Street Test",
                    number: 123,
                    zip: "12345-678",
                    city: "City Test"
                }
            }
        })
        
        it('should throw an error when name is empty', async () => {
            const usecase = new CreateCustomerUseCase(mockCustomerRepository)
            input.name = ''
            await expect(usecase.execute(input)).rejects.toThrow('Name is required')
        })
        
        it('should throw an error when address street is empty', async () => {
            const usecase = new CreateCustomerUseCase(mockCustomerRepository)
            input.address.street = ''
            await expect(usecase.execute(input)).rejects.toThrow('Street is required')
        })

        it('should throw an error when address number is empty', async () => {
            const usecase = new CreateCustomerUseCase(mockCustomerRepository)
            input.address.number = null
            await expect(usecase.execute(input)).rejects.toThrow('Number is required')
        })

        it('should throw an error when address zip is empty', async () => {
            const usecase = new CreateCustomerUseCase(mockCustomerRepository)
            input.address.zip = ''
            await expect(usecase.execute(input)).rejects.toThrow('Zip is required')
        })

        it('should throw an error when address city is empty', async () => {
            const usecase = new CreateCustomerUseCase(mockCustomerRepository)
            input.address.city = ''
            await expect(usecase.execute(input)).rejects.toThrow('City is required')
        })

    })
})