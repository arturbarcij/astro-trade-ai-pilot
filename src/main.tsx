
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { startMarketSimulation } from './services/marketDataService.ts'

// Start market simulation when the app loads
startMarketSimulation();

createRoot(document.getElementById("root")!).render(<App />);
