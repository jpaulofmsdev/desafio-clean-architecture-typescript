import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'Customer',
                address: {
                    street: 'Street',
                    number: 123,
                    zip: '12345',
                    city: 'City'
                }
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name', 'Customer')
        expect(response.body).toHaveProperty('address')
        expect(response.body.address).toHaveProperty('street', 'Street')
        expect(response.body.address).toHaveProperty('number', 123)
        expect(response.body.address).toHaveProperty('zip', '12345')
        expect(response.body.address).toHaveProperty('city', 'City')
        
    })

    it('should not create a customer without name', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: '',
                address: {
                    street: 'Street',
                    number: 123,
                    zip: '12345',
                    city: 'City'
                }
            })
        expect(response.status).toBe(500)
    })

    it('should list all customers', async () => {
        const response1 = await request(app)
        .post('/customer')
            .send({
                name: 'Customer 1',
                address: {
                    street: 'Street 1',
                    number: 111,
                    zip: '11111',
                    city: 'City 1'
                }
            })
        expect(response1.status).toBe(201)

        const response2 = await request(app)
            .post('/customer')
            .send({
                name: 'Customer 2',
                address: {
                    street: 'Street 2',
                    number: 222,
                    zip: '22222',
                    city: 'City 2'
                }
            })
        expect(response1.status).toBe(201)

        const response = await request(app)
            .get('/customer')
            .send()
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('customers')
        expect(response.body.customers.length).toBe(2)
        expect(response.body.customers[0]).toHaveProperty('id')
        expect(response.body.customers[0]).toHaveProperty('name', 'Customer 1')
        expect(response.body.customers[0]).toHaveProperty('address')
        expect(response.body.customers[0].address).toHaveProperty('street', 'Street 1')
        expect(response.body.customers[0].address).toHaveProperty('number', 111)
        expect(response.body.customers[0].address).toHaveProperty('zip', '11111')
        expect(response.body.customers[0].address).toHaveProperty('city', 'City 1')
        expect(response.body.customers[1]).toHaveProperty('id')
        expect(response.body.customers[1]).toHaveProperty('name', 'Customer 2')
        expect(response.body.customers[1]).toHaveProperty('address')
        expect(response.body.customers[1].address).toHaveProperty('street', 'Street 2')
        expect(response.body.customers[1].address).toHaveProperty('number', 222)
        expect(response.body.customers[1].address).toHaveProperty('zip', '22222')
        expect(response.body.customers[1].address).toHaveProperty('city', 'City 2')
        
        const xmlResponse = await request(app)
            .get('/customer')
            .set('Accept', 'application/xml')
            .send()

        expect(xmlResponse.status).toBe(200)
        expect(xmlResponse.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
        expect(xmlResponse.text).toContain(`<customers>`)
        expect(xmlResponse.text).toContain(`<name>Customer 1</name>`)
        expect(xmlResponse.text).toContain(`<address>`)
        expect(xmlResponse.text).toContain(`<street>Street 1</street>`)
        expect(xmlResponse.text).toContain(`<number>111</number>`)
        expect(xmlResponse.text).toContain(`<zip>11111</zip>`)
        expect(xmlResponse.text).toContain(`<city>City 1</city>`)
        expect(xmlResponse.text).toContain(`<name>Customer 2</name>`)
        expect(xmlResponse.text).toContain(`<street>Street 2</street>`)
        expect(xmlResponse.text).toContain(`<number>222</number>`)
        expect(xmlResponse.text).toContain(`<zip>22222</zip>`)

    })
})