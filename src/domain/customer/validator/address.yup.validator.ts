import IValidator from "../../@shared/validator/validator.interface";
import IAddress from "../value-object/address.interface";
import * as yup from "yup";

export default class AddressYupValidator implements IValidator<IAddress> {
    validate(t: IAddress): void {
        try{
            yup.object().shape({
                street: yup.string().required('Street is required'),
                number: yup.number().required('Number is required'),
                zip: yup.string().required('Zip is required'),
                city: yup.string().required('City is required'),
            })
            .validateSync({
                street: t.street,
                number: t.number,
                zip: t.zip,
                city: t.city
            }, {
                abortEarly: false
            })
        }catch(err){
            const e = err as yup.ValidationError
            e.errors.forEach(error => {
                t.notification.addError({
                    message: error,
                    context: 'customer.address'
                })
            })
        }
    }

}