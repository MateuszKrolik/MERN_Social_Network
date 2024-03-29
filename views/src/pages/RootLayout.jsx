import MainNavigation from '../components/Navigation/MainNavigation';
import MobileNavigation from '../components/Navigation/MobileNavigation';
import ErrorHandler from '../components/ErrorHandler';
import { Outlet } from 'react-router-dom';

import {
  AppBar,
  Container,
  Backdrop,
  Toolbar as MuiToolbar,
} from '@mui/material';

export default function RootLayout({ appContext }) {
  return (
    <>
      {appContext.showBackdrop && (
        <Backdrop
          open={appContext.showBackdrop}
          onClick={appContext.backdropClickHandler}
        />
      )}
      <ErrorHandler
        error={appContext.error}
        onHandle={appContext.errorHandler}
      />
      <AppBar
        position="static"
        // sx={{ bgcolor: '#3b0062' }}
      >
        <MuiToolbar>
          <MainNavigation
            onOpenMobileNav={() => appContext.mobileNavHandler(true)}
            onLogout={appContext.logoutHandler}
            isAuth={appContext.isAuth}
          />
        </MuiToolbar>
      </AppBar>
      <MobileNavigation
        open={appContext.showMobileNav}
        mobile
        onChooseItem={() => appContext.mobileNavHandler(false)}
        onLogout={appContext.logoutHandler}
        isAuth={appContext.isAuth}
      />
      <Container sx={{ marginTop: '64px' }}>
        <Outlet />
      </Container>
    </>
  );
}

