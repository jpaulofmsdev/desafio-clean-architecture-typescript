import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infra/product/repository/sequelize/product.model"
import ListProductUseCase from "./list-product.usecase"
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository"
import ProductFactory from "../../../domain/product/factory/product.factory"
import { v4 } from "uuid"

describe('ListProduct e2e test', () => {

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

    it('should find no product', async () => {
        const usecase = new ListProductUseCase(new ProductRepository())
        const output = await usecase.execute({})
        expect(output).toHaveProperty('products', [])
    })

    it('should find all products', async () => {
        const productA = {
            id: v4(),
            name: 'Product A',
            price: 10
        }
        const productB = {
            id: v4(),
            name: 'Product B',
            price: 20
        }
        await ProductModel.create(productA)
        await ProductModel.create(productB)

        const usecase = new ListProductUseCase(new ProductRepository())
        const output = await usecase.execute({})

        expect(output).toHaveProperty('products')
        expect(output.products).toHaveProperty('length', 2)

        expect(output.products[0]).toHaveProperty('id', productA.id)
        expect(output.products[0]).toHaveProperty('name', productA.name)
        expect(output.products[0]).toHaveProperty('price', productA.price)

        expect(output.products[1]).toHaveProperty('id', productB.id)
        expect(output.products[1]).toHaveProperty('name', productB.name)
        expect(output.products[1]).toHaveProperty('price', productB.price)
    })
})