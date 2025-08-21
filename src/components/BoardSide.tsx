import Box from "@mui/material/Box";
import Counter from "./Counter";
import Slot from "./Slot";
import { getCards } from "../data/cards";
import Actions from "./Actions";
import Hand from "./Hand";
import Card from "../types/card";
import { useCallback, useEffect } from "react";
import ExtendedCard from "../types/extended-card";
import { atom, useAtom, useAtomValue } from "jotai";
import {
    cardsInDeckAtom,
    cardsInGraveyardAtom,
    cardsInHandAtom,
} from "../data/atoms";

interface BoardSideProps {
    side: "top" | "bottom";
}

export default function BoardSide({ side }: BoardSideProps) {
    const cardsInHand = useAtomValue(cardsInHandAtom);
    const cardsInDeck = useAtomValue(cardsInDeckAtom);
    const cardsInGraveyard = useAtomValue(cardsInGraveyardAtom);

    /*const drawCards = useCallback((amount: number) => {
        for (let index = 0; index < amount; index++) {
            const randomIndex = Math.floor(Math.random() * cardsInDeck.length);
            const card = cardsInDeck[randomIndex];
            card.inDeck = false;
            card.inHand = true;
        }
    }, []);

    useEffect(() => {
        console.log(drawCards(5));
    }, []);*/

    const statChanges = {
        attack: 0,
        defense: 0,
        costs: 0,
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
                <Slot
                    slotName="Graveyard"
                    type="Graveyard"
                    cards={cardsInGraveyard}
                ></Slot>
                <Actions></Actions>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Counter
                    key="resource_counter"
                    name={"Body Parts"}
                    startingValue={0}
                ></Counter>
                <Slot slotName="Supporter" type="Supporter"></Slot>
                <Slot slotName="Effect Slot 1" type="Spell"></Slot>
                <Slot slotName="Effect Slot 2" type="Spell"></Slot>
                <Slot slotName="Effect Slot 3" type="Spell"></Slot>
                <Slot slotName="Effect Slot 4" type="Spell"></Slot>
                <Slot slotName="Revive Slot 1" type="Revive"></Slot>
                <Slot slotName="Revive Slot 2" type="Revive"></Slot>
                <Slot slotName="Deck" type="Deck" cards={cardsInDeck}></Slot>
                <Actions></Actions>
            </Box>

            <Hand cards={cardsInHand} />
        </Box>
    );
}
