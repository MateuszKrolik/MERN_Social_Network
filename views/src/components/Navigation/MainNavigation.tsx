import {
    Typography,
    IconButton,
    Box,
    List,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import NavigationItems from "./NavigationItems";

interface MainNavigationProps {
    onOpenMobileNav: () => void;
    isAuth: boolean;
    onLogout: () => void;
}

const MainNavigation = ({
    onOpenMobileNav,
    isAuth,
    onLogout,
}: MainNavigationProps) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Box
            display="flex"
            alignItems="center"
            p={1}
            height="100%"
            width="100%"
            justifyContent="space-between"
        >
            <Box display="flex" alignItems="center">
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onOpenMobileNav}
                >
                    <MenuIcon />
                </IconButton>
                <Box component={NavLink} to="/">
                    <Box border="1px solid white" p={1}>
                        <Typography
                            component="div"
                            fontWeight="bold"
                            color="white"
                        >
                            MKrolik Social
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <List
                sx={{
                    listStyle: "none",
                    p: 0,
                    m: "0 1.5rem",
                    display: isDesktop ? "flex" : "none",
                }}
            >
                <NavigationItems
                    onChoose={() => {}}
                    isAuth={isAuth}
                    onLogout={onLogout}
                />
            </List>
        </Box>
    );
};

export default MainNavigation;
