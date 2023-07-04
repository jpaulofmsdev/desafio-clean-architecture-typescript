import IProduct from "../../../domain/product/entity/product.interface"
import ProductFactory from "../../../domain/product/factory/product.factory"
import IProductRepository from "../../../domain/product/repository/product-repository.interface"
import ListProductUseCase from "./list-product.usecase"

describe("Test list product usecase", () => {
    
    let mockProductRepository: IProductRepository

    beforeEach(() => {
        mockProductRepository = {
            create: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should find all products', async () => {
        const productA = ProductFactory.create("A", "Product A", 10)
        const productB = ProductFactory.create("B", "Product B", 10)
        jest.spyOn(mockProductRepository, 'findAll').mockReturnValue(Promise.resolve([productA, productB]))

        const usecase = new ListProductUseCase(mockProductRepository)
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

    it('should find no product', async () => {
        jest.spyOn(mockProductRepository, 'findAll').mockReturnValue(Promise.resolve([]))

        const usecase = new ListProductUseCase(mockProductRepository)
        const output = await usecase.execute({})

        expect(output).toHaveProperty('products')
        expect(output.products).toHaveProperty('length', 0)
    })
})