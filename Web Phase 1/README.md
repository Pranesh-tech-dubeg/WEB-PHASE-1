# NEW GOLDEN ENTERPRISES — Premium Architectural 3D Website

A luxury, minimalist, pure white architectural web application created for **NEW GOLDEN ENTERPRISES**, specializing in high-performance architectural windows, doors, and ventilation systems.

---

## 🏛️ Brand & Design Direction

- **Brand Aesthetic**: Luxury Architectural | Minimalist | Pure White | Champagne Gold Accents
- **Color Palette**:
  - Primary Background: `#FFFFFF`
  - Secondary Background: `#F7F7F5`
  - Primary Typography: `#171717` (Deep Charcoal Black)
  - Secondary Typography: `#686868`
  - Accent Gold: `#B99A5B` (Satin Champagne Gold)
  - Border Lines: `#E8E6E1`
- **Typography**:
  - Headings: `Cinzel` & `Playfair Display` (Classic architectural serif)
  - Body & UI: `Plus Jakarta Sans` (Clean geometric precision sans-serif)

---

## 🚀 Key Features

### 1. Interactive 3D Architectural Window Studio (Three.js)
- **Genuine 3D Models**: Procedurally engineered architectural profiles featuring outer frames, inner sashes, multi-chamber extrusions, double glazing units (IGU), EPDM rubber gaskets, and satin champagne gold lever handles.
- **Four Window Configurations**:
  1. **Casement Architectural System (Series 85)**: Dual-bay with fixed left glass and operable right casement sash.
  2. **Panoramic Multi-Track Sliding System (Series 120)**: Multi-track sill with stainless steel runners and active sliding panel.
  3. **Ultra-Slim Fixed Picture Window (Series 70)**: 35mm minimalist sightline for maximized natural light.
  4. **European Tilt & Turn System (Series 88)**: Dual-action inward swing and top-tilt ventilation.
- **Interactive Sash Animation**: Click **"Open Casement"** or **"Slide Sash Open"** to physically operate the window in real-time.
- **360° Free OrbitControls**: Smooth inertia damping (`dampingFactor: 0.05`), pinch-to-zoom limits, and polar angle constraints to prevent slipping below the floor.
- **Real-Time Finish Customizer**:
  - Matte White (RAL 9016)
  - Anthracite Grey (RAL 7016)
  - Obsidian Black Anodized
  - Natural Brushed Aluminium
  - Architectural Warm Walnut
  - Satin Champagne Gold
- **Architectural Glazing Selector**:
  - Ultra-Clear Insulated Double Glazing
  - Acoustic Low-E Thermal Tint
  - Bronze Solar Guard
  - Satin Frosted Privacy
- **Studio Tools**: Auto-rotation toggle, camera reset animation, and native fullscreen view.

### 2. Product Collection (8 Categories from Reference Photos)
1. **01. Bathroom Ventilators**: Louvered glass ventilation with top-hung exhaust light.
2. **02. Sliding Windows & Doors**: Multi-track panoramic sliding systems with flush thresholds.
3. **03. Fixed Windows**: Hermetically sealed picture windows for air-conditioned spaces.
4. **04. French Windows & Doors**: Semicircular arched fanlights with Georgian grid muntins.
5. **05. Casement Openable Windows**: Side-hung openable casements with perimeter multipoint locks.
6. **06. Awning / Top-Hung Windows**: Top-hinged outward opening for rain-protected ventilation.
7. **07. Tilt-and-Turn Windows**: Dual-action German-engineered hardware for inward tilt and turn.
8. **08. Architectural Window Systems**: Bespoke bow/bay windows and bi-fold concertina glass doors.

### 3. Product Inspection Modal
- Accessible deep-dive modal featuring high-resolution authentic imagery, engineering highlights, and one-click quotation pre-population.

### 4. Interactive Quotation Form
- Accessible form with real-time field validation (Full Name, Email regex, Phone length, Category selection).
- Syncs seamlessly with selections made in the 3D studio.
- Friendly loading simulation and clear feedback noting frontend demo status ready for backend CRM integration.

---

## 📂 Project Directory Structure

```
new-golden-enterprises/
├── index.html                   # Semantic HTML5 markup
├── server.js                    # Zero-dependency local Node.js static server
├── README.md                    # Project documentation
├── css/
│   └── style.css                # Luxury architectural stylesheet
├── js/
│   ├── main.js                  # Application controller, modal, form validation
│   ├── three-scene.js           # Three.js 3D window visualization engine
│   └── vendor/
│       ├── three.module.js      # Three.js ES Module (r160)
│       ├── OrbitControls.js     # OrbitControls with damping
│       └── GLTFLoader.js        # GLTF/GLB loader
└── assets/
    └── images/
        ├── products/            # Authentic reference product photography
        │   ├── bathroom-ventilators.jpeg
        │   ├── sliding-windows.jpeg
        │   ├── fixed-windows.jpeg
        │   ├── french-windows.jpeg
        │   ├── casement-windows.jpeg
        │   ├── awning-top-hung-windows.jpeg
        │   ├── tilt-and-turn-windows.jpeg
        │   ├── bifold-doors.jpeg
        │   ├── bow-windows.jpeg
        │   └── window-range-collection.jpeg
        ├── hero/
        │   ├── hero-architectural-window.jpg
        │   └── about-craftsmanship.jpg
        └── projects/
            ├── project-1-villa-azure.jpg
            ├── project-2-skyline-penthouse.jpg
            ├── project-3-forest-sanctuary.jpg
            ├── project-4-minimal-monolith.jpg
            └── project-5-courtyard-residence.jpg
```

---

## 💻 Instructions for Running Locally

### Option 1: Using the Bundled Node Server (Recommended)
Open a terminal in the project directory and run:

```bash
node server.js
```

Then open your browser at:
`http://localhost:3000`

### Option 2: Using Python
If Python is installed on your system:

```bash
python -m http.server 3000
```

### Option 3: Using VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 📱 Browser Compatibility
- Chrome, Edge, Safari, Firefox, Opera (Desktop & Mobile)
- Responsive breakpoints tested across 1440px+ Desktop, 992px Tablets, and 390px Mobile Viewports.
- Graceful WebGL error fallback if 3D acceleration is unsupported.
