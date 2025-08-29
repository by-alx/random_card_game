import Box from "@mui/material/Box";
import { getSupporters } from "../data/cards";
import SupporterBox from "./SupporterBox";
import { useAtom } from "jotai";
import {
    drawCounterAtom,
    killCounterAtom,
    reviveCounterAtom,
} from "../data/atoms";
import { useCallback } from "react";

export default function SupportSlotContent() {
    const reviveCounter = useAtom(reviveCounterAtom);
    const killCounter = useAtom(killCounterAtom);
    const drawCounter = useAtom(drawCounterAtom);

    const supporters = getSupporters();
    const getAtoms = useCallback(() => {
        return [reviveCounter, killCounter, drawCounter];
    }, [reviveCounter, killCounter, drawCounter]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            {supporters.map((supporter, index) => (
                <SupporterBox
                    key={supporter.name}
                    counter={getAtoms()[index][0]}
                    setCounter={getAtoms()[index][1]}
                    supporter={supporter}
                />
            ))}
        </Box>
    );
}
