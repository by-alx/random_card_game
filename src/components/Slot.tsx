import Paper from "@mui/material/Paper";
import Card from "../types/card";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface SlotProps {
    slotName: string;
    type:
        | "Leader"
        | "Unit"
        | "Graveyard"
        | "Supporter"
        | "Spell"
        | "Revive"
        | "Deck";
    card?: Card;
}

export default function Slot({ slotName, type, card }: SlotProps) {
    const canAdd =
        type === "Revive" ||
        type === "Spell" ||
        type === "Supporter" ||
        type === "Unit";

    const canCheck =
        type === "Deck" || type === "Graveyard" || type === "Supporter";

    return (
        <Paper
            sx={{
                width: "150px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Box sx={{ textAlign: "center" }}>{slotName}</Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                {type === "Leader" && (
                    <IconButton>
                        <LockOpenIcon />
                    </IconButton>
                )}

                {canCheck && (
                    <IconButton>
                        <RemoveRedEyeIcon />
                    </IconButton>
                )}

                {canAdd && (
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                )}
            </Box>
        </Paper>
    );
}
