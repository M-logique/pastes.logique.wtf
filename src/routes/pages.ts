import { Hono } from "hono"
import type { CloudflareBindings, PasteData } from "../types"
import { getMainPageHTML } from "../templates/main-page"
import { getViewPasteHTML } from "../templates/view-paste"

const pages = new Hono<{ Bindings: CloudflareBindings }>()

// Main page
pages.get("/", (c) => {
  return c.html(getMainPageHTML())
})

// View paste
pages.get("/:namespace", async (c) => {
  try {
    const namespace = c.req.param("namespace")
    if (!namespace) {
      return c.json({ error: "Namespace is required" }, 400)
    }

    // Get paste info
    const pasteQuery = `SELECT namespace, access_key, created_at, updated_at FROM pastes WHERE namespace = ?`
    const pasteResult = await c.env.DB.prepare(pasteQuery).bind(namespace).first()

    if (!pasteResult) {
      return c.json({ error: "Paste not found" }, 404)
    }

    // Get files
    const filesQuery = `SELECT file_index, filename, language, content FROM files WHERE paste_namespace = ? ORDER BY file_index`
    const filesResult = await c.env.DB.prepare(filesQuery).bind(namespace).all()

    const files = filesResult.results.map((row: any) => ({
      fileIndex: row.file_index,
      filename: row.filename,
      language: row.language,
      content: row.content,
    }))

    const paste: PasteData = {
      namespace: pasteResult.namespace as string,
      accessKey: pasteResult.access_key as string,
      files,
      createdAt: pasteResult.created_at as string,
      updatedAt: pasteResult.updated_at as string,
    }

    const storedAccessKey = c.req.header("X-Access-Key") || c.req.query("accessKey")
    const hasAccess = storedAccessKey === paste.accessKey

    return c.html(getViewPasteHTML(paste, hasAccess))
  } catch (error) {
    console.error("Error retrieving paste:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

export default pages 