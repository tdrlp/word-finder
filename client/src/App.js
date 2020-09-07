import React from 'react';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
	return (
		<div className='app-wrapper'>
			<Header />
			<Game />
			<Footer />
		</div>
	);
};

export default App;
