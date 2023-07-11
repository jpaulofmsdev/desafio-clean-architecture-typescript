import IValidator from "../../@shared/validator/validator.interface";
import IProduct from "../entity/product.interface";
import * as yup from "yup";

export default class ProductYupValidator implements IValidator<IProduct> {
    validate(t: IProduct): void {
        try{
            yup.object().shape({
                id: yup.string().required('Id is required'),
                name: yup.string().required('Name is required').trim().min(1, 'Name is required'),
                price: yup.number().required('Price must be greater than zero')
                    .positive('Price must be greater than zero'),
            }).validateSync({
                id: t.id,
                name: t.name,
                price: t.price
            }, {
                abortEarly: false,
            })
        }catch(err){
            const e = err as yup.ValidationError
            e.errors.filter((value, index, arr) => arr.indexOf(value) === index)
            .forEach(error => {
                t.notification.addError({
                    message: error,
                    context: 'product'
                })
            })
        }
    }
}