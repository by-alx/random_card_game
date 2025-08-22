import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import {
    cardsAtom,
    cardsInDeckAtom,
    cardsInExileAtom,
    cardsInGraveyardAtom,
    cardsInHandAtom,
    cardsInPlayAtom,
} from "../data/atoms";
import { getRandomIndices } from "../utility/helpers";
import { getCardByName } from "../data/cards";

export default function Actions() {
    const cardsInHand = useAtomValue(cardsInHandAtom);
    const cardsInDeck = useAtomValue(cardsInDeckAtom);
    const cardsInGraveyard = useAtomValue(cardsInGraveyardAtom);
    const cardsInPlay = useAtomValue(cardsInPlayAtom);
    const cardsInExile = useAtomValue(cardsInExileAtom);
    const [cards, setCards] = useAtom(cardsAtom);

    const drawCards = useCallback(
        (amount: number) => {
            const randomIndices = getRandomIndices(cardsInDeck.length, amount);
            const randomCardIndices = cardsInDeck
                .filter((_card, index) => randomIndices.includes(index))
                .map((card) => card.index);

            const updatedCards = cards.map((card) => {
                if (randomCardIndices.includes(card.index)) {
                    // update the corresponding card
                    return {
                        ...card,
                        inDeck: false,
                        inHand: true,
                    };
                } else {
                    // The rest is unchanged
                    return card;
                }
            });
            setCards(updatedCards);
        },
        [cardsInDeck]
    );

    const addTorso = useCallback(() => {
        const newCard = getCardByName("Explosive Torso");

        if (newCard) {
            const extendedCards = [
                ...cards,
                {
                    ...newCard,
                    index: cards.length,
                    inDeck: true,
                    inGraveyard: false,
                    inHand: false,
                    inPlay: false,
                    inExile: false,
                },
            ];

            setCards(extendedCards);
        }
    }, [getCardByName, setCards, cards]);

    return (
        <Paper sx={{ padding: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button variant="contained" onClick={() => drawCards(5)}>
                    Start
                </Button>
                <Button variant="contained" onClick={() => drawCards(1)}>
                    Draw
                </Button>
                <Button variant="contained" onClick={addTorso}>
                    Add Torso
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        console.log("cards", cards);
                        console.log("cardsInDeck", cardsInDeck);
                        console.log("cardsInHand", cardsInHand);
                        console.log("cardsInGraveyard", cardsInGraveyard);
                        console.log("cardsInPlay", cardsInPlay);
                        console.log("cardsInExile", cardsInExile);
                    }}
                >
                    Debug
                </Button>
            </Box>
        </Paper>
    );
}
