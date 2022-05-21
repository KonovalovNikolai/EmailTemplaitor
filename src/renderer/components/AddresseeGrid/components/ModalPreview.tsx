import { Modal, Typography, Divider, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import { ReactNode } from "react";

interface ModalPreviewProps {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
}

export const ModalPreview = ({ isOpen, onClose, children }: ModalPreviewProps) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <ModalPreviewBox elevation={3}>
                <Typography variant="h6">Предпросмотр</Typography>
                <Divider />
                <Typography className="TypographyPreview" component={"div"}>
                    {children}
                </Typography>
            </ModalPreviewBox>
        </Modal>
    );
};

const ModalPreviewBox = styled(Paper, { name: "ModalPreview" })(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',

    transform: 'translate(-50%, -50%)',

    borderRadius: 0,

    padding: "10px",

    width: "700px",
    height: "400px",

    gap: "10px",

    "& .TypographyPreview": {
        marginTop: "10px",

        width: '100%',

        lineHeight: "1.4",

        "& p": {
            margin: 0
        },

        "&.TypographyPreview > * + *": {
            marginTop: "1em",
        }
    },

    overflowY: "scroll",

    "::-webkit-scrollbar": {
        width: "11px",
        height: "11px",
    },

    "::-webkit-scrollbar-track": {
        background: "transparent",
    },

    "::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.divider,
    },
}));