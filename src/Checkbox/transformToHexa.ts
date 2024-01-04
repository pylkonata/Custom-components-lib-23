import { CSSProperties } from 'react';

export const transformToHexa = (hex: CSSProperties['color'], alpha: number) => {
	const color = `${hex}${Math.floor(alpha * 255)
		.toString(16)
		.padStart(2, '0')}`;
	return color;
};
