import Box from "@mui/material/Box";
import Counter from "./Counter";
import Slot from "./Slot";
import { cards } from "../data/cards";
import GameCard from "./GameCard";

interface BoardSideProps {
    side: "top" | "bottom";
}

export default function BoardSide({ side }: BoardSideProps) {
    const cardsData = cards;

    const statChanges = {
        attack: 0,
        defense: 0,
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: side === "top" ? "column-reverse" : "column",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <Counter
                    key="hp_counter"
                    name={"HP"}
                    startingValue={20}
                ></Counter>
                <Slot slotName="Leader" type="Leader"></Slot>
                <Slot slotName="Unit Slot 1" type="Unit"></Slot>
                <Slot slotName="Unit Slot 2" type="Unit"></Slot>
                <Slot slotName="Unit Slot 3" type="Unit"></Slot>
                <Slot slotName="Unit Slot 4" type="Unit"></Slot>
                <Slot slotName="Unit Slot 5" type="Unit"></Slot>
                <Slot slotName="Unit Slot 6" type="Unit"></Slot>
                <Slot slotName="Graveyard" type="Graveyard"></Slot>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Counter
                    key="resource_counter"
                    name={"Body Pts"}
                    startingValue={0}
                ></Counter>
                <Slot slotName="Supporter" type="Supporter"></Slot>
                <Slot slotName="Effect Slot 1" type="Spell"></Slot>
                <Slot slotName="Effect Slot 2" type="Spell"></Slot>
                <Slot slotName="Effect Slot 3" type="Spell"></Slot>
                <Slot slotName="Effect Slot 4" type="Spell"></Slot>
                <Slot slotName="Revive Slot 1" type="Revive"></Slot>
                <Slot slotName="Revive Slot 2" type="Revive"></Slot>
                <Slot slotName="Deck" type="Deck"></Slot>
            </Box>

            <Box>
                <GameCard card={cardsData[0]} />
            </Box>
        </Box>
    );
}
