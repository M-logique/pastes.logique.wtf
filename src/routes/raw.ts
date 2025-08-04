import { Hono } from "hono"
import type { CloudflareBindings } from "../types"

const raw = new Hono<{ Bindings: CloudflareBindings }>();

raw.get("/:namespace/:index", async (c) => {
    try {
      const namespace = c.req.param("namespace")
      const index = c.req.param("index")
      if (!namespace || !index) {
        return c.json({ error: "Namespace and Param are required" }, 400)
      }
  
      // Get paste info
      const pasteQuery = `SELECT namespace, access_key, created_at, updated_at FROM pastes WHERE namespace = ?`
      const pasteResult = await c.env.DB.prepare(pasteQuery).bind(namespace).first()
  
      if (!pasteResult) {
        return c.json({ error: "Paste not found" }, 404)
      }
  
      // Get files
      const contentQuery = `SELECT content FROM files WHERE paste_namespace = ? AND file_index = ?`
      const contentResult = await c.env.DB.prepare(contentQuery).bind(namespace, index).first()

      if (!contentResult) {
        return c.json({ error: "File not found" }, 404)
      }
  
      return c.text(contentResult.content as string)

    } catch (error) {
      console.error("Error retrieving paste:", error)
      return c.json({ error: "Internal server error" }, 500)
    }
})

export default raw