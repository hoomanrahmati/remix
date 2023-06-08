import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import { Theme } from "@mui/material";


const SoundRecorderWrapper = styled(Grid)`
    @keyframes blink-record-button {
        from {
        color: ${(props: any) => props.theme.palette.secondary.light};
        }
    
        to {
        color: ${(props: any) => props.theme.palette.secondary.dark};
        }
    }
    @keyframes blink-upload-button {
        from {
            color: ${(props: any) => props.theme.palette.primary.light};
            
        }
    
        to {
            color: ${(props: any) => props.theme.palette.primary.dark};
            transform:rotate(360deg);
        }
    }
    & .uploadfile{
        width:100%;
        height:100%;
        position:relative;
        & .uploadfile-input{
            position:absolute;
            width:100%;
            height: 100%;
            top:0;
            left:0;
            visibility:hidden;
            &::before{
                content:"";
                visibility:visible;
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height: 100%;
                cursor: pointer;
            }
        }
    }
    & .LibraryMusicIcon{
        width:100%;
    }
    & .LibraryMusic-PendingIcon{
        width: 100%;
        animation: blink-upload-button 2s infinite;
    }
    & .or-divider{
        text-align:center;
        width: 100%;
        position:relative;
        &::before{
            content:"";
            position:absolute;
            top:50%;
            left:0;
            width:100%;
            height: 2px;
            z-index:-1;
            background: ${(props: any) => props.theme.palette.primary.main}
        }
        & .MuiTypography-root{
            display:inline-block;
            width: ${(props: any) => props.theme.spacing(6)};
            background: ${(props: any) => props.theme.palette.background.default};
        }

    }
    & .start-recording{
        &.MuiButtonBase-root{
            padding-top: ${(props: any) => props.theme.spacing(1.5)};
            padding-bottom: ${(props: any) => props.theme.spacing(1.5)};
            & .stop-recording{
                animation: blink-record-button 2s infinite;
            }
        }
        & .MuiCircularProgress-root{
            width:27px;
            height:27px;
        }
    }

    & audio {
        margin-top: ${(props: any) => props.theme.spacing(2)};
        width:100%;
        position:relative;
        color:blue;
    }

    & .artist-list{
        & .MuiOutlinedInput-notchedOutline{
            border-color: ${(props: any) => props.theme.palette.primary.light};
            border-radius: ${(props: any) => props.theme.spacing(1)};
        }
    }
    & .pitch-box{
        border-radius: ${(props: any) => props.theme.spacing(1)};
        border:1px solid ${(props: any) => props.theme.palette.primary.light};
    }
    & .remix-btn{
        // padding-top: ${(props: any) => props.theme.spacing(1.5)};
        // padding-bottom: ${(props: any) => props.theme.spacing(1.5)};
        background: linear-gradient(to left, #b638bf 0%, #e8757c 100%);
        color: white;
        
        &.MuiButtonBase-root{
            padding-top: ${(props: any) => props.theme.spacing(1.5)};
            padding-bottom: ${(props: any) => props.theme.spacing(1.5)};
            & .MuiCircularProgress-root{
                width:  ${(props: any) => props.theme.spacing(2.5)} !important; 
                height: ${(props: any) => props.theme.spacing(2.5)} !important;
            }
            & .stop-rimixing{
                color:white;
                width: ${(props: any) => props.theme.spacing(1.25)};
                height: m: ${(props: any) => props.theme.spacing(1.25)};
            }
        }
    }
`;

export default SoundRecorderWrapper;