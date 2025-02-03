import express, { NextFunction, Request, Response } from "express";
import { studentRoutes } from "./infrastructure/routes/student.routes";
import { classRoutes } from "./infrastructure/routes/class.routes";
import { invoiceRoutes } from "./infrastructure/routes/invoice.routes";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/classes", classRoutes);
app.use("/invoices", invoiceRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
