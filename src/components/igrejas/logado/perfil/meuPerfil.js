import { Box, Avatar } from '@material-ui/core';
import React from 'react';
import QRCode from 'react-qr-code';
import corIgreja from 'src/utils/coresIgreja';
import TamanhoJanela from 'src/utils/getSize';
import '@fontsource/rubik';

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
  'Filadelfia',
  'Filadelfia-Criciúma',
  'Filadelfia-Joinvile',
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
        minHeight={500}
        bgcolor={corIgreja.principal2}
      >
        <Box
          height="94%"
          width="92%"
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minWidth={300}
            height="100%"
            width="100%"
            maxWidth={600}
          >
            <Box
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
              style={{
                borderRadius: '16px',
              }}
            >
              <Box>
                <Box>
                  <Box
                    mt="3vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      width={180}
                      src="images/filadelfia/filadelfia2.png"
                      alt="logo"
                    />
                  </Box>
                </Box>
                <Box
                  mt="1vh"
                  display="flex"
                  width="100%"
                  height="74vh"
                  sx={{ minHeight: 400 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Box
                      height="100%"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mt="4vh"
                      mb="4vh"
                    >
                      <Box
                        height={110}
                        width={110}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="4px solid #fff"
                        borderRadius="100%"
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
                    </Box>
                    <Box
                      mt="5vh"
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <Box
                        height={90}
                        width={100}
                        display="flex"
                        bgcolor="white"
                        borderRadius={6}
                        justifyContent="center"
                        alignItems="center"
                        mt={1}
                        ml={2}
                      >
                        <QRCode
                          size={78}
                          value={perfilUser.Igreja + perfilUser.RolMembro}
                        />
                      </Box>
                      <Box ml={3} width="60%">
                        <Box fontFamily="Rubik" fontSize="20px" color="white">
                          {secao.user.name.toUpperCase()}
                        </Box>
                        <Box fontFamily="Rubik" fontSize="18px" color="white">
                          {(perfilUser.Funcao === 'Lider' ||
                            perfilUser.Funcao === 'Membro') && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                Célula {perfilUser.Celula}
                              </Box>
                            </Box>
                          )}
                          {perfilUser.Funcao === 'Supervisor' && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                {perfilUser.supervisao}
                              </Box>
                            </Box>
                          )}
                          {perfilUser.Funcao === 'Coordenador' && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                {perfilUser.Coordenacao}
                              </Box>
                            </Box>
                          )}
                          {perfilUser.Funcao === 'Secretaria' && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                Igreja - {perfilUser.Igreja}
                              </Box>
                            </Box>
                          )}
                          {perfilUser.Funcao === 'PastorDistrito' && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                {nomeDistrito[perfilUser.Distrito - 1]}
                              </Box>
                            </Box>
                          )}
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                          }}
                        >
                          Supervisão:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {perfilUser.supervisao}{' '}
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                          }}
                        >
                          Coordenação:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {perfilUser.Coordenacao}{' '}
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontSize: '12px',
                            fontFamily: 'Rubik',
                          }}
                        >
                          Distrito:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {nomeDistrito[perfilUser.Distrito - 1]}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      mt="3vh"
                      height="40%"
                      minHeight={100}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        height="40%"
                        minHeight={150}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Box fontFamily="Rubik" fontSize="12px" color="white">
                          MATRÍCULA
                        </Box>
                        <Box
                          mt={0}
                          sx={{
                            color: '#ffdd55',
                            fontFamily: 'Rubik',
                            fontWeight: 'bold',
                            fontSize: '28px',
                          }}
                        >
                          {perfilUser.Igreja}
                          {perfilUser.RolMembro}{' '}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default meuPerfil;
