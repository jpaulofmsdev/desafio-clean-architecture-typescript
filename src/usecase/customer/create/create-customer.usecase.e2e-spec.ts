import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository"
import CreateCustomerUseCase from "./create-customer.usecase"
import { InputCreateCustomerDTO } from "./create-customer.dto"

describe('CreateCustomer e2e test', () => {

    let sequelize: Sequelize
    let input: InputCreateCustomerDTO

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([
            CustomerModel
        ])
        await sequelize.sync()

        input = {
            name: 'Customer Test',
            address: {
                street: 'Street Test',
                number: 123,
                zip: '12345-678',
                city: 'City Test'
            }
        }
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a customer', async () => {

        const createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository())

        const output = await createCustomerUseCase.execute(input)

        const customerDB = await CustomerModel.findOne({
            where: {
                id: output.id
            }
        })

        expect(customerDB).toHaveProperty('id', output.id)
        expect(customerDB).toHaveProperty('name', input.name)
        expect(customerDB).toHaveProperty('street', input.address.street)
        expect(customerDB).toHaveProperty('number', input.address.number)
        expect(customerDB).toHaveProperty('zip', input.address.zip)
        expect(customerDB).toHaveProperty('city', input.address.city)

    })

    describe('should throw an error when', () => {

        it('name is empty', async () => {
            const createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository())
            input.name = ''
            expect(createCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
        })

        it('address street is empty', async () => {
            input.address.street = ''
            const createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository())
            expect(createCustomerUseCase.execute(input)).rejects.toThrow('Street is required')
        })

        it('address number is empty', async () => {
            input.address.number = null
            const createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository())
            expect(createCustomerUseCase.execute(input)).rejects.toThrow('Number is required')
        })

        it('address zip is empty', async () => {
            input.address.zip = ''
            const createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository())
            expect(createCustomerUseCase.execute(input)).rejects.toThrow('Zip is required')
        })

        it('address city is empty', async () => {
            input.address.city = ''
            const createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository())
            expect(createCustomerUseCase.execute(input)).rejects.toThrow('City is required')
        })
    })

})