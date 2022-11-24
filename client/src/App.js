import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton } from './component/Login';
import { LogoutButton } from './component/Logout';
import { Profile } from './component/Profile'

import { Route, useLocation } from 'react-router-dom';

import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/HomePage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Product from "./components/Product.jsx"

function App() {
  const { isAuthenticated } = useAuth0
  let location = useLocation();
  return (
    <div className='App'>
      {/* <header className="App-header">
      
        {isAuthenticated ? (
          <>
            <Profile />
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </header> */}
			{location.pathname !== '/' && <NavBar />}
			<Route path='/' exact component={LandingPage} />
			<Route exact path='/home' component={HomePage} />
			<Route path='/SearchResults' exact component={HomePage}/>
      <Route path="/product/:id" component={Product} />
		</div>
	);
}

export default App;
