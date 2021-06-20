import { sample, capitalize, isArray } from "lodash";

type Declination = {
  nominativo : SubDeclination;
  acusativo : SubDeclination;
  genitivo : SubDeclination;
  dativo : SubDeclination;
  ablativo : SubDeclination;
}

type SubDeclination = {
  singular ?: string | Array<string>;
  plural : string | Array<string>;
}

export const declinations : Record<string, Declination> = {
  "1ª Declinação": {
    nominativo: {
      singular: "a",
      plural: "ae"
    },
    acusativo: {
      singular: "am",
      plural: "ās"
    },
    genitivo: {
      singular: "ae",
      plural: "ārum"
    },
    dativo: {
      singular: "ae ",
      plural: "īs"
    },
    ablativo: {
      singular: "ā",
      plural: "īs"
    }
  },
  "2ª Declinação": {
    nominativo: {
      singular: "us",
      plural: "ī"
    },
    acusativo: {
      singular: "um",
      plural: "ōs"
    },
    genitivo: {
      singular: "ī",
      plural: "ōrum"
    },
    dativo: {
      singular: "ō",
      plural: "īs"
    },
    ablativo: {
      singular: "ō",
      plural: "īs"
    }
  },
  "3ª Declinação (consonantal)": {
    nominativo: {
      plural: "ēs"
    },
    acusativo: {
      singular: "em",
      plural: ["īs", "ēs"]
    },
    genitivo: {
      singular: "is",
      plural: "um"
    },
    dativo: {
      singular: "ī",
      plural: "ibus"
    },
    ablativo: {
      singular: ["ā", "ī"],
      plural: "ibus"
    }
  },
  "2ª Declinação (neutro)": {
    nominativo: {
      singular: "um",
      plural: "a"
    },
    acusativo: {
      singular: "um",
      plural: "a"
    },
    genitivo: {
      singular: "ī",
      plural: "ōrum"
    },
    dativo: {
      singular: "ō ",
      plural: "īs"
    },
    ablativo: {
      singular: "ō",
      plural: "īs"
    }
  }
};

export const godConjugation : Declination = {
  nominativo: {
    singular: "deus",
    plural: "dī"
  },
  acusativo: {
    singular: "deum",
    plural: "deōs"
  },
  genitivo: {
    singular: "deī",
    plural: ["deōrum", "deum"]
  },
  dativo: {
    singular: "deō",
    plural: "dīs"
  },
  ablativo: {
    singular: "deō",
    plural: "dīs"
  }
};

export const wordsDeclinationData = {
  serua: "1f",
  seruus: "2m",
  aula: "2f",
  corōna: "1f",
  familia: "1f",
  terra: "1f",
  aedis: "3f",
  scaena: "1f",
  Lar: "3m",
  coquus: "2m",
  fūr: "3m",
  senex: ["3m", "3f"],
  Eucliō: "3m",
  honor: "3m",
  aurum: "2n",
  unguentum: "2n",
  fīlius: "2m",
  deus: "2m",
  somnium: "2n",
  exitium: "2n",
  ingenium: "2n",
  perīculum: "2n",
  cūra: "1f",
  pater: "3m",
  thēsaurus: "2m",
  uua: "1f",
  templum: "2n",
  dominus: "2m",
  uxor: "3f",
  oraculum: "2n",
  regina: "1f"
};

export interface ExerciseEntry {
  question : string;
  answer : string | Array<string>;
}

function randomDeclinationKey() : keyof typeof declinations {
  return sample(Object.keys(declinations))!;
}

function randomSubDeclinationKey(declinationKey : keyof typeof declinations) : keyof Declination {
  return sample(Object.keys(declinations[declinationKey]))! as keyof Declination;
}

function randomQuantityKey(declinationKey : keyof typeof declinations, subDeclinationKey : keyof Declination) : keyof SubDeclination {
  return sample(Object.keys(declinations[declinationKey][subDeclinationKey]))! as keyof SubDeclination;
}

export function generateDeclinationExerciseEntry() : ExerciseEntry {
  const declinationKey = randomDeclinationKey();
  const subDeclinationKey = randomSubDeclinationKey(declinationKey);
  const quantityKey = randomQuantityKey(declinationKey, subDeclinationKey);

  return {
    question: `${declinationKey}, ${capitalize(subDeclinationKey)}, ${capitalize(quantityKey)}`,
    answer: declinations[declinationKey][subDeclinationKey][quantityKey]!
  };
}

export function generateGodExerciseEntry() : ExerciseEntry {
  const subDeclinationKey = sample(Object.keys(godConjugation))! as keyof Declination;
  const quantityKey = sample(Object.keys(godConjugation[subDeclinationKey]))! as keyof SubDeclination;

  return {
    question: `${capitalize(subDeclinationKey)}, ${capitalize(quantityKey)}`,
    answer: godConjugation[subDeclinationKey][quantityKey]!
  };
}

export function generateWordExerciseEntry() : ExerciseEntry {
  const word = sample(Object.keys(wordsDeclinationData))! as keyof typeof wordsDeclinationData;
  
  return {
    question: word,
    answer: wordsDeclinationData[word]
  };
}

export function generateExerciseEntryList(generator : () => ExerciseEntry, count : number) : Array<ExerciseEntry> {
  return new Array(count).fill(null).map(generator);
}

export function answerIsCorrect(actualAnswer : string | Array<string>, userAnswer : string) : boolean {
  if(isArray(actualAnswer)) {
    return actualAnswer.includes(userAnswer);
  }

  return actualAnswer === userAnswer;
}