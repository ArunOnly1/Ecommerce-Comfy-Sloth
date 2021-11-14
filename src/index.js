import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import { store } from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
	<Auth0Provider
		domain={process.env.REACT_APP_AUTH_DOMAIN}
		clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
		redirectUri={window.location.origin}
		cacheLocation='localstorage'
	>
		<Provider store={store}>
			<App />
		</Provider>
	</Auth0Provider>,
	document.getElementById('root')
)
