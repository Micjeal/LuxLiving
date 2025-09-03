// Suppress console warnings for passive event listeners
(function() {
    const originalWarn = console.warn;
    console.warn = function(...args) {
        if (args[0] && (args[0].includes('passive') || args[0].includes('preventDefault'))) return;
        originalWarn.apply(console, args);
    };
})();

// 3D Model Viewer for Living Room
class ModelViewer {
    constructor(containerId, modelPath) {
        this.container = document.getElementById(containerId);
        this.modelPath = modelPath || 'path/to/default/model.glb';
        this.init();
    }

    init() {
        // Create the 3D viewer container
        this.viewerContainer = document.createElement('div');
        this.viewerContainer.className = 'model-viewer-container';
        this.viewerContainer.style.width = '100%';
        this.viewerContainer.style.height = '600px';
        this.viewerContainer.style.position = 'relative';
        this.viewerContainer.style.borderRadius = '8px';
        this.viewerContainer.style.overflow = 'hidden';
        this.viewerContainer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        
        // Create loading indicator
        this.loadingIndicator = document.createElement('div');
        this.loadingIndicator.className = 'loading-indicator';
        this.loadingIndicator.innerHTML = 'Loading 3D Model...';
        this.loadingIndicator.style.position = 'absolute';
        this.loadingIndicator.style.top = '50%';
        this.loadingIndicator.style.left = '50%';
        this.loadingIndicator.style.transform = 'translate(-50%, -50%)';
        this.loadingIndicator.style.color = 'white';
        this.loadingIndicator.style.zIndex = '10';
        
        this.viewerContainer.appendChild(this.loadingIndicator);
        this.container.appendChild(this.viewerContainer);
        
        // Initialize the 3D viewer
        this.initViewer();
    }

    initViewer() {
        // Using model-viewer for 3D rendering
        this.modelViewer = document.createElement('model-viewer');
        this.modelViewer.setAttribute('src', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb');
        this.modelViewer.setAttribute('alt', 'Modern Living Room Set');
        this.modelViewer.setAttribute('auto-rotate', '');
        this.modelViewer.setAttribute('camera-controls', '');
        this.modelViewer.setAttribute('shadow-intensity', '1');
        this.modelViewer.setAttribute('environment-image', 'neutral');
        this.modelViewer.style.width = '100%';
        this.modelViewer.style.height = '100%';
        
        // Add loading state
        this.modelViewer.addEventListener('load', () => {
            this.loadingIndicator.style.display = 'none';
        });
        
        // Add error handling
        this.modelViewer.addEventListener('error', (e) => {
            console.error('Error loading 3D model:', e);
            this.loadingIndicator.textContent = 'Failed to load 3D model. Please try again later.';
        });
        
        this.viewerContainer.appendChild(this.modelViewer);
    }
}

// Add passive event listener helper
function addPassiveEventListener(target, event, handler) {
  const supportsPassive = () => {
    let supports = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => (supports = true)
      });
      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
    } catch (e) {}
    return supports;
  };

  target.addEventListener(event, handler, supportsPassive() ? { passive: true } : false);
}

// Initialize the 3D viewer when both DOM and model-viewer are ready
function initializeWhenReady() {
    if (customElements.get('model-viewer')) {
        const modelContainer = document.getElementById('3d-model');
        if (modelContainer) {
            modelContainer.innerHTML = '';
            new ModelViewer('3d-model');
        }
    } else {
        setTimeout(initializeWhenReady, 100);
    }
}

addPassiveEventListener(document, 'DOMContentLoaded', initializeWhenReady);
