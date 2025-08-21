import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import { useState } from "react";

interface CounterProps {
    name: string;
    startingValue: number;
}

export default function Counter({ name, startingValue }: CounterProps) {
    const [counter, setCounter] = useState(startingValue);

    const increment = () => setCounter((prevCount) => prevCount + 1);
    const decrement = () => setCounter((prevCount) => prevCount - 1);

    return (
        <Paper
            sx={{
                padding: 1,
                width: "100px",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box>
                    <Box sx={{ textAlign: "center" }}>{name}</Box>
                    <Box sx={{ textAlign: "center" }}>{counter}</Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <ButtonGroup variant="contained">
                        <Button onClick={decrement}>-</Button>
                        <Button onClick={increment}>+</Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </Paper>
    );
}
