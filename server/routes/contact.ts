import { RequestHandler } from "express";
import { ContactRequest, ContactResponse } from "@shared/api";

export const handleContact: RequestHandler = (req, res) => {
  const body = req.body as Partial<ContactRequest>;
  if (!body?.name || !body?.email || !body?.message) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const response: ContactResponse = {
    status: "ok",
    receivedAt: new Date().toISOString(),
  };
  res.status(200).json(response);
};
