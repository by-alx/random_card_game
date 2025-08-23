import Box from "@mui/material/Box";
import Counter from "./Counter";
import Actions from "./Actions";
import Hand from "./Hand";
import { useAtom, useAtomValue } from "jotai";
import {
    cardsAtom,
    cardsInDeckAtom,
    cardsInGraveyardAtom,
    cardsInHandAtom,
    cardsInPlayAtom,
    cardsInReviveAtom,
    playerHpAtom,
    playerResourceAtom,
    spellsInPlayAtom,
    supportersInPlayAtom,
    unitsInPlayAtom,
} from "../data/atoms";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { getCardByName } from "../data/cards";
import { useEffect } from "react";
import ExtendedCard from "../types/extended-card";
import FirstSlots from "./FirstSlots";
import SecondSlots from "./SecondSlots";
import Log from "./Log";

interface BoardSideProps {
    side: "top" | "bottom";
}

export default function BoardSide({ side }: BoardSideProps) {
    const cardsInHand = useAtomValue(cardsInHandAtom);
    const cardsInDeck = useAtomValue(cardsInDeckAtom);
    const cardsInGraveyard = useAtomValue(cardsInGraveyardAtom);
    const cardsInPlay = useAtomValue(cardsInPlayAtom);
    const unitsInPlay = useAtomValue(unitsInPlayAtom);
    const supportersInPlay = useAtomValue(supportersInPlayAtom);
    const spellsInPlay = useAtomValue(spellsInPlayAtom);
    const cardsInRevive = useAtomValue(cardsInReviveAtom);
    const [cards, setCards] = useAtom(cardsAtom);
    const [playerHp, setPlayerHp] = useAtom(playerHpAtom);
    const [playerResource, setPlayerResource] = useAtom(playerResourceAtom);

    useEffect(() => {
        if (playerHp <= 0) {
            const leader = cards.find((card) => card.type === "Boss");

            if (leader == null) {
                const leaderCard = getCardByName("Frankenstein's Monster");
                let extendedLeaderCard: ExtendedCard | undefined = undefined;

                if (leaderCard) {
                    extendedLeaderCard = {
                        ...leaderCard,
                        index: cards.length,
                        inDeck: false,
                        inGraveyard: false,
                        inHand: false,
                        inPlay: true,
                        inExile: false,
                        inRevive: false,
                    };

                    const extendedCards = [...cards, extendedLeaderCard];

                    setCards(extendedCards);
                }
            }
        }
    }, [playerHp, getCardByName, cards, setCards]);

    const leaderCard =
        cardsInPlay.find((card) => card.type === "Boss") ?? undefined;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: side === "top" ? "column-reverse" : "column",
                gap: 5,
            }}
        >
            <Grid container spacing={2}>
                <Grid size={1}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            padding: 1,
                            marginBottom: 2,
                        }}
                    >
                        <Counter
                            name={"HP"}
                            counter={playerHp}
                            setCounter={setPlayerHp}
                        ></Counter>
                        <Counter
                            name={"Body Parts"}
                            counter={playerResource}
                            setCounter={setPlayerResource}
                        ></Counter>
                    </Paper>
                    <Log />
                </Grid>
                <Grid size={10}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <FirstSlots
                            leaderCard={leaderCard}
                            unitsInPlay={unitsInPlay}
                            cardsInGraveyard={cardsInGraveyard}
                        />
                        <SecondSlots
                            supportersInPlay={supportersInPlay}
                            spellsInPlay={spellsInPlay}
                            cardsInRevive={cardsInRevive}
                            cardsInDeck={cardsInDeck}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Actions></Actions>
                </Grid>
            </Grid>

            <Hand cards={cardsInHand} />
        </Box>
    );
}
