import React from 'react';
import './Words.css';

const Words = ({ words }) => {
	return words.length !== 0 ? (
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
	) : null;
};

export default Words;
