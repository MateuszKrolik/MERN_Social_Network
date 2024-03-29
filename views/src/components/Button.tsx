import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactNode } from "react";

interface MyButtonProps {
    link?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
    children: ReactNode;
}

const MyButton = ({ link, onClick, disabled, loading, type, children }: MyButtonProps) => {
    return !link ? (
        <Button
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
            variant="contained"
            style={{ backgroundColor: "#fab83f" }}
        >
            {loading ? "Loading..." : children}
        </Button>
    ) : (
        <Button component={RouterLink} to={link}>
            {children}
        </Button>
    );
};

export default MyButton;
