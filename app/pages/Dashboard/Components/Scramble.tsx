import { useState, useEffect } from "react";
import clsx from "clsx";

const moves = {
    "2x2": ["R", "L", "U", "D", "F", "B"],
    "3x3": ["R", "L", "U", "D", "F", "B"],
    "4x4": ["R", "L", "U", "D", "F", "B", "Rw", "Lw", "Uw", "Dw", "Fw", "Bw"],
    "5x5": ["R", "L", "U", "D", "F", "B", "Rw", "Lw", "Uw", "Dw", "Fw", "Bw", "3Rw", "3Lw", "3Uw", "3Dw", "3Fw", "3Bw"]
};

const modifiers = ["", "'", "2"];
const scrambleLengths = { "2x2": 9, "3x3": 20, "4x4": 40, "5x5": 60 };

type CubeType = "2x2" | "3x3" | "4x4" | "5x5";

type Solve = {
    time: number;
    cubeType: CubeType;
    scramble: string;
    date: string;
};

function generateScramble(cube: CubeType): string {
    const scramble = [];
    let lastMove = "";
    let lastAxis = "";

    for (let i = 0; i < scrambleLengths[cube]; i++) {
        let move;
        let axis;

        do {
            move = moves[cube][Math.floor(Math.random() * moves[cube].length)];
            axis = move[0];
        } while (move === lastMove || axis === lastAxis);

        lastMove = move;
        lastAxis = axis;

        const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        scramble.push(move + modifier);
    }

    return scramble.join(" ");
}

export default function Timer() {
    const [cubeType, setCubeType] = useState<CubeType>("3x3");
    const [scramble, setScramble] = useState(generateScramble("3x3"));
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [history, setHistory] = useState<Solve[]>([]);
    const [inspectionTime, setInspectionTime] = useState(15);
    const [inspectionRunning, setInspectionRunning] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [tournamentMode, setTournamentMode] = useState(false);
    const [enableInspection, setEnableInspection] = useState(true);
    const [holdingSpace, setHoldingSpace] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (running) {
            interval = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (inspectionRunning && inspectionTime > 0) {
            interval = setInterval(() => {
                setInspectionTime((prev) => prev - 1);
            }, 1000);
        } else if (inspectionTime === 0) {
            setRunning(true);
            setInspectionRunning(false);
        }
        return () => clearInterval(interval);
    }, [inspectionRunning, inspectionTime]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            if (!running && enableInspection && !inspectionRunning && !holdingSpace) {
                setInspectionRunning(true);
                setHoldingSpace(true);
            }
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            if (inspectionRunning) {
                setInspectionRunning(false);
                setRunning(true);
            } else if (running) {
                setRunning(false);
                saveSolve(time);
            }
            setHoldingSpace(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [running, time, inspectionRunning, inspectionTime]);

    const saveSolve = (solveTime: number) => {
        setHistory([{ time: solveTime, cubeType, scramble, date: new Date().toISOString() }, ...history]);
        setScramble(generateScramble(cubeType));
        setTime(0);
        setInspectionTime(15);
    };

    return (
        <div className="flex flex-col items-center p-6 space-y-6">
            <button onClick={() => setShowSettings(!showSettings)} className="p-2 bg-gray-500 text-white rounded">
                Settings
            </button>
            {showSettings && (
                <div className="absolute top-20 bg-white dark:bg-black p-4 border rounded shadow-md">
                    <label>
                        <input type="checkbox" checked={tournamentMode} onChange={() => setTournamentMode(!tournamentMode)} /> Tournament Mode
                    </label>
                    <label>
                        <input type="checkbox" checked={enableInspection} onChange={() => setEnableInspection(!enableInspection)} /> Enable 15s Inspection
                    </label>
                    <select
                        value={cubeType}
                        onChange={(e) => {
                            const newCube = e.target.value as CubeType;
                            setCubeType(newCube);
                            setScramble(generateScramble(newCube));
                        }}
                        className="p-2 border rounded bg-white dark:bg-blue-500"
                    >
                        <option value="2x2">2x2</option>
                        <option value="3x3">3x3</option>
                        <option value="4x4">4x4</option>
                        <option value="5x5">5x5</option>
                    </select>
                </div>
            )}
            <p className="text-xl font-mono">{scramble}</p>
            {inspectionRunning && <p className="text-red-500 text-xl">Inspection: {inspectionTime}s {inspectionTime <= 8 && "Attention!"}</p>}
            <div className={clsx("text-6xl font-bold", running ? "text-red-500" : "text-green-500")}>{(time / 1000).toFixed(2)}s</div>
            <p className="text-sm">Press spacebar to start/stop</p>
            <h2 className="text-2xl font-semibold">Solve History</h2>
            <ul className="w-full max-w-lg bg-gray-100 text-black p-4 rounded shadow">
                {history.map((solve, index) => (
                    <li key={index} className="flex justify-between p-2 border-b">
                        <span>{(solve.time / 1000).toFixed(2)}s</span>
                        <span>{solve.cubeType}</span>
                        <span className="text-xs">{solve.date.split("T")[0]}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
