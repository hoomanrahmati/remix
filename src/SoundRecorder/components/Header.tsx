import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Header() {
    return (
        <Box sx={{ display: "flex" }} paddingRight={{ xs: 2, md: 0 }} paddingLeft={{ xs: 2, md: 0 }}>
            <Typography variant="h3" fontWeight="600" component="h1" sx={{ lineHeight: "52.8px" }} textAlign={{ xs: "center", md: "inherit" }}>
                Create AI Tracks 🎙️
            </Typography>
        </Box>
    )
}