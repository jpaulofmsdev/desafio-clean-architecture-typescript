import IProduct from "../../../domain/product/entity/product.interface"
import ProductFactory from "../../../domain/product/factory/product.factory"
import IProductRepository from "../../../domain/product/repository/product-repository.interface"
import { InputUpdateProductDTO } from "./update-product.dto"
import UpdateProductUseCase from "./update-product.usecase"

describe('Test update product usecase', () => {
    
    let mockProductRepository: IProductRepository
    let product: IProduct
    let input: InputUpdateProductDTO

    beforeEach(() => {
        product = ProductFactory.create("A", "Product A", 10)

        mockProductRepository = {
            create: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            update: jest.fn(),
            findAll: jest.fn()
        }

        input = {
            id: product.id,
            name: product.name,
            price: product.price
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('should update a product', () => {

        it('name', async () => {            
            const usecase = new UpdateProductUseCase(mockProductRepository)
            input.name = 'Product A2'
            const result = await usecase.execute(input)
            expect(result).toEqual(input)
        })

        it('price', async () => {
            const usecase = new UpdateProductUseCase(mockProductRepository)
            input.price = 33.2
            const result = await usecase.execute(input)
            expect(result).toEqual(input)
        })

    })

    describe('should throw an error', () => {
        
        it('when id is empty', async () => {
            jest.spyOn(mockProductRepository, 'find').mockRejectedValue(new Error('Product not found'))
            input.id = ''
            const usecase = new UpdateProductUseCase(mockProductRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Product not found')
        })

        it('when name is empty', async () => {
            input.name = ''
            const usecase = new UpdateProductUseCase(mockProductRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Name is required')
        })

        it('when price is zero', async () => {
            input.price = 0
            const usecase = new UpdateProductUseCase(mockProductRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Price must be greater than zero')
        })

        it('when price is negative', async () => {
            input.price = -10
            const usecase = new UpdateProductUseCase(mockProductRepository)
            await expect(usecase.execute(input)).rejects.toThrow('Price must be greater than zero')
        })
    })
})