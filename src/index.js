import { createRoot } from 'react-dom/client';

import './index.scss';
import {App} from './composant/app/app.js';

const rootDOMElement = document.getElementById('app');
const root = createRoot(rootDOMElement);
root.render(<App />);