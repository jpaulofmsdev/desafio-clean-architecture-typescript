import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infra/product/repository/sequelize/product.model"
import { v4 } from "uuid"
import { InputFindProductDTO } from "./find-product.dto"
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository"
import FindProductUseCase from "./find-product.usecase"

describe('FindProduct e2e test', () => {

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

    it('should find a product', async () => {
        const productModel = {
            id: v4(),
            name: 'Product Test',
            price: 10
        }
        await ProductModel.create(productModel)

        const input: InputFindProductDTO = {id: productModel.id}
        const usecase = new FindProductUseCase(new ProductRepository())
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: productModel.id,
            name: productModel.name,
            price: productModel.price
        })
    })

    it('should throw an error when product not found', async () => {
        const input: InputFindProductDTO = {id: v4()}
        const usecase = new FindProductUseCase(new ProductRepository())
        await expect(usecase.execute(input)).rejects.toThrow('Product not found')
    })
})