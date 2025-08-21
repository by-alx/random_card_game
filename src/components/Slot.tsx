import Paper from "@mui/material/Paper";
import Card from "../types/card";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import Hand from "./Hand";
import ExtendedCard from "../types/extended-card";

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
    card?: Card;
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
    const canAdd =
        type === "Revive" ||
        type === "Spell" ||
        type === "Supporter" ||
        type === "Unit";

    const canCheck =
        type === "Deck" || type === "Graveyard" || type === "Supporter";

    return (
        <Paper
            sx={{
                width: "150px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Box sx={{ textAlign: "center" }}>{slotName}</Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                {type === "Leader" && (
                    <IconButton>
                        <LockOpenIcon />
                    </IconButton>
                )}

                {canCheck && (
                    <IconButton onClick={handleOpen}>
                        <RemoveRedEyeIcon />
                    </IconButton>
                )}

                {canAdd && (
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                )}
            </Box>

            {cards !== undefined && (
                <Box sx={{ textAlign: "center" }}>({cardsOrEmpty.length})</Box>
            )}

            <Backdrop sx={{ zIndex: 10 }} open={open} onClick={handleClose}>
                <Hand cards={cardsOrEmpty} />
            </Backdrop>
        </Paper>
    );
}
