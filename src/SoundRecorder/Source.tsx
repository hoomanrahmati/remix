import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import useSound, { STEP } from "./components/useSound";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function Source() {
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) {
            const files = e.target.files;
            beforeFileUpload(files[0]);
            const formData = new FormData();
            formData.append("voice", files[0]);
            try {
                const res = await fetch('/upload/voice', { method: "POST", body: formData });
                if (res.statusText !== "OK") {
                    afterFileUpload(new Error("error?????????"));
                    return;
                }
                const data = res.json();
                afterFileUpload();
            } catch (err) {
                // return err.message;
                // return "success";
                console.log("here!!!!!!!!");
                afterFileUpload(err as Error);
            }
        } else {
            console.error("uploading file:", e.target.files);
        }
    }

    const handleUploadRecordedVoice = async (blob: Blob) => {
        console.log("uploading2:", blob);
        let formData;
        try {
            if (blob) {
                console.log("blob is not null")
                formData = new FormData();
                formData.append("voice", blob);
                const res = await fetch('/upload/voice', { method: "POST", body: formData });
                if (res.statusText !== "OK") {
                    return "success"; // just for test
                    return "error";
                }
                const data = res.json();
                return "success";
            }
        } catch (err: any) {
            console.log("here!!!!!!!!");
            return "error";
        }
    }

    const { start, stop, reset, inprogress, data, blob, step, beforeFileUpload, afterFileUpload } = useSound({ onRecord: handleUploadRecordedVoice });
    useEffect(() => {
        console.log("step:", step.toString());
    }, [step]);
    return (
        <Grid item xs={12}>
            <Typography variant="h4" fontWeight={600} sx={{ display: { xs: "none", md: "block" } }}>
                Source
            </Typography>
            <Box className="uploadfile" marginTop={2} sx={{ padding: { xs: 2, md: 4 }, borderRadius: 4, borderStyle: "dashed", borderWidth: 4, textAlign: "center", userSelect: "none" }} >
                <form method="post" encType="multipart/form-data">
                    <input onChange={handleFileUpload} type="file" accept="audio/mp3,audio/wav" name="uploadfile" className="uploadfile-input" />
                </form>
                {(step === STEP.notStarted || step === STEP.recording) && <>
                    <LibraryMusicIcon fontSize="medium" className="LibraryMusicIcon" />
                    <Typography variant="h6" fontWeight={600} marginTop={3}>
                        Select Audio File
                    </Typography>
                    <Typography variant="body2" marginTop={1.5}>
                        or drag and drop mp3/wav file here. 15MB Limit
                    </Typography>
                </>}
                {
                    step === STEP.uploading && <>
                        <RotateRightIcon fontSize="medium" className="LibraryMusic-PendingIcon" />
                        <Typography variant="h6" fontWeight={600} marginTop={3}>
                            Uploading
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} marginTop={1.5}>
                            <Typography variant="body2">
                                please wait to uploading finishes
                            </Typography>&nbsp;
                            <MuiLink onClick={reset} variant="body2" component="button" >or cancel it</MuiLink>
                        </Box>
                    </>
                }
                {
                    step === STEP.uploaded && <>
                        <CheckCircleIcon fontSize="medium" className="LibraryMusicIcon" />
                        <Typography variant="h6" fontWeight={600} marginTop={3}>
                            File uploaded successfully
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} marginTop={1.5}>
                            <Typography variant="body2">
                                Please select an Artist
                            </Typography>&nbsp;
                            <MuiLink onClick={reset} variant="body2" component="button" >or try agian</MuiLink>
                        </Box>
                    </>
                }
                {
                    step === STEP.error && <>
                        <ErrorIcon fontSize="medium" className="LibraryMusicIcon" color="error" />
                        <Typography variant="h6" fontWeight={600} marginTop={3}>
                            Please try again
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} marginTop={1.5}>
                            <Typography variant="body2">
                                Some errors happend,
                            </Typography>&nbsp;
                            <MuiLink onClick={reset} variant="body2" component="button" >please try again!</MuiLink>
                        </Box>
                    </>
                }
            </Box>
            <Box className="or-divider" marginTop={2}>
                <Typography variant="body1" textAlign="center">
                    or
                </Typography>
            </Box>
            {step === STEP.notStarted && <Button onClick={start} variant="contained" fullWidth size="large" sx={{ marginTop: 2 }} className="start-recording" endIcon={<RadioButtonUncheckedIcon />}>
                Start Recording
            </Button>}
            {step === STEP.recording && <Button onClick={stop} variant="contained" fullWidth size="large" sx={{ marginTop: 2 }} className="start-recording" endIcon={<RadioButtonCheckedIcon className="stop-recording" />}>
                Stop Recording
            </Button>}
            {(step === STEP.uploading || step === STEP.uploaded) && <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <audio src={data} controls></audio>
            </Box>}
            {step === STEP.error && <Button onClick={reset} variant="contained" color="error" fullWidth size="large" sx={{ marginTop: 2 }} className="start-recording" endIcon={<RadioButtonUncheckedIcon />}>
                Try agian!
            </Button>}
            <Typography variant="subtitle1" fontWeight={600} textAlign="center" marginTop={2} sx={{ fontSize: 16, lineHeight: 3 }}>
                Make sure your song doesn't include any instrumentals 🥁
            </Typography>
        </Grid >
    )
}