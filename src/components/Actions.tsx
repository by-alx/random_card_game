import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useState } from "react";
import {
    cardsAtom,
    cardsInDeckAtom,
    cardsInExileAtom,
    cardsInGraveyardAtom,
    cardsInHandAtom,
    cardsInPlayAtom,
    cardsInReviveAtom,
    drawCounterAtom,
    playerResourceAtom,
    roundAtom,
} from "../data/atoms";
import { getRandomIndices } from "../utility/helpers";
import { getCardByName } from "../data/cards";
import Modal from "@mui/material/Modal";

export default function Actions() {
    const cardsInHand = useAtomValue(cardsInHandAtom);
    const cardsInDeck = useAtomValue(cardsInDeckAtom);
    const cardsInGraveyard = useAtomValue(cardsInGraveyardAtom);
    const cardsInPlay = useAtomValue(cardsInPlayAtom);
    const cardsInRevive = useAtomValue(cardsInReviveAtom);
    const cardsInExile = useAtomValue(cardsInExileAtom);
    const [cards, setCards] = useAtom(cardsAtom);
    const [round, setRound] = useAtom(roundAtom);
    const [drawCounter, setDrawCounter] = useAtom(drawCounterAtom);
    const [playerResource, setPlayerResource] = useAtom(playerResourceAtom);

    const [openRules, setOpenRules] = useState(false);
    const handleOpenRules = () => setOpenRules(true);
    const handleCloseRules = () => setOpenRules(false);

    const drawCards = useCallback(
        (amount: number) => {
            const randomIndices = getRandomIndices(cardsInDeck.length, amount);
            const randomCardIndices = cardsInDeck
                .filter((_card, index) => randomIndices.includes(index))
                .map((card) => card.index);

            const updatedCards = cards.map((card) => {
                if (randomCardIndices.includes(card.index)) {
                    // update the corresponding card
                    return {
                        ...card,
                        inDeck: false,
                        inHand: true,
                    };
                } else {
                    // The rest is unchanged
                    return card;
                }
            });
            setCards(updatedCards);
        },
        [cardsInDeck]
    );

    const startGame = useCallback(() => {
        drawCards(5);
        setPlayerResource(1);
        setRound({ count: 1, isRunning: true, log: ["Game Start"] });
    }, [drawCards, setPlayerResource, setRound]);

    const startRound = useCallback(() => {
        if (cardsInHand.length < 4) {
            drawCards(2);
            setDrawCounter(drawCounter + 2);
        } else {
            drawCards(1);
            setDrawCounter(drawCounter + 1);
        }

        setPlayerResource(playerResource + 1);

        const newRound = round.count + 1;
        setRound({
            count: newRound,
            isRunning: true,
            log: [...round.log, `Round ${newRound} start`],
        });
    }, [
        cardsInHand,
        drawCards,
        setRound,
        round,
        setPlayerResource,
        playerResource,
        setDrawCounter,
        drawCounter,
    ]);

    const endRound = useCallback(() => {
        setRound({
            count: round.count,
            isRunning: false,
            log: [...round.log, `Round ${round.count} end`],
        });
    }, [setRound, round]);

    const addTorso = useCallback(() => {
        const newCard = getCardByName("Explosive Torso");

        if (newCard) {
            const extendedCards = [
                ...cards,
                {
                    ...newCard,
                    index: cards.length,
                    inDeck: true,
                    inGraveyard: false,
                    inHand: false,
                    inPlay: false,
                    inExile: false,
                    inRevive: false,
                },
            ];

            setCards(extendedCards);
        }
    }, [getCardByName, setCards, cards]);

    const onDraw = useCallback(() => {
        drawCards(1);
        setDrawCounter(drawCounter + 1);
    }, [drawCards, setDrawCounter, drawCounter]);

    return (
        <Paper sx={{ padding: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {round.count === 0 ? (
                    <Button variant="contained" onClick={startGame}>
                        Start
                    </Button>
                ) : round.isRunning ? (
                    <Button variant="contained" onClick={endRound}>
                        End Round
                    </Button>
                ) : (
                    <Button variant="contained" onClick={startRound}>
                        Next Round
                    </Button>
                )}
                <Button variant="contained" onClick={onDraw}>
                    Draw
                </Button>
                <Button variant="contained" onClick={addTorso}>
                    Add Torso
                </Button>
                <Button variant="contained" onClick={handleOpenRules}>
                    Rules
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        console.log("cards", cards);
                        console.log("cardsInDeck", cardsInDeck);
                        console.log("cardsInHand", cardsInHand);
                        console.log("cardsInGraveyard", cardsInGraveyard);
                        console.log("cardsInPlay", cardsInPlay);
                        console.log("cardsInRevive", cardsInRevive);
                        console.log("cardsInExile", cardsInExile);
                    }}
                >
                    Debug
                </Button>
            </Box>

            <Modal open={openRules} onClose={handleCloseRules}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h3>Rules (probably incomplete)</h3>
                    <ul>
                        <li>
                            Card draw: On game start draw 5 cards, on round
                            start draw 2 cards when you have less then 4 cards
                            in hand, otherwise draw 1 card.
                        </li>
                        <li>
                            Each round you can play up to two cards from your
                            hand, sacrificing a card also counts as playing.
                        </li>
                        <li>
                            Resource body parts: At the beginning of each round
                            the player gains one body part. Some cards cost body
                            parts to play. When killing an enemy unit in combat
                            with one of your units or when an own unit dies,
                            generate one body part.
                        </li>
                        <li>
                            Units must be attacked first, only when there are no
                            units the leader can be attacked. Supporters, Spells
                            or cards on the revive slot can not be attacked.
                        </li>
                        <li>
                            Zombies with costs of 3 and lower can be revived
                            from graveyard. When a unit is revived it is placed
                            on the revive slot. In the next round it is placed
                            on the board.
                        </li>
                        <li>
                            A unit can not attack in the same round it has been
                            played or revived (unless it has the keyword
                            "Rush").
                        </li>
                        <li>
                            Each time a unit dies it body part costs increases
                            by one.
                        </li>
                        <li>
                            Instead of playing a card from hand you can also
                            sacrifice one card per round. In this case the card
                            is moved into the graveyard and half the units costs
                            (rounded up) + 1 can be added as resources. So 0
                            cost = 1 body part, 1 cost = 2 body parts, 2 costs =
                            2 body parts, 3 costs = 3 body parts, 4 costs = 3
                            body parts, ....
                        </li>
                        <li>
                            Supporters are leveled up by performing specific
                            tasks, each level up gives more advantages.
                        </li>
                    </ul>
                </Box>
            </Modal>
        </Paper>
    );
}
