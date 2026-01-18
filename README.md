# Pain Descriptor Generator

A clinical tool for generating standardized, natural language pain descriptions for medical documentation. Designed to help healthcare providers document pain histories comprehensively and consistently.

![Pain Descriptor Generator](https://img.shields.io/badge/React-18.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

## Features

- **Location-aware options**: Selecting a body region dynamically shows relevant pain qualities, radiation sites, and associated symptoms
- **Natural language output**: Generates grammatically correct clinical prose (e.g., "headache" not "head pain")
- **Type-to-search**: All dropdowns support keyboard input for quick filtering
- **Comprehensive parameters**: Covers location, quality, severity, onset, duration, frequency, temporal pattern, radiation, aggravating/relieving factors, and associated symptoms
- **One-click copy**: Instantly copy the generated description to your clipboard
- **No backend required**: Runs entirely in the browser with no data transmission

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pain-descriptor-app.git
cd pain-descriptor-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel auto-detects Vite — just click "Deploy"
5. Your app will be live at `https://your-project.vercel.app`

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/pain-descriptor-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/pain-descriptor-app/',
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Static File Hosting

Build the project and upload the `dist` folder to any static hosting service (AWS S3, Google Cloud Storage, Firebase Hosting, etc.).

## Usage

1. **Select Location**: Choose the primary body region (e.g., Head, Chest, Abdomen)
2. **Specify Site**: Optionally narrow down to a specific location (e.g., Occipital, Retrosternal)
3. **Describe Quality**: Select one or more pain characteristics (e.g., Throbbing, Pressure-like)
4. **Set Severity**: Use the slider to indicate pain intensity (1-10)
5. **Add Timing**: Specify onset, duration, frequency, and temporal pattern
6. **Include Modifiers**: Note aggravating and relieving factors
7. **Associated Symptoms**: Select any accompanying symptoms
8. **Copy Result**: Click "Copy to Clipboard" to use the generated description

### Example Output

> Throbbing and pressure-like occipital headache, moderate in intensity (6/10), gradual in onset, lasting 4-12 hours and episodic in frequency, worsening over time, radiating to the neck, aggravated by bright lights and loud sounds, relieved by dark quiet room and sleep, associated with photophobia, phonophobia, and nausea.

## Covered Body Regions

- Head (→ "headache")
- Face (→ "facial pain")
- Neck
- Chest
- Abdomen
- Back
- Upper Extremity
- Lower Extremity
- Pelvis/Perineum
- Throat
- Ear
- Eye
- Diffuse/Generalized

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first styling
- **No external UI libraries** — Lightweight, custom components

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Adding New Locations or Options

Edit the `PAIN_DATA` object in `src/App.jsx`:

```javascript
const PAIN_DATA = {
  locations: {
    newLocation: {
      label: 'Display Name',
      painTerm: 'natural pain term',
      subLocations: ['Site 1', 'Site 2'],
      qualities: ['Quality 1', 'Quality 2'],
      radiations: ['Area 1', 'None'],
      associatedSymptoms: ['Symptom 1', 'None']
    }
  }
}
```

## License

MIT License — feel free to use in clinical, educational, or commercial applications.

## Disclaimer

This tool is intended to assist with documentation and does not constitute medical advice. Always use clinical judgment when assessing and documenting patient conditions.
