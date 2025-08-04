import type { PasteData } from "../types"

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;"
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case '"':
        return "&quot;"
      case "'":
        return "&#39;"
      default:
        return char
    }
  })
}

export const getViewPasteHTML = (paste: PasteData, hasAccess: boolean): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Logique Pastebin - ${paste.namespace}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/styles/github-dark.min.css">
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/highlight.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/go.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/rust.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/kotlin.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/swift.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/dockerfile.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/yaml.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/languages/powershell.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background-color: #0A0A0A;
      color: #E5E5E5;
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header h1 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #E5E5E5, #F2EFE6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header a {
      color: #C62828;
      text-decoration: none;
      font-size: 1rem;
      transition: color 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header a:hover {
      color: #B71C1C;
      text-decoration: underline;
    }

    .paste-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1rem;
      background-color: #1A1A1A;
      border-radius: 8px;
      border: 1px solid #333;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .paste-info-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .paste-info-right {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .paste-id {
      color: #F2EFE6;
      font-weight: 500;
    }

    .paste-date {
      color: #888;
    }

    .paste-stats {
      color: #888;
      font-size: 0.8rem;
    }

    .file-container {
      background-color: #1A1A1A;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      overflow: hidden;
      border: 1px solid #333;
      transition: border-color 0.2s ease;
    }

    .file-container:hover {
      border-color: #444;
    }

    .file-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background-color: #252525;
      border-bottom: 1px solid #333;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      flex-wrap: wrap;
      min-width: 0;
    }

    .filename {
      color: #F2EFE6;
      font-weight: 500;
      word-break: break-all;
    }

    .language-badge {
      background-color: #333;
      color: #E5E5E5;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .file-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .file-btn {
      background-color: #333;
      color: #E5E5E5;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'Inter', sans-serif;
      text-decoration: none;
      white-space: nowrap;
    }

    .file-btn:hover {
      background-color: #444;
      transform: translateY(-1px);
    }

    .file-btn.success {
      background-color: #28C628;
      color: #000;
    }

    .code-container {
      position: relative;
      background-color: #1A1A1A;
      display: flex;
    }

    .line-numbers {
      background-color: #252525;
      border-right: 1px solid #333;
      color: #666;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      user-select: none;
      padding: 1rem 0.75rem;
      text-align: right;
      min-width: 3.5rem;
      white-space: pre;
      flex-shrink: 0;
    }

    .line-numbers.hidden {
      display: none;
    }

    .code-content {
      flex: 1;
      overflow-x: auto;
      max-height: 600px;
      overflow-y: auto;
    }

    .code-content pre {
      margin: 0;
      padding: 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      background: transparent !important;
      white-space: pre;
      overflow: visible;
    }

    .code-content code {
      background: none !important;
      padding: 0 !important;
      font-family: 'JetBrains Mono', monospace;
      white-space: pre;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    .btn-primary {
      background-color: #C62828;
      color: #E5E5E5;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #B71C1C;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background-color: #333;
      color: #E5E5E5;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #444;
      transform: translateY(-1px);
    }

    .btn-danger {
      background-color: #C62828;
      color: #E5E5E5;
    }

    .btn-danger:hover:not(:disabled) {
      background-color: #B71C1C;
      transform: translateY(-1px);
    }

    .btn-success {
      background-color: #28C628;
      color: #000;
    }

    .btn-success:hover:not(:disabled) {
      background-color: #1E8E1E;
      transform: translateY(-1px);
    }

    /* Fixed Toast Notification */
    .toast {
      position: fixed;
      top: 2rem;
      right: 2rem;
      background-color: #28C628;
      color: #000;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      font-weight: 500;
      font-size: 0.9rem;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      max-width: calc(100vw - 4rem);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      
      /* Animation properties */
      opacity: 0;
      transform: translateX(100%) scale(0.9);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }

    .toast.show {
      opacity: 1;
      transform: translateX(0) scale(1);
      pointer-events: auto;
    }

    .toast.error {
      background-color: #C62828;
      color: #E5E5E5;
    }

    .toast.success {
      background-color: #28C628;
      color: #000;
    }

    .loading {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid #333;
      border-radius: 50%;
      border-top-color: #E5E5E5;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .file-size {
      color: #666;
      font-size: 0.8rem;
    }

    .search-container {
      position: relative;
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      background-color: #1A1A1A;
      border: 1px solid #333;
      border-radius: 6px;
      color: #E5E5E5;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
    }

    .search-input:focus {
      outline: none;
      border-color: #C62828;
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #1A1A1A;
      border: 1px solid #333;
      border-top: none;
      border-radius: 0 0 6px 6px;
      max-height: 200px;
      overflow-y: auto;
      z-index: 100;
      display: none;
    }

    .search-result {
      padding: 0.75rem 1rem;
      cursor: pointer;
      border-bottom: 1px solid #333;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
    }

    .search-result:hover {
      background-color: #252525;
    }

    .search-result:last-child {
      border-bottom: none;
    }

    .highlight-match {
      background-color: #C62828;
      color: #E5E5E5;
      padding: 0.1rem 0.2rem;
      border-radius: 2px;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .container {
        padding: 1.5rem;
      }
      
      .file-header {
        padding: 0.75rem;
      }
      
      .file-btn {
        padding: 0.4rem 0.6rem;
        font-size: 0.75rem;
        gap: 0.3rem;
      }
      
      .file-btn i {
        font-size: 0.8rem;
      }

      .toast {
        right: 1.5rem;
        top: 1.5rem;
        max-width: calc(100vw - 3rem);
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      .header h1 {
        font-size: 2rem;
      }

      .paste-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
        font-size: 0.8rem;
      }

      .paste-info-left,
      .paste-info-right {
        width: 100%;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .file-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem;
      }

      .file-info {
        width: 100%;
        gap: 0.5rem;
        font-size: 0.8rem;
      }

      .file-actions {
        width: 100%;
        justify-content: flex-start;
      }

      .file-btn {
        padding: 0.35rem 0.5rem;
        font-size: 0.7rem;
        gap: 0.25rem;
        min-width: auto;
      }

      .file-btn i {
        font-size: 0.75rem;
      }

      .file-btn span {
        display: none;
      }

      .actions {
        flex-direction: column;
        gap: 0.75rem;
      }

      .btn {
        padding: 0.6rem 1rem;
        font-size: 0.85rem;
      }

      .toast {
        right: 1rem;
        left: 1rem;
        top: 1rem;
        max-width: none;
        font-size: 0.85rem;
      }

      .line-numbers {
        min-width: 2.5rem;
        padding: 1rem 0.5rem;
        font-size: 0.8rem;
      }

      .code-content pre {
        padding: 1rem 0.75rem;
        font-size: 0.8rem;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 0.75rem;
      }

      .header h1 {
        font-size: 1.75rem;
      }

      .paste-info {
        padding: 0.75rem;
        font-size: 0.75rem;
      }

      .paste-info-left,
      .paste-info-right {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }

      .file-header {
        padding: 0.5rem;
      }

      .file-info {
        font-size: 0.75rem;
        gap: 0.25rem;
      }

      .filename {
        font-size: 0.8rem;
      }

      .language-badge {
        font-size: 0.7rem;
        padding: 0.2rem 0.4rem;
      }

      .file-size {
        font-size: 0.7rem;
      }

      .file-btn {
        padding: 0.3rem 0.4rem;
        font-size: 0.65rem;
        border-radius: 3px;
      }

      .file-btn i {
        font-size: 0.7rem;
      }

      .btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
      }

      .toast {
        padding: 0.6rem 0.8rem;
        font-size: 0.8rem;
      }

      .line-numbers {
        min-width: 2rem;
        padding: 0.75rem 0.4rem;
        font-size: 0.75rem;
      }

      .code-content pre {
        padding: 0.75rem 0.5rem;
        font-size: 0.75rem;
      }

      .search-input {
        font-size: 0.8rem;
        padding: 0.6rem 0.8rem 0.6rem 2rem;
      }

      .search-icon {
        left: 0.6rem;
        font-size: 0.8rem;
      }
    }

    @media (max-width: 360px) {
      .file-actions {
        gap: 0.25rem;
      }

      .file-btn {
        padding: 0.25rem 0.3rem;
        min-width: 2rem;
        justify-content: center;
      }

      .paste-id,
      .paste-stats,
      .paste-date {
        font-size: 0.7rem;
      }

      .toast {
        padding: 0.5rem 0.7rem;
        font-size: 0.75rem;
      }
    }
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
        <span class="paste-id"><i class="fas fa-fingerprint"></i> ID: ${paste.namespace}</span>
        <span class="paste-stats"><i class="fas fa-file-alt"></i> ${paste.files.length} file${paste.files.length !== 1 ? "s" : ""}</span>
      </div>
      <div class="paste-info-right">
        <span class="paste-date"><i class="fas fa-calendar-alt"></i> Created: ${
          typeof paste.createdAt === "string" || typeof paste.createdAt === "number" || paste.createdAt instanceof Date
            ? new Date(paste.createdAt).toLocaleString()
            : "Unknown"
        }</span>
      </div>
    </div>

    ${
      paste.files.length > 1
        ? `
    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input type="text" class="search-input" placeholder="Search in files... (Ctrl+K)" id="search-input">
      <div class="search-results" id="search-results"></div>
    </div>
    `
        : ""
    }

    <div id="files-container">
      ${paste.files
        .map(
          (file, index) => `
        <div class="file-container" id="file-${index}">
          <div class="file-header">
            <div class="file-info">
              <span class="filename"><i class="fas fa-file-code"></i> ${file.filename || `file${index + 1}`}</span>
              ${file.language ? `<span class="language-badge"><i class="fas fa-code"></i> ${file.language}</span>` : ""}
              <span class="file-size"><i class="fas fa-info-circle"></i> ${file.content.length} chars • ${file.content.split("\n").length} ${file.content.split("\n").length === 1 ? "line" : "lines"}</span>
            </div>
            <div class="file-actions">
              <a href="/raw/${paste.namespace}/${index}" class="file-btn" title="View raw content" target="_blank">
                <i class="fas fa-file-alt"></i> <span>Raw</span>
              </a>
              <button class="file-btn" onclick="copyFileContent(${index})" title="Copy to clipboard">
                <i class="fas fa-copy" id="copy-icon-${index}"></i>
                <span id="copy-text-${index}">Copy</span>
              </button>
              <button class="file-btn" onclick="downloadFile(${index})" title="Download file">
                <i class="fas fa-download"></i> <span>Download</span>
              </button>
              <button class="file-btn" onclick="toggleLineNumbers(${index})" title="Toggle line numbers">
                <i class="fas fa-list-ol"></i> <span>Lines</span>
              </button>
            </div>
          </div>
          <div class="code-container">
            <div class="line-numbers" id="line-numbers-${index}"></div>
            <div class="code-content">
              <pre><code class="${file.language ? `language-${file.language}` : "language-plaintext"}" id="code-${index}">${escapeHtml(file.content)}</code></pre>
            </div>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>

    ${
      hasAccess
        ? `
      <div class="actions">
        <a href="/edit/${paste.namespace}" class="btn btn-secondary"><i class="fas fa-edit"></i> Edit Paste</a>
        <button onclick="downloadAllFiles()" class="btn btn-secondary"><i class="fas fa-file-archive"></i> Download All</button>
        <button onclick="copyPasteUrl()" class="btn btn-secondary" id="copy-url-btn"><i class="fas fa-link"></i> Copy URL</button>
        <button onclick="deletePaste()" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Delete Paste</button>
      </div>
    `
        : `
      <div class="actions">
        <button onclick="downloadAllFiles()" class="btn btn-secondary"><i class="fas fa-file-archive"></i> Download All</button>
        <button onclick="copyPasteUrl()" class="btn btn-secondary" id="copy-url-btn"><i class="fas fa-link"></i> Copy URL</button>
      </div>
    `
    }
  </div>

  <div id="toast" class="toast"></div>

  <script>
    const pasteData = ${JSON.stringify(paste)};
    let index; // Declare the index variable here
    let toastTimeout; // For managing toast timeout

    // Initialize syntax highlighting
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
        generateLineNumbers();
      }
    });

    function generateLineNumbers() {
      pasteData.files.forEach((file, index) => {
        const lines = file.content.split('\\n');
        const lineNumbers = document.getElementById(\`line-numbers-\${index}\`);
        if (lineNumbers) {
          // Generate line numbers with proper formatting
          const lineNumbersText = lines.map((_, i) => (i + 1).toString()).join('\\n');
          lineNumbers.textContent = lineNumbersText;
        }
      });
    }

    function toggleLineNumbers(fileIndex) {
      const lineNumbers = document.getElementById(\`line-numbers-\${fileIndex}\`);
      if (lineNumbers.classList.contains('hidden')) {
        lineNumbers.classList.remove('hidden');
      } else {
        lineNumbers.classList.add('hidden');
      }
    }

    async function copyFileContent(fileIndex) {
      const content = pasteData.files[fileIndex].content;
      const copyIcon = document.getElementById(\`copy-icon-\${fileIndex}\`);
      const copyText = document.getElementById(\`copy-text-\${fileIndex}\`);
      
      try {
        await navigator.clipboard.writeText(content);
        copyIcon.className = 'fas fa-check';
        copyText.textContent = 'Copied!';
        showToast('Content copied to clipboard!', 'success');
        
        setTimeout(() => {
          copyIcon.className = 'fas fa-copy';
          copyText.textContent = 'Copy';
        }, 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
        showToast('Failed to copy content', 'error');
      }
    }

    function downloadFile(fileIndex) {
      const file = pasteData.files[fileIndex];
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename || \`file\${fileIndex + 1}.txt\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(\`Downloaded \${a.download}\`, 'success');
    }

    function downloadAllFiles() {
      if (pasteData.files.length === 1) {
        downloadFile(0);
        return;
      }

      // Create a zip-like structure (simple concatenation with separators)
      let allContent = '';
      pasteData.files.forEach((file, index) => {
        allContent += \`=== \${file.filename || \`file\${index + 1}\`} ===\\n\`;
        allContent += file.content;
        allContent += '\\n\\n';
      });

      const blob = new Blob([allContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`paste-\${pasteData.namespace}.txt\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('All files downloaded!', 'success');
    }

    async function copyPasteUrl() {
      const url = window.location.href;
      const btn = document.getElementById('copy-url-btn');
      const originalHTML = btn.innerHTML;
      
      try {
        await navigator.clipboard.writeText(url);
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        showToast('URL copied to clipboard!', 'success');
        
        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 2000);
      } catch (error) {
        console.error('Failed to copy URL:', error);
        showToast('Failed to copy URL', 'error');
      }
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
      let searchTimeout;
      
      searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          performSearch(this.value);
        }, 300);
      });

      searchInput.addEventListener('focus', function() {
        if (this.value) performSearch(this.value);
      });

      document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
          searchResults.style.display = 'none';
        }
      });
    }

    function performSearch(query) {
      if (!query.trim()) {
        searchResults.style.display = 'none';
        return;
      }

      const results = [];
      pasteData.files.forEach((file, fileIndex) => {
        const lines = file.content.split('\\n');
        lines.forEach((line, lineIndex) => {
          if (line.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              fileIndex,
              lineIndex: lineIndex + 1,
              filename: file.filename || \`file\${fileIndex + 1}\`,
              line: line.trim(),
              query
            });
          }
        });
      });

      displaySearchResults(results);
    }

    function displaySearchResults(results) {
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result"><i class="fas fa-exclamation-circle"></i> No results found</div>';
      } else {
        searchResults.innerHTML = results.slice(0, 10).map(result => {
          const highlightedLine = result.line.replace(
            new RegExp(result.query, 'gi'),
            match => \`<span class="highlight-match">\${match}</span>\`
          );
          return \`
            <div class="search-result" onclick="scrollToLine(\${result.fileIndex}, \${result.lineIndex})">
              <strong><i class="fas fa-file-code"></i> \${result.filename}</strong> (line \${result.lineIndex})<br>
              <span style="color: #888;">\${highlightedLine}</span>
            </div>\`;
        }).join('');
      }
      searchResults.style.display = 'block';
    }

    function scrollToLine(fileIndex, lineNumber) {
      const fileContainer = document.getElementById(\`file-\${fileIndex}\`);
      fileContainer.scrollIntoView({ behavior: 'smooth' });
      
      // Highlight the file temporarily
      setTimeout(() => {
        const codeContainer = fileContainer.querySelector('.code-container');
        codeContainer.style.backgroundColor = '#2D1B1B';
        setTimeout(() => {
          codeContainer.style.backgroundColor = '#1A1A1A';
        }, 2000);
      }, 500);
      
      searchResults.style.display = 'none';
    }

    async function deletePaste() {
      if (!confirm('Are you sure you want to delete this paste? This action cannot be undone.')) {
        return;
      }

      try {
        const accessKey = localStorage.getItem('paste_${paste.namespace}');
        if (!accessKey) {
          showToast('Access key not found. Cannot delete paste.', 'error');
          return;
        }

        const currentPassword = localStorage.getItem('currentPassword');
        const headers = {};
        if (currentPassword) {
          headers['Authorization'] = 'Bearer ' + currentPassword;
        }

        const response = await fetch('/paste/' + accessKey, {
          method: 'DELETE',
          headers
        });

        if (response.ok) {
          localStorage.removeItem('paste_${paste.namespace}');
          showToast('Paste deleted successfully!', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          showToast('Failed to delete paste', 'error');
        }
      } catch (error) {
        console.error('Error deleting paste:', error);
        showToast('Failed to delete paste', 'error');
      }
    }

    // Improved Toast Function
    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      
      // Clear any existing timeout
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
      
      // Reset toast state
      toast.classList.remove('show', 'success', 'error');
      
      // Set content and type
      const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
      toast.innerHTML = \`<i class="\${icon}"></i> \${message}\`;
      toast.classList.add(type);
      
      // Force reflow to ensure the reset state is applied
      toast.offsetHeight;
      
      // Show toast
      toast.classList.add('show');
      
      // Hide toast after 3 seconds
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        
        // Clean up after animation completes
        setTimeout(() => {
          toast.classList.remove('success', 'error');
          toast.innerHTML = '';
        }, 300);
      }, 3000);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
        }
      }
      
      // Escape to close search
      if (e.key === 'Escape') {
        if (searchResults) {
          searchResults.style.display = 'none';
        }
        if (searchInput) {
          searchInput.blur();
        }
      }
    });
  </script>
</body>
</html>`
