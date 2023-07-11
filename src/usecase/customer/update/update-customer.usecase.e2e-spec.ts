import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model"
import { v4 } from "uuid"
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository"
import UpdateCustomerUseCase from "./update-customer.usecase"
import { InputUpdateCustomerDTO } from "./update-customer.dto"

describe('UpdateCustomer e2e test', () => {

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

        customerId = v4()
        const customerModel = {
            id: customerId,
            active: true,
            rewardPoints: 10,
            name: 'Customer Test',
            street: 'Street Test',
            number: 123,
            zip: '12345-678',
            city: 'City Test'
        }
        await CustomerModel.create(customerModel)

        input = {
            id: customerId,
            name: customerModel.name,
            address: {
                street: customerModel.street,
                number: customerModel.number,
                zip: customerModel.zip,
                city: customerModel.city
            }
        }
    })

    afterEach(async () => {
        await sequelize.close()
    })

    describe('should update a customer', () => {

        it('name', async () => {
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            const output = await updateCustomerUseCase.execute({...input, name: 'Customer 2'})
            expect(output).toEqual({
                id: customerId,
                name: 'Customer 2',
                address: {
                    street: input.address.street,
                    number: input.address.number,
                    city: input.address.city,
                    zip: input.address.zip
                }
            })
            const customerDB = await CustomerModel.findByPk(customerId)
            expect(customerDB?.name).toEqual('Customer 2')
            expect(customerDB?.street).toEqual(input.address.street)
            expect(customerDB?.number).toEqual(input.address.number)
            expect(customerDB?.city).toEqual(input.address.city)
            expect(customerDB?.zip).toEqual(input.address.zip)
        })

        it('street', async () => {
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            const output = await updateCustomerUseCase.execute({...input, address: {...input.address, street: 'Street 2'}})
            expect(output).toEqual({
                id: customerId,
                name: input.name,
                address: {
                    street: 'Street 2',
                    number: input.address.number,
                    city: input.address.city,
                    zip: input.address.zip
                }
            })
            const customerDB = await CustomerModel.findByPk(customerId)
            expect(customerDB?.name).toEqual(input.name)
            expect(customerDB?.street).toEqual('Street 2')
            expect(customerDB?.number).toEqual(input.address.number)
            expect(customerDB?.city).toEqual(input.address.city)
            expect(customerDB?.zip).toEqual(input.address.zip)
        })

        it('number', async () => {
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            const output = await updateCustomerUseCase.execute({...input, address: {...input.address, number: 2}})
            expect(output).toEqual({
                id: customerId,
                name: input.name,
                address: {
                    street: input.address.street,
                    number: 2,
                    city: input.address.city,
                    zip: input.address.zip
                }
            })
            const customerDB = await CustomerModel.findByPk(customerId)
            expect(customerDB?.name).toEqual(input.name)
            expect(customerDB?.street).toEqual(input.address.street)
            expect(customerDB?.number).toEqual(2)
            expect(customerDB?.city).toEqual(input.address.city)
            expect(customerDB?.zip).toEqual(input.address.zip)
        })

        it('zip', async () => {
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            const output = await updateCustomerUseCase.execute({...input, address: {...input.address, zip: '00000-000'}})
            expect(output).toEqual({
                id: customerId,
                name: input.name,
                address: {
                    street: input.address.street,
                    number: input.address.number,
                    city: input.address.city,
                    zip: '00000-000'
                }
            })
            const customerDB = await CustomerModel.findByPk(customerId)
            expect(customerDB?.name).toEqual(input.name)
            expect(customerDB?.street).toEqual(input.address.street)
            expect(customerDB?.number).toEqual(input.address.number)
            expect(customerDB?.city).toEqual(input.address.city)
            expect(customerDB?.zip).toEqual('00000-000')
        })

        it('city', async () => {
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            const output = await updateCustomerUseCase.execute({...input, address: {...input.address, city: 'City 2'}})
            expect(output).toEqual({
                id: customerId,
                name: input.name,
                address: {
                    street: input.address.street,
                    number: input.address.number,
                    city: 'City 2',
                    zip: input.address.zip
                }
            })
            const customerDB = await CustomerModel.findByPk(customerId)
            expect(customerDB?.name).toEqual(input.name)
            expect(customerDB?.street).toEqual(input.address.street)
            expect(customerDB?.number).toEqual(input.address.number)
            expect(customerDB?.city).toEqual('City 2')
            expect(customerDB?.zip).toEqual(input.address.zip)
        })
    })

    describe('should throw an error when', () => {
        it('name is empty', async () => {
            input.name = ''
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
        })

        it('address street is empty', async () => {
            input.address.street = ''
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Street is required')
        })

        it('address number is empty', async () => {
            input.address.number = null
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Number is required')
        })

        it('address zip is empty', async () => {
            input.address.zip = ''
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Zip is required')
        })

        it('address city is empty', async () => {
            input.address.city = ''
            const updateCustomerUseCase = new UpdateCustomerUseCase(new CustomerRepository())
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('City is required')
        })
    })
})