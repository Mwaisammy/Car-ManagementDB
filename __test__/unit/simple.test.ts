import { product } from "../../src/simple"

describe("Product", () => {
    it('should return the product of two numbers', () => {
        const actual = product(3,2)
        expect(actual).toBe(6);

    })
    
})