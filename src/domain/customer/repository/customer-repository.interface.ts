import Customer from "../entity/customer";
import IRepository from "../../@shared/repository/repository.interface";
import ICustomer from "../entity/customer.interface";

export default interface ICustomerRepository extends IRepository<ICustomer> {}