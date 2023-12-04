import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import './scss/_variables.scss';
import './scss/_mixins.scss';
import './scss/base.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context.tsx';
import { PopupProvider } from '@contexts/popup-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<PopupProvider>
					<App />
				</PopupProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
