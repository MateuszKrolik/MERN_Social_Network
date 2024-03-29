import { Button, Dialog, DialogTitle, DialogContent, Box } from "@mui/material";
import { ReactNode, SyntheticEvent } from "react";

interface ModalProps {
    open: boolean;
    title: string;
    children: ReactNode;
    acceptEnabled: boolean;
    isLoading: boolean;
    onCancelModal: (event: SyntheticEvent) => void;
    onAcceptModal: (event: SyntheticEvent) => void;
}

const Modal = ({
    open,
    title,
    children,
    acceptEnabled,
    isLoading,
    onCancelModal,
    onAcceptModal,
}: ModalProps) => {
    return (
        <Dialog open={open} onClose={onCancelModal} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {children}
                <Box marginTop="1rem" display="flex" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onCancelModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onAcceptModal}
                        disabled={!acceptEnabled}
                    >
                        {isLoading ? "Loading..." : "Accept"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
