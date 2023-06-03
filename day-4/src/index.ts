const fs = require("fs/promises");

async function readCleaningAssignment(): Promise<string> {
  try {
    return await fs.readFile("src/input.txt", { encoding: "utf8" });
  } catch (err) {
    throw err;
  }
}

async function calculateNumberOfCompleteOverlaps(): Promise<number | undefined> {
  try {
    const sectionAssignments = await readCleaningAssignment();
    const sectionPairs = sectionAssignments.split("\n").filter((pair) => !!pair);
    return sectionPairs.filter((pair) => {
      const [firstSection, secondSection] = pair.split(",");
      const [firstSectionStart, firstSectionEnd] = firstSection.split("-").map((sectionId) => Number(sectionId));
      const [secondSectionStart, secondSectionEnd] = secondSection.split("-").map((sectionId) => Number(sectionId));
      const isSecondRangeContainedByFirst =
        firstSectionStart <= secondSectionStart && firstSectionEnd >= secondSectionEnd;
      const isFirstRangeContainedBySecond =
        secondSectionStart <= firstSectionStart && secondSectionEnd >= firstSectionEnd;
      return isSecondRangeContainedByFirst || isFirstRangeContainedBySecond;
    }).length;
  } catch (error) {
    console.error(error);
  }
}

async function calculateNumberOfPartialOverlaps(): Promise<number | undefined> {
  try {
    const sectionAssignments = await readCleaningAssignment();
    const sectionPairs = sectionAssignments.split("\n").filter((pair) => !!pair);
    return sectionPairs.filter((pair) => {
      const [firstSection, secondSection] = pair.split(",");
      const [firstSectionStart, firstSectionEnd] = firstSection.split("-").map((sectionId) => Number(sectionId));
      const [secondSectionStart, secondSectionEnd] = secondSection.split("-").map((sectionId) => Number(sectionId));
      const isOverlappingFromLeft = secondSectionStart <= firstSectionEnd && firstSectionStart <= secondSectionEnd;
      const isOverlappingFromRight = firstSectionStart <= secondSectionEnd && secondSectionStart <= firstSectionEnd;
      return isOverlappingFromLeft || isOverlappingFromRight;
    }).length;
  } catch (error) {
    console.error(error);
  }
}

calculateNumberOfPartialOverlaps().then(console.log);
