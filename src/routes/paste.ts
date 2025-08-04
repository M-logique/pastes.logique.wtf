import { Hono } from "hono"
import type { CloudflareBindings, CreatePasteRequest, PasteResponse } from "../types"
import { requirePassword } from "../middleware"

const paste = new Hono<{ Bindings: CloudflareBindings }>()

// Create paste
paste.post("/", requirePassword, async (c) => {
  try {
    const body = (await c.req.json()) as CreatePasteRequest

    if (!body || !Array.isArray(body.files)) {
      return c.json({ error: "Invalid request body. Expected files array." }, 400)
    }

    const { files } = body
    if (files.length === 0) {
      return c.json({ error: "At least one file is required" }, 400)
    }

    const maxFiles = parseInt(c.env.MAX_FILES || "6")
    if (maxFiles > 0 && files.length > maxFiles) {
      return c.json({ error: `Maximum ${maxFiles} files allowed` }, 400)
    }

    // Validate each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (typeof file.content !== "string") {
        return c.json({ error: `File ${i} content must be a string` }, 400)
      }
      if (file.content.length === 0) {
        return c.json({ error: `File ${i} content cannot be empty` }, 400)
      }
      if (file.content.length > 100000) {
        return c.json({ error: `File ${i} content too large (max 100KB)` }, 400)
      }
    }

    const namespace = crypto.randomUUID()
    const accessKey = crypto.randomUUID()

    // Insert paste record
    const pasteQuery = `INSERT INTO pastes (namespace, access_key) VALUES (?, ?)`
    const pasteResult = await c.env.DB.prepare(pasteQuery).bind(namespace, accessKey).run()

    if (!pasteResult.success) {
      return c.json({ error: "Failed to create paste" }, 500)
    }

    // Insert files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.filename?.length && file.filename.length > 255) {
        return c.json({ error: `File ${i} filename too long (max 255 characters)` }, 400)
      }
      const fileQuery = `INSERT INTO files (paste_namespace, file_index, filename, language, content) VALUES (?, ?, ?, ?, ?)`
      const fileParams = [namespace, i, file.filename || null, file.language || null, file.content]

      const fileResult = await c.env.DB.prepare(fileQuery)
        .bind(...fileParams)
        .run()
      if (!fileResult.success) {
        return c.json({ error: "Failed to create file" }, 500)
      }
    }

    const response: PasteResponse = { namespace, accessKey, success: true }
    return c.json(response, 201)
  } catch (error) {
    console.error("Error creating paste:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return c.json({ error: "Internal server error: " + errorMessage }, 500)
  }
})

// Delete paste
paste.delete("/:accessKey", requirePassword, async (c) => {
  try {
    const accessKey = c.req.param("accessKey")
    if (!accessKey) {
      return c.json({ error: "Access key is required" }, 400)
    }

    const checkQuery = `SELECT namespace FROM pastes WHERE access_key = ?`
    const existingPaste = await c.env.DB.prepare(checkQuery).bind(accessKey).first()

    if (!existingPaste) {
      return c.json({ error: "Paste not found" }, 404)
    }

    const deleteQuery = `DELETE FROM pastes WHERE access_key = ?`
    const result = await c.env.DB.prepare(deleteQuery).bind(accessKey).run()

    if (!result.success) {
      return c.json({ error: "Failed to delete paste" }, 500)
    }

    return c.json({
      success: true,
      message: "Paste deleted successfully",
      accessKey,
    })
  } catch (error) {
    console.error("Error deleting paste:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

export default paste 