import IProductRepository from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list-product.dto";

export default class ListProductUseCase {

    private productRepository: IProductRepository

    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository
    }

    async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
        const products = await this.productRepository.findAll()
        return {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        }
    }
}