import { Hono } from "hono"
import type { CloudflareBindings } from "./types"
import pasteRoutes from "./routes/paste"
import pageRoutes from "./routes/pages"
import rawRoutes from "./routes/raw"

const app = new Hono<{ Bindings: CloudflareBindings }>()

// Mount specific routes first to avoid conflicts
app.get("/passwordEnabled", (c) => {
  const passwordEnabled = !!c.env.PASSWORD
  return c.json({ passwordEnabled })
})

app.get("/config", (c) => {
  return c.json({
    passwordEnabled: !!c.env.PASSWORD,
    maxFiles: parseInt(c.env.MAX_FILES || "6"),
  })
})

app.post("/test-auth", async (c, next) => {
  const password = c.env.PASSWORD
  if (!password) return next()

  const authHeader = c.req.header("Authorization")
  if (!authHeader || authHeader !== `Bearer ${password}`) {
    return c.json({ error: "Authentication required" }, 403)
  }
  return c.json({ authenticated: true })
})

app.get("/test", (c) => {
  return c.json({
    message: "API is working",
    timestamp: new Date().toISOString(),
    passwordEnabled: !!c.env.PASSWORD,
    maxFiles: parseInt(c.env.MAX_FILES || "6"),
  })
})

// Mount other routes
app.route("/", pageRoutes)
app.route("/paste", pasteRoutes)
app.route("/raw", rawRoutes)

export default app
