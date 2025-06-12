import db from "../../src/Drizzle/db";
import { PaymentTable } from "../../src/Drizzle/schema";
import {createPaymentService, deletePaymentService, getPaymentByIdService, getPaymentService, updatePaymentService } from "../../src/payment/payment.service"



jest.mock('../../src/Drizzle/db', () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),

  query: {
    PaymentTable: {
      findFirst: jest.fn(),
      findMany: jest.fn()
    }
  },
  
 
}));


beforeEach(() => {
    jest.clearAllMocks();
});


describe( 'Payment Service', () => {
       describe('createPaymentService', () => {
            it('should insert a new payment', async () => {
                const payment = {
                    bookingID: 1,
                    paymentDate:' 2025-06-07',
                    amount: '500',
                    paymentMethod: "M-pesa"
                };
                const insertedPayment = { paymentID: 1, ...payment };
                (db.insert as jest.Mock).mockReturnValue({
                    values: jest.fn().mockReturnValue({
                        returning: jest.fn().mockResolvedValueOnce([insertedPayment])
                    })
                });
                const result = await createPaymentService(payment);
                expect(db.insert).toHaveBeenCalledWith(PaymentTable);
                expect(result).toEqual("Payment added successfully");
            });
        
         it("should return null if insertion fails", async () => {
            const payment = {
                    paymentID: 1,
                    bookingID: 1,
                    paymentDate:' 2025-06-07',
                    amount: '500',
                    paymentMethod: "M-pesa"
            };
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            });
            const result = await createPaymentService(payment);
            expect(result).toBeNull();
         });
        
        
        });


        
    describe("getPaymentService", () => {
        it("should return all payments", async () => {
            const payment = [
                {
                   paymentID: 1,
                    bookingID: 1,
                    paymentDate:' 2025-06-07',
                    amount: '500',
                    paymentMethod: "M-pesa"
                },
                {
                    paymentID: 2,
                    bookingID: 5,
                    paymentDate:' 2025-06-07',
                    amount: '700',
                    paymentMethod: "Bank"
                }
            ];
                (db.query.PaymentTable.findMany as jest.Mock).mockResolvedValueOnce(payment);
                const result = await getPaymentService();
                expect(result).toEqual(payment);
            });
    
       
    
        })


         describe("getPaymentByIdService", () => {
              it("should return a payment by ID", async () => {
              const payment = {
                 paymentID: 1,
                  bookingID: 1,
                  paymentDate:' 2025-06-07',
                  amount: '500',
                  paymentMethod: "M-pesa"
              };
              (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValueOnce(payment);
              const result = await getPaymentByIdService(1);
              expect(db.query.PaymentTable.findFirst).toHaveBeenCalled();
              expect(result).toEqual(payment);
      
      
            })
            it('should return null if no booking is found', async () => {
                (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValueOnce(null);
                const result = await getPaymentByIdService(9999);
                expect(result).toBeNull();
            });

       })


        describe("updatePaymentByIdService", () => {
               it("should update payment and return success message", async () => {
               (db.update as jest.Mock).mockReturnValue({
                   set: jest.fn().mockReturnValue({
                       where: jest.fn().mockResolvedValueOnce(null)
                       
                   }),
                   
               });
               const result = await updatePaymentService(1, {
                  paymentID: 1,
                  bookingID: 1,
                  paymentDate:' 2025-06-07',
                  amount: '500',
                  paymentMethod: "M-pesa"
               });
               expect(db.update).toHaveBeenCalledWith(PaymentTable);
               expect(result).toBe("Payment updated successfully");
               });
           });
       
       
           describe("deletePaymentService", () => {
               it("should delete a payment and return success message", async () => {
                   (db.delete as jest.Mock).mockReturnValue({
                       where: jest.fn().mockResolvedValueOnce(undefined)
                   });
                   const result = await deletePaymentService(1);
                   expect(db.delete).toHaveBeenCalledWith(PaymentTable);
                   expect(result).toBe("Payment deleted successfully");
               });
           });

        
        
       





})