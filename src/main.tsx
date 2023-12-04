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
import { ProfileProvider } from '@contexts/profile-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<PopupProvider>
					<ProfileProvider>
						<App />
					</ProfileProvider>
				</PopupProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
