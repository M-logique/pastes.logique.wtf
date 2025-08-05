
export const getNotFoundPageHTML = (): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>404 Not Found - Logique Pastebin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
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
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      text-align: center;
      padding: 2rem;
    }
    .container {
      max-width: 600px;
    }
    .error-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 6rem;
      font-weight: 400;
      color: #C62828;
      margin-bottom: 0.5rem;
      text-shadow: 0 0 15px rgba(198, 40, 40, 0.3);
    }
    .error-title {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #E5E5E5, #F2EFE6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .error-message {
      color: #888;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }
    .actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: 1px solid #333;
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
      background-color: #1A1A1A;
      color: #E5E5E5;
    }
    .btn:hover {
      background-color: #252525;
      border-color: #444;
      transform: translateY(-2px);
    }
    .btn.primary {
      background-color: #C62828;
      border-color: #C62828;
      color: #E5E5E5;
    }
    .btn.primary:hover {
      background-color: #B71C1C;
      border-color: #B71C1C;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-code">404</div>
    <h1 class="error-title">Page Not Found</h1>
    <p class="error-message">
      Sorry, the page you are looking for does not exist. It might have been moved, deleted, or you may have typed the address incorrectly.
    </p>
    <div class="actions">
      <a href="/" class="btn primary">
        <i class="fas fa-home"></i> Go to Homepage
      </a>
      <button onclick="window.history.back()" class="btn">
        <i class="fas fa-arrow-left"></i> Go Back
      </button>
    </div>
  </div>
</body>
</html>`;