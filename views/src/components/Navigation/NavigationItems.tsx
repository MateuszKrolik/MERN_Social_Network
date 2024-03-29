import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ListItem, ListItemText, ListItemButton } from "@mui/material";

interface NavItem {
    id: string;
    text: string;
    link: string;
    auth: boolean;
}

interface NavigationItemsProps {
    isAuth: boolean;
    onChoose: () => void;
    onLogout: () => void;
}

const navItems: NavItem[] = [
    { id: "feed", text: "Feed", link: "/", auth: true },
    { id: "login", text: "Login", link: "/", auth: false },
    { id: "signup", text: "Signup", link: "/signup", auth: false },
];

const NavigationItems = ({
    isAuth,
    onChoose,
    onLogout,
}: NavigationItemsProps) => {
    const location = useLocation();

    return (
        <>
            {navItems
                .filter((item) => item.auth === isAuth)
                .map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.link}
                        onClick={onChoose}
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        <ListItem>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    color:
                                        location.pathname === item.link
                                            ? "#fab83f"
                                            : "white",
                                }}
                            />
                        </ListItem>
                    </NavLink>
                ))}
            {isAuth && (
                <NavLink
                    key="logout"
                    to="/logout"
                    onClick={onLogout}
                    style={{
                        color: "white",
                        textDecoration: "none",
                    }}
                >
                    <ListItem>
                        <ListItemText
                            primary="Logout"
                            sx={{
                                color:
                                    location.pathname === "/logout"
                                        ? "#fab83f"
                                        : "white",
                            }}
                        />
                    </ListItem>
                </NavLink>
            )}
        </>
    );
};

export default NavigationItems;
