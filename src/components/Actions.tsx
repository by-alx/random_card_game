import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import {
    cardsAtom,
    cardsInDeckAtom,
    cardsInGraveyardAtom,
    cardsInHandAtom,
} from "../data/atoms";
import { getRandomIndices } from "../utility/helpers";

export default function Actions() {
    const cardsInHand = useAtomValue(cardsInHandAtom);
    const cardsInDeck = useAtomValue(cardsInDeckAtom);
    const cardsInGraveyard = useAtomValue(cardsInGraveyardAtom);
    const [cards, setCards] = useAtom(cardsAtom);

    const drawCards = useCallback(
        (amount: number) => {
            const randomIndices = getRandomIndices(cardsInDeck.length, amount);
            const randomCardIndices = cardsInDeck
                .filter((_card, index) => randomIndices.includes(index))
                .map((card) => card.index);
            console.log(randomIndices);
            console.log(randomCardIndices);

            const updatedCards = cards.map((card, index) => {
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

    return (
        <Paper
            sx={{
                padding: 1,
                width: "100px",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button variant="contained" onClick={() => drawCards(5)}>
                    Start
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        console.log("cards", cards);
                        console.log("cardsInDeck", cardsInDeck);
                        console.log("cardsInHand", cardsInHand);
                        console.log("cardsInGraveyard", cardsInGraveyard);
                    }}
                >
                    Add
                </Button>
                <Button variant="contained" onClick={() => {}}>
                    Remove
                </Button>
            </Box>
        </Paper>
    );
}
