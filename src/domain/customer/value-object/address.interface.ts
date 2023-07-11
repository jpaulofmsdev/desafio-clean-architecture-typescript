import IValueObject from "../../@shared/value-object/value-object.interface";

export default interface IAddress extends IValueObject {
    get street(): string;
    get number(): number;
    get zip(): string;
    get city(): string;
}