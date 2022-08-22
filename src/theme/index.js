import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#304ffe', // '#ff3d00',
    },
    secondary: {
      main: '#000000',
    },
    danger: {
      main: '#ff3d00',
    },
    default: {
      main: '#1a237e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: corIgreja.principal2,
      dark: '#ffff',
      paper: colors.common.white,
      white: '#ffd600',
    },
    text: {
      primary: colors.blueGrey[900],
      secundary: colors.blueGrey[600],
    },
    action: {
      active: '#000',
    },
  },
});

export default theme;
