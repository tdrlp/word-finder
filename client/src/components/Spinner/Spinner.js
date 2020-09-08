import React from 'react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { css } from '@emotion/core';
import './Spinner.css';

const Spinner = () => {
	const override = css`
		position: unset;
	`;
	return (
		<div className='spinner-wrapper'>
			<ClimbingBoxLoader
				size={15}
				loading={true}
				color={'whitesmoke'}
				css={override}
			/>
			<p>Please wait. Connecting to server ...</p>
		</div>
	);
};

export default Spinner;
