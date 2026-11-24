/* 成分さがし：ページ切り替えタブ（全ページ共通）
 *
 * ページを増やすときは、下の PAGES に1行足すだけで、全ページのタブに反映されます。
 *   id    … 各ページの <nav id="pageTabs" data-current="…"> に書く名前
 *   href  … ファイル名（同じフォルダに置く）
 *   label … タブに出す文字
 * 見た目はここで一括して決めています。色だけは各ページの基調色（--accent）を使います。
 */
const PAGES = [
  { id: "skincare",  href: "index.html",     label: "スキンケア" },
  { id: "sunscreen", href: "sunscreen.html", label: "日焼け止め" },
  { id: "cleansing", href: "cleansing.html", label: "クレンジング・洗顔" },
];

(function () {
  const nav = document.getElementById("pageTabs");
  if (!nav) return;
  const current = nav.getAttribute("data-current");

  if (!document.getElementById("pageTabsStyle")) {
    const st = document.createElement("style");
    st.id = "pageTabsStyle";
    st.textContent = [
      ".page-tabs { position: sticky; top: 0; z-index: 10; margin: 0 -14px 4px; padding: env(safe-area-inset-top) 14px 0;",
      "  background: var(--bg); border-bottom: 1px solid var(--line); }",
      ".page-tabs ul { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; overflow-x: auto; scrollbar-width: none; }",
      ".page-tabs ul::-webkit-scrollbar { display: none; }",
      ".page-tabs li { flex: 1 0 auto; }",
      ".page-tabs a { display: block; padding: 10px 10px 8px; text-align: center; white-space: nowrap;",
      "  font-size: 13.5px; font-weight: 700; color: var(--muted); text-decoration: none;",
      "  border-bottom: 3px solid transparent; margin-bottom: -1px; border-radius: 8px 8px 0 0; }",
      ".page-tabs a:hover { color: var(--ink); }",
      ".page-tabs a:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }",
      ".page-tabs a[aria-current=\"page\"] { color: var(--accent); border-bottom-color: var(--accent); background: var(--accent-soft); }",
      "@media (max-width: 360px) { .page-tabs ul { gap: 2px; } .page-tabs a { padding: 10px 6px 8px; font-size: 12.5px; } }",
    ].join("\n");
    document.head.appendChild(st);
  }

  nav.classList.add("page-tabs");
  if (!nav.getAttribute("aria-label")) nav.setAttribute("aria-label", "ページ切り替え");
  const ul = document.createElement("ul");
  PAGES.forEach(function (p) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = p.href;
    a.textContent = p.label;
    if (p.id === current) a.setAttribute("aria-current", "page");
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.replaceChildren(ul);
})();
