import { useState } from "react";

export enum STEP {
    notStarted = "notStarted",
    // recording = "recording",
    remixing = "remixing",
    remixed = "remixed",
    error = "error",
}

const useOutput = () => {
    const [step, setStep] = useState<STEP>(STEP.notStarted);
    const [artistList, setArtistList] = useState<string[]>(["Nima", "Amir", "Farzane", "Hamed", "💕Mohamad💕"]);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleTooltip = (message = "") => {
        if (message) {
            setMessage(message);
            setShowMessage(true);
        } else {
            setMessage("");
            setShowMessage(false);
        }
    }

    const beforeRemix = () => {
        setStep(STEP.remixing);
    }

    const afterRemix = (err?: Error, file?: File) => {
        if (err) {
            setStep(STEP.error);
            return;
        }
        setStep(STEP.remixed);
        // setFile
    }

    return {
        handleTooltip,
        artistList,
        message,
        showMessage,
        step,
        beforeRemix,
        afterRemix
    }

}

export default useOutput;