import Box from "@mui/material/Box";
import "./App.css";
import BoardSide from "./components/BoardSide";

export default function App() {
    return (
        <Box
            sx={{
                p: 2,
                backgroundColor: "lightgray",
                height: "calc(100% - 32px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            {/*
            <BoardSide side="top" />
            <Box
                sx={{ height: "10px", width: "100%", backgroundColor: "red" }}
            ></Box>   
          */}

            <BoardSide side="bottom" />
        </Box>
    );
}
