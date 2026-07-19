import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import express from "express"
import z from "zod"
import helmet from "helmet"
import fs from "fs"
import jwt from "jsonwebtoken"
import rateLimit from "express-rate-limit"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import { errorHandler, authMiddleware} from "./middleware.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("public"))
app.use(helmet())
app.use(cookieParser())

const authSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(100),
})

const loginSchema = authSchema
const signupSchema = authSchema

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false
})

let fakeUsers = JSON.parse(
  fs.readFileSync("./users.json", "utf-8")
)

app.post("/login", loginLimiter, async (req, res, next) => {
  try{
    const { username, password } = loginSchema.parse(req.body);

    const user = fakeUsers.find((u) => u.username === username);

    if(!user) {
      const err = new Error("Invalid username or password");
      err.status = 401;
      throw err;
    };

    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword) {
      const err = new Error ("Invalid username or password");
      err.status = 401;
      throw err;
    };

    const token = jwt.sign(
      {
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000
    });

    res.json({
      message: "Login successful"
    });
  } catch (err) {
    next(err);
  };
});

app.post("/signup", async (req, res, next) => {
  try {
    const { username, password } =
      signupSchema.parse(req.body)

    const existingUser = fakeUsers.find(
      (user) => user.username === username
    )

    if (existingUser) {
      const err = new Error("Username already exists")
      err.status = 409
      throw err
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    )

    const newUser = {
      username: username,
      password: hashedPassword
    }

    fakeUsers.push(newUser)

    fs.writeFileSync(
      "./users.json",
      JSON.stringify(fakeUsers, null, 2)
    )

    res.status(201).json({
      message: "Account created successfully"
    })

  } catch (err) {
    next(err)
  }
})


app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user
  })
});

app.use(errorHandler)

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  )

})
