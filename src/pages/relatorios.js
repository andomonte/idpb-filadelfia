import React from 'react';

import { useSession } from 'next-auth/client';
// import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';
import { PageRelatorios } from 'src/components/relatorios/index';
import { PageRelSuper } from 'src/components/relSupervisao/index';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

// import { PrismaClient } from '@prisma/client';

// import useSWR from 'swr';
// import fetch from 'unfetch';

function relatorio({ org }) {
  const classes = useStyles();
  const [session] = useSession();
  let secao = [{ email: '' }];
  const router = useRouter();
  const { perfilUser } = router.query;

  if (session) {
    secao = org.filter((val) => val.email === session.user.email);

    if (secao.length === 0) {
      return (
        <Box mt={5}>
          <br />
          <br />
          <Box mt={5} className={classes.root}>
            Ocorreu um Erro ao fazer o Login
          </Box>
          <Box className={classes.root}>email: {session.user.email}</Box>
          <Box className={classes.root}>não foi cadastrado</Box>
        </Box>
      );
    }

    return (
      <>
        {perfilUser === 'ministro' ? (
          <PageRelatorios
            item={org}
            perfilUser={perfilUser}
            title="SISTEMA-IDPB"
          />
        ) : null}
        {perfilUser === 'sup-MM' ? (
          <PageRelSuper
            item={org}
            title="SISTEMA-IDPB"
            perfilUser={perfilUser}
          />
        ) : null}
      </>
    );
  }
  return (
    <Box align="center" justifyContent="center">
      <h4>IDPB - Pregando a palavra no poder do Espírito Santo </h4>
    </Box>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const posts = await prisma.user.findMany();
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
    //  revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default relatorio;
