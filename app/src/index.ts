import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", () => {
  console.log("hello");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
