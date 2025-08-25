import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useCallback, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField, Typography } from "@mui/material";
import ExtendedCard from "../types/extended-card";
import { cardsAtom, originalCards, roundAtom } from "../data/atoms";
import { useAtom } from "jotai";

interface GameCardProps {
    card: ExtendedCard;
}

type Location = "deck" | "graveyard" | "revive" | "hand" | "board" | "exile";

export default function GameCard({ card }: GameCardProps) {
    const [cards, setCards] = useAtom(cardsAtom);
    const [round, setRound] = useAtom(roundAtom);
    const [atk, setAtk] = useState<number>(card.attack ?? 0);
    const [hp, setHp] = useState<number>(card.defense ?? 0);

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
        setAtk(card.attack ?? 0);
        setHp(card.defense ?? 0);
        handleOpen();
    }, [card]);

    const updateLocation = useCallback(
        (location?: Location) => {
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
                                inRevive: false,
                            };
                            break;

                        case "graveyard":
                            cardProps = {
                                inDeck: false,
                                inGraveyard: true,
                                inHand: false,
                                inPlay: false,
                                inExile: false,
                                inRevive: false,
                                cost: (card.cost ?? []).map((cost) => cost + 1),
                            };
                            break;

                        case "revive":
                            cardProps = {
                                inDeck: false,
                                inGraveyard: false,
                                inHand: false,
                                inPlay: false,
                                inExile: false,
                                inRevive: true,
                            };
                            break;

                        case "hand":
                            cardProps = {
                                inDeck: false,
                                inGraveyard: false,
                                inHand: true,
                                inPlay: false,
                                inExile: false,
                                inRevive: false,
                            };
                            break;

                        case "board":
                            cardProps = {
                                inDeck: false,
                                inGraveyard: false,
                                inHand: false,
                                inPlay: true,
                                inExile: false,
                                inRevive: false,
                            };
                            break;

                        case "exile":
                            cardProps = {
                                inDeck: false,
                                inGraveyard: false,
                                inHand: false,
                                inPlay: false,
                                inExile: true,
                                inRevive: false,
                                cost: originalCard?.cost || [],
                            };
                            break;
                    }

                    setRound({
                        count: round.count,
                        isRunning: round.isRunning,
                        log: [
                            ...round.log,
                            `Move "${card.name}" to "${location}"`,
                        ],
                    });

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
        [cards, setCards, originalCards, setRound, round, card]
    );

    const updateStats = useCallback(
        (atk: number, hp: number) => {
            const updatedCards = cards.map((c) => {
                if (c.index === card.index) {
                    let cardProps = {
                        attack: atk,
                        defense: hp,
                    };

                    return {
                        ...card,
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

    const onLocationChange = useCallback(
        (location: Location) => {
            updateLocation(location);
            handleClose();
        },
        [updateLocation, handleClose]
    );

    const onUpdateStats = useCallback(
        (atk: number, hp: number) => {
            updateStats(atk, hp);
            handleClose();
        },
        [updateStats, handleClose]
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
                    <Box>{(card?.cost ?? []).join("/")}</Box>
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        userSelect: "none",
                        fontSize: "14px",
                    }}
                >
                    {card.description}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>{card.attack}</Box>
                    {(card?.tags ?? []).join(", ")}
                    <Box>{card.defense}</Box>
                </Box>
            </Paper>

            <Modal
                open={open}
                onClose={handleClose}
                key={`${card.index}_${card.name}`}
            >
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
                    <Typography variant="h5">Menu for "{card.name}"</Typography>

                    {!card.inPlay && (
                        <Button
                            variant="contained"
                            onClick={() => onLocationChange("board")}
                        >
                            Move to Board
                        </Button>
                    )}
                    {!card.inDeck && (
                        <Button
                            variant="contained"
                            onClick={() => onLocationChange("deck")}
                        >
                            Move to Deck
                        </Button>
                    )}
                    {!card.inGraveyard ? (
                        <Button
                            variant="contained"
                            onClick={() => onLocationChange("graveyard")}
                        >
                            Move to Graveyard
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => onLocationChange("revive")}
                        >
                            Revive
                        </Button>
                    )}
                    {!card.inExile && (
                        <Button
                            variant="contained"
                            onClick={() => onLocationChange("exile")}
                        >
                            Move to Exile
                        </Button>
                    )}
                    {!card.inHand && (
                        <Button
                            variant="contained"
                            onClick={() => onLocationChange("hand")}
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
                                onClick={() => onUpdateStats(atk, hp)}
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
