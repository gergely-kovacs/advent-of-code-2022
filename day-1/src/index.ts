const fs = require("fs/promises");

async function readElfCalorieCounts(): Promise<string | undefined> {
  try {
    return await fs.readFile("src/calories.txt", { encoding: "utf8" });
  } catch (err) {
    console.log(err);
  }
}

async function getSumCaloriesByElf(): Promise<number[]> {
  const calories = await readElfCalorieCounts();
  if (!calories) {
    return [];
  }

  const caloriesByElf = calories.split("\n\n");
  return caloriesByElf.map((elf) =>
    elf
      .split("\n")
      .map(Number)
      .reduce((acc, num) => acc + num, 0)
  );
}

getSumCaloriesByElf().then(calories => console.log(Math.max(...calories)));
getSumCaloriesByElf().then(calories => console.log(calories.sort((a, b) => a - b).slice(-3).reduce((acc, num) => acc + num, 0)));
