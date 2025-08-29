import Box from "@mui/material/Box";
import Slot from "./Slot";
import ExtendedCard from "../types/extended-card";

interface SecondSlotsProps {
    spellsInPlay: ExtendedCard[];
    cardsInRevive: ExtendedCard[];
    cardsInGraveyard: ExtendedCard[];
    cardsInExile: ExtendedCard[];
}

export default function SecondSlots({
    spellsInPlay,
    cardsInRevive,
    cardsInGraveyard,
    cardsInExile,
}: SecondSlotsProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <Slot slotName="Supporter" isSupportSlot></Slot>
            <Slot slotName="Spell Slot 1" card={spellsInPlay[0]}></Slot>
            <Slot slotName="Spell Slot 2" card={spellsInPlay[1]}></Slot>
            <Slot slotName="Spell Slot 3" card={spellsInPlay[2]}></Slot>
            <Slot slotName="Spell Slot 4" card={spellsInPlay[3]}></Slot>
            <Slot slotName="Revive Slot" card={cardsInRevive[0]}></Slot>
            <Slot slotName="Graveyard" cards={cardsInGraveyard}></Slot>
            <Slot slotName="Exile" cards={cardsInExile}></Slot>
        </Box>
    );
}
