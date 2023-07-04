import ProductFactory from "../../../domain/product/factory/product.factory"
import IProductRepository from "../../../domain/product/repository/product-repository.interface"
import ProductModel from "../../../infra/product/repository/sequelize/product.model"
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create-product.dto"

export default class CreateProductUseCase {

    private repository: IProductRepository
    
    constructor(repository: IProductRepository) {
        this.repository = repository
    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
        const product = ProductFactory.create(input.type, input.name, input.price)
        await this.repository.create(product)
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }

}