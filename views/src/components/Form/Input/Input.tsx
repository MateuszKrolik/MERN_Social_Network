import { TextareaAutosize, Box, useTheme } from "@mui/material";

interface InputProps {
    control: "input" | "textarea";
    id: string;
    label: string;
    required: boolean;
    value: string;
    placeholder: string;
    valid: boolean;
    touched: boolean;
    onChange: (id: string, value: string, files?: FileList) => void;
    onBlur: () => void;
    minRows?: number;
    rows?: number;
}

const Input = ({
    control,
    id,
    label,
    required,
    value,
    placeholder,
    // valid,
    // touched,
    onChange,
    onBlur,
    minRows,
}: // rows,
InputProps) => {
    const theme = useTheme();

    if (control === "input") {
        return (
            <Box margin={1}>
                <label htmlFor={id}>{label}</label>
                <TextareaAutosize
                    id={id}
                    required={required}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(id, e.target.value)}
                    onBlur={onBlur}
                    style={{
                        display: "block",
                        font: "inherit",
                        width: "100%",
                        color: theme.palette.text.primary,
                        backgroundColor:
                            theme.palette.action.disabledBackground,
                    }}
                />
            </Box>
        );
    }

    if (control === "textarea") {
        return (
            <Box margin={1}>
                <label htmlFor={id}>{label}</label>
                <TextareaAutosize
                    id={id}
                    minRows={id === "content" ? 5 : minRows}
                    // rows={rows}
                    required={required}
                    value={value}
                    placeholder={placeholder}
                    // error={!valid && touched}
                    onChange={(e) => onChange(id, e.target.value)}
                    onBlur={onBlur}
                    style={{
                        display: "block",
                        font: "inherit",
                        width: "100%",
                        color: theme.palette.text.primary,
                        backgroundColor:
                            theme.palette.action.disabledBackground,
                    }}
                />
            </Box>
        );
    }

    return null;
};

export default Input;
