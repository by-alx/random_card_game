import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useState } from "react";
import {
    buffsAtom,
    cardsAtom,
    cardsInDeckAtom,
    cardsInExileAtom,
    cardsInGraveyardAtom,
    cardsInHandAtom,
    cardsInPlayAtom,
    cardsInReviveAtom,
} from "../data/atoms";
import { getRandomIndices } from "../utility/helpers";
import { getCardByName } from "../data/cards";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function Actions() {
    const cardsInHand = useAtomValue(cardsInHandAtom);
    const cardsInDeck = useAtomValue(cardsInDeckAtom);
    const cardsInGraveyard = useAtomValue(cardsInGraveyardAtom);
    const cardsInPlay = useAtomValue(cardsInPlayAtom);
    const cardsInRevive = useAtomValue(cardsInReviveAtom);
    const cardsInExile = useAtomValue(cardsInExileAtom);
    const [cards, setCards] = useAtom(cardsAtom);
    const [buffs, setBuffs] = useAtom(buffsAtom);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    inRevive: false,
                },
            ];

            setCards(extendedCards);
        }
    }, [getCardByName, setCards, cards]);

    const updateBuffs = useCallback(
        (fieldName: string, value: number) => {
            setBuffs({
                ...buffs,
                [fieldName]: value,
            });
        },
        [buffs, setBuffs]
    );

    let buffCounter = 0;

    if (buffs.attack !== 0) {
        buffCounter++;
    }

    if (buffs.defense !== 0) {
        buffCounter++;
    }

    if (buffs.cost !== 0) {
        buffCounter++;
    }

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
                <Button variant="contained" onClick={handleOpen}>
                    Buffs {buffCounter > 0 ? `(${buffCounter})` : null}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        console.log("cards", cards);
                        console.log("cardsInDeck", cardsInDeck);
                        console.log("cardsInHand", cardsInHand);
                        console.log("cardsInGraveyard", cardsInGraveyard);
                        console.log("cardsInPlay", cardsInPlay);
                        console.log("cardsInRevive", cardsInRevive);
                        console.log("cardsInExile", cardsInExile);
                    }}
                >
                    Debug
                </Button>
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            label="ATK"
                            variant="filled"
                            value={buffs.attack}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                updateBuffs(
                                    "attack",
                                    Number(event.target.value) ?? 0
                                );
                            }}
                        />
                        <TextField
                            label="HP"
                            variant="filled"
                            value={buffs.defense}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                updateBuffs(
                                    "defense",
                                    Number(event.target.value) ?? 0
                                );
                            }}
                        />
                        <TextField
                            label="Cost"
                            variant="filled"
                            value={buffs.cost}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                updateBuffs(
                                    "cost",
                                    Number(event.target.value) ?? 0
                                );
                            }}
                        />
                    </Box>
                </Box>
            </Modal>
        </Paper>
    );
}
