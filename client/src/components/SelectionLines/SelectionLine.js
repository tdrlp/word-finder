import React from 'react';
import { get } from 'lodash';
import './SelectionLine.css';

const getLineLength = (from, to) => {
	return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
};

const getLineAngle = (from, to) => {
	return (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
};

const SelectionLine = ({ from, to, isPlayer }) => {
	if (!get(from, 'x') || !get(from, 'y') || !get(to, 'x') || !get(to, 'y')) {
		return null;
	}

	const length = getLineLength(from, to);
	const angle = getLineAngle(from, to);

	let colorClass = 'selected';
	if (isPlayer) {
		colorClass = angle % 45 !== 0 ? 'unavailable-path' : 'available-path';
	}

	const style = {
		width: `${length}px`,
		left: `${from.x + 3}px`,
		top: `${from.y - 14}px`,
		rotate: `rotate(${angle}deg)`,
		WebkitTransform: `rotate(${angle}deg)`,
	};

	return <div className={`line ${colorClass}`} style={style}></div>;
};

export default SelectionLine;
