import { Grid, Typography, Pagination, Stack } from "@mui/material"
import useNoticias from "../hooks/useNoticias"
import Noticia from "./Noticia"

const ListadoNoticias = () => {

  const { noticias , totalNoticias ,handleChangePagina,pagina } = useNoticias()
  const totalPaginas = Math.ceil(totalNoticias / 20)
 
  return (
    <>
      <Typography
        textAlign={'center'}
        marginY={5}
        variant='h3'
        component={'h2'}
      >
        Ultimas Noticias
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {noticias.map(noticia => (
          <Noticia
            key={noticia.url}
            noticia={noticia}
          />
        ))}
      </Grid>

      <Stack
        sx={{
          marginY:5
        }}
        direction={'row'}
        justifyContent='center'
        alignItems={'center'}
        spacing={2}
      >
        <Pagination
          page={pagina}
          count={totalPaginas}
          color='primary'
          onChange={handleChangePagina}
          />
      </Stack>

    </>
  )
}

export default ListadoNoticias
