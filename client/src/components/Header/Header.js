import React from 'react';
import './Header.css';

const Header = () => {
	return (
		<div className='header-wrapper'>
			<div className='title'>Word Search</div>
			<div className='sub-title'>
				React + Express:{' '}
				<a
					href='https://github.com/isoyute/word-finder'
					rel='noopener noreferrer'
					target='_blank'
				>
					GitHub
				</a>
			</div>
		</div>
	);
};

export default Header;
