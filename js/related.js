const currentTool = TOOLS.find(t => t.id === CURRENT_TOOL);

const relatedTools = TOOLS.filter(
  t => t.category === currentTool.category && t.id !== currentTool.id
);

const container = document.getElementById("related-tools");

if (container && relatedTools.length > 0) {

  container.innerHTML = `

    <section class="related-tools-section">
      <h2>同じカテゴリのツール</h2>

      <div class="related-tools-grid">

        ${relatedTools.map(tool => `

          <a href="${tool.url}" class="related-tool-card">
            <h3>${tool.title}</h3>
            <p>${tool.desc}</p>
          </a>

        `).join("")}

      </div>
    </section>

  `;
}
