import express from 'express';
import cors from 'cors';
import path from "path";
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/database.js';
import pageRoutes from './src/routes/page.routes.js';
import FAQRoute from './src/routes/faq.routes.js';
import blogRoutes from './src/routes/blog.routes.js';
import packageRoutes from './src/routes/package.routes.js';
import aboutRoutes from './src/routes/about.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';

import dotenv from "dotenv";
import multer from 'multer';
dotenv.config();

// Connect to database
connectDB();

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : [];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server & tools like Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});


app.use(morgan('dev'));
app.use(helmet());


// Routes
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  })
);

app.get("/api/message", (req, res) => {
  res.status(200).json({ message: "Dr. Atish's ThesisAlibi Webiste Working Successfully" })
})

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/pages", pageRoutes);
app.use('/api/faqs', FAQRoute);
app.use("/api/packages", packageRoutes);
app.use("/api/about", aboutRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});