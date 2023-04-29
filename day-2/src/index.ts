const fs = require("fs/promises");

async function readStrategyGuide(): Promise<string> {
  try {
    return await fs.readFile("src/strategy-guide.txt", { encoding: "utf8" });
  } catch (err) {
    throw err;
  }
}

const ShapeScores = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
} as const;

const OutcomeScores = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
} as const;

type TheirShape = "A" | "B" | "C";
type MyShape = "X" | "Y" | "Z";
type Outcome = "X" | "Y" | "Z";

function calculateScoreForRound(theirShape: TheirShape, myShape: MyShape): number {
  if (ShapeScores[theirShape] === ShapeScores[myShape]) {
    return ShapeScores[myShape] + OutcomeScores.DRAW;
  }
  if (
    (theirShape === "A" && myShape === "Y") ||
    (theirShape === "B" && myShape === "Z") ||
    (theirShape === "C" && myShape === "X")
  ) {
    return ShapeScores[myShape] + OutcomeScores.WIN;
  }
  return ShapeScores[myShape] + OutcomeScores.LOSE;
}

function calculateScoresForRoundWithOutcome(theirShape: TheirShape, outcome: Outcome): number {
  if (outcome === "Y") {
    return ShapeScores[theirShape] + OutcomeScores.DRAW;
  }
  if (outcome === "X") {
    if (theirShape === "A") {
      return ShapeScores["C"];
    }
    if (theirShape === "B") {
      return ShapeScores["A"];
    }
    return ShapeScores["B"];
  }
  if (theirShape === "A") {
    return ShapeScores["B"] + OutcomeScores.WIN;
  }
  if (theirShape === "B") {
    return ShapeScores["C"] + OutcomeScores.WIN;
  }
  return ShapeScores["A"] + OutcomeScores.WIN;
}

async function calculateFinalScore(): Promise<number | undefined> {
  try {
    const strategy = await readStrategyGuide();
    const rounds = strategy.split("\n");
    return rounds.reduce((score: number, currentRound: string) => {
      if (!currentRound) {
        return score;
      }
      const [theirShape, myShape] = currentRound.split(" ") as [TheirShape, MyShape];
      const currentRoundScore = calculateScoresForRoundWithOutcome(theirShape, myShape);
      console.log(currentRoundScore);
      return score + currentRoundScore;
    }, 0);
  } catch (error) {
    console.error(error);
  }
}

calculateFinalScore().then(console.log);
