import IValidator from "../../@shared/validator/validator.interface";
import AddressYupValidator from "../validator/address.yup.validator";
import IAddress from "../value-object/address.interface";

export default class AddressValidatorFactory {
    static create(): IValidator<IAddress> {
        return new AddressYupValidator()
    }
}