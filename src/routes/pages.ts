import { Hono } from "hono"
import type { CloudflareBindings, FileData, PasteData } from "../types"
import { getMainPageHTML } from "../templates/main-page"
import { getViewPasteHTML } from "../templates/view-paste"
import { getNotFoundPageHTML } from "../templates/not-found"

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
      return c.html(getNotFoundPageHTML(), 404)
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

    return c.html(getViewPasteHTML(paste, ))
  } catch (error) {
    console.error("Error retrieving paste:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

pages.delete("/paste/:namespace", async (c) => {
  try {
    const { namespace } = c.req.param();
    const db = c.env.DB;

    // 1. Get the provided access key from the 'Authorization: Bearer <key>' header
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization header is missing or invalid." }, 401);
    }
    const providedKey = authHeader.split(" ")[1];

    // 2. Retrieve the *correct* access key from the database to verify ownership
    const pasteCheck = await db.prepare(
      `SELECT access_key FROM pastes WHERE namespace = ?`
    ).bind(namespace).first<{ access_key: string }>();

    if (!pasteCheck) {
      return c.html(getNotFoundPageHTML(), 404)
    }

    // 3. **CRUCIAL**: Compare the provided key with the stored key
    if (pasteCheck.access_key !== providedKey) {
      return c.json({ error: "Access denied. Invalid access key." }, 403); // 403 Forbidden
    }

    // 4. If keys match, proceed with deletion in a batch (transaction-like)
    await db.batch([
      db.prepare(`DELETE FROM files WHERE paste_namespace = ?`).bind(namespace),
      db.prepare(`DELETE FROM pastes WHERE namespace = ?`).bind(namespace)
    ]);

    return c.json({ message: "Paste deleted successfully." }, 200);

  } catch (error) {
    console.error("Error deleting paste:", error);
    return c.json({ error: "Internal server error occurred during deletion." }, 500);
  }
});

export default pages 