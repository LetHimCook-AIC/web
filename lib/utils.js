import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Function to calculate Jaccard similarity
export const jaccardSimilarity = (str1, str2) => {
  const set1 = new Set(str1.toLowerCase().split(/\s+/));
  const set2 = new Set(str2.toLowerCase().split(/\s+/));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
};

export function getUniqueSkills(cvInfo) {
  // Step 1: Extract positions array from cvInfo
  const positions = cvInfo.positions;

  // Step 2: Create an empty set to store unique skills
  const uniqueSkillsSet = new Set();

  // Step 3: Loop through each position
  positions.forEach((position) => {
    // Step 4: Loop through each skill in the position and add to the set
    position.skills.forEach((skill) => {
      uniqueSkillsSet.add(skill);
    });
  });

  // Step 5: Convert the set back to an array if needed
  const uniqueSkillsArray = Array.from(uniqueSkillsSet);

  return { skills: uniqueSkillsArray };
}
