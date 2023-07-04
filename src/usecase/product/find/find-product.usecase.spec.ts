import ProductFactory from "../../../domain/product/factory/product.factory"
import IProductRepository from "../../../domain/product/repository/product-repository.interface"
import FindProductUseCase from "./find-product.usecase"

describe("Test find product usecase", () => {
    
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

    it('should find a product', async () => {
        const mockProduct = ProductFactory.create("A", "Product A", 10)
        jest.spyOn(mockProductRepository, 'find').mockReturnValue(Promise.resolve(mockProduct))
        const usecase = new FindProductUseCase(mockProductRepository)
        const output = await usecase.execute({
            id: mockProduct.id
        })
        expect(output).toStrictEqual({
            id: mockProduct.id,
            name: mockProduct.name,
            price: mockProduct.price
        })
    })

    it('should throw an error when product not found', async () => {
        jest.spyOn(mockProductRepository, 'find').mockImplementation(() => {
            throw new Error('Product not found')
        })

        const input = {
            id: '1'
        }

        const usecase = new FindProductUseCase(mockProductRepository)
        await expect(usecase.execute(input)).rejects.toThrow('Product not found')
    })
})