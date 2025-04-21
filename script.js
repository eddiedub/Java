function addThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '☀️';
  document.body.appendChild(themeToggle);

  // Start in dark mode
  document.body.classList.add('dark-mode');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Add theme toggle to all pages
  addThemeToggle();

  // Add copy functionality to code blocks
  document.querySelectorAll('pre').forEach(block => {
    block.style.position = 'relative';
    
    const copyButton = document.createElement('button');
    copyButton.style.position = 'absolute';
    copyButton.style.right = '10px';
    copyButton.style.top = '10px';
    copyButton.style.padding = '5px 10px';
    copyButton.style.background = 'var(--gold)';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '4px';
    copyButton.style.cursor = 'pointer';
    copyButton.innerHTML = '📋';
    
    copyButton.addEventListener('click', async () => {
      const code = block.querySelector('code').innerText;
      await navigator.clipboard.writeText(code);
      
      copyButton.innerHTML = '✅';
      setTimeout(() => {
        copyButton.innerHTML = '📋';
      }, 2000);
    });

    block.appendChild(copyButton);
  });

  // Highlight code blocks on hover
  document.querySelectorAll('pre').forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.style.transform = 'scale(1.01)';
    });
    
    block.addEventListener('mouseleave', () => {
      block.style.transform = 'scale(1)';
    });
  });

  // Smooth scroll for navigation
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only handle internal links (starting with #)
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});