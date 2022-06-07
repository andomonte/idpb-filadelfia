import Grid from '@material-ui/core/Grid';
import { Box, Avatar } from '@material-ui/core';
import React from 'react';
import QRCode from 'react-qr-code';
import corIgreja from 'src/utils/coresIgreja';
import TamanhoJanela from 'src/utils/getSize';

const janela = TamanhoJanela();

/* import useSWR from 'swr';

function getDados(email, nome) {
  const Nome = nome;
  const Email = email;
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const url = `${window.location.origin}/api/consultarolMembros/${Email}/${Nome}`;

  const { data, error } = useSWR(url, fetcher);

  
  

  return data;
} */
const nomeDistrito = [
  'Castelo',
  'União da Vitória',
  'Campos Sales',
  'Bairro da Paz',
  'Calado',
];

function meuPerfil({ secao, perfilUser }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={janela.height < 570 ? '85vh' : '90vh'}
        width="100vw"
        minHeight={400}
      >
        <Box
          height="100%"
          width="100%"
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            minWidth={300}
            height="100%"
            width="100%"
            maxWidth={600}
            border="4px solid #fff"
          >
            <Box
              height="25%"
              minHeight={150}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={corIgreja.principal}
              style={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Box>
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar
                      style={{
                        width: 80,
                        height: 80,
                      }}
                      alt="Remy Sharp"
                      src="images/castelo/castelo.png"
                    />
                  </Box>

                  <Box
                    mt={2}
                    sx={{
                      fontFamily: 'Geneva',
                      fontWeight: 'bold',
                      fontSize: '22px',
                      color: '#fff',
                    }}
                    textAlign="center"
                  >
                    IDPB - CASTELO{' '}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              height="73%"
              minHeight={350}
              bgcolor={corIgreja.principal}
              borderTop="2px solid #fff"
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
            >
              <Box
                height="40%"
                minHeight={100}
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={1}
              >
                <QRCode
                  size={120}
                  value={perfilUser.Igreja + perfilUser.RolMembro}
                />
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="15%"
                minHeight={50}
                textAlign="center"
                border="2px solid #3f50b5"
                sx={{
                  bgcolor: '#fff',
                  color: 'green',
                  fontFamily: 'Times New Roman Times serif',
                  fontWeight: 'bold',
                  fontSize: '28px',
                }}
              >
                {secao.user.name}
              </Box>
              <Box
                height="40%"
                minHeight={150}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item xs={12} />
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={150}
                  >
                    <Grid style={{ marginTop: 0 }} item xs={4}>
                      <Box
                        ml={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Avatar
                          style={{
                            width: 100,
                            height: 100,
                          }}
                          alt="Remy Sharp"
                          src={secao.user.image}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={8}>
                      <Box
                        ml={0}
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box>
                          <Box
                            sx={{
                              color: '#fff',
                              fontFamily: 'Times New Roman Times serif',
                            }}
                          >
                            Função:
                            {(perfilUser.Funcao === 'Lider' ||
                              perfilUser.Funcao === 'Membro') && (
                              <Box
                                sx={{
                                  color: '#76ff03',
                                  fontFamily: 'Times New Roman Times serif',
                                  fontWeight: 'bold',
                                }}
                              >
                                {perfilUser.Funcao} da Célula{' '}
                                {perfilUser.Celula}
                              </Box>
                            )}
                          </Box>

                          {perfilUser.Funcao === 'Supervisor' && (
                            <Box
                              sx={{
                                color: '#76ff03',
                                fontFamily: 'Times New Roman Times serif',
                                fontWeight: 'bold',
                              }}
                            >
                              {perfilUser.Funcao} do Setor{' '}
                              {perfilUser.supervisao}
                            </Box>
                          )}
                          {perfilUser.Funcao === 'Coordenador' && (
                            <Box
                              sx={{
                                color: '#76ff03',
                                fontFamily: 'Times New Roman Times serif',
                                fontWeight: 'bold',
                              }}
                            >
                              {perfilUser.Funcao} da Coordenação{' '}
                              {perfilUser.Coordenacao}
                            </Box>
                          )}
                          {perfilUser.Funcao === 'Secretaria' && (
                            <Box
                              sx={{
                                color: '#76ff03',
                                fontFamily: 'Times New Roman Times serif',
                                fontWeight: 'bold',
                              }}
                            >
                              {perfilUser.Funcao} da Igreja
                            </Box>
                          )}
                          <Box
                            display="flex"
                            sx={{
                              color: '#fff',
                              fontFamily: 'Times New Roman Times serif',
                            }}
                          >
                            Supervisão:
                            <Box
                              ml={1}
                              sx={{
                                color: '#76ff03',
                                fontFamily: 'Times New Roman Times serif',
                                fontWeight: 'bold',
                              }}
                            >
                              {perfilUser.supervisao}{' '}
                            </Box>
                          </Box>
                          <Box
                            display="flex"
                            sx={{
                              color: '#fff',
                              fontFamily: 'Times New Roman Times serif',
                            }}
                          >
                            Distrito:
                            <Box
                              ml={1}
                              sx={{
                                color: '#76ff03',
                                fontFamily: 'Times New Roman Times serif',
                                fontWeight: 'bold',
                              }}
                            >
                              {nomeDistrito[perfilUser.Distrito - 1]}
                            </Box>
                          </Box>
                          <Box
                            display="flex"
                            sx={{
                              color: '#fff',
                              fontFamily: 'Times New Roman Times serif',
                            }}
                          >
                            Matricula:
                            <Box
                              ml={1}
                              sx={{
                                color: '#76ff03',
                                fontFamily: 'Times New Roman Times serif',
                                fontWeight: 'bold',
                              }}
                            >
                              {perfilUser.Igreja}
                              {perfilUser.RolMembro}{' '}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default meuPerfil;
