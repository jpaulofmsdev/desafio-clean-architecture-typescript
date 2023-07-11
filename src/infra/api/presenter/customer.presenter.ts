import { XmlOptions, toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/customer/list/list-customer.dto";

export default class CustomerPresenter {

    static toXML(data: OutputListCustomerDTO): string {
        const xmlOptions = {
            header: true,
            indent: " ",
            newLine: "\n",
            allowEmpty: true,
        }

        return toXML({
            customers: {
                customer: data.customers.map(customer => {
                    return {
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            number: customer.address.number,
                            zip: customer.address.zip,
                            city: customer.address.city
                        }
                    }
                })
            }
        }, xmlOptions);
    }
}