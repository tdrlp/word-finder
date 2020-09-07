import React from 'react';
import './Words.css';

const Words = ({ words }) => {
	return (
		<div className='words-wrapper noselect'>
			<div className='title'>Words</div>
			{words.map((word, i) => (
				<div
					key={i}
					className={`word ${word.isSelected ? 'selected' : ''}`}
				>
					{word.string}
				</div>
			))}
		</div>
	);
};

export default Words;
