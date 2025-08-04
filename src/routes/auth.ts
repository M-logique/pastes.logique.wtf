import { Hono } from "hono"
import type { CloudflareBindings } from "../types"
import { requirePassword } from "../middleware"

const auth = new Hono<{ Bindings: CloudflareBindings }>()

// Check if password is enabled
auth.get("/passwordEnabled", (c) => {
  const passwordEnabled = !!c.env.PASSWORD
  return c.json({ passwordEnabled })
})

// Test auth endpoint
auth.post("/test-auth", requirePassword, (c) => {
  return c.json({ authenticated: true })
})

// Test endpoint
auth.get("/test", (c) => {
  return c.json({
    message: "API is working",
    timestamp: new Date().toISOString(),
    passwordEnabled: !!c.env.PASSWORD,
  })
})

export default auth 