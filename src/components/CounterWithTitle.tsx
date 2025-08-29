import Box from "@mui/material/Box";
import Counter from "./Counter";

interface CounterWithTitleProps {
    name: string;
    counter: number;
    setCounter: (num: number) => void;
}

export default function CounterWithTitle({
    name,
    counter,
    setCounter,
}: CounterWithTitleProps) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
                <Box sx={{ textAlign: "center" }}>{name}</Box>
                <Box sx={{ textAlign: "center" }}>{counter}</Box>
            </Box>
            <Counter counter={counter} setCounter={setCounter} />
        </Box>
    );
}
