import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIPayment, PaymentTable } from "../Drizzle/schema";

export const createPaymentService = async (payment: TIPayment) => {
  const [inserted] = await db.insert(PaymentTable).values(payment).returning()
  if(inserted){
    return "Payment added successfully"

  }

  return null
};

export const getPaymentService = async () => {
  const payments = await db.query.PaymentTable.findMany();
  return payments;
};

export const getPaymentByIdService = async (id: number) => {
  const payment = await db.query.PaymentTable.findFirst({
    where: eq(PaymentTable.paymentID, id),
  });
  return payment;
};

export const getPaymentsByBookingIdService = async (bookingId: number) => {
  const payments = await db.query.ReservationTable.findMany({
    where: eq(PaymentTable.bookingID, bookingId),
  });
  return payments;
};

export const updatePaymentService = async (id: number, payment: TIPayment) => {
  await db.update(PaymentTable).set(payment).where(eq(PaymentTable.paymentID, id))
  return "Payment updated successfully";
};

export const deletePaymentService = async (id: number) => {
  const deleted = await db.delete(PaymentTable).where(eq(PaymentTable.paymentID, id))
  return "Payment deleted successfully";
};