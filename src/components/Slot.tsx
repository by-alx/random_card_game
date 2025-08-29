import Paper from "@mui/material/Paper";
import ExtendedCard from "../types/extended-card";
import SlotContent from "./SlotContent";
import SupportSlotContent from "./SupportSlotContent";

interface SlotProps {
    slotName: string;
    card?: ExtendedCard;
    cards?: ExtendedCard[];
    isSupportSlot?: boolean;
}

export default function Slot({
    slotName,
    card,
    cards,
    isSupportSlot = false,
}: SlotProps) {
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
            {isSupportSlot ? (
                <SupportSlotContent />
            ) : (
                <SlotContent slotName={slotName} card={card} cards={cards} />
            )}
        </Paper>
    );
}
