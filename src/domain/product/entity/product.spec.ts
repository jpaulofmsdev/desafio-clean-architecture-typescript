import Product from "./product";

describe('Product unit tests', () => {
    it('should throw an error when id is empty', () => {
        expect(() => {
            new Product('', 'Product 1', 100);
        }).toThrow('product: Id is required')
    })

    it('should throw an error when name is empty', () => {
        expect(() => {
            new Product('123', '', 100);
        }).toThrow('product: Name is required')
    })

    it('should throw an error when price is negative', () => {
        expect(() => {
            new Product('123', 'Product 1', -10);
        }).toThrowError('product: Price must be greater than zero')
    })

    it('should throw an error when price is zero', () => {
        expect(() => {
            new Product('123', 'Product 1', 0);
        }).toThrowError('product: Price must be greater than zero')
    })

    it('should throw an error when id and name are empty', () => {
        expect(() => {
            new Product('', '', 100);
        }).toThrow('product: Id is required, product: Name is required')
    })

    it('should throw an error when id is empty and price is zero', () => {
        expect(() => {
            new Product('', 'Product 1', 0);
        }).toThrow('product: Id is required, product: Price must be greater than zero')
    })

    it('should throw an error when name is empty and price is zero', () => {
        expect(() => {
            new Product('123', '', 0);
        }).toThrow('product: Name is required, product: Price must be greater than zero')
    })

    it('should throw an error when id and name are empty and price is zero', () => {
        expect(() => {
            new Product('', '', 0);
        }).toThrow('product: Id is required, product: Name is required, product: Price must be greater than zero')
    })

    it('should change name', () => {
        const product = new Product('123', 'Product 1', 100)
        product.changeName('Product 2')
        expect(product.name).toBe('Product 2')
    })

    it('should change price', () => {
        const product = new Product('123', 'Product 1', 100)
        product.changePrice(200)
        expect(product.price).toBe(200)
    })
})