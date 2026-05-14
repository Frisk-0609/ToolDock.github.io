const tool = TOOLS.find(t => t.id === CURRENT_TOOL);

if (tool) {
  document.write(`

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-CZ668PDGPM"><\/script>

    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-CZ668PDGPM');
    <\/script>

    <link rel="icon" href="/favicon.ico">

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="/style.css">

    <title>${tool.title} | ToolDock</title>

    <meta name="description" content="${tool.desc}">

    <meta name="apple-mobile-web-app-title"
          content="${tool.title} | ToolDock">

    <meta property="og:title"
          content="${tool.title} | ToolDock">

    <meta property="og:description"
          content="${tool.desc}">

  `);
}
