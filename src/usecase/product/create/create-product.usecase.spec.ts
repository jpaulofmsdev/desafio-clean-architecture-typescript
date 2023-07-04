import IProductRepository from "../../../domain/product/repository/product-repository.interface"
import { InputCreateProductDTO } from "./create-product.dto"
import CreateProductUseCase from "./create-product.usecase"

describe("Test create product usecase", () => {
    
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

    it('should create a product of type A', async () => {
        const input: InputCreateProductDTO = {
            type: "A",
            name: "Product A Test",
            price: 10
        }
        const usecase = new CreateProductUseCase(mockProductRepository)
        const output = await usecase.execute(input)
        expect(output).toStrictEqual({
            id: expect.any(String),
            name: "Product A Test",
            price: 10
        })
    })

    it('should create a product of type B', async () => {
        const input: InputCreateProductDTO = {
            type: "B",
            name: "Product B Test",
            price: 10
        }
        const usecase = new CreateProductUseCase(mockProductRepository)
        const output = await usecase.execute(input)
        expect(output).toStrictEqual({
            id: expect.any(String),
            name: "Product B Test",
            price: 20
        })
    })

    describe('should throw an error when', () => {

        it('name is null', async () => {
            const input: InputCreateProductDTO = {
                type: "A",
                name: null,
                price: 10
            }
            const updateCustomerUseCase = new CreateProductUseCase(mockProductRepository)
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
        })

        it('name is empty', async () => {
            const input: InputCreateProductDTO = {
                type: "A",
                name: "",
                price: 10
            }
            const updateCustomerUseCase = new CreateProductUseCase(mockProductRepository)
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
        })

        it('name is empty 2', async () => {
            const input: InputCreateProductDTO = {
                type: "A",
                name: "  ",
                price: 10
            }
            const updateCustomerUseCase = new CreateProductUseCase(mockProductRepository)
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
        })

        it('price is null', async () => {
            const input: InputCreateProductDTO = {
                type: "A",
                name: "Product Test",
                price: null
            }
            const updateCustomerUseCase = new CreateProductUseCase(mockProductRepository)
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Price must be greater than zero')
        })

        it('price is zero', async () => {
            const input: InputCreateProductDTO = {
                type: "A",
                name: "Product Test",
                price: 0
            }
            const updateCustomerUseCase = new CreateProductUseCase(mockProductRepository)
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Price must be greater than zero')
        })

        it('price is negative', async () => {
            const input: InputCreateProductDTO = {
                type: "A",
                name: "Product Test",
                price: -10
            }
            const updateCustomerUseCase = new CreateProductUseCase(mockProductRepository)
            await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Price must be greater than zero')
        })
    })
})