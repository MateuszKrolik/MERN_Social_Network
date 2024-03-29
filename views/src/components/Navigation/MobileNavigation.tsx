import { Drawer, List } from "@mui/material";
import NavigationItems from "./NavigationItems";

interface MobileNavigationProps {
    open: boolean;
    onChooseItem: () => void;
    isAuth: boolean;
    onLogout: () => void;
}

const MobileNavigation = ({
    open,
    onChooseItem,
    isAuth,
    onLogout,
}: MobileNavigationProps) => (
    <Drawer
        open={open}
        onClose={onChooseItem}
        variant="temporary"
        anchor="left"
        sx={{
            ".MuiPaper-root": {
                width: "70%",
                // backgroundColor: '#3b0062',
            },
        }}
    >
        <List
            sx={{
                "& .MuiTypography-root": {
                    fontSize: "3rem",
                },
            }}
        >
            <NavigationItems
                onChoose={onChooseItem}
                isAuth={isAuth}
                onLogout={onLogout}
            />
        </List>
    </Drawer>
);

export default MobileNavigation;
