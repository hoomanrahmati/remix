import { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import useOutput, { STEP as OutputStep } from "./useOutput";
import CircularProgress from '@mui/material/CircularProgress';


export default function () {
    const [value, setValue] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [pitchValue, setPitchValue] = useState(0);
    const { handleTooltip, artistList, message, showMessage, step, beforeRemix, afterRemix } = useOutput();



    const handleRemixClick = async () => {
        if (!value) {
            handleTooltip("Please select an artist");
            return;
        }
        if (false) {
            handleTooltip("Please upload an audio file");
            return;
        }
        try {
            beforeRemix();
            const res = await new Promise((res) => setTimeout(() => { res(true) }, 30000));
            // if (res.statusText !== "OK") {
            //     afterRemix(new Error("error?????????"));
            //     return;
            // }
            // afterRemix(await value.json());
            afterRemix();
        } catch (err) {

        }

    }

    return (
        <Grid item xs={12}>
            <Typography marginBottom={2} variant="h4" fontWeight={600} sx={{ display: { xs: "none", md: "block" } }}>
                Output
            </Typography>
            <Autocomplete
                className="artist-list"
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={artistList}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField onChange={(e) => console.log("e:", e.target.value)}  {...params} label="Select an Artist" />}
            />
            <Box marginTop={2} className="pitch-box" padding={2}>
                <Box display="flex">

                    <HelpOutlineIcon /> &nbsp;
                    <Typography variant="body1">
                        Set Pitch
                    </Typography>
                </Box>
                <Slider
                    size="small"
                    min={-12}
                    max={12}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    value={pitchValue}
                    onChange={(_, newValue) => setPitchValue(newValue as number)}
                />
            </Box>
            <ClickAwayListener onClickAway={() => handleTooltip()}>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={() => handleTooltip()}
                    open={showMessage}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={message}
                >
                    <Button onClick={handleRemixClick} variant="contained" className="remix-btn" fullWidth size="large" sx={{ marginTop: 2, pointerEvents: step === OutputStep.remixing ? "none" : "auto" }} endIcon={step === OutputStep.remixing ? <CircularProgress className="stop-rimixing" /> : <RadioButtonUncheckedIcon />}>
                        {step === OutputStep.remixing ? "Please waite" : "Remix"}
                    </Button>
                </Tooltip>
            </ClickAwayListener>
            {step === OutputStep.error && <Typography variant="subtitle1" fontWeight={600} textAlign="center" marginTop={2} sx={{ fontSize: 16, lineHeight: 3 }}>
                Something went wrong, please try reuploading your file 🚧
            </Typography>}
        </Grid>
    )
}