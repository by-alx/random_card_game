import Card from "./card";

export default interface ExtendedCard extends Card {
    index: number;
    inDeck: boolean;
    inGraveyard: boolean;
    inHand: boolean;
    inPlay: boolean;
    inExile: boolean;
    inRevive: boolean;
}