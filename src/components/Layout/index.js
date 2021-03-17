import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Head from 'next/head';

import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Hidden from '@material-ui/core/Hidden';
import { signIn, signOut, useSession } from 'next-auth/client';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PesquisaIgreja from 'src/components/idpbNacional/pesquisa/igreja';
import Navbar from './navBar_redesSociais';
import Carrossel from '../carrossel';
import Home from './home';
// import GoogleMaps from './googleMap';
// import Pesquisar from './pesquisar';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    width: 500,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      width: 400,
    },

    [theme.breakpoints.down('sm')]: {
      width: 200,
    },
  },
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  root2: {
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburger: {
    cursor: 'pointer',
    height: 28,
  },
  logo: {
    height: 25,
    marginLeft: theme.spacing(2),
  },
  avatar: {
    cursor: 'pointer',
    width: 35,
    height: 35,
  },
  contentMain: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShiftMain: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: +drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    justifyContent: 'flex',
    marginTop: 56,
  },
  tabPanel: {
    flexGrow: 1,
    backgroundColor: '#ffff', // theme.palette.background.default,
    // backgroundImage: `url('/images/home/img01.png')`,
    margin: 0,
    padding: 0,
    flex: '1 1 auto',
    height: '100%',
    maxHeight: 600,
    [theme.breakpoints.down('md')]: {
      height: 'calc(100% - 64px)',
      width: '100%',
    },
  },

  /* desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 35,
    width: 700,
  },
  input: {
    flex: 1,
  }, */
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function Layout({ item, title }) {
  const classes = useStyles();
  const [session] = useSession();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    //! open ? setOpen(true) : setOpen(false);
  };

  const handleDrawerClose = () => {
    if (desktop && open) {
      setOpen(true);
    }
    if (mobile) {
      setOpen(false);
    }
  };
  return (
    <div onLoad={handleDrawerClose}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <link rel="shortcut icon" href="images/idpb.ico" type="image/x-icon" /> */}
      </Head>
      <div className={classes.root}>
        <AppBar className={classes.root2} color="default">
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <MenuIcon
                className={classes.hamburger}
                onClick={handleDrawerOpen}
              />
              <Hidden mdDown>
                <img
                  src="/images/IDPBNAC.png"
                  alt="logo"
                  className={classes.logo}
                />
              </Hidden>
            </Box>

            <Box display="flex">
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                showLabels
                className={classes.rootTopbarIcon}
              >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Contatos" icon={<CallIcon />} />
                <BottomNavigationAction
                  label="Igrejas"
                  icon={<LocationOnIcon />}
                />
              </BottomNavigation>
            </Box>
            {!session ? (
              <Button
                color="secondary"
                component="a"
                variant="outlined"
                startIcon={<AccountCircle />}
                onClick={() => signIn('google')}
              >
                Entrar
              </Button>
            ) : (
              <Box display="flex" alignItems="center">
                <Avatar
                  onClick={() => signOut()}
                  alt="User"
                  className={classes.avatar}
                  src={session?.user?.image}
                />
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={open}>
          <Navbar />
        </Drawer>
        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* {children} */}
          <Box className={classes.tabPanel}>
            <TabPanel value={value} index={0}>
              <Carrossel />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Home />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PesquisaIgreja item={item} />
            </TabPanel>
          </Box>
        </main>
      </div>
    </div>
  );
}

export { Layout, TabPanel };
