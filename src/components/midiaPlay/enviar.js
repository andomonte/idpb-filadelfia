import { makeStyles } from '@material-ui/core/styles';
import { lightGreen, yellow, red, blue } from '@material-ui/core/colors';
import axios from 'axios';
import api from 'src/components/services/api';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { useSession, signOut } from 'next-auth/client';
import useSWR from 'swr';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useCallback, useEffect } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
// import { signOut } from 'next-auth/client';
import { Box, Button, Modal } from '@material-ui/core';
import Dropzone, { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import S3 from 'react-aws-s3';
import { Container, FileInfo, Preview } from './styles';
import 'react-circular-progressbar/dist/styles.css';
// const download = require('image-downloader');

const dragActive = css`
  border-color: #76ff03;
`;
const dragReject = css`
  border-color: #ff5722;
`;

const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 3px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive}
  ${(props) => props.isDragReject && dragReject}
`;
const UploadMessage = styled.p`
  display: flex;
  flex-direction: column;
  color: #000;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
//----------------------------------------------------------------
const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles((theme) => ({
  boxUp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  boxInterno: {
    width: '100%',
    maxWidth: '400px',
    margin: '3px',
    background: '#fff',
    borderRadius: '4px',
    padding: '20px',
  },
  boxImage: {
    width: '100%',
    maxWidth: '600px',
    maxHeight: '400',
    margin: '3px',
    background: '#fff',
    borderRadius: '4px',
    padding: '20px',
  },
  qtyLetras: {
    maxWidth: '150px', // Limite maximo do texto
    whitespace: 'nowrap', // Removendo quebra de linha
    overflow: 'hidden', // Removendo a barra de rolagem
    textoverflow: 'ellipsis', // Adicionando "..." ao final do texto
  },
  dragMessage: {
    width: '100%',
    maxWidth: '400px',
    margin: '30px',
    background: '#bcaaa4',
    borderRadius: '4px',
    padding: '20px',
  },

  root: {
    flexGrow: 1,
    alignContent: 'center',
  },
  buttonCancel: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonVoltar: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
  buttonSalvar: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  buttonGreen: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(lightGreen.A400),
    backgroundColor: lightGreen.A400,
    '&:hover': {
      backgroundColor: lightGreen.A700,
    },
  },
  button: {
    alignContent: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 0,
    '& > *': {
      margin: theme.spacing(2),
      // width: '50ch',
    },
  },
  novoBox: {
    flexGrow: 1,

    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tf_12: {
    // marginLeft: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    width: '500px',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    width: '100%',
    fontSize: '5px',
  },

  tf_6: {
    //    marginRight: 8,
    margin: 10,
    width: '240px',
    textAlign: 'center',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      width: '205px',
    },
  },
  tf_4: {
    margin: 10,
    // marginRight: 8,
    width: '155px',
    textAlign: 'center', // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '130px',
    },
  },
  tf_3: {
    margin: 10,
    textAlign: 'center',
    // marginRight: 8,
    width: '120px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  buttonProgress: {
    color: lightGreen[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function enviar({ item }) {
  const DataAtual = new Date();
  let month = Number(DataAtual.getMonth() + 1);
  if (month < 10) month = `0${month}`;
  const Data = `${DataAtual.getDate()}/${month}/${DataAtual.getFullYear()}`;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [send, setSend] = React.useState(false);
  const [transfer, setTransfer] = React.useState('');
  const [fileObjects, setFileObjects] = React.useState([]);
  const [contagem, setContagem] = React.useState([]);
  const dataEvento = String(Data.split('/').join('')); // retira a / da data
  const arrayFinal = [];
  const [session] = useSession();
  const [editar, setEditar] = React.useState();
  const [progresso, setProgresso] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const arraytoSend = [];

  const config = {
    bucketName: process.env.AWSBUCKET2,

    region: process.env.AWSREGION,
    accessKeyId: process.env.AWSACCESS_KEY,
    secretAccessKey: process.env.AWSSECRET_KEY,
  };

  const ReactS3Client = new S3(config);
  //----------------------------------------------------------------------
  const url = `${window.location.origin}/api/consultaEventos/${item[0].codigoIgreja}/${dataEvento}`;

  useEffect(() => {
    if (fileObjects.length > 0) setSend(true);
    else setSend(false);
    if (fileObjects.length > 0) {
      for (let i = 0; i < 2; i += 1) {
        if (fileObjects[i]) arraytoSend[i] = fileObjects[i];
      }
      if (arraytoSend) setFileObjects(arraytoSend);
    }
  }, [contagem]);

  function atualizarLista(idAtual) {
    setFileObjects(fileObjects.filter((el) => el.id !== idAtual.id));
    setContagem(fileObjects.filter((el) => el.id !== idAtual.id));
    //  setFileObjects(arraytoSend);
  }

  const FileList = ({ files }) => (
    <div>
      <Container>
        {files.map((uploadedFile) => (
          <li key={uniqueId()}>
            <FileInfo>
              <Preview src={uploadedFile.preview} />
              <Box className={classes.qtyLetras}>
                <strong>{uploadedFile.name}</strong>
                <span>{uploadedFile.readableSize}</span>
              </Box>
            </FileInfo>
            <div>
              {uploadedFile.progress > 0 && !uploadedFile.error ? (
                <CircularProgressbar
                  styles={{
                    root: { width: 30 },
                    path: { stroke: '#7159c1' },
                  }}
                  strokeWidth={10}
                  // percentage={20on} // {uploadedFile.progress}

                  value={uploadedFile.progress}
                />
              ) : (
                <DeleteForeverIcon
                  type="button"
                  onClick={() => {
                    atualizarLista(uploadedFile);
                  }}
                  style={{ color: 'red', fontSize: 30 }}
                />
              )}
              {uploadedFile.url && (
                <a
                  href="https://sistemaidpb.s3.amazonaws.com/CAMPO%20GRANDE.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink styles={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}
              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        ))}
      </Container>
    </div>
  );
  const handleVoltar = (e) => {
    setFileObjects(fileObjects.slice(fileObjects.indexOf(e.target.name, 1)));
    setFileObjects(fileObjects.filter((x) => x % 2));
    setOpen(false);
    if (!editar) {
      setEditar(true);
    } else {
      setEditar(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  //= ======================================================================
  // Carregar AWS s3 com as fotos
  //= ======================================================================
  const updateFile = (tempo) => {
    setProgresso(tempo);
  };
  const enviarURL = async (urlAws, file) => {
    const dataFile = new FormData();
    dataFile.append('file', file[0].file, file[0].name);
    console.log('urlAws:', file[0]);

    const uploadImageRequest = {
      method: 'POST',
      url: urlAws.data,
      body: dataFile,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const configAxios = {
      onUploadProgress: (e) => {
        const progress = Math.round((e.loaded * 100) / e.total);

        updateFile(progress);
        console.log(progress, e.total, e.loaded);
      },
    };
    // await axios(uploadImageRequest, configAxios)
    axios
      .put(urlAws.data, file[0].file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);

          updateFile(progress);
          //          console.log(progress, e.total, e.loaded);
        },
      })
      .then((result) => {
        //        console.log('Response from s3', result);
        setTransfer(result.status);
        setEditar(false);
      })
      .catch((error) => {
        console.log('ERROR ', error);
        setTransfer('Error');
      });
  };
  const pegarURL = async (uploadedFiles) => {
    const file = uploadedFiles;

    // get secure url from our server
    api
      .post('api/videos', {
        fileName: file[0].name,
        fileType: file[0].type,
      })
      .then((response) => {
        if (response) {
          // setTransfer(response.status);
          // setEditar(false);
          enviarURL(response, file);
          //          console.log('response:', response);
        }
        //  updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
        //  updateFile(uploadedFile.id, { error: true });
      });

    /* const { urlAws } = await fetch('/api/videos', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => res.json());
    console.log('urlAs', urlAws); */

    // post the image direclty to the s3 bucket

    // const imageUrl = urlAws.split('?')[0];
    // console.log(imageUrl);
  };

  const processUpload = (uploadedFile) => {
    const dataFile = new FormData();
    dataFile.append('file', uploadedFile.file, uploadedFile.name);

    /*     api
      .post('api/fotos', dataFile, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);

          updateFile(progress);
          console.log(progress, e.total, e.loaded);
        },
      })
      .then((response) => {
        if (response) {
          setTransfer(response.status);
          setEditar(false);
          console.log('response:', response.status);
        }
        //  updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
        //  updateFile(uploadedFile.id, { error: true });
      }); */
  };

  const iniciarEnvio = async () => {
    const uploadedFiles = fileObjects.map((file) => ({
      file,
      id: uniqueId(),
      name: `video${file.id}_${dataEvento}_${
        item[0].codigoIgreja
      }${file.name.substring(file.name.lastIndexOf('.'))}`,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));
    //    console.log(uploadedFiles[0]);
    uploadedFiles.forEach(processUpload);
    pegarURL(uploadedFiles);
    // e.preventDefault();

    setLoading(true);

    setFileObjects(arrayFinal);
  };
  //= ======================================================================

  const fileSend = () => {
    setOpen(false);

    iniciarEnvio();
  };

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      setFileObjects(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uniqueId(),
            readableSize: filesize(file.size),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
          }),
        ),
      );
      setFileObjects([].concat(fileObjects, acceptedFiles));
      setContagem([].concat(contagem, acceptedFiles));
    });

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
    } = useDropzone({
      onDrop,

      accept: 'video/*',
    });

    const DragMessage = (a, b) => {
      if (send) {
        return (
          <UploadMessage>
            <CheckCircleIcon style={{ color: '#76ff03', fontSize: 50 }} />
          </UploadMessage>
        );
      }
      if (!a && !send) {
        return (
          <UploadMessage>
            <Button>
              <ImageSearchIcon fontSize="large" style={{ color: 'black' }} />
            </Button>
            Pressione Aqui para Inserir o Vídeo
          </UploadMessage>
        );
      }
      if (b && !send) {
        return (
          <UploadMessage type="error">Arquivo não suportado..</UploadMessage>
        );
      }
      return (
        <UploadMessage type="success">Solte os arquivos aqui..</UploadMessage>
      );
    };

    return (
      <>
        <Dropzone>
          {() => (
            <DropContainer
              {...getRootProps({
                onClick: (event) => {
                  if (send) {
                    event.stopPropagation();
                  }
                },
              })}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {DragMessage(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>
        {/* type: file.name.str.substr('.'), */}
        {fileObjects.length > 0 && <FileList files={fileObjects} />}
      </>
    );
  }

  // const [editar, setEditar] = React.useState(true);

  const { data, error } = useSWR(url, fetcher);
  // useSWR('/api/user', (id = 4) => fetcher(id));
  // useSWR('/api/consultaDados', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  //---------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  const handleModal = () => {
    setTransfer('');
    setOpen(true);
    setSend(false);
  };

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  function TelaEventos() {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.boxUp}>
          <Box className={classes.boxInterno}>
            <MyDropzone />

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              mt={2}
            >
              <Button
                variant="contained"
                size="small"
                onClick={handleVoltar}
                className={classes.buttonCancel}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.buttonGreen}
                onClick={fileSend}
                disabled={!send}
              >
                Adicionar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }
  function CircularProgressWithLabel() {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" value={progresso} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${progresso}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {session ? (
        <Box align="center" width="100%">
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={!loading && <TouchAppIcon style={{ fontSize: 40 }} />}
              onClick={handleModal}
              style={{ marginTop: 150 }}
              disabled={loading}
              //  startIcon={<SaveIcon />}
            >
              {!loading && 'Inserir Vídeo'}
              {progresso < 100 && loading && 'Carregando Vídeo...'}
              {progresso === 100 &&
                transfer === '' &&
                loading &&
                'Enviando Vídeo...'}
            </Button>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={10}
          >
            {loading && transfer === '' && <CircularProgressWithLabel />}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={10}
          >
            <Typography variant="caption" component="div" color="textSecondary">
              {transfer === 200 && (
                <Alert
                  action={
                    <Button
                      onClick={() => {
                        setLoading(false);
                        setTransfer('');
                      }}
                      color="inherit"
                      size="small"
                      severity="success"
                    >
                      <CancelIcon />
                    </Button>
                  }
                >
                  Vídeo enviado com Sucesso!!!
                </Alert>
              )}
              {transfer === 'Error' && (
                <Alert
                  severity="error"
                  action={
                    <Button
                      onClick={() => {
                        setLoading(false);
                        setTransfer('');
                      }}
                      color="inherit"
                      size="small"
                    >
                      <CancelIcon />
                    </Button>
                  }
                >
                  Vídeo enviado com Sucesso!!!
                </Alert>
              )}
            </Typography>
          </Box>
        </Box>
      ) : (
        signOut({
          callbackUrl: `${window.location.origin}`,
        })
      )}
      {open && <TelaEventos />}
    </>
  );
}

export default enviar;
