import { Sequelize } from "sequelize-typescript"
import { v4 } from "uuid"
import ProductModel from "../../../infra/product/repository/sequelize/product.model"
import { InputUpdateProductDTO } from "./update-product.dto"
import UpdateProductUseCase from "./update-product.usecase"
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository"

describe('UpdateProduct e2e test', () => {

    let sequelize: Sequelize
    let productId: string
    let input : InputUpdateProductDTO

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

        productId = v4()
        const productModel = {
            id: productId,
            name: 'Product Test',
            price: 12
        }
        await ProductModel.create(productModel)

        input = {
            id: productId,
            name: productModel.name,
            price: productModel.price
        }
    })

    afterEach(async () => {
        await sequelize.close()
    })

    describe('should update a product', () => {

        it('name', async () => {
            input.name = 'Product Test 2'
            const updateProductUseCase = new UpdateProductUseCase(new ProductRepository())
            const output = await updateProductUseCase.execute(input)
            const productDB = await ProductModel.findByPk(output.id)
            expect(productDB?.name).toEqual('Product Test 2')
        })

        it('price', async () => {
            input.price = 33.2
            const updateProductUseCase = new UpdateProductUseCase(new ProductRepository())
            const output = await updateProductUseCase.execute(input)
            const productDB = await ProductModel.findByPk(output.id)
            expect(productDB?.price).toEqual(33.2)
        })
    })

    describe('should throw an error when', () => {
        it('name is empty', async () => {
            input.name = ''
            const updateProductUseCase = new UpdateProductUseCase(new ProductRepository())
            await expect(updateProductUseCase.execute(input)).rejects.toThrow('Name is required')
        })

        it('price is zero', async () => {
            input.price = 0
            const updateProductUseCase = new UpdateProductUseCase(new ProductRepository())
            await expect(updateProductUseCase.execute(input)).rejects.toThrow('Price must be greater than zero')
        })

        it('price is negative', async () => {
            input.price = -10
            const updateProductUseCase = new UpdateProductUseCase(new ProductRepository())
            await expect(updateProductUseCase.execute(input)).rejects.toThrow('Price must be greater than zero')
        })
    })
})