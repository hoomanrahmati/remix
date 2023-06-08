import { Grid } from "@mui/material";
import SoundRecorderWrapper from "./SoundRecorderWrapper";
import Header from "./components/Header";
import Source from "./Source";
// import Source from "./Source2";
import Output from "./Output";

export default function SoundRecorder() {

    return (
        <SoundRecorderWrapper container columnSpacing={2} rowSpacing={5}>
            <Grid item xs={12} >
                <Header />
            </Grid>
            <Grid item xs={12} md={6} >
                <Source />
            </Grid>
            <Grid item xs={12} md={6}>
                <Output />
            </Grid>
        </SoundRecorderWrapper>
    )
}