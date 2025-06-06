import Alpine from 'alpinejs'
import './newsletter.js'

import hljs from 'highlight.js'
import 'highlight.js/styles/base16/material.css'
import '../css/main.css'

// AlpineJS
Alpine.start()

// HighlightingJS
hljs.highlightAll()

// Make all links in content pages open in a new tab
function makeAllLinksTargetBlank() {
  // Target the terminal-page area which contains the rendered markdown content
  const contentArea = document.querySelector('.terminal-page');
  if (contentArea) {
    // Find all links in the content area
    const links = contentArea.querySelectorAll('a');
    
    // Add target="_blank" and rel="noopener noreferrer" to each link
    links.forEach(link => {
      // Skip links that are internal page anchors
      if (!link.getAttribute('href').startsWith('#')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }
}

// Terminal effect script
document.addEventListener('DOMContentLoaded', function() {
    // Make all links in markdown content open in new tabs
    makeAllLinksTargetBlank();
    
    // Display terminal prompt immediately without animation
    const terminalPrompt = document.querySelector('.terminal-prompt span');
    if (terminalPrompt) {
      // Show navigation links immediately
      const navLinks = document.querySelector('.terminal-nav-links');
      if (navLinks) {
        navLinks.style.opacity = '1';
      }
      
      // Show content immediately
      const terminalPage = document.querySelector('.terminal-page');
      if (terminalPage) {
        terminalPage.style.opacity = '1';
      }
    }
    
    // Simulate terminal commands
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      // Position cursor at the end of the content
      const terminalContent = document.querySelector('.terminal-content');
      if (terminalContent) {
        terminalContent.appendChild(cursor);
      }
    }
    
    // Terminal button interactions - macOS style
    // Red button (close)
    const closeButton = document.querySelector('.terminal-button.close');
    if (closeButton) {
      // Add hover effect
      closeButton.innerHTML = '<span class="terminal-button-icon">×</span>';
      
      closeButton.addEventListener('mouseenter', function() {
        this.classList.add('terminal-button-active');
      });
      
      closeButton.addEventListener('mouseleave', function() {
        this.classList.remove('terminal-button-active');
      });
      
      closeButton.addEventListener('click', function() {
        const terminalWindow = document.querySelector('.terminal-window');
        if (terminalWindow) {
          // Add closing animation
          terminalWindow.classList.add('terminal-window-closing');
          
          setTimeout(() => {
            terminalWindow.style.display = 'none';
            terminalWindow.classList.remove('terminal-window-closing');
            
            // Show a restart button
            const restartBtn = document.createElement('button');
            restartBtn.textContent = 'Restart Terminal';
            restartBtn.className = 'terminal-restart-btn';
            restartBtn.addEventListener('click', function() {
              terminalWindow.style.display = 'block';
              setTimeout(() => {
                terminalWindow.style.opacity = '1';
                this.remove();
              }, 10);
            });
            document.body.appendChild(restartBtn);
          }, 300);
        }
      });
    }
    
    // Yellow button (minimize)
    const minimizeButton = document.querySelector('.terminal-button.minimize');
    if (minimizeButton) {
      // Add hover effect
      minimizeButton.innerHTML = '<span class="terminal-button-icon">−</span>';
      
      minimizeButton.addEventListener('mouseenter', function() {
        this.classList.add('terminal-button-active');
      });
      
      minimizeButton.addEventListener('mouseleave', function() {
        this.classList.remove('terminal-button-active');
      });
      
      minimizeButton.addEventListener('click', function() {
        const terminalWindow = document.querySelector('.terminal-window');
        if (terminalWindow) {
          // Add minimizing animation
          terminalWindow.classList.add('terminal-window-minimizing');
          
          setTimeout(() => {
            // Create minimized version in dock
            const minimizedIndicator = document.createElement('div');
            minimizedIndicator.className = 'terminal-minimized-indicator';
            minimizedIndicator.innerHTML = '<div class="terminal-minimized-icon"></div><span>Terminal</span>';
            document.body.appendChild(minimizedIndicator);
            
            terminalWindow.style.display = 'none';
            terminalWindow.classList.remove('terminal-window-minimizing');
            
            // Restore on click
            minimizedIndicator.addEventListener('click', function() {
              terminalWindow.style.display = 'block';
              terminalWindow.classList.add('terminal-window-restoring');
              
              setTimeout(() => {
                terminalWindow.classList.remove('terminal-window-restoring');
              }, 300);
              
              this.remove();
            });
          }, 300);
        }
      });
    }
    
    // Green button (maximize/fullscreen)
    const maximizeButton = document.querySelector('.terminal-button.maximize');
    if (maximizeButton) {
      // Add hover effect
      maximizeButton.innerHTML = '<span class="terminal-button-icon">+</span>';
      
      maximizeButton.addEventListener('mouseenter', function() {
        this.classList.add('terminal-button-active');
      });
      
      maximizeButton.addEventListener('mouseleave', function() {
        this.classList.remove('terminal-button-active');
      });
      
      maximizeButton.addEventListener('click', function() {
        const terminalWindow = document.querySelector('.terminal-window');
        if (terminalWindow) {
          // Toggle fullscreen with animation
          if (terminalWindow.classList.contains('terminal-fullscreen')) {
            terminalWindow.classList.add('terminal-window-unmaximizing');
            
            setTimeout(() => {
              terminalWindow.classList.remove('terminal-fullscreen');
              terminalWindow.classList.remove('terminal-window-unmaximizing');
            }, 300);
          } else {
            terminalWindow.classList.add('terminal-window-maximizing');
            
            setTimeout(() => {
              terminalWindow.classList.add('terminal-fullscreen');
              terminalWindow.classList.remove('terminal-window-maximizing');
            }, 300);
          }
        }
      });
    }
  });
  