import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "../types/card";

interface GameCardProps {
    card: Card;
}

export default function GameCard({ card }: GameCardProps) {
    let backgroundColor = "";

    switch (card.type) {
        case "Spell":
            backgroundColor = "lightblue";
            break;

        case "Unit":
            backgroundColor = "lightslategray";
            break;

        case "Supporter":
            backgroundColor = "lightgreen";
            break;

        case "Boss":
            backgroundColor = "lightpink";
            break;
    }

    return (
        <Paper
            sx={{
                width: "150px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 1,
                boxSizing: "border-box",
                backgroundColor,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ fontWeight: "bold" }}>{card.name}</Box>
                {card.cost.join(", ")}
            </Box>
            <Box sx={{ textAlign: "center" }}>{card.description}</Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>{card.attack}</Box>
                {card.tags.join(", ")}
                <Box>{card.defense}</Box>
            </Box>
        </Paper>
    );
}
