import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infra/product/repository/sequelize/product.model"
import { InputCreateProductDTO } from "./create-product.dto"
import CreateProductUseCase from "./create-product.usecase"
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository"

describe('CreateProduct e2e test', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([
            ProductModel
        ])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    describe('should create a product', () => {
        it('should create a product of type A', async () => {
            const input: InputCreateProductDTO = {
                type: "A",
                name: "Product Test",
                price: 10
            }

            const usecase = new CreateProductUseCase(new ProductRepository())

            const output = await usecase.execute(input)

            const productDB = await ProductModel.findOne({
                where: {
                    id: output.id
                }
            })

            expect(productDB).toHaveProperty('id', output.id)
            expect(productDB).toHaveProperty('name', input.name)
            expect(productDB).toHaveProperty('price', input.price)
        })

        it('should create a product of type B', async () => {
            const input: InputCreateProductDTO = {
                type: "B",
                name: "Product Test",
                price: 10
            }

            const usecase = new CreateProductUseCase(new ProductRepository())

            const output = await usecase.execute(input)

            const productDB = await ProductModel.findOne({
                where: {
                    id: output.id
                }
            })

            expect(productDB).toHaveProperty('id', output.id)
            expect(productDB).toHaveProperty('name', input.name)
            expect(productDB).toHaveProperty('price', input.price * 2)
        })

        describe('should throw an error when', () => {

            it('name is null', async () => {
                const input: InputCreateProductDTO = {
                    type: "A",
                    name: null,
                    price: 10
                }
                const updateCustomerUseCase = new CreateProductUseCase(new ProductRepository())
                await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
                const total = await ProductModel.count()
                expect(total).toBe(0)
            })
    
            it('name is empty', async () => {
                const input: InputCreateProductDTO = {
                    type: "A",
                    name: "",
                    price: 10
                }
                const updateCustomerUseCase = new CreateProductUseCase(new ProductRepository())
                await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
                const total = await ProductModel.count()
                expect(total).toBe(0)
            })
    
            it('name is empty 2', async () => {
                const input: InputCreateProductDTO = {
                    type: "A",
                    name: "  ",
                    price: 10
                }
                const updateCustomerUseCase = new CreateProductUseCase(new ProductRepository())
                await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
                const total = await ProductModel.count()
                expect(total).toBe(0)
            })
    
            it('price is null', async () => {
                const input: InputCreateProductDTO = {
                    type: "A",
                    name: "Product Test",
                    price: null
                }
                const updateCustomerUseCase = new CreateProductUseCase(new ProductRepository())
                await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Price must be greater than zero')
                const total = await ProductModel.count()
                expect(total).toBe(0)
            })
    
            it('price is zero', async () => {
                const input: InputCreateProductDTO = {
                    type: "A",
                    name: "Product Test",
                    price: 0
                }
                const updateCustomerUseCase = new CreateProductUseCase(new ProductRepository())
                await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Price must be greater than zero')
                const total = await ProductModel.count()
                expect(total).toBe(0)
            })
    
            it('price is negative', async () => {
                const input: InputCreateProductDTO = {
                    type: "A",
                    name: "Product Test",
                    price: -10
                }
                const updateCustomerUseCase = new CreateProductUseCase(new ProductRepository())
                await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Price must be greater than zero')
                const total = await ProductModel.count()
                expect(total).toBe(0)
            })
        })
    })
})