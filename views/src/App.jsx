import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout";

const FeedPage = lazy(() => import("./pages/Feed/Feed"));
const LoginPage = lazy(() => import("./pages/Auth/Login"));
const SinglePostPage = lazy(() => import("./pages/Feed/SinglePost"));
const SignupPage = lazy(() => import("./pages/Auth/Signup"));

const router = (appContext) =>
    createBrowserRouter([
        {
            path: "/",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <RootLayout appContext={appContext} />
                </Suspense>
            ),
            children: [
                {
                    path: "",
                    element: appContext.isAuth ? (
                        <Suspense fallback={<div>Loading...</div>}>
                            <FeedPage
                                userId={appContext.userId}
                                token={appContext.token}
                            />
                        </Suspense>
                    ) : (
                        <Suspense fallback={<div>Loading...</div>}>
                            <LoginPage
                                onLogin={appContext.loginHandler}
                                loading={appContext.authLoading}
                            />
                        </Suspense>
                    ),
                    index: true,
                },
                appContext.isAuth
                    ? {
                          path: ":postId",
                          element: (
                              <Suspense fallback={<div>Loading...</div>}>
                                  <SinglePostPage
                                      userId={appContext.userId}
                                      token={appContext.token}
                                  />
                              </Suspense>
                          ),
                      }
                    : {
                          path: "signup",
                          element: (
                              <Suspense fallback={<div>Loading...</div>}>
                                  <SignupPage
                                      onSignup={appContext.signupHandler}
                                      loading={appContext.authLoading}
                                  />
                              </Suspense>
                          ),
                      },
                { path: "*", element: <Navigate to="/" /> },
            ],
        },
    ]);

const App = () => {
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState(null);

    const logoutHandler = useCallback(() => {
        setIsAuth(false);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expiryDate");
        localStorage.removeItem("userId");
    }, []);

    const setAutoLogout = useCallback(
        (milliseconds) => {
            setTimeout(() => {
                logoutHandler();
            }, milliseconds);
        },
        [logoutHandler]
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expiryDate = localStorage.getItem("expiryDate");
        if (!token || !expiryDate) {
            return;
        }
        if (new Date(expiryDate) <= new Date()) {
            logoutHandler();
            return;
        }
        const userId = localStorage.getItem("userId");
        const remainingMilliseconds =
            new Date(expiryDate).getTime() - new Date().getTime();
        setIsAuth(true);
        setToken(token);
        setUserId(userId);
        setAutoLogout(remainingMilliseconds);
    }, [logoutHandler, setAutoLogout]);

    const mobileNavHandler = (isOpen) => {
        setShowMobileNav(isOpen);
        setShowBackdrop(isOpen);
    };

    const backdropClickHandler = () => {
        setShowBackdrop(false);
        setShowMobileNav(false);
        setError(null);
    };

    const loginHandler = (event, authData) => {
        event.preventDefault();
        setAuthLoading(true);
        fetch("https://mkrolik-social-api-de4b456-s7k2op5jka-ew.a.run.app/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
            }),
        })
            .then((res) => {
                if (res.status === 422) {
                    throw new Error("Validation failed.");
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log("Error!");
                    throw new Error("Could not authenticate you!");
                }
                return res.json();
            })
            .then((resData) => {
                console.log(resData);
                setIsAuth(true);
                setToken(resData.token);
                setAuthLoading(false);
                setUserId(resData.userId);
                localStorage.setItem("token", resData.token);
                localStorage.setItem("userId", resData.userId);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem("expiryDate", expiryDate.toISOString());
                setAutoLogout(remainingMilliseconds);
            })
            .catch((err) => {
                console.log(err);
                setIsAuth(false);
                setAuthLoading(false);
                setError(err);
            });
    };

    const signupHandler = (event, authData) => {
        event.preventDefault();
        setAuthLoading(true);
        fetch("https://mkrolik-social-api-de4b456-s7k2op5jka-ew.a.run.app/auth/signup", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: authData.signupForm.email.value,
                password: authData.signupForm.password.value,
                name: authData.signupForm.name.value,
            }),
        })
            .then((res) => {
                if (res.status === 422) {
                    throw new Error(
                        "Validation failed. Make sure the email address isn't used yet!"
                    );
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log("Error!");
                    throw new Error("Creating a user failed!");
                }
                return res.json();
            })
            .then((resData) => {
                console.log(resData);
                setIsAuth(false);
                setAuthLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsAuth(false);
                setAuthLoading(false);
                setError(err);
            });
    };

    const errorHandler = () => {
        setError(null);
    };

    const appContext = {
        isAuth,
        showBackdrop,
        backdropClickHandler,
        error,
        errorHandler,
        mobileNavHandler,
        logoutHandler,
        showMobileNav,
        userId,
        token,
        loginHandler,
        signupHandler,
        authLoading,
    };

    return <RouterProvider router={router(appContext)} />;
};

export default App;
