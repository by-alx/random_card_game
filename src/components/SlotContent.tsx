import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import Hand from "./Hand";
import ExtendedCard from "../types/extended-card";
import GameCard from "./GameCard";

interface SlotContentProps {
    slotName: string;
    card?: ExtendedCard;
    cards?: ExtendedCard[];
}

export default function SlotContent({
    slotName,
    card,
    cards,
}: SlotContentProps) {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const cardsOrEmpty = cards || [];

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {cardsOrEmpty.length > 0 && (
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
                <Box sx={{ height: "99vh", padding: 1, overflow: "auto" }}>
                    <Hand cards={cardsOrEmpty} />
                </Box>
            </Backdrop>
        </>
    );
}
