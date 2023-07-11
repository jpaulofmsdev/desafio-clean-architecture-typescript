import IValidator from "../../@shared/validator/validator.interface";
import ICustomer from "../entity/customer.interface";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {
    static create(): IValidator<ICustomer> {
        return new CustomerYupValidator()
    }
}