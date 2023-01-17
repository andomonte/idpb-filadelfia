import { Box, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import ConverteData from 'src/utils/convData2';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    fontSize: '16px',
  },
  novoBox2: {
    flexGrow: 1,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '16px',
  },
  button1: {
    display: 'flex',
    background: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
}));

function RelCelula({ dadosRelVisita, setSendResumo }) {
  const classes = useStyles();
  //= ================================================================
  //  const InicialNCelula = { label: 'Escolha...', value: 0 };

  return (
    <Box height="100%" minHeight={570} width="100%">
      <Box
        height="100%"
        minWidth={300}
        width="100%"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="100%" width="100%" minWidth={300}>
          <Box height="100%">
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
              width="100%"
              borderRadius={16}
            >
              <Box width="94%">
                <Box
                  height={50}
                  color="white"
                  fontFamily="arial black"
                  fontSize="16px"
                  textAlign="center"
                >
                  RELATÓRIO DE VISITAS
                </Box>
                <Grid container item xs={12} spacing={0}>
                  <Grid item xs={6}>
                    <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Data da Visita
                      </Typography>
                    </Box>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box
                        fontSize="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height={50}
                      >
                        {ConverteData(dadosRelVisita.Data)}
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />

                  <Grid item xs={5}>
                    <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Célula Visitada
                      </Typography>
                    </Box>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.CelulaVisitada}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Recepcão e Pontualidade
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.Recepcao}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Estrutura do Local
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.Estrutura}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Etapas da Reunião
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.Recepcao}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Box
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Observações
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 105,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={105}
                          textAlign="center"
                        >
                          {dadosRelVisita.Observacoes}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Box>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
                    <Box className={classes.novoBox} mt="3vh">
                      <Button
                        style={{
                          color: 'white',
                          borderRadius: '10px',
                          fontFamily: 'arial black',
                          background: corIgreja.tercenaria,
                          width: '100%',
                        }}
                        onClick={() => {
                          setSendResumo(false);
                        }}
                        variant="contained"
                        severity="success"
                      >
                        VOLTAR
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelCelula;
