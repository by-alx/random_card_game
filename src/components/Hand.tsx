import Box from "@mui/material/Box";
import GameCard from "./GameCard";
import ExtendedCard from "../types/extended-card";

interface HandProps {
    cards: ExtendedCard[];
}

export default function Hand({ cards }: HandProps) {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {cards.map((card, index) => (
                <GameCard key={card.name + index} card={card} />
            ))}
        </Box>
    );
}
