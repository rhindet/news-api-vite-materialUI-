import { useState,useEffect,createContext } from "react"
import axios from 'axios'

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) =>{

    const [categoria,setCategoria] = useState('general')
    const [noticias,setNoticias] = useState([])
    const [pagina,setPagina] = useState(1)
    const [totalNoticias,setTotalNoticias] = useState(0)

    useEffect(()=>{
        const consultarApi = async () => {
            const url = `http://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const {data} = await axios(url)

            setNoticias(data.articles);
            setTotalNoticias(data.totalResults)
            setPagina(1)
        }


        consultarApi()
    },[categoria])

    useEffect(()=>{
        const consultarApi = async () => {
            const url = `http://newsapi.org/v2/top-headlines?country=mx&page=${pagina}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const {data} = await axios(url)

            setNoticias(data.articles);
            setTotalNoticias(data.totalResults)
            
        }


        consultarApi()
    },[pagina])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const handleChangePagina = (e,valor) => {
        window.scrollTo(0, 0)
        setPagina(valor)
    }

    return(
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                handleChangePagina,
                noticias,
                totalNoticias,
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider,
  
}

export default NoticiasContext
