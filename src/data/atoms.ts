import { atom } from "jotai";
import ExtendedCard from "../types/extended-card";
import { getCards } from "./cards";

const cards = getCards();
let extendedCards: ExtendedCard[] = [];
let cardCount = 0;

cards.forEach((card) => {
    for (let index = 0; index < card.quantity; index++) {
        let extendedCard: ExtendedCard = {
            ...card,
            index: cardCount,
            inDeck: true,
            inGraveyard: false,
            inHand: false,
            inPlay: false,
            inExile: false,
                    inRevive: false,
        };
        extendedCards.push(extendedCard);
        cardCount++;
    }
});

export const playerHpAtom = atom(20);
export const playerResourceAtom = atom(0);
export const buffsAtom = atom({attack: 0, defense: 0, cost: 0});
export const supporterIndexAtom = atom(0);

export const originalCards = getCards();
export const cardsAtom = atom(extendedCards);
export const cardsAtomWithBuffs = atom((get) => {
    const cards = get(cardsAtom);
    const buffs = get(buffsAtom);

    return cards.map(card => {
        return {
            ...card,
            attack: (card.attack ?? 0) + buffs.attack,
            defense: (card.defense ?? 0) + buffs.defense,
            cost: card.cost.map(cost => cost + buffs.cost),
        }
    })
});
export const cardsInDeckAtom = atom((get) => {
    const cards = get(cardsAtomWithBuffs);
    return cards.filter((card) => card.inDeck);
});
export const cardsInHandAtom = atom((get) => {
    const cards = get(cardsAtomWithBuffs);
    return cards.filter((card) => card.inHand);
});
export const cardsInPlayAtom = atom((get) => {
    const cards = get(cardsAtomWithBuffs);
    return cards.filter((card) => card.inPlay);
});
export const unitsInPlayAtom = atom((get) => {
    const cards = get(cardsInPlayAtom);
    return cards.filter((card) => card.type === "Unit") ?? [];
});
export const supportersInPlayAtom = atom((get) => {
    const cards = get(cardsInPlayAtom);
    return cards.filter((card) => card.type === "Supporter") ?? [];
});
export const spellsInPlayAtom = atom((get) => {
    const cards = get(cardsInPlayAtom);
    return cards.filter((card) => card.type === "Spell") ?? [];
});
export const cardsInReviveAtom = atom((get) => {
    const cards = get(cardsAtomWithBuffs);
    return cards.filter((card) => card.inRevive);
});
export const cardsInGraveyardAtom = atom((get) => {
    const cards = get(cardsAtomWithBuffs);
    return cards.filter((card) => card.inGraveyard);
});
export const cardsInExileAtom = atom((get) => {
    const cards = get(cardsAtomWithBuffs);
    return cards.filter((card) => card.inExile);
});