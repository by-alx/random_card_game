import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useState } from "react";
import {
    buffsAtom,
    cardsAtom,
    cardsInDeckAtom,
    cardsInExileAtom,
    cardsInGraveyardAtom,
    cardsInHandAtom,
    cardsInPlayAtom,
    cardsInReviveAtom,
    playerResourceAtom,
    roundAtom,
    supporterIndexAtom,
    supportersInPlayAtom,
} from "../data/atoms";
import { getRandomIndices } from "../utility/helpers";
import { getCardByName } from "../data/cards";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function Actions() {
    const cardsInHand = useAtomValue(cardsInHandAtom);
    const cardsInDeck = useAtomValue(cardsInDeckAtom);
    const cardsInGraveyard = useAtomValue(cardsInGraveyardAtom);
    const cardsInPlay = useAtomValue(cardsInPlayAtom);
    const supportersInPlay = useAtomValue(supportersInPlayAtom);
    const cardsInRevive = useAtomValue(cardsInReviveAtom);
    const cardsInExile = useAtomValue(cardsInExileAtom);
    const [cards, setCards] = useAtom(cardsAtom);
    const [buffs, setBuffs] = useAtom(buffsAtom);
    const [supporterIndex, setSupporterIndex] = useAtom(supporterIndexAtom);
    const [round, setRound] = useAtom(roundAtom);
    const [playerResource, setPlayerResource] = useAtom(playerResourceAtom);

    const [openBuffs, setOpenBuffs] = useState(false);
    const handleOpenBuffs = () => setOpenBuffs(true);
    const handleCloseBuffs = () => setOpenBuffs(false);

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
        setRound({ count: 1, isRunning: true, log: ["Game Start"] });
    }, [drawCards, setRound]);

    const startRound = useCallback(() => {
        drawCards(1);
        setPlayerResource(playerResource + 1);

        const newRound = round.count + 1;
        setRound({
            count: newRound,
            isRunning: true,
            log: [...round.log, `Round ${newRound} start`],
        });
    }, [drawCards, setRound, round]);

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

    const updateBuffs = useCallback(
        (fieldName: string, value: number) => {
            setBuffs({
                ...buffs,
                [fieldName]: value,
            });
        },
        [buffs, setBuffs]
    );

    const changeSupporterOrder = useCallback(() => {
        if (supporterIndex + 1 < supportersInPlay.length) {
            setSupporterIndex(supporterIndex + 1);
        } else {
            setSupporterIndex(0);
        }
    }, [setSupporterIndex, supporterIndex, supportersInPlay]);

    let buffCounter = 0;

    if (buffs.attack !== 0) {
        buffCounter++;
    }

    if (buffs.defense !== 0) {
        buffCounter++;
    }

    if (buffs.cost !== 0) {
        buffCounter++;
    }

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
                <Button variant="contained" onClick={() => drawCards(1)}>
                    Draw
                </Button>
                <Button variant="contained" onClick={addTorso}>
                    Add Torso
                </Button>
                <Button variant="contained" onClick={handleOpenBuffs}>
                    Buffs {buffCounter > 0 ? `(${buffCounter})` : null}
                </Button>
                <Button variant="contained" onClick={changeSupporterOrder}>
                    Swap Supporter
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

            <Modal open={openBuffs} onClose={handleCloseBuffs}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            label="ATK"
                            variant="filled"
                            value={buffs.attack}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                updateBuffs(
                                    "attack",
                                    Number(event.target.value) ?? 0
                                );
                            }}
                        />
                        <TextField
                            label="HP"
                            variant="filled"
                            value={buffs.defense}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                updateBuffs(
                                    "defense",
                                    Number(event.target.value) ?? 0
                                );
                            }}
                        />
                        <TextField
                            label="Cost"
                            variant="filled"
                            value={buffs.cost}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                updateBuffs(
                                    "cost",
                                    Number(event.target.value) ?? 0
                                );
                            }}
                        />
                    </Box>
                </Box>
            </Modal>

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
                            Resource body parts: At the beginning of each round
                            (after the first) the player gains one body part.
                            Some cards cost body parts to play. When killing an
                            enemy unit or when an own unit dies, generate one
                            body part.
                        </li>
                        <li>
                            Units must be attacked first, only when there are no
                            units the leader can be attacked. Supporters can not
                            be attacked.
                        </li>
                        <li>
                            Zombies can be revived from graveyard. When a unit
                            is revived it is placed on the revive-slot. In the
                            next round it is placed on the board.
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
                            Supporters can be stacked. Only the top supporter
                            can be active, all others are inactive.
                        </li>
                    </ul>
                </Box>
            </Modal>
        </Paper>
    );
}
