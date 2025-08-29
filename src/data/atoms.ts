import { atom } from "jotai";
import ExtendedCard from "../types/extended-card";
import { getCards } from "./cards";
import Log from "../types/log";

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

export const roundAtom = atom<Log>({count: 0, isRunning: false, log: []});
export const playerHpAtom = atom(20);
export const playerResourceAtom = atom(0);
export const drawCounterAtom = atom(0);
export const reviveCounterAtom = atom(0);
export const killCounterAtom = atom(0);

export const originalCards = getCards();
export const cardsAtom = atom(extendedCards);
export const cardsInDeckAtom = atom((get) => {
    const cards = get(cardsAtom);
    return cards.filter((card) => card.inDeck);
});
export const cardsInHandAtom = atom((get) => {
    const cards = get(cardsAtom);
    return cards.filter((card) => card.inHand);
});
export const cardsInPlayAtom = atom((get) => {
    const cards = get(cardsAtom);
    return cards.filter((card) => card.inPlay);
});
export const unitsInPlayAtom = atom((get) => {
    const cards = get(cardsInPlayAtom);
    return cards.filter((card) => card.type === "Unit") ?? [];
});
export const spellsInPlayAtom = atom((get) => {
    const cards = get(cardsInPlayAtom);
    return cards.filter((card) => card.type === "Spell") ?? [];
});
export const cardsInReviveAtom = atom((get) => {
    const cards = get(cardsAtom);
    return cards.filter((card) => card.inRevive);
});
export const cardsInGraveyardAtom = atom((get) => {
    const cards = get(cardsAtom);
    return cards.filter((card) => card.inGraveyard);
});
export const cardsInExileAtom = atom((get) => {
    const cards = get(cardsAtom);
    return cards.filter((card) => card.inExile);
});