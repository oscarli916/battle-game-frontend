import { useEffect, useRef } from "react";
import { GameClient } from "../game/client";

const GamePage = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current) {
			new GameClient(canvasRef.current);
		}
	}, []);

	return (
		<div className="h-screen flex justify-center items-center bg-white">
			<canvas ref={canvasRef} />
		</div>
	);
};
export default GamePage;
