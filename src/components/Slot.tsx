import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import Hand from "./Hand";
import ExtendedCard from "../types/extended-card";
import GameCard from "./GameCard";

interface SlotProps {
    slotName: string;
    type:
        | "Leader"
        | "Unit"
        | "Graveyard"
        | "Supporter"
        | "Spell"
        | "Revive"
        | "Deck";
    card?: ExtendedCard;
    cards?: ExtendedCard[];
}

export default function Slot({ slotName, type, card, cards }: SlotProps) {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const cardsOrEmpty = cards || [];

    const canCheck =
        type === "Deck" || type === "Graveyard" || type === "Supporter";

    return (
        <Paper
            sx={{
                width: "180px",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {canCheck && (
                    <IconButton onClick={handleOpen}>
                        <RemoveRedEyeIcon />
                    </IconButton>
                )}
                <Box sx={{ textAlign: "center", padding: "8px 0" }}>
                    {cards ? `${slotName} (${cardsOrEmpty.length})` : slotName}
                </Box>
            </Box>

            {card && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <GameCard card={card} />
                </Box>
            )}

            <Backdrop sx={{ zIndex: 10 }} open={open} onClick={handleClose}>
                <Hand cards={cardsOrEmpty} />
            </Backdrop>
        </Paper>
    );
}
