export const getMainPageHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Logique Pastebin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
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
      margin-bottom: 2rem;
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
    .subtitle {
      color: #888;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    .status-section {
      background-color: #1A1A1A;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .status-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }
    .status-icon {
      font-size: 1rem;
    }
    .status-enabled {
      color: #28C628;
    }
    .status-disabled {
      color: #888;
    }
    .status-warning {
      color: #FFA726;
    }
    .password-section {
      background-color: #1A1A1A;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .password-section h3 {
      color: #F2EFE6;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    .password-input-group {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .password-input-group input {
      flex: 1;
      background: #333;
      color: #E5E5E5;
      border: 1px solid #555;
      border-radius: 4px;
      padding: 0.75rem;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      transition: border-color 0.2s ease;
    }
    .password-input-group input:focus {
      outline: none;
      border-color: #C62828;
    }
    .error-message {
      color: #FF6B6B;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
    .error-alert {
      background-color: #2D1B1B;
      border: 1px solid #C62828;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      color: #FFB3B3;
    }
    .success-alert {
      background-color: #1B2D1B;
      border: 1px solid #28C628;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      color: #B3FFB3;
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
      padding: 1rem;
      background-color: #252525;
      border-bottom: 1px solid #333;
      gap: 1rem;
    }
    .file-input-wrapper {
      flex: 1;
      position: relative;
    }
    .file-input {
      width: 100%;
      background: transparent;
      border: none;
      color: #E5E5E5;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    .file-input:focus {
      outline: none;
      background-color: #333;
    }
    .file-input.detected-from-extension {
      border: 1px solid #28C628;
      background-color: rgba(40, 198, 40, 0.1);
    }
    .extension-indicator {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.7rem;
      color: #28C628;
      background: rgba(40, 198, 40, 0.2);
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      pointer-events: none;
    }
    .language-select {
      background-color: #333;
      color: #E5E5E5;
      border: 1px solid #555;
      border-radius: 4px;
      padding: 0.5rem;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      min-width: 140px;
      transition: border-color 0.2s ease;
    }
    .language-select:focus {
      outline: none;
      border-color: #C62828;
    }
    .language-select.auto-detected {
      border-color: #28C628;
      background-color: rgba(40, 198, 40, 0.1);
    }
    .remove-file-btn {
      background-color: #C62828;
      color: #E5E5E5;
      border: none;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .remove-file-btn:hover {
      background-color: #B71C1C;
    }
    .code-editor {
      position: relative;
    }
    .code-textarea {
      width: 100%;
      min-height: 300px;
      background-color: #1A1A1A;
      color: #E5E5E5;
      border: none;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      padding: 1rem;
      resize: vertical;
      outline: none;
      transition: background-color 0.2s ease;
    }
    .code-textarea:focus {
      background-color: #1A1A1A;
    }
    .add-file-btn {
      background-color: #333;
      color: #E5E5E5;
      border: 2px dashed #555;
      border-radius: 6px;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 1.5rem;
      font-family: 'Inter', sans-serif;
    }
    .add-file-btn:hover {
      border-color: #C62828;
      background-color: #252525;
      transform: translateY(-1px);
    }
    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      justify-content: center;
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
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
      .header h1 {
        font-size: 2rem;
      }
      .file-header {
        flex-direction: column;
        gap: 0.5rem;
      }
      .actions {
        flex-direction: column;
      }
      .password-input-group {
        flex-direction: column;
      }
      .status-section {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="container">
      <div class="header">
        <h1>Logique Pastebin</h1>
        <p class="subtitle">A personal pastebin for your code snippets</p>
      </div>
      <div id="status-section" class="status-section">
        <div class="status-item">
          <span class="status-icon">🔒</span>
          <span>Password: <span id="password-status" class="status-disabled">Loading...</span></span>
        </div>
        <div class="status-item">
          <span class="status-icon">📁</span>
          <span>File Limit: <span id="file-limit-status" class="status-warning">Loading...</span></span>
        </div>
      </div>
      <div id="error-container"></div>
      <div id="password-section" class="password-section" style="display: none;">
        <h3>🔒 Password Required</h3>
        <div class="password-input-group">
          <input type="password" id="password-input" placeholder="Enter password" />
          <button id="password-submit" class="btn btn-primary">Submit</button>
        </div>
        <div id="password-error" class="error-message" style="display: none;"></div>
      </div>
      <div id="files-container">
        <div class="file-container">
          <div class="file-header">
            <div class="file-input-wrapper">
              <input type="text" class="file-input" placeholder="filename (optional)" />
            </div>
            <select class="language-select">
              <option value="auto">Auto-detect</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="swift">Swift</option>
              <option value="kotlin">Kotlin</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
              <option value="markdown">Markdown</option>
              <option value="bash">Bash</option>
              <option value="powershell">PowerShell</option>
              <option value="dockerfile">Dockerfile</option>
              <option value="plaintext">Plain Text</option>
            </select>
          </div>
          <div class="code-editor">
            <textarea class="code-textarea" placeholder="Paste your code here..."></textarea>
          </div>
        </div>
      </div>
      <div id="add-file-btn" class="add-file-btn">
        <span>+ Add File</span>
      </div>
      <div class="actions">
        <button id="create-paste-btn" class="btn btn-primary">Create Paste</button>
      </div>
    </div>
  </div>
  <script>
    class LogiquePastebin {
      constructor() {
        this.files = [this.createFileData()];
        this.maxFiles = 6;
        this.currentPassword = null;
        this.passwordEnabled = false;
        this.supportedLanguages = new Set([
          'javascript', 'typescript', 'python', 'java', 'cpp', 'csharp', 'go', 'rust',
          'php', 'ruby', 'swift', 'kotlin', 'html', 'css', 'sql', 'json', 'yaml',
          'markdown', 'bash', 'powershell', 'dockerfile', 'plaintext'
        ]);
        
        this.extensionMap = {
          'js': { lang: 'javascript', conf: 95 },
          'jsx': { lang: 'javascript', conf: 90 },
          'mjs': { lang: 'javascript', conf: 90 },
          'ts': { lang: 'typescript', conf: 95 },
          'tsx': { lang: 'typescript', conf: 90 },
          'py': { lang: 'python', conf: 95 },
          'java': { lang: 'java', conf: 95 },
          'kt': { lang: 'kotlin', conf: 95 },
          'cpp': { lang: 'cpp', conf: 95 },
          'cxx': { lang: 'cpp', conf: 95 },
          'cc': { lang: 'cpp', conf: 95 },
          'c': { lang: 'cpp', conf: 90 },
          'h': { lang: 'cpp', conf: 80 },
          'hpp': { lang: 'cpp', conf: 85 },
          'cs': { lang: 'csharp', conf: 95 },
          'go': { lang: 'go', conf: 95 },
          'rs': { lang: 'rust', conf: 95 },
          'php': { lang: 'php', conf: 95 },
          'rb': { lang: 'ruby', conf: 95 },
          'swift': { lang: 'swift', conf: 95 },
          'html': { lang: 'html', conf: 95 },
          'htm': { lang: 'html', conf: 90 },
          'css': { lang: 'css', conf: 95 },
          'scss': { lang: 'css', conf: 85 },
          'sass': { lang: 'css', conf: 85 },
          'json': { lang: 'json', conf: 95 },
          'yaml': { lang: 'yaml', conf: 95 },
          'yml': { lang: 'yaml', conf: 95 },
          'sql': { lang: 'sql', conf: 95 },
          'md': { lang: 'markdown', conf: 95 },
          'markdown': { lang: 'markdown', conf: 95 },
          'sh': { lang: 'bash', conf: 95 },
          'bash': { lang: 'bash', conf: 95 },
          'ps1': { lang: 'powershell', conf: 95 },
          'dockerfile': { lang: 'dockerfile', conf: 95 },
          'txt': { lang: 'plaintext', conf: 80 }
        };
        
        this.init();
      }

      createFileData() {
        return {
          filename: '',
          language: 'auto',
          content: '',
          detectedLanguage: null,
          confidence: 0,
          detectionSource: null
        };
      }

      async init() {
        await this.loadConfig();
        await this.checkPassword();
        this.updateStatusDisplay();
        this.bindEvents();
        this.updateUI();
      }

      async loadConfig() {
        try {
          console.log('Loading config...');
          const response = await fetch('/config');
          const data = await response.json();
          console.log('Config response:', data);
          this.maxFiles = data.maxFiles !== undefined ? data.maxFiles : 6;
          this.passwordEnabled = data.passwordEnabled || false;
          console.log('Max files set to:', this.maxFiles);
        } catch (error) {
          console.error('Error loading config:', error);
          this.maxFiles = 6;
        }
      }

      async checkPassword() {
        try {
          console.log('Checking password...');
          const response = await fetch('/passwordEnabled');
          const data = await response.json();
          console.log('Password response:', data);
          this.passwordEnabled = data.passwordEnabled;
          if (this.passwordEnabled) {
            console.log('Password is enabled, showing password section');
            const passwordSection = document.getElementById('password-section');
            passwordSection.style.display = 'block';
          } else {
            console.log('Password is not enabled');
          }
        } catch (error) {
          console.error('Error checking password:', error);
        }
      }

      updateStatusDisplay() {
        const passwordStatus = document.getElementById('password-status');
        const fileLimitStatus = document.getElementById('file-limit-status');
        
        if (passwordStatus) {
          if (this.passwordEnabled) {
            passwordStatus.textContent = 'Required';
            passwordStatus.className = 'status-warning';
          } else {
            passwordStatus.textContent = 'Not Required';
            passwordStatus.className = 'status-disabled';
          }
        }
        
        if (fileLimitStatus) {
          if (this.maxFiles === 0) {
            fileLimitStatus.textContent = 'Infinity';
            fileLimitStatus.className = 'status-enabled';
          } else {
            fileLimitStatus.textContent = this.maxFiles + ' files';
            fileLimitStatus.className = 'status-warning';
          }
        }
      }

      detectLanguageFromExtension(filename) {
        if (!filename || !filename.includes('.')) {
          const specialFiles = {
            'dockerfile': { lang: 'dockerfile', conf: 95 },
            'makefile': { lang: 'plaintext', conf: 70 },
            'rakefile': { lang: 'ruby', conf: 85 }
          };
          
          const lowerFilename = filename.toLowerCase();
          for (const [specialName, info] of Object.entries(specialFiles)) {
            if (lowerFilename === specialName) {
              return { language: info.lang, confidence: info.conf };
            }
          }
          return { language: null, confidence: 0 };
        }

        const extension = filename.split('.').pop().toLowerCase();
        
        if (this.extensionMap[extension]) {
          const mapping = this.extensionMap[extension];
          return { language: mapping.lang, confidence: mapping.conf };
        }

        return { language: null, confidence: 0 };
      }

      smartLanguageDetection(content, filename = null) {
        if (!content || content.trim().length < 10) {
          if (filename) {
            const extDetection = this.detectLanguageFromExtension(filename);
            if (extDetection.language) {
              return { 
                language: extDetection.language, 
                confidence: Math.max(extDetection.confidence - 20, 30),
                source: 'extension'
              };
            }
          }
          return { language: 'plaintext', confidence: 0, source: 'default' };
        }

        let bestDetection = { language: 'plaintext', confidence: 0, source: 'default' };

        if (filename) {
          const extDetection = this.detectLanguageFromExtension(filename);
          if (extDetection.language && extDetection.confidence > 70) {
            bestDetection = {
              language: extDetection.language,
              confidence: extDetection.confidence,
              source: 'extension'
            };
          }
        }

        try {
          const result = hljs.highlightAuto(content);
          let detectedLang = result.language;
          let confidence = Math.min(Math.round((result.relevance || 0) * 10), 100);

          if (detectedLang && this.supportedLanguages.has(detectedLang) && confidence > bestDetection.confidence) {
            bestDetection = {
              language: detectedLang,
              confidence: confidence,
              source: 'content'
            };
          }
        } catch (error) {
          console.warn('Highlight.js detection failed:', error);
        }

        const customDetection = this.customLanguageDetection(content);
        if (customDetection.confidence > bestDetection.confidence) {
          bestDetection = {
            language: customDetection.language,
            confidence: customDetection.confidence,
            source: 'pattern'
          };
        }

        if (filename && bestDetection.source === 'content') {
          const extDetection = this.detectLanguageFromExtension(filename);
          if (extDetection.language === bestDetection.language) {
            bestDetection.confidence = Math.min(bestDetection.confidence + 15, 95);
            bestDetection.source = 'hybrid';
          }
        }

        return bestDetection;
      }

      customLanguageDetection(content) {
        const lines = content.split('\\n');
        const firstLine = lines[0]?.toLowerCase().trim() || '';
        
        if (firstLine.startsWith('<!doctype html') || firstLine.includes('<html')) {
          return { language: 'html', confidence: 95 };
        }
        if (firstLine.startsWith('<?php')) {
          return { language: 'php', confidence: 95 };
        }
        if (firstLine.startsWith('#!/bin/bash')) {
          return { language: 'bash', confidence: 95 };
        }
        if (firstLine.startsWith('from ') && firstLine.includes('import ')) {
          return { language: 'python', confidence: 90 };
        }

        const patterns = [
          { regex: /^\\s*function\\s+\\w+\\s*\\(/m, lang: 'javascript', conf: 70 },
          { regex: /^\\s*const\\s+\\w+\\s*[:=]/m, lang: 'typescript', conf: 75 },
          { regex: /^\\s*def\\s+\\w+\\s*\\(/m, lang: 'python', conf: 80 },
          { regex: /^\\s*public\\s+class\\s+\\w+/m, lang: 'java', conf: 85 },
          { regex: /^\\s*#include\\s*<\\w+>/m, lang: 'cpp', conf: 85 },
          { regex: /^\\s*using\\s+System/m, lang: 'csharp', conf: 80 },
          { regex: /^\\s*fn\\s+\\w+\\s*\\(/m, lang: 'rust', conf: 85 },
          { regex: /^\\s*FROM\\s+\\w+/m, lang: 'dockerfile', conf: 90 },
          { regex: /^\\s*{\\s*"\\w+"\\s*:/m, lang: 'json', conf: 80 }
        ];

        for (const pattern of patterns) {
          if (pattern.regex.test(content)) {
            return { language: pattern.lang, confidence: pattern.conf };
          }
        }

        return { language: 'plaintext', confidence: 30 };
      }

      bindEvents() {
        const addFileBtn = document.getElementById('add-file-btn');
        const createBtn = document.getElementById('create-paste-btn');
        const passwordSubmit = document.getElementById('password-submit');
        const passwordInput = document.getElementById('password-input');

        if (addFileBtn) {
          addFileBtn.onclick = () => this.addFile();
        }
        if (createBtn) {
          createBtn.onclick = () => this.createPaste();
        }
        if (passwordSubmit) {
          passwordSubmit.onclick = () => this.submitPassword();
        }
        if (passwordInput) {
          passwordInput.onkeypress = (e) => {
            if (e.key === 'Enter') this.submitPassword();
          };
        }
        this.bindAllFileEvents();
      }

      async submitPassword() {
        const passwordInput = document.getElementById('password-input');
        const passwordError = document.getElementById('password-error');
        const password = passwordInput.value.trim();

        if (!password) {
          this.showPasswordError('Password is required');
          return;
        }

        try {
          const response = await fetch('/test-auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + password
            }
          });

          if (response.status === 403) {
            this.showPasswordError('Invalid password');
            return;
          }

          if (response.ok) {
            this.currentPassword = password;
            localStorage.setItem('currentPassword', password);
            passwordError.style.display = 'none';
            passwordInput.value = '';
            const passwordSection = document.getElementById('password-section');
            passwordSection.style.display = 'none';
            this.showSuccess('Authentication successful!');
            
            const passwordStatus = document.getElementById('password-status');
            if (passwordStatus) {
              passwordStatus.textContent = 'Authenticated';
              passwordStatus.className = 'status-enabled';
            }
          }
        } catch (error) {
          this.showPasswordError('Connection error');
        }
      }

      showPasswordError(message) {
        const error = document.getElementById('password-error');
        error.textContent = message;
        error.style.display = 'block';
      }

      showError(message) {
        const container = document.getElementById('error-container');
        container.innerHTML = '<div class="error-alert">' + message + '</div>';
        setTimeout(() => {
          container.innerHTML = '';
        }, 5000);
      }

      showSuccess(message) {
        const container = document.getElementById('error-container');
        container.innerHTML = '<div class="success-alert">' + message + '</div>';
        setTimeout(() => {
          container.innerHTML = '';
        }, 3000);
      }

      bindAllFileEvents() {
        const containers = document.querySelectorAll('.file-container');
        containers.forEach((container, index) => {
          this.bindSingleFileEvents(container, index);
        });
      }

      bindSingleFileEvents(container, fileIndex) {
        const filenameInput = container.querySelector('.file-input');
        const languageSelect = container.querySelector('.language-select');
        const contentTextarea = container.querySelector('.code-textarea');
        const removeBtn = container.querySelector('.remove-file-btn');

        if (filenameInput) {
          filenameInput.oninput = (e) => {
            this.files[fileIndex].filename = e.target.value;
            
            const detection = this.detectLanguageFromExtension(e.target.value);
            if (detection.language && detection.confidence > 70) {
              this.files[fileIndex].detectedLanguage = detection.language;
              this.files[fileIndex].confidence = detection.confidence;
              this.files[fileIndex].detectionSource = 'extension';
              
              if (this.files[fileIndex].language === 'auto') {
                this.updateLanguageDisplay(languageSelect, {
                  language: detection.language,
                  confidence: detection.confidence,
                  source: 'extension'
                });
                
                filenameInput.classList.add('detected-from-extension');
                languageSelect.classList.add('auto-detected');
                this.addExtensionIndicator(filenameInput.parentElement, detection.language);
              }
            } else {
              filenameInput.classList.remove('detected-from-extension');
              languageSelect.classList.remove('auto-detected');
              this.removeExtensionIndicator(filenameInput.parentElement);
              
              if (this.files[fileIndex].language === 'auto') {
                this.updateLanguageDisplay(languageSelect, { language: null, confidence: 0 });
              }
            }
          };
        }

        if (languageSelect) {
          languageSelect.onchange = (e) => {
            this.files[fileIndex].language = e.target.value;
            
            if (e.target.value !== 'auto') {
              languageSelect.classList.remove('auto-detected');
              if (filenameInput) {
                filenameInput.classList.remove('detected-from-extension');
                this.removeExtensionIndicator(filenameInput.parentElement);
              }
            }
          };
        }

        if (contentTextarea) {
          let detectionTimeout;
          contentTextarea.oninput = (e) => {
            this.files[fileIndex].content = e.target.value;
            
            clearTimeout(detectionTimeout);
            detectionTimeout = setTimeout(() => {
              if (this.files[fileIndex].language === 'auto' && e.target.value.trim().length > 20) {
                const detection = this.smartLanguageDetection(
                  e.target.value, 
                  this.files[fileIndex].filename
                );
                this.files[fileIndex].detectedLanguage = detection.language;
                this.files[fileIndex].confidence = detection.confidence;
                this.files[fileIndex].detectionSource = detection.source;
                
                this.updateLanguageDisplay(languageSelect, detection);
              }
            }, 1000);
            
            this.updateUI();
          };
        }

        if (removeBtn) {
          removeBtn.onclick = () => this.removeFile(fileIndex);
        }
      }

      addExtensionIndicator(container, language) {
        this.removeExtensionIndicator(container);
        const indicator = document.createElement('div');
        indicator.className = 'extension-indicator';
        indicator.textContent = language.toUpperCase();
        container.appendChild(indicator);
      }

      removeExtensionIndicator(container) {
        const existing = container.querySelector('.extension-indicator');
        if (existing) {
          existing.remove();
        }
      }

      updateLanguageDisplay(selectElement, detection) {
        const option = selectElement.querySelector('option[value="auto"]');
        if (option && detection.language && detection.confidence > 30) {
          const sourceIcon = {
            'extension': '📄',
            'content': '🔍',
            'pattern': '🎯',
            'hybrid': '🔗'
          };
          
          const icon = sourceIcon[detection.source] || '🤖';
          option.textContent = \`Auto-detect (\${icon} \${detection.language} \${detection.confidence}%)\`;
        } else if (option) {
          option.textContent = 'Auto-detect';
        }
      }

      addFile() {
        if (this.maxFiles > 0 && this.files.length >= this.maxFiles) return;
        this.files.push(this.createFileData());
        const fileHTML = this.generateFileHTML();
        const filesContainer = document.getElementById('files-container');
        filesContainer.insertAdjacentHTML('beforeend', fileHTML);
        const newContainer = filesContainer.lastElementChild;
        this.bindSingleFileEvents(newContainer, this.files.length - 1);
        this.updateUI();
      }

      generateFileHTML() {
        const removeButton = this.files.length > 1 ? '<button class="remove-file-btn">×</button>' : '';
        return \`<div class="file-container">
          <div class="file-header">
            <div class="file-input-wrapper">
              <input type="text" class="file-input" placeholder="filename (optional)" />
            </div>
            <select class="language-select">
              <option value="auto">Auto-detect</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="swift">Swift</option>
              <option value="kotlin">Kotlin</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
              <option value="markdown">Markdown</option>
              <option value="bash">Bash</option>
              <option value="powershell">PowerShell</option>
              <option value="dockerfile">Dockerfile</option>
              <option value="plaintext">Plain Text</option>
            </select>\${removeButton}
          </div>
          <div class="code-editor">
            <textarea class="code-textarea" placeholder="Paste your code here..."></textarea>
          </div>
        </div>\`;
      }

      removeFile(fileIndex) {
        if (this.files.length <= 1) return;
        this.files.splice(fileIndex, 1);
        this.reindexFiles();
        this.updateUI();
      }

      reindexFiles() {
        const filesContainer = document.getElementById('files-container');
        filesContainer.innerHTML = '';
        this.files.forEach((file, index) => {
          const removeButton = index > 0 ? '<button class="remove-file-btn">×</button>' : '';
          const selectedLanguage = file.language || 'auto';

          let autoDetectText = 'Auto-detect';
          if (file.detectedLanguage && file.confidence > 30) {
            const sourceIcon = {
              'extension': '📄',
              'content': '🔍',
              'pattern': '🎯',
              'hybrid': '🔗'
            };
            const icon = sourceIcon[file.detectionSource] || '🤖';
            autoDetectText = \`Auto-detect (\${icon} \${file.detectedLanguage} \${file.confidence}%)\`;
          }

          const fileHTML = \`<div class="file-container">
            <div class="file-header">
              <div class="file-input-wrapper">
                <input type="text" class="file-input\${file.detectionSource === 'extension' ? ' detected-from-extension' : ''}" placeholder="filename (optional)" value="\${file.filename || ''}" />
                \${file.detectionSource === 'extension' && file.detectedLanguage ? \`<div class="extension-indicator">\${file.detectedLanguage.toUpperCase()}</div>\` : ''}
              </div>
              <select class="language-select\${file.detectionSource ? ' auto-detected' : ''}">
                <option value="auto"\${selectedLanguage === 'auto' ? ' selected' : ''}>\${autoDetectText}</option>
                <option value="javascript"\${selectedLanguage === 'javascript' ? ' selected' : ''}>JavaScript</option>
                <option value="typescript"\${selectedLanguage === 'typescript' ? ' selected' : ''}>TypeScript</option>
                <option value="python"\${selectedLanguage === 'python' ? ' selected' : ''}>Python</option>
                <option value="java"\${selectedLanguage === 'java' ? ' selected' : ''}>Java</option>
                <option value="cpp"\${selectedLanguage === 'cpp' ? ' selected' : ''}>C++</option>
                <option value="csharp"\${selectedLanguage === 'csharp' ? ' selected' : ''}>C#</option>
                <option value="go"\${selectedLanguage === 'go' ? ' selected' : ''}>Go</option>
                <option value="rust"\${selectedLanguage === 'rust' ? ' selected' : ''}>Rust</option>
                <option value="php"\${selectedLanguage === 'php' ? ' selected' : ''}>PHP</option>
                <option value="ruby"\${selectedLanguage === 'ruby' ? ' selected' : ''}>Ruby</option>
                <option value="swift"\${selectedLanguage === 'swift' ? ' selected' : ''}>Swift</option>
                <option value="kotlin"\${selectedLanguage === 'kotlin' ? ' selected' : ''}>Kotlin</option>
                <option value="html"\${selectedLanguage === 'html' ? ' selected' : ''}>HTML</option>
                <option value="css"\${selectedLanguage === 'css' ? ' selected' : ''}>CSS</option>
                <option value="sql"\${selectedLanguage === 'sql' ? ' selected' : ''}>SQL</option>
                <option value="json"\${selectedLanguage === 'json' ? ' selected' : ''}>JSON</option>
                <option value="yaml"\${selectedLanguage === 'yaml' ? ' selected' : ''}>YAML</option>
                <option value="markdown"\${selectedLanguage === 'markdown' ? ' selected' : ''}>Markdown</option>
                <option value="bash"\${selectedLanguage === 'bash' ? ' selected' : ''}>Bash</option>
                <option value="powershell"\${selectedLanguage === 'powershell' ? ' selected' : ''}>PowerShell</option>
                <option value="dockerfile"\${selectedLanguage === 'dockerfile' ? ' selected' : ''}>Dockerfile</option>
                <option value="plaintext"\${selectedLanguage === 'plaintext' ? ' selected' : ''}>Plain Text</option>
              </select>\${removeButton}
            </div>
            <div class="code-editor">
              <textarea class="code-textarea" placeholder="Paste your code here...">\${file.content || ''}</textarea>
            </div>
          </div>\`;
          filesContainer.insertAdjacentHTML('beforeend', fileHTML);
        });
        this.bindAllFileEvents();
      }

      updateUI() {
        const addFileBtn = document.getElementById('add-file-btn');
        const createBtn = document.getElementById('create-paste-btn');

        if (this.maxFiles === 0 || this.files.length < this.maxFiles) {
          addFileBtn.style.display = 'block';
        } else {
          addFileBtn.style.display = 'none';
        }

        const hasContent = this.files.some(file => file.content.trim().length > 0);
        if (createBtn) {
          createBtn.disabled = !hasContent || (this.passwordEnabled && !this.currentPassword);
          createBtn.style.opacity = (hasContent && (!this.passwordEnabled || this.currentPassword)) ? '1' : '0.5';
        }
      }

      async createPaste() {
        const createBtn = document.getElementById('create-paste-btn');
        if (this.passwordEnabled && !this.currentPassword) {
          this.showError('Password authentication required');
          return;
        }

        createBtn.disabled = true;
        createBtn.textContent = 'Creating...';

        try {
          const files = this.files
            .filter(file => file.content.trim().length > 0)
            .map(file => {
              let finalLanguage = file.language;
              
              if (finalLanguage === 'auto') {
                if (file.detectedLanguage && file.confidence > 30) {
                  finalLanguage = file.detectedLanguage;
                } else {
                  const detection = this.smartLanguageDetection(file.content, file.filename);
                  finalLanguage = detection.language;
                }
              }
              
              return {
                filename: file.filename || this.generateFilename(file, finalLanguage),
                language: finalLanguage,
                content: file.content
              };
            });

          if (files.length === 0) {
            throw new Error('No content to save');
          }

          const headers = {
            'Content-Type': 'application/json'
          };

          if (this.currentPassword) {
            headers['Authorization'] = 'Bearer ' + this.currentPassword;
          }

          const response = await fetch('/paste', {
            method: 'POST',
            headers,
            body: JSON.stringify({ files })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'HTTP ' + response.status + ': ' + response.statusText);
          }

          const result = await response.json();
          localStorage.setItem('paste_' + result.namespace, result.accessKey);
          window.location.href = '/' + result.namespace;
        } catch (error) {
          console.error('Error creating paste:', error);
          this.showError('Failed to create paste: ' + error.message);
        } finally {
          createBtn.disabled = false;
          createBtn.textContent = 'Create Paste';
        }
      }

      generateFilename(file, language) {
        const ext = this.getExtensionForLanguage(language || file.language);
        return 'file' + (this.files.indexOf(file) + 1) + ext;
      }

      getExtensionForLanguage(language) {
        const extensions = {
          'javascript': '.js',
          'typescript': '.ts',
          'python': '.py',
          'java': '.java',
          'cpp': '.cpp',
          'csharp': '.cs',
          'go': '.go',
          'rust': '.rs',
          'php': '.php',
          'ruby': '.rb',
          'swift': '.swift',
          'kotlin': '.kt',
          'html': '.html',
          'css': '.css',
          'sql': '.sql',
          'json': '.json',
          'yaml': '.yml',
          'markdown': '.md',
          'bash': '.sh',
          'powershell': '.ps1',
          'dockerfile': 'Dockerfile'
        };
        return extensions[language] || '.txt';
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      new LogiquePastebin();
    });
  </script>
</body>
</html>`
