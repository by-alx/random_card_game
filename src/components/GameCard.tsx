import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useCallback, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import ExtendedCard from "../types/extended-card";
import { cardsAtom, originalCards } from "../data/atoms";
import { useAtom } from "jotai";

interface GameCardProps {
    card: ExtendedCard;
}

export default function GameCard({ card }: GameCardProps) {
    const [cards, setCards] = useAtom(cardsAtom);
    const [atk, setAtk] = useState<number | null>(null);
    const [hp, setHp] = useState<number | null>(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let backgroundColor = "";

    switch (card.type) {
        case "Spell":
            backgroundColor = "lightblue";
            break;

        case "Unit":
            backgroundColor = "lightslategray";
            break;

        case "Supporter":
            backgroundColor = "lightgreen";
            break;

        case "Boss":
            backgroundColor = "lightpink";
            break;
    }

    const openModal = useCallback(() => {
        setAtk(card?.attack ?? null);
        setHp(card?.defense ?? null);
        handleOpen();
    }, []);

    const updateCard = useCallback(
        (
            location?: "deck" | "graveyard" | "exile" | "hand",
            atk?: number | null,
            hp?: number | null
        ) => {
            const updatedCards = cards.map((c) => {
                if (c.index === card.index) {
                    const originalCard = originalCards.find(
                        (originalCard) => originalCard.name === card.name
                    );

                    let cardProps = {};

                    switch (location) {
                        case "deck":
                            cardProps = {
                                inDeck: true,
                                inGraveyard: false,
                                inHand: false,
                                inPlay: false,
                                inExile: false,
                            };
                            break;

                        case "graveyard":
                            cardProps = {
                                inDeck: false,
                                inGraveyard: true,
                                inHand: false,
                                inPlay: false,
                                inExile: false,
                                cost: card.cost.map((cost) => cost + 1),
                            };
                            break;

                        case "exile":
                            cardProps = {
                                inDeck: false,
                                inGraveyard: false,
                                inHand: false,
                                inPlay: false,
                                inExile: true,
                                cost: originalCard?.cost || [],
                            };
                            break;

                        case "hand":
                            cardProps = {
                                inDeck: false,
                                inGraveyard: false,
                                inHand: true,
                                inPlay: false,
                                inExile: false,
                            };
                            break;
                    }

                    if (atk !== undefined) {
                        cardProps = {
                            ...cardProps,
                            attack: atk,
                        };
                    }

                    if (hp !== undefined) {
                        cardProps = {
                            ...cardProps,
                            defense: hp,
                        };
                    }

                    return {
                        ...card,
                        attack: originalCard?.attack,
                        defense: originalCard?.defense,
                        ...cardProps,
                    };
                } else {
                    return c;
                }
            });

            setCards(updatedCards);
        },
        [cards, setCards]
    );

    return (
        <>
            <Paper
                sx={{
                    width: "150px",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 1,
                    boxSizing: "border-box",
                    cursor: "pointer",
                    backgroundColor,

                    "&:hover": { outline: "1px solid #000" },
                }}
                onClick={openModal}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ fontWeight: "bold" }}>{card.name}</Box>
                    {card.cost.join(" / ")}
                </Box>
                <Box sx={{ textAlign: "center", userSelect: "none" }}>
                    {card.description}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>{card.attack}</Box>
                    {card.tags.join(", ")}
                    <Box>{card.defense}</Box>
                </Box>
            </Paper>

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
                    <Button variant="contained">Move to Board</Button>
                    {!card.inDeck && (
                        <Button
                            variant="contained"
                            onClick={() => updateCard("deck")}
                        >
                            Move to Deck
                        </Button>
                    )}
                    {!card.inGraveyard && (
                        <Button
                            variant="contained"
                            onClick={() => updateCard("graveyard")}
                        >
                            Move to Graveyard
                        </Button>
                    )}
                    {!card.inExile && (
                        <Button
                            variant="contained"
                            onClick={() => updateCard("exile")}
                        >
                            Move to Exile
                        </Button>
                    )}
                    {!card.inHand && (
                        <Button
                            variant="contained"
                            onClick={() => updateCard("hand")}
                        >
                            Move to Hand
                        </Button>
                    )}
                    {(card.type === "Unit" || card.type === "Boss") && (
                        <>
                            <Box sx={{ display: "flex", marginTop: 2 }}>
                                <TextField
                                    label="ATK"
                                    variant="filled"
                                    value={atk}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setAtk(
                                            Number(event.target.value) ?? null
                                        );
                                    }}
                                />
                                <TextField
                                    label="HP"
                                    variant="filled"
                                    value={hp}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setHp(
                                            Number(event.target.value) ?? null
                                        );
                                    }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                onClick={() => updateCard(undefined, atk, hp)}
                            >
                                Save Stats
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
}
