import { app, sequelize } from "../express"
import request from 'supertest'

describe('E2E test for product', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {

        const response = await request(app)
            .post('/product')
            .send({
                name: 'Product',
                price: 10
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name', 'Product')
        expect(response.body).toHaveProperty('price', 10)
    })

    it('should not create a product without name', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                price: 10
            })
        expect(response.status).toBe(500)
    })

    it('should list all products', async () => {
        const response1 = await request(app)
            .post('/product')
            .send({
                name: 'Product 1',
                price: 10
            })
        expect(response1.status).toBe(201)

        const response2 = await request(app)
            .post('/product')
            .send({
                name: 'Product 2',
                price: 20
            })
        expect(response2.status).toBe(201)

        const response = await request(app)
            .get('/product')
            .send()

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('products')
        expect(response.body.products.length).toBe(2)
        expect(response.body.products[0].name).toBe('Product 1')
        expect(response.body.products[0].price).toBe(10)
        expect(response.body.products[1].name).toBe('Product 2')
        expect(response.body.products[1].price).toBe(20)
    })
})