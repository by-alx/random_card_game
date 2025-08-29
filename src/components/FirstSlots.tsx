import Box from "@mui/material/Box";
import Slot from "./Slot";
import ExtendedCard from "../types/extended-card";

interface FirstSlotsProps {
    leaderCard?: ExtendedCard;
    unitsInPlay: ExtendedCard[];
    cardsInDeck: ExtendedCard[];
}

export default function FirstSlots({
    leaderCard,
    unitsInPlay = [],
    cardsInDeck = [],
}: FirstSlotsProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <Slot slotName="Leader" card={leaderCard}></Slot>
            <Slot slotName="Unit Slot 1" card={unitsInPlay[0]}></Slot>
            <Slot slotName="Unit Slot 2" card={unitsInPlay[1]}></Slot>
            <Slot slotName="Unit Slot 3" card={unitsInPlay[2]}></Slot>
            <Slot slotName="Unit Slot 4" card={unitsInPlay[3]}></Slot>
            <Slot slotName="Unit Slot 5" card={unitsInPlay[4]}></Slot>
            <Slot slotName="Unit Slot 6" card={unitsInPlay[5]}></Slot>
            <Slot slotName="Deck" cards={cardsInDeck}></Slot>
        </Box>
    );
}
