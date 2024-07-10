const express = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const cropRouter = require("./routes/cropRoutes");
const userRouter = require("./routes/userRoutes");
const emailRouter = require("./routes/emailRoute");
const AppError = require("./utils/appErrors");
const bookingRouter = require("./routes/bookingRoutes");
const reviewRouter = require("./routes/reviewRoute");
const StoreRouter = require("./routes/storeRoutes");
const addtocartRouter = require("./routes/addtocartRoute");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieparser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://cropify-one.vercel.app",
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200,
//     allowedHeaders: [
//       "Content-Type",
//       "Access-Control-Allow-Origin",
//       "Access-Control-Allow-Credentials",
//     ],
//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://cropify-one.vercel.app");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://cropify-one.vercel.app");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://cropify-one.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200,
//     allowedHeaders: [
//       "set-cookie",
//       "Content-Type",
//       "Access-Control-Allow-Origin",
//       "Access-Control-Allow-Credentials",
//     ],
//   })
// );
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://cropify-one.vercel.app");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
app.options("*", cors());

// Define your routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Cropify API!");
});
app.use("/api/v1/crops", cropRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/store", StoreRouter);
app.use("/api/v1/cart", addtocartRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} url`));
});

module.exports = app;
