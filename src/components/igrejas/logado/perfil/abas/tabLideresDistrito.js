import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Box, Typography } from '@material-ui/core';
import { MdScreenSearchDesktop } from 'react-icons/md';
import Avatar from '@material-ui/core/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function TabCelula({
  lideranca,
  Funcao,
  rolMembros,
  perfilUser,
  setBuscarNome,
  setOpenBuscar,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const listaParcial = lideranca.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === Funcao,
  );

  let lideresSetor;

  if (Funcao === 'Lider') {
    lideresSetor = listaParcial.sort((a, b) => {
      if (a.Nome > b.Nome) return 1;
      if (b.Nome > a.Nome) return -1;
      return 0;
    });
  }

  if (Funcao === 'Supervisor') {
    lideresSetor = listaParcial.sort((a, b) => {
      if (new Date(a.supervisao) > new Date(b.supervisao)) return 1;
      if (new Date(b.supervisao) > new Date(a.supervisao)) return -1;
      return 0;
    });
  }
  if (Funcao === 'Coordenador') {
    lideresSetor = listaParcial.sort((a, b) => {
      if (new Date(a.Coordenacao) > new Date(b.Coordenacao)) return 1;
      if (new Date(b.Coordenacao) > new Date(a.Coordenacao)) return -1;
      return 0;
    });
  }

  return (
    <Paper
      sx={{
        background: '#fff9',
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* <TableContainer sx={{ maxHeight: '100%' }}>
        {lideresSetor &&
          lideresSetor.map((row, index) => (
            <Box
              mt={0}
              // bgcolor={Object.keys(respostas).length && respostas[index]}
              display="flex"
              alignItems="center"
              key={row.id}
              height={60}
            >
              <Box display="flex" width="100%">
                <Box ml={1} display="flex" alignItems="center">
                  <Avatar
                    onClick={() => console.log('vai mostrar a foto')}
                    alt="User"
                    src=""
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </Box>
                <Box
                  onClick={() => {
                    setBuscarNome(lideresSetor[index]);
                    setOpenBuscar(true);
                  }}
                  width="100%"
                  display="flex"
                  alignItems="center"
                  ml={1}
                  mt={1}
                >
                  <Box>
                    <Box fontFamily="Fugaz One" fontSize="13px">
                      {row.Nome.length > 30
                        ? row.Nome.substring(0, row.Nome.lastIndexOf(' '))
                        : row.Nome}
                    </Box>

                    <Box display="flex" fontFamily="Rubik" fontSize="12px">
                      <Box ml={0.5}>Coordenação: </Box>
                      <Box ml={1}> {row.Coordenacao}</Box>
                      <Box ml={2}>Super.: </Box>
                      <Box ml={1}> {row.supervisao}</Box>
                      <Box ml={2}>Célula: </Box>
                      <Box ml={1}> {row.Celula}</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
      </TableContainer> */}
      <TableContainer sx={{ maxHeight: '100%' }}>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {lideresSetor.map((row, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  /* onClick={() => {
                  setOpenModal(true);
                  setImagem(row.Image);
                }} */
                  src=""
                  onClick={() => console.log('vai mostrar a foto')}
                  alt="User"
                  style={{
                    width: 50,
                    height: 50,
                  }}
                >
                  {/* <Image
                  src={row.Image ? row.Image : '/images/inserirFoto.jpg'}
                  layout="fill"
                  objectFit="contain"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={bannerBlurHash}
                /> */}
                </Avatar>
              </ListItemAvatar>
              <Box
              /* onClick={() => {
                  setOpenModal2(true);
                }} */
              >
                <ListItemText
                  style={{ marginTop: 8 }}
                  primary={
                    <Typography
                      type="body2"
                      style={{
                        marginLeft: 10,
                        fontFamily: 'Fugaz One',
                        fontSize: '13px',
                        color: '#000',
                      }}
                    >
                      {row.Nome.length > 30
                        ? row.Nome.substring(
                            0,
                            row.Nome.lastIndexOf(' '),
                          ).toUpperCase()
                        : row.Nome.toUpperCase()}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      type="body2"
                      style={{
                        display: 'flex',
                        marginLeft: 10,
                        fontFamily: 'Rubik',
                        fontSize: '12px',
                        color: '#000',
                      }}
                    >
                      <Box ml={0.5}>Coordenação: </Box>
                      <Box ml={1}> {row.Coordenacao}</Box>
                    </Typography>
                  }
                />
                <ListItemText
                  style={{ marginTop: -5 }}
                  secondary={
                    <Typography
                      type="body2"
                      style={{
                        display: 'flex',
                        marginLeft: 0,
                        fontFamily: 'Rubik',
                        fontSize: '10px',
                        color: '#000',
                      }}
                    >
                      <Box ml={2}>Supervisão: </Box>
                      <Box ml={1}> {row.supervisao}</Box>
                      <Box ml={2}>Célula: </Box>
                      <Box ml={1}> {row.Celula}</Box>
                    </Typography>
                  }
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </TableContainer>
    </Paper>
  );
}
