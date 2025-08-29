import Box from "@mui/material/Box";
import { useCallback } from "react";
import Supporter from "../types/supporter";
import Counter from "./Counter";
import HelpIcon from "@mui/icons-material/Help";
import { Tooltip } from "@mui/material";

interface SupporterBoxProps {
    counter: number;
    setCounter: (value: number) => void;
    supporter: Supporter;
}

export default function SupporterBox({
    counter,
    setCounter,
    supporter,
}: SupporterBoxProps) {
    const getLevelThreshold = useCallback(
        (level: number) => {
            switch (level) {
                case 0:
                    return supporter.level_0_counter;

                case 1:
                    return (
                        supporter.level_0_counter + supporter.level_1_counter
                    );

                default:
                    // level 2
                    return (
                        supporter.level_0_counter +
                        supporter.level_1_counter +
                        supporter.level_2_counter
                    );
            }
        },
        [supporter]
    );

    let currentLevel = 3;

    if (counter < getLevelThreshold(0)) {
        currentLevel = 0;
    } else if (counter < getLevelThreshold(1)) {
        currentLevel = 1;
    } else if (counter < getLevelThreshold(2)) {
        currentLevel = 2;
    }

    let tooltip: string = supporter.level_3_text;
    let backgroundColor: string = "darkgreen";
    let color: string = "#fff";

    switch (currentLevel) {
        case 0:
            tooltip = supporter.level_0_text;
            backgroundColor = "#fff";
            color = "#000";
            break;

        case 1:
            tooltip = supporter.level_1_text;
            backgroundColor = "lightgreen";
            color = "#000";
            break;

        case 2:
            tooltip = supporter.level_2_text;
            backgroundColor = "green";
            break;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexGrow: 1,
                borderBottom: "1px solid grey",
                backgroundColor,
                color,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                {supporter.name}
                <Tooltip title={tooltip}>
                    <HelpIcon fontSize="small"></HelpIcon>
                </Tooltip>
            </Box>
            <Counter counter={counter} setCounter={setCounter} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                (lvl. {currentLevel}): {counter} /{" "}
                {getLevelThreshold(currentLevel)}
            </Box>
        </Box>
    );
}
