import { useEffect,useState } from "react";

function useDigimons(){
    // Variables de estado para digimons, URL de la siguiente página y disponibilidad de más datos
    const [digimons, setDigimons] = useState([])
    const [nextUrl, setNextUrl] = useState('')
    const [more, setMore] = useState(true)
    const currentUrl = 'https://www.digi-api.com/api/v1/digimon?pageSize=20'
    const urlEndPoint = 'https://www.digi-api.com/api/v1/digimon/'

    // Función para obtener los datos de un digimon
    const fetchDigimon = async (url) => {
            const response = await fetch(url)
            const digi = await response.json()

            const types = digi.types.map(t => t.type)
            const skills = digi.skills.map(s => s.skill)
            const descriptions = digi.descriptions.map(d => {
                if(d.language === 'en_us') {
                    return d.description
                }
            })
           
            
            return {
                id: digi.id,
                name: digi.name,
                img: digi.images[0].href,
                types,
                skills,
                descriptions
            }
        }
    
    // Carga inicial de digimons    
    useEffect(() => {
        loadDigimons()
    }, [])

        // Función para obtener los datos de los digimons  
        const getDigimons = async (url = currentUrl) => {
            const response = await fetch(url)
            const data = await response.json()
            const { pageable, content } = data
            const nextPage = pageable.nextPage

            console.log('Es aquiiiiii',data)

            const newDigimons = await Promise.all
                (content.map((digimon) => fetchDigimon(digimon.href))
            )

            return { nextPage, newDigimons }
        }

        // Función para cargar más digimons
        const loadDigimons = async () => {
            const { nextPage, newDigimons } = await getDigimons()
            setDigimons(newDigimons)
            setNextUrl(nextPage)
        }

        const loadMoreDigimons = async () => {
            const { nextPage, newDigimons } = await getDigimons(nextUrl)
            setDigimons(prev => [...prev, ...newDigimons])
            nextPage === null && setMore(false)
            setNextUrl(nextPage)
        }

        // Función para buscar un digimon
        const findDigimon = async (search) => {
            const url = `${urlEndPoint}${search.toLowerCase()}`
            return await fetchDigimon(url)
        }


    return { digimons, loadMoreDigimons, more, findDigimon }
}

export default useDigimons;