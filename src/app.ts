import compression from "compression";
import cors from "cors";
import express from "express";
import { userRouter } from "./modules/user/user.routes";
import { postRouter } from "./modules/post/post.routes";
import { authRouter } from "./modules/auth/auth.route";

const app = express();


app.use(cors());
app.use(compression());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);
app.use("/api/v1", authRouter);



app.get("/", (_req, res) => {
  res.send("Server is Running");
});



app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
