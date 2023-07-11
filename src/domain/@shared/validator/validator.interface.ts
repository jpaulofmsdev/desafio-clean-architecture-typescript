export default interface IValidator<T> {
    validate(t: T): void
}