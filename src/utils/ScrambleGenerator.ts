const moves = {
    "2x2": ["R", "L", "U", "D", "F", "B"],
    "3x3": ["R", "L", "U", "D", "F", "B"],
    "4x4": ["R", "L", "U", "D", "F", "B", "Rw", "Lw", "Uw", "Dw", "Fw", "Bw"]
};

const modifiers = ["", "'", "2"];
const scrambleLengths = { "2x2": 9, "3x3": 20, "4x4": 40 };

type CubeType = "2x2" | "3x3" | "4x4";

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

// Exemple d'utilisation
console.log("Scramble 3x3:", generateScramble("3x3"));
