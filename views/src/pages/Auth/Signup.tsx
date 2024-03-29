import { useState, SyntheticEvent } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
} from "@mui/material";

import { required, length, email } from "../../util/validators";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const defaultTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

interface FormField {
    value: string;
    valid: boolean;
    touched: boolean;
    validators: ((value: string) => boolean)[];
}

interface SignUpForm {
    email: FormField;
    password: FormField;
    name: FormField;
    formIsValid: boolean;
}

interface SignUpProps {
    onSignup: (
        event: SyntheticEvent,
        data: {
            signupForm: {
                email: { value: string };
                password: { value: string };
                name: { value: string };
            };
        }
    ) => void;
}

export default function SignUp({ onSignup }: SignUpProps) {
    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState<SignUpForm>({
        email: {
            value: "",
            valid: false,
            touched: false,
            validators: [required, email],
        },
        password: {
            value: "",
            valid: false,
            touched: false,
            validators: [required, length({ min: 5 })],
        },
        name: {
            value: "",
            valid: false,
            touched: false,
            validators: [required],
        },
        formIsValid: false,
    });

    const inputChangeHandler = (input: keyof SignUpForm, value: string) => {
        let isValid = true;
        for (const validator of signupForm[
            input as "email" | "password" | "name"
        ].validators) {
            isValid = isValid && validator(value);
        }
        const updatedForm = {
            ...signupForm,
            [input]: {
                ...signupForm[input as "email" | "password" | "name"],
                valid: isValid,
                value: value,
            },
        };
        let formIsValid = true;
        for (const inputName in updatedForm) {
            if (inputName !== "formIsValid") {
                formIsValid =
                    formIsValid &&
                    updatedForm[inputName as "email" | "password" | "name"]
                        .valid;
            }
        }
        setSignupForm({ ...updatedForm, formIsValid: formIsValid });
    };

    const inputBlurHandler = (input: keyof SignUpForm) => {
        setSignupForm((prevState) => {
            return {
                ...prevState,
                [input]: {
                    ...prevState[input as "email" | "password" | "name"],
                    touched: true,
                },
            };
        });
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        onSignup(event, {
            signupForm: {
                email: { value: signupForm.email.value },
                password: { value: signupForm.password.value },
                name: { value: signupForm.name.value },
            },
        });
        navigate("/");
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    value={signupForm.name.value}
                                    onChange={(event) =>
                                        inputChangeHandler(
                                            "name",
                                            event.target.value
                                        )
                                    }
                                    onBlur={() => inputBlurHandler("name")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={signupForm.email.value}
                                    onChange={(event) =>
                                        inputChangeHandler(
                                            "email",
                                            event.target.value
                                        )
                                    }
                                    onBlur={() => inputBlurHandler("email")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={signupForm.password.value}
                                    onChange={(event) =>
                                        inputChangeHandler(
                                            "password",
                                            event.target.value
                                        )
                                    }
                                    onBlur={() => inputBlurHandler("password")}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!signupForm.formIsValid}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/signin"
                                    variant="body2"
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
