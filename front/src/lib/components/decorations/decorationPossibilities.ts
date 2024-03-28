export enum DecorationPossibilities {
	BUTTERFLY,
	CAT,
	FISH,
	FEATHER,
	DOG,
	SPIDER,
	BAT,
	BUG
}

// taken from
// https://stackoverflow.com/questions/44230998/how-to-get-a-random-enum-in-typescript
const randomEnum = <T extends object>(anEnum: T): T[keyof T] => {
	const enumValues = Object.keys(anEnum)
		.map((n) => Number.parseInt(n))
		.filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
	const randomIndex = Math.floor(Math.random() * enumValues.length);
	const randomEnumValue = enumValues[randomIndex];
	return randomEnumValue;
};

export const getRandomDecoration = () => {
	return randomEnum(DecorationPossibilities);
};
