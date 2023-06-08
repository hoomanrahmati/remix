import { useEffect, useState } from "react";

let mediaRecorder: MediaRecorder;
interface IProps {
    filetype?: string;
    onPush?: (val: Blob) => void;
    onRecord?: (blob: Blob) => Promise<string | undefined>;
}

export enum STEP {
    notStarted = "notStarted",
    recording = "recording",
    uploading = "uploading",
    uploaded = "uploaded",
    error = "error",
}
export default function useSound(props?: IProps) {
    const { filetype = 'audio/webm', onPush = null, onRecord = null } = props || {};
    const [step, setStep] = useState<STEP>(STEP.notStarted);
    const [inprogress, setInprogress] = useState(false);
    const [blob, setBlob] = useState<Blob>();
    const [data, setData] = useState<string>();
    const [error, setError] = useState<Error>();

    const start = () => {
        setInprogress(true);
        setBlob(undefined);
        setData(undefined);
        setStep(STEP.recording);
        const recordedChunks: Blob[] = [];

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                const options = {
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 2500000,
                    // mimeType: "audio/wav",
                };
                mediaRecorder = new MediaRecorder(stream, options);
                // Store recorded audio data
                mediaRecorder.addEventListener('dataavailable', function (e) {
                    if (e.data.size > 0) {
                        recordedChunks.push(e.data);
                        onPush?.(e.data);
                    }
                });

                // Stop recording when mediaRecorder is 'inactive'
                mediaRecorder.addEventListener('stop', function () {
                    const blob = new Blob(recordedChunks, { type: filetype });
                    setBlob(blob);
                    if (blob) onRecord?.(blob).then(res => {
                        console.log("res:", res);
                        if (res === "success") {
                            setStep(STEP.uploaded);
                        } else {
                            console.error(res);
                            setStep(STEP.error);
                        }
                    });
                    setData(URL.createObjectURL(blob));
                    setInprogress(false);
                });

                // Start recording
                mediaRecorder.start();
            })
            .catch(function (err) {
                console.error('Error accessing microphone:', err);
                setError(err);
            });
    }

    const stop = () => {
        setStep(STEP.uploading);
        mediaRecorder.stop();
        setInprogress(false);
    }

    const reset = () => {
        setStep(STEP.notStarted);
        setBlob(undefined);
        setData(undefined);
        setInprogress(false);
    }

    const download = (filename = "my-audio-file") => {

    }

    const beforeFileUpload = (file: File) => {
        setStep(STEP.uploading);
        setInprogress(false);
        setData(URL.createObjectURL(file));
    }

    const afterFileUpload = (error?: Error) => {
        if (error) {
            setStep(STEP.error);
            // setStep(STEP.uploaded); // just for test
        } else {
            setStep(STEP.uploaded);
        }
    }

    return {
        step,
        error,
        inprogress,
        blob,
        beforeFileUpload,
        afterFileUpload,
        onPush,
        start,
        stop,
        reset,
        download,
        data,
    }
}