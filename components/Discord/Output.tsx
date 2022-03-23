import { Point, Area } from "react-easy-crop/types";
interface OutputProps {
	croppedArea: Area;
	aspectRatio: number;
    imgSrc: string;
    zIndex: number;
}

const Output = ({ croppedArea, aspectRatio, imgSrc, zIndex }: OutputProps) => {
	const scale = 100 / croppedArea.width;
	const transform = {
		x: `${-croppedArea.x * scale}%`,
		y: `${-croppedArea.y * scale}%`,
		scale,
		width: "calc(100% + 0.5px)",
		height: "auto"
	};

	const imageStyle = {
		transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
		width: transform.width,
		height: transform.height,
        zIndex: zIndex
	};

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img className="absolute top-0 left-0  origin-top-left" src={imgSrc} alt="" style={imageStyle} />
	);
};

export default Output;