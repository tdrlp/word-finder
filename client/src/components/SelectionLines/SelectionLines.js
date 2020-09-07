import React from 'react';
import SelectionLine from './SelectionLine';

const SelectionLines = ({ activeLine, lines }) => {
	return (
		<>
			<SelectionLine
				from={activeLine.from}
				to={activeLine.to}
				isPlayer={true}
			/>
			{lines.map((line, i) => (
				<SelectionLine key={i} from={line.from} to={line.to} />
			))}
		</>
	);
};

export default SelectionLines;
