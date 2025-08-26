import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useCallback } from "react";

interface CounterProps {
    name: string;
    counter: number;
    setCounter: (num: number) => void;
}

export default function Counter({ name, counter, setCounter }: CounterProps) {
    const increment = useCallback(() => {
        setCounter(counter + 1);
    }, [counter, setCounter]);
    const decrement = useCallback(() => {
        setCounter(counter - 1);
    }, [counter, setCounter]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
    );
}
