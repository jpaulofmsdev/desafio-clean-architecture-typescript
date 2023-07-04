import IRepository from "../../@shared/repository/repository.interface";
import Product from "../entity/product";
import IProduct from "../entity/product.interface";

export default interface IProductRepository extends IRepository<IProduct> {
    
}