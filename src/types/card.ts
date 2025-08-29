export default interface Card {
    name: string;
    description: string;
    type: "Unit" | "Spell" | "Boss";
    tags: string[];
    cost: number[];
    attack?: number;
    defense?: number;
    quantity: number;
}