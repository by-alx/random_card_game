import Box from "@mui/material/Box";
import Slot from "./Slot";
import ExtendedCard from "../types/extended-card";

interface FirstSlotsProps {
    leaderCard?: ExtendedCard;
    unitsInPlay: ExtendedCard[];
    cardsInGraveyard: ExtendedCard[];
}

export default function FirstSlots({
    leaderCard,
    unitsInPlay = [],
    cardsInGraveyard = [],
}: FirstSlotsProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <Slot slotName="Leader" type="Leader" card={leaderCard}></Slot>
            <Slot
                slotName="Unit Slot 1"
                type="Unit"
                card={unitsInPlay[0]}
            ></Slot>
            <Slot
                slotName="Unit Slot 2"
                type="Unit"
                card={unitsInPlay[1]}
            ></Slot>
            <Slot
                slotName="Unit Slot 3"
                type="Unit"
                card={unitsInPlay[2]}
            ></Slot>
            <Slot
                slotName="Unit Slot 4"
                type="Unit"
                card={unitsInPlay[3]}
            ></Slot>
            <Slot
                slotName="Unit Slot 5"
                type="Unit"
                card={unitsInPlay[4]}
            ></Slot>
            <Slot
                slotName="Unit Slot 6"
                type="Unit"
                card={unitsInPlay[5]}
            ></Slot>
            <Slot
                slotName="Graveyard"
                type="Graveyard"
                cards={cardsInGraveyard}
            ></Slot>
        </Box>
    );
}
