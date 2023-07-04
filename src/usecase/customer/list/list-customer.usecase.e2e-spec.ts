import { v4 } from "uuid"
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model"
import { InputUpdateCustomerDTO } from "../update/update-customer.dto"
import { Sequelize } from "sequelize-typescript"
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository"
import ListCustomerUseCase from "./list-customer.usecase"

describe('FindCustomer e2e test', () => {

    let sequelize: Sequelize
    let customerId: string
    let input : InputUpdateCustomerDTO

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

    it('should find no customer', async () => {
        const customerRepository = new CustomerRepository()
        const customerUseCase = new ListCustomerUseCase(customerRepository)
        const output = await customerUseCase.execute({})
        expect(output.customers).toEqual([])
    })

    it('should find all customers', async () => {
        const customerModel = {
            id: v4(),
            active: true,
            rewardPoints: 10,
            name: 'Customer Test 1',
            street: 'Street Test 1',
            number: 1,
            zip: '12345-678',
            city: 'City Test 1'
        }
        await CustomerModel.create(customerModel)
        const customerModel2 = {
            id: v4(),
            active: true,
            rewardPoints: 20,
            name: 'Customer Test 2',
            street: 'Street Test 2',
            number: 1,
            zip: '23456-789',
            city: 'City Test 2'
        }
        await CustomerModel.create(customerModel2)

        const customerRepository = new CustomerRepository()
        const customerUseCase = new ListCustomerUseCase(customerRepository)
        const output = await customerUseCase.execute({})
        expect(output.customers).toHaveLength(2)
        expect(output.customers).toContainEqual({
            id: customerModel.id,
            name: customerModel.name,
            address: {
                street: customerModel.street,
                number: customerModel.number,
                city: customerModel.city,
                zip: customerModel.zip
            }
        })
        expect(output.customers).toContainEqual({
            id: customerModel2.id,
            name: customerModel2.name,
            address: {
                street: customerModel2.street,
                number: customerModel2.number,
                city: customerModel2.city,
                zip: customerModel2.zip
            }
        })
    })

})