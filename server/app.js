const express = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const cropRouter = require("./routes/cropRoutes");
const userRouter = require("./routes/userRoutes");
const emailRouter = require("./routes/emailRoute");
const AppError = require("./utils/appErrors");
const bookingRouter = require("./routes/bookingRoutes");
const reviewRouter = require("./routes/reviewRoute");
const StoreRouter = require("./routes/storeRoutes");
const addtocartRouter = require("./routes/addtocartRoute");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieparser());
const allowedOrigins = [
  "https://cropify-one.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);

  next();
});

// app.use((req, res, next) => {
//   res.header("Allow-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//   next();
// });
// app.use(
//   cors({
//     origin: "https://cropify-one.vercel.app",
//     credentials: true,
//     origin: true,
//     optionsSuccessStatus: 200,
//     allowedHeaders: [
//       "set-cookie",
//       "Content-Type",
//       "Access-Control-Allow-Origin",
//       "Access-Control-Allow-Credentials",
//     ],
//   })
// );
app.use("/api/v1/crops", cropRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/store", StoreRouter);
app.use("/api/v1/cart", addtocartRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} url`, 404));
});

module.exports = app;
