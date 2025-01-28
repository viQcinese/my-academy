import express from "express";
import { studentRoutes } from "./infrastructure/routes/student.routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
