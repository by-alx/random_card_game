export default interface Card {
    name: string;
    description: string;
    type: "Monster" | "Spell" | "Supporter" | "Boss";
    tags: string[];
    cost: number[];
    attack: number;
    defense: number;
    quantity: number;
}