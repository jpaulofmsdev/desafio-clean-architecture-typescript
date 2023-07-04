import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model"
import { InputFindCustomerDTO } from "./find-customer.dto"
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository"
import FindCustomerUseCase from "./find-customer.usecase"
import { v4 } from "uuid"

describe('FindCustomer e2e test', () => {

    let sequelize: Sequelize

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
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should find a customer', async () => {
        const customerModel = {
            id: v4(),
            active: true,
            rewardPoints: 10,
            name: 'Customer Test',
            street: 'Street Test',
            number: 123,
            zip: '12345-678',
            city: 'City Test'
        }
        await CustomerModel.create(customerModel)

        const input: InputFindCustomerDTO = {id: customerModel.id}

        const customerRepository = new CustomerRepository()
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository)
        const output = await findCustomerUseCase.execute(input)

        expect(output).toEqual({
            id: customerModel.id,
            name: customerModel.name,
            address: {
                street: customerModel.street,
                number: customerModel.number,
                zip: customerModel.zip,
                city: customerModel.city
            }
        })
    })

    it('should throw an error when customer not found', async () => {
        const findCustomerUseCase = new FindCustomerUseCase(new CustomerRepository())
        expect(findCustomerUseCase.execute({id: 'invalid-id'})).rejects.toThrow('Customer not found')
    })
})