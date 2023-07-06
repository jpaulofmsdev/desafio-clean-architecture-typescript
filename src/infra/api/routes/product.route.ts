import express, { Request, Response } from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateProductUseCase from "../../../usecase/product/create/create-product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDTO } from "../../../usecase/product/create/create-product.dto";
import ListProductUseCase from "../../../usecase/product/list/list-product.usecase";

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository())
    try {
        const input: InputCreateProductDTO = {
            type: 'A',
            name: req.body.name,
            price: req.body.price
        }
        const customer = await usecase.execute(input)
        res.status(201).send(customer)
    } catch (err) {
        res.status(500).send(err)
    }
})

productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository())
    try {
        const products = await usecase.execute({})
        res.send(products)
    } catch (err) {
        res.status(500).send(err)
    }
})