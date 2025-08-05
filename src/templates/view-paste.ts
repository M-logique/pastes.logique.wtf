import type { PasteData } from "../types"

// Utility function to escape HTML characters, preventing XSS.
function escapeHtml(str: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }

  if (typeof str !== "string") {
    return ""
  }

  return str.replace(/[&<>"']/g, (m) => map[m])
}

export const getViewPasteHTML = (paste: PasteData): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Logique Pastebin - ${escapeHtml(paste.namespace)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/styles/github-dark.min.css">
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/highlight.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/go.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/rust.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/kotlin.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/swift.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/dockerfile.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/yaml.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/powershell.min.js" defer></script>
  <style>
    /* ===== CSS Reset & Global Styles ===== */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #0A0A0A; color: #E5E5E5; font-family: 'Inter', sans-serif; line-height: 1.6; min-height: 100vh; }
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }

    /* ===== Header ===== */
    .header { text-align: center; margin-bottom: 3rem; }
    .header h1 { font-size: 2.5rem; font-weight: 600; margin-bottom: 0.5rem; background: linear-gradient(135deg, #E5E5E5, #F2EFE6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .header a { color: #C62828; text-decoration: none; font-size: 1rem; transition: color 0.2s ease; display: inline-flex; align-items: center; gap: 0.5rem; }
    .header a:hover { color: #B71C1C; text-decoration: underline; }

    /* ===== Paste Info Bar ===== */
    .paste-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem; background-color: #1A1A1A; border-radius: 8px; border: 1px solid #333; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; flex-wrap: wrap; gap: 1rem; }
    .paste-info-left, .paste-info-right { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .paste-id { color: #F2EFE6; font-weight: 500; }
    .paste-date, .paste-stats { color: #888; }

    /* ===== File Container ===== */
    .file-container { background-color: #1A1A1A; border-radius: 8px; margin-bottom: 1.5rem; overflow: hidden; border: 1px solid #333; }
    .file-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem; background-color: #252525; border-bottom: 1px solid #333; flex-wrap: wrap; gap: 1rem; }
    .file-info { display: flex; align-items: center; gap: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; flex-wrap: wrap; min-width: 0; }
    .filename { color: #F2EFE6; font-weight: 500; word-break: break-all; }
    .language-badge { background-color: #333; color: #E5E5E5; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; text-transform: uppercase; white-space: nowrap; }
    .file-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .file-btn { background-color: #333; color: #E5E5E5; border: none; border-radius: 4px; padding: 0.5rem 0.75rem; cursor: pointer; transition: all 0.2s ease; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem; font-family: 'Inter', sans-serif; text-decoration: none; white-space: nowrap; }
    .file-btn:hover { background-color: #444; transform: translateY(-1px); }

    /* ===== FIXED CODE AREA WITH PROPER FLEXBOX LAYOUT ===== */
    .code-container {
      position: relative;
      background-color: #1A1A1A;
      display: flex;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 20px;
      overflow: hidden;
    }

    .line-numbers {
      background-color: #252525;
      border-right: 1px solid #333;
      color: #666;
      user-select: none;
      text-align: right;
      padding: 16px 12px;
      white-space: pre-line;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      letter-spacing: 0;
      word-spacing: 0;
      tab-size: 4;
      min-width: 60px;
      flex-shrink: 0;
      vertical-align: top;
    }

    .line-numbers.hidden {
      display: none;
    }

    .code-content {
      flex: 1;
      overflow-x: auto;
      background-color: #1A1A1A;
    }

    .code-content pre {
      padding: 16px;
      margin: 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      letter-spacing: 0;
      word-spacing: 0;
      tab-size: 4;
      white-space: pre;
      overflow: visible;
      background: transparent;
    }

    .code-content code {
      background: transparent !important;
      font-family: 'JetBrains Mono', monospace !important;
      font-size: 14px !important;
      line-height: 20px !important;
      font-weight: 400 !important;
      letter-spacing: 0 !important;
      word-spacing: 0 !important;
      tab-size: 4 !important;
      white-space: pre !important;
      display: block;
    }

    /* Override highlight.js styles that might interfere */
    .hljs {
      background: transparent !important;
      font-family: 'JetBrains Mono', monospace !important;
      font-size: 14px !important;
      line-height: 20px !important;
    }

        /* ===== AESTHETIC SCROLLBAR STYLING (THE FIX) ===== */
    /* For Firefox */
    .code-content {
      scrollbar-width: thin;
      scrollbar-color: #555 #1A1A1A; /* thumb-color track-color */
    }
    /* For Webkit Browsers (Chrome, Safari, Edge) */
    .code-content::-webkit-scrollbar {
      height: 8px; /* Controls the height of the horizontal scrollbar */
    }
    .code-content::-webkit-scrollbar-track {
      background: transparent; /* Makes the track invisible */
    }
    .code-content::-webkit-scrollbar-thumb {
      background-color: #444; /* A subtle dark grey for the handle */
      border-radius: 10px;
      border: 2px solid #1A1A1A; /* Creates padding around the thumb */
      background-clip: content-box;
    }
    .code-content::-webkit-scrollbar-thumb:hover {
      background-color: #555; /* Slightly lighter on hover */
    }

    /* ===== Actions & Buttons ===== */
    .actions { display: flex; gap: 1rem; margin-top: 2rem; justify-content: center; flex-wrap: wrap; }
    .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.9rem; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-danger { background-color: #C62828; color: #E5E5E5; }
    .btn-danger:hover:not(:disabled) { background-color: #B71C1C; transform: translateY(-1px); }
    .btn-secondary { background-color: #333; color: #E5E5E5; }
    .btn-secondary:hover:not(:disabled) { background-color: #444; transform: translateY(-1px); }

    /* ===== Toast Notification ===== */
    .toast { position: fixed; top: 2rem; right: 2rem; background-color: #28C628; color: #000; padding: 0.75rem 1rem; border-radius: 6px; font-weight: 500; z-index: 1000; opacity: 0; transform: translateX(100%); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); pointer-events: none; }
    .toast.show { opacity: 1; transform: translateX(0); }
    .toast.error { background-color: #C62828; color: #E5E5E5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Logique Pastebin</h1>
      <a href="/"><i class="fas fa-arrow-left"></i> Create New Paste</a>
    </div>

    <div class="paste-info">
      <div class="paste-info-left">
        <span class="paste-id"><i class="fas fa-fingerprint"></i> ID: ${escapeHtml(paste.namespace)}</span>
        <span class="paste-stats"><i class="fas fa-file-alt"></i> ${paste.files.length} file${paste.files.length !== 1 ? "s" : ""}</span>
      </div>
      <div class="paste-info-right">
        <span class="paste-date"><i class="fas fa-calendar-alt"></i> Created: ${new Date(paste.createdAt).toLocaleString()}</span>
        ${paste.updatedAt ? `<span class="paste-date"><i class="fas fa-edit"></i> Updated: ${new Date(paste.updatedAt).toLocaleString()}</span>` : ""}
      </div>
    </div>

    <div id="files-container">
      ${paste.files
        .map(
          (file, index) => `
        <div class="file-container" id="file-${index}">
          <div class="file-header">
            <div class="file-info">
              <span class="filename"><i class="fas fa-file-code"></i> ${escapeHtml(file.filename ?? "") || `file-${index + 1}`}</span>
              ${file.language ? `<span class="language-badge">${escapeHtml(file.language ?? "")}</span>` : ""}
            </div>
            <div class="file-actions">
              <a href="/raw/${escapeHtml(paste.namespace)}/${index}" class="file-btn" title="View raw" target="_blank"><i class="fas fa-file-alt"></i></a>
              <button class="file-btn" onclick="copyFileContent(event, ${index})" title="Copy content"><i class="fas fa-copy"></i></button>
              <button class="file-btn" onclick="downloadFile(${index})" title="Download file"><i class="fas fa-download"></i></button>
              <button class="file-btn" onclick="toggleLineNumbers(${index})" title="Toggle line numbers"><i class="fas fa-list-ol"></i></button>
            </div>
          </div>
          <div class="code-container" id="container-${index}">
            <div class="line-numbers" id="line-numbers-${index}"></div>
            <div class="code-content">
              <pre><code class="language-${escapeHtml(file.language ?? "plaintext")}" id="code-${index}">${escapeHtml(file.content)}</code></pre>
            </div>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>

    <div class="actions">
      <button onclick="downloadAllFiles()" class="btn btn-secondary"><i class="fas fa-file-archive"></i> Download as file</button>
      <button onclick="copyPasteUrl(event)" class="btn btn-secondary" id="copy-url-btn"><i class="fas fa-link"></i> Copy URL</button>
      <div id="owner-actions" style="display: none; gap: 1rem; flex-wrap: wrap;">
        <button onclick="deletePaste()" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Delete Paste</button>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    const pasteData = ${JSON.stringify(paste)};
    let toastTimeout;

    document.addEventListener('DOMContentLoaded', function() {
      // Generate line numbers first
      generateAllLineNumbers();
      
      // Apply syntax highlighting after
      setTimeout(() => {
        if (typeof hljs !== 'undefined') {
          document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
          });
        }
      }, 0);

      const accessKey = localStorage.getItem(\`paste_\${pasteData.namespace}\`);
      if (accessKey) {
        document.getElementById('owner-actions').style.display = 'flex';
      }
    });

    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      if (toastTimeout) clearTimeout(toastTimeout);
      toast.textContent = message;
      toast.className = \`toast show \${type}\`;
      toastTimeout = setTimeout(() => {
        toast.className = 'toast';
      }, 3000);
    }

    function generateAllLineNumbers() {
      pasteData.files.forEach((file, index) => {
        const lineNumbersDiv = document.getElementById(\`line-numbers-\${index}\`);

        if (lineNumbersDiv) {
          // Use the original file content to count lines
          let content = file.content || '';

          // Handle empty content
          if (content === '') {
            lineNumbersDiv.textContent = '1';
            return;
          }

          // Split by newlines to count lines
          const lines = content.split('\\n');
          
          // If the last line is empty (content ends with \\n), don't count it
          const lineCount = lines.length > 1 && lines[lines.length - 1] === '' 
            ? lines.length - 1 
            : lines.length;

          // Generate line numbers as separate lines
          const lineNumbers = [];
          for (let i = 0; i <= lineCount; i++) {
            lineNumbers.push(i.toString());
          }

          // Join with newlines to create vertical list
          lineNumbersDiv.textContent = lineNumbers.join('\\n');

          console.log(\`File \${index}: Generated \${lineCount} line numbers\`);
        }
      });
    }

    function toggleLineNumbers(fileIndex) {
      document.getElementById(\`line-numbers-\${fileIndex}\`).classList.toggle('hidden');
    }

    async function copyToClipboard(text, successMessage, errorMessage) {
      try {
        await navigator.clipboard.writeText(text);
        showToast(successMessage, 'success');
        return true;
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        showToast(errorMessage, 'error');
        return false;
      }
    }

    async function copyFileContent(event, fileIndex) {
      const btn = event.currentTarget;
      const icon = btn.querySelector('i');
      const originalIconClass = icon.className;
      const success = await copyToClipboard(pasteData.files[fileIndex].content, 'Content copied!', 'Failed to copy content');
      if (success) {
        icon.className = 'fas fa-check';
        setTimeout(() => {
          icon.className = originalIconClass;
        }, 2000);
      }
    }

    async function copyPasteUrl(event) {
      const btn = event.currentTarget;
      const originalHTML = btn.innerHTML;
      const success = await copyToClipboard(window.location.href, 'URL copied!', 'Failed to copy URL');
      if (success) {
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 2000);
      }
    }

    function downloadFile(fileIndex) {
      const file = pasteData.files[fileIndex];
      const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename || \`file-\${fileIndex + 1}.txt\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    function downloadAllFiles() {
      if (pasteData.files.length === 1) {
        downloadFile(0);
        return;
      }
      let allContent = '';
      pasteData.files.forEach((file, index) => {
        allContent += \`--- \${file.filename || \`file-\${index + 1}\`} ---\\n\\n\`;
        allContent += file.content;
        allContent += '\\n\\n';
      });
      const blob = new Blob([allContent], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = \`paste-\${pasteData.namespace}.txt\`;
      a.click();
      URL.revokeObjectURL(a.href);
      showToast('Downloaded all files as single .txt', 'success');
    }

    async function deletePaste() {
      if (!confirm('Are you sure you want to permanently delete this paste?')) return;
      const accessKey = localStorage.getItem(\`paste_\${pasteData.namespace}\`);
      if (!accessKey) {
        return showToast('Access key not found. Cannot delete.', 'error');
      }
      try {
        const response = await fetch(\`/paste/\${pasteData.namespace}\`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + accessKey },
        });
        if (response.ok) {
          localStorage.removeItem(\`paste_\${pasteData.namespace}\`);
          showToast('Paste deleted! Redirecting...', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          const errorData = await response.json().catch(() => ({ error: 'Failed to delete paste' }));
          showToast(errorData.error, 'error');
        }
      } catch (err) {
        console.error('Delete paste error:', err);
        showToast('A network error occurred while deleting.', 'error');
      }
    }
  </script>
</body>
</html>`
