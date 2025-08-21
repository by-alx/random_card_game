import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useCallback, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import ExtendedCard from "../types/extended-card";
import { cardsAtom, originalCards } from "../data/atoms";
import { useAtom } from "jotai";

interface GameCardProps {
    card: ExtendedCard;
}

export default function GameCard({ card }: GameCardProps) {
    const [cards, setCards] = useAtom(cardsAtom);

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

    const moveToGraveyard = useCallback(() => {
        console.log(card);

        const updatedCards = cards.map((c) => {
            if (c.index === card.index) {
                const originalCard = originalCards.find(
                    (originalCard) => originalCard.name === card.name
                );

                return {
                    ...card,
                    inDeck: false,
                    inGraveyard: true,
                    inHand: false,
                    inPlay: false,
                    inExile: false,
                    cost: card.cost.map((cost) => cost + 1),
                    attack: originalCard?.attack,
                    defense: originalCard?.defense,
                };
            } else {
                return c;
            }
        });

        setCards(updatedCards);
    }, [cards, setCards]);

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
                onClick={handleOpen}
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
                    <Button variant="contained">Move to Deck</Button>
                    <Button variant="contained" onClick={moveToGraveyard}>
                        Move to Graveyard
                    </Button>
                    <Button variant="contained">Move to Exile</Button>
                    <Button variant="contained">Move to Hand</Button>
                    <Button variant="contained">Increase ATK</Button>
                    <Button variant="contained">Decrease ATK</Button>
                    <Button variant="contained">Increase HP</Button>
                    <Button variant="contained">Decrease HP</Button>
                </Box>
            </Modal>
        </>
    );
}
