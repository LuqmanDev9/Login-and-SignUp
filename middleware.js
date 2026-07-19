import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.accessToken

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized. Please log in."
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = decoded
    next()

  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token"
    })
  }
}

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500

  res.status(status).json({
    error: err.message || "Internal server error"
  })
}