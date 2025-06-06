import { eq } from "drizzle-orm";
import { InsuranceTable, TIInsurance } from "../Drizzle/schema";
import db from "../Drizzle/db";


export const createInsuranceService = async (insurance: TIInsurance) => {
  await db.insert(InsuranceTable).values(insurance).returning();
  return "Insurance added successfully";
};

export const getInsuranceService = async () => {
  const insurances = await db.select().from(InsuranceTable);
  return insurances;
};

export const getInsuranceByIdService = async (id: number) => {
  const insurance = await db.query.InsuranceTable.findFirst({
    where: eq(InsuranceTable.insuranceID, id),
  });
  return insurance;
};

export const updateInsuranceService = async (id: number, insurance: TIInsurance) => {
  await db.update(InsuranceTable).set(insurance).where(eq(InsuranceTable.insuranceID, id)).returning();
  return "Insurance updated successfully";
};

export const deleteInsuranceService = async (id: number) => {
  const deleted = await db.delete(InsuranceTable).where(eq(InsuranceTable.insuranceID, id)).returning();
  return deleted[0];
};