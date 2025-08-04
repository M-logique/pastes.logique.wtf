import type { Context, Next } from "hono"
import type { CloudflareBindings } from "./types"

export const requirePassword = async (c: Context<{ Bindings: CloudflareBindings }>, next: Next) => {
  const password = c.env.PASSWORD
  if (!password) return next()

  const authHeader = c.req.header("Authorization")
  if (!authHeader || authHeader !== `Bearer ${password}`) {
    return c.json({ error: "Authentication required" }, 403)
  }
  return next()
} 