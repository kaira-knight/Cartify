

import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣  PROTECT — Verify JWT & attach user to req
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ── Extract token from header or cookie ──
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Bearer <token>
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    // From HTTP-only cookie
    token = req.cookies.token;
  }

  // ── No token found ──
  if (!token) {
    throw new ApiError(401, "Not authorized — no token provided");
  }

  try {
    // ── Verify token ──
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ── Find user & exclude password ──
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "User belonging to this token no longer exists");
    }

    // ── Check if user is active ──
    if (user.isBlocked) {
      throw new ApiError(
        403,
        "Your account has been blocked. Contact support."
      );
    }

    // ── Check if password was changed after token was issued ──
    if (user.passwordChangedAt) {
      const changedTimestamp = Math.floor(
        user.passwordChangedAt.getTime() / 1000
      );

      if (decoded.iat < changedTimestamp) {
        throw new ApiError(
          401,
          "Password was recently changed. Please log in again."
        );
      }
    }

    // ── Attach user to request ──
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token");
    }

    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token has expired. Please log in again.");
    }

    throw new ApiError(401, "Not authorized");
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣  OPTIONAL AUTH — Attach user if token exists, don't block if not
//     Useful for endpoints that work for both guests & logged-in users
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // ── No token — continue as guest ──
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    // Attach user if found, null if not
    req.user = user || null;
  } catch {
    // Invalid/expired token — continue as guest
    req.user = null;
  }

  next();
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3️⃣  AUTHORIZE ROLES — Restrict to specific roles
//     Usage: authorizeRoles("seller", "admin")
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // ── Must be called AFTER protect middleware ──
    if (!req.user) {
      throw new ApiError(401, "Not authorized — please log in first");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Role '${req.user.role}' is not authorized to access this resource. ` +
          `Allowed roles: ${allowedRoles.join(", ")}`
      );
    }

    next();
  };
};