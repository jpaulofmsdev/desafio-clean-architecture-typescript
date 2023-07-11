import IValidator from "../../@shared/validator/validator.interface";
import ICustomer from "../entity/customer.interface";
import * as yup from 'yup'

export default class CustomerYupValidator implements IValidator<ICustomer> {
    validate(entity: ICustomer): void {
        
        try{
            yup.object().shape({
                id: yup.string().required('Id is required'),
                name: yup.string().required('Name is required'),
            })
            .validateSync({
                id: entity.id,
                name: entity.name
            }, {
                abortEarly: false
            })
        }catch(err){
            const e = err as yup.ValidationError
            e.errors.forEach(error => {
                entity.notification.addError({
                    message: error,
                    context: 'customer'
                })
            })
        }
    }
}