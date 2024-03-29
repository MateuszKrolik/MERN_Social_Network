import { Box, useTheme } from "@mui/material";
import { useState } from "react";

interface FilePickerProps {
    id: string;
    valid: boolean;
    touched: boolean;
    onChange: (id: string, value: string, files?: FileList) => void;
    onBlur: () => void;
}

const FilePicker = ({
    id,
    valid,
    touched,
    onChange,
    onBlur,
}: FilePickerProps) => {
    const theme = useTheme();
    const [fileName, setFileName] = useState("");

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onChange(id, e.target.value, e.target.files);
            setFileName(
                e.target.files.length > 0 ? e.target.files[0].name : ""
            );
        }
    };

    return (
        <Box margin={1}>
            <input
                type="file"
                id={id}
                // error={!valid && touched}
                onChange={fileChangeHandler}
                onBlur={onBlur}
                style={{ display: "none" }}
            />
            <label
                htmlFor={id}
                style={{
                    display: "block",
                    width: "100%",
                    border: "1px solid #808080",
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.action.disabledBackground,
                }}
            >
                {fileName ? fileName : "Choose file"}
            </label>
        </Box>
    );
};

export default FilePicker;
