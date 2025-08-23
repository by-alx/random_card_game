import Paper from "@mui/material/Paper";
import { useAtomValue } from "jotai";
import { roundAtom } from "../data/atoms";
import { Box, Typography } from "@mui/material";

export default function Log() {
    const round = useAtomValue(roundAtom);

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: 1,
                backgroundColor: "rgba(0,0,0,0.75)",
                color: "#fff",
                maxHeight: "299px",
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Round: {round.count}
            </Typography>
            <Box sx={{ overflow: "auto", whiteSpace: "preserve" }}>
                <Typography variant="caption">
                    {round.log.join("\n")}
                </Typography>
            </Box>
        </Paper>
    );
}
