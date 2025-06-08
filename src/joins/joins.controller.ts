// src/controllers/joins.controller.ts
import { Request, Response } from "express";
import {  getCustomerReservations,
  getBookingsWithPayments,
  getCarsWithLocation,
  getCustomerBookingWithCarDetails } from "./joins.service";

export const fetchCustomerReservations = async (req: Request, res: Response) => {
  const data = await getCustomerReservations();
  res.json(data);
};

export const fetchBookingsWithPayments = async (req: Request, res: Response) => {
  const data = await getBookingsWithPayments();
  res.json(data);
};

export const fetchCarsWithLocation = async (req: Request, res: Response) => {
  const data = await getCarsWithLocation();
  res.json(data);
};

export const fetchCustomerBookingDetails = async (req: Request, res: Response) => {
  const data = await getCustomerBookingWithCarDetails();
  res.json(data);
};
