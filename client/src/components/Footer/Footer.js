import React from 'react';
import './Footer.css';

const Footer = () => {
	return (
		<div className='footer-wrapper'>
			<div className='creator'>
				Created by{' '}
				<a
					href='https://ca.linkedin.com/in/tudor-lupu'
					rel='noopener noreferrer'
					target='_blank'
				>
					Tudor Lupu
				</a>
			</div>
		</div>
	);
};

export default Footer;
