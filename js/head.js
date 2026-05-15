const tool = TOOLS.find(t => t.id === CURRENT_TOOL);

if (!tool) {
  console.error("Tool not found:", CURRENT_TOOL);
}

/* =========================
   HEAD
========================= */

document.write(`

  <!-- Google tag (gtag.js) -->
  <script async
    src="https://www.googletagmanager.com/gtag/js?id=G-CZ668PDGPM">
  <\/script>

  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag(){
      dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'G-CZ668PDGPM');
  <\/script>

  <meta charset="UTF-8">

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <link rel="icon"
        href="/favicon.ico">

  <link rel="stylesheet"
        href="/style.css">

  <title>${tool.title} | ToolDock</title>

  <meta name="description"
        content="${tool.desc}">

  <meta property="og:type"
        content="website">

  <meta property="og:site_name"
        content="ToolDock">

  <meta property="og:title"
        content="${tool.title} | ToolDock">

  <meta property="og:description"
        content="${tool.desc}">

  <meta property="og:url"
        content="https://tooldock.github.io${tool.url}">

  <meta property="og:image"
        content="https://tooldock.github.io/ogp.png">

  <meta name="twitter:card"
        content="summary_large_image">

  <meta name="theme-color"
        content="#ffffff">

  <link rel="canonical"
        href="https://tooldock.github.io${tool.url}">

`);

/* =========================
   共通CSS
========================= */

const style = document.createElement("style");

style.textContent = `

  .breadcrumb{
    font-size:14px;
    color:#666;
    padding:12px 20px;
    margin-bottom:10px;
    line-height:1.6;
    word-break:break-word;
  }

  .breadcrumb a{
    color:#2563eb;
    text-decoration:none;
  }

  .breadcrumb a:hover{
    text-decoration:underline;
  }

  .bc-sep{
    margin:0 6px;
    color:#999;
  }

`;

document.head.appendChild(style);

/* =========================
   DOM Ready
========================= */

document.addEventListener("DOMContentLoaded", () => {

  if (!tool) return;

  /* =========================
     カテゴリ名
  ========================= */

  const categoryNames = {
    life: "生活",
    math: "数学",
    text: "文字列",
    baseball: "野球"
  };

  const categoryLabel =
    categoryNames[tool.category]
    || tool.category;

  /* =========================
     パンくず
  ========================= */

  const nav = document.createElement("nav");

  nav.className = "breadcrumb";

  nav.setAttribute(
    "aria-label",
    "パンくずリスト"
  );

  nav.innerHTML = `
    <a href="/">ToolDock</a>

    <span class="bc-sep">›</span>

    <a href="/category/?cat=${tool.category}">
      ${categoryLabel}
    </a>

    <span class="bc-sep">›</span>

    <span>${tool.title}</span>
  `;

  document.body.prepend(nav);

  /* =========================
     Breadcrumb JSON-LD
  ========================= */

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ToolDock",
        "item": "https://tooldock.github.io/"
      },

      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryLabel,
        "item":
          `https://tooldock.github.io/category/?cat=${tool.category}`
      },

      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item":
          `https://tooldock.github.io${tool.url}`
      }
    ]
  };

  const breadcrumbScript =
    document.createElement("script");

  breadcrumbScript.type =
    "application/ld+json";

  breadcrumbScript.textContent =
    JSON.stringify(breadcrumbJsonLd);

  document.head.appendChild(
    breadcrumbScript
  );

  /* =========================
     WebSite JSON-LD
  ========================= */

  const websiteJsonLd = {
    "@context": "https://schema.org",

    "@type": "WebSite",

    "name": "ToolDock",

    "url":
      "https://tooldock.github.io/"
  };

  const websiteScript =
    document.createElement("script");

  websiteScript.type =
    "application/ld+json";

  websiteScript.textContent =
    JSON.stringify(websiteJsonLd);

  document.head.appendChild(
    websiteScript
  );

});
