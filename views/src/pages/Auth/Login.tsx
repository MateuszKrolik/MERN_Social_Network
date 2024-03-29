import { useState, SyntheticEvent } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { required, length, email } from "../../util/validators";
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

import { Link as RouterLink } from "react-router-dom";

const defaultTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

interface LoginForm {
    email: FormField;
    password: FormField;
}

interface FormField {
    value: string;
    valid: boolean;
    touched: boolean;
    validators: ((value: string) => boolean)[];
}

interface LoginProps {
    onLogin: (
        event: SyntheticEvent,
        data: {
            email: string;
            password: string;
        }
    ) => void;
}

export default function SignIn({ onLogin }: LoginProps) {
    const [loginForm, setLoginForm] = useState<LoginForm>({
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
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const inputChangeHandler = (input: keyof LoginForm, value: string) => {
        let isValid = true;
        for (const validator of loginForm[input].validators) {
            isValid = isValid && validator(value);
        }
        const updatedForm = {
            ...loginForm,
            [input]: {
                ...loginForm[input],
                valid: isValid,
                value: value,
            },
        };
        let formIsValid = true;
        for (const inputName in updatedForm) {
            formIsValid =
                formIsValid && updatedForm[inputName as keyof LoginForm].valid;
        }
        setLoginForm(updatedForm);
        setFormIsValid(formIsValid);
    };

    const inputBlurHandler = (input: keyof LoginForm) => {
        setLoginForm({
            ...loginForm,
            [input]: {
                ...loginForm[input],
                touched: true,
            },
        });
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        onLogin(event, {
            email: loginForm.email.value,
            password: loginForm.password.value,
        });
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
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={loginForm.email.value}
                            onChange={(event) =>
                                inputChangeHandler("email", event.target.value)
                            }
                            onBlur={() => inputBlurHandler("email")}
                            error={
                                !loginForm.email.valid &&
                                loginForm.email.touched
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={loginForm.password.value}
                            onChange={(event) =>
                                inputChangeHandler(
                                    "password",
                                    event.target.value
                                )
                            }
                            onBlur={() => inputBlurHandler("password")}
                            error={
                                !loginForm.password.valid &&
                                loginForm.password.touched
                            }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!formIsValid}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/signup"
                                    variant="body2"
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
