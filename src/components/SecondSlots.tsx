import Box from "@mui/material/Box";
import Slot from "./Slot";
import ExtendedCard from "../types/extended-card";
import { useAtomValue } from "jotai";
import { supporterIndexAtom } from "../data/atoms";

interface SecondSlotsProps {
    supportersInPlay: ExtendedCard[];
    spellsInPlay: ExtendedCard[];
    cardsInRevive: ExtendedCard[];
    cardsInDeck: ExtendedCard[];
}

export default function SecondSlots({
    supportersInPlay,
    spellsInPlay,
    cardsInRevive,
    cardsInDeck,
}: SecondSlotsProps) {
    const supporterIndex = useAtomValue(supporterIndexAtom);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <Slot
                slotName="Supporter"
                type="Supporter"
                card={supportersInPlay[supporterIndex]}
                cards={supportersInPlay}
            ></Slot>
            <Slot
                slotName="Spell Slot 1"
                type="Spell"
                card={spellsInPlay[0]}
            ></Slot>
            <Slot
                slotName="Spell Slot 2"
                type="Spell"
                card={spellsInPlay[1]}
            ></Slot>
            <Slot
                slotName="Spell Slot 3"
                type="Spell"
                card={spellsInPlay[2]}
            ></Slot>
            <Slot
                slotName="Spell Slot 4"
                type="Spell"
                card={spellsInPlay[3]}
            ></Slot>
            <Slot
                slotName="Revive Slot 1"
                type="Revive"
                card={cardsInRevive[0]}
            ></Slot>
            <Slot
                slotName="Revive Slot 2"
                type="Revive"
                card={cardsInRevive[1]}
            ></Slot>
            <Slot slotName="Deck" type="Deck" cards={cardsInDeck}></Slot>
        </Box>
    );
}
