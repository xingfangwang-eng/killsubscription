class SharedFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer style="margin-top: 64px; max-width: 800px; margin-left: auto; margin-right: auto;">
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; margin-bottom: 32px;">
          <a href="/terms" style="text-decoration: none; color: black; font-size: 14px;">Terms</a>
          <a href="/privacy" style="text-decoration: none; color: black; font-size: 14px;">Privacy</a>
          <a href="/refund" style="text-decoration: none; color: black; font-size: 14px;">Refund</a>
          <a href="/about" style="text-decoration: none; color: black; font-size: 14px;">About</a>
        </div>
        <div style="text-align: center; font-size: 12px; color: #666;">
          <p>Support:457239850@qq.com</p>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get('shared-footer')) {
  customElements.define('shared-footer', SharedFooter);
}
