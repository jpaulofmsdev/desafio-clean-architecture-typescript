export interface InputListProductDTO {

}

export interface OutputListProductDTO {
    products: OutputProductDTO[]
}

interface OutputProductDTO {
    id: string
    name: string
    price: number
}