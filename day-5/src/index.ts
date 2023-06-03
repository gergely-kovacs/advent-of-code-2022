const fs = require("fs/promises");

async function readRearrangementInstructions(): Promise<string> {
  try {
    return await fs.readFile("src/input.txt", { encoding: "utf8" });
  } catch (err) {
    throw err;
  }
}

async function calculateTopCrateMarks(
  initialStacks: Record<string, string[]>,
  canHandleMultipleCratesAtOnce = false
): Promise<string | undefined> {
  try {
    const rearrangementInstructions = await readRearrangementInstructions();
    const instructions = rearrangementInstructions.split("\n").filter((pair) => !!pair);
    const rearrangedStacks = instructions.reduce((stacks, currentInstructions) => {
      // console.log(`initialStacks: ${JSON.stringify(stacks)}`);
      const [countInstruction, directionsInstruction] = currentInstructions.split(" from ");
      const crateCount = Number(countInstruction.split(" ")[1]);
      const [originStack, destinationStack] = directionsInstruction.split(" to ");
      const poppedCrates = canHandleMultipleCratesAtOnce
        ? stacks[originStack].slice(-1 * crateCount)
        : stacks[originStack].slice(-1 * crateCount).reverse();
      stacks[originStack] = stacks[originStack].slice(0, stacks[originStack].length - crateCount);
      stacks[destinationStack].push(...poppedCrates);
      // console.table(`stacks: ${JSON.stringify(stacks)}`);
      return stacks;
    }, initialStacks);
    return Object.values(rearrangedStacks)
      .map((values) => values[values.length - 1].toUpperCase())
      .filter((value) => !!value)
      .join("");
  } catch (error) {
    console.error(error);
  }
}

const stacks = {
  "1": ["n", "s", "d", "c", "v", "q", "t"],
  "2": ["m", "f", "v"],
  "3": ["f", "q", "w", "d", "p", "n", "h", "m"],
  "4": ["d", "q", "r", "t", "f"],
  "5": ["r", "f", "m", "n", "q", "h", "v", "b"],
  "6": ["c", "f", "g", "n", "p", "w", "q"],
  "7": ["w", "f", "r", "l", "c", "t"],
  "8": ["t", "z", "n", "s"],
  "9": ["m", "s", "d", "j", "r", "q", "h", "n"],
};

// calculateTopCrateMarks(stacks).then(console.log);
calculateTopCrateMarks(stacks, true).then(console.log);
