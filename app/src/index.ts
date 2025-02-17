import express, { NextFunction, Request, Response } from "express";
import { studentRoutes } from "./infrastructure/routes/student.routes";
import { classRoutes } from "./infrastructure/routes/class.routes";
import { invoiceRoutes } from "./infrastructure/routes/invoice.routes";
import cors from "cors";
import { authMiddleware } from "./infrastructure/auth/authMiddleware";
import { errorHandlingMiddleware } from "./infrastructure/error/errorHandlingMiddleware";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/students", authMiddleware, studentRoutes);
app.use("/classes", authMiddleware, classRoutes);
app.use("/invoices", authMiddleware, invoiceRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
