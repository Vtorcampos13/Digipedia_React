import { useEffect,useState } from "react";

function useDigimons(){
    const [digimons, setDigimons] = useState([])
    const [nextUrl, setNextUrl] = useState('')
    const [more, setMore] = useState(true)
    const currentUrl = 'https://www.digi-api.com/api/v1/digimon?pageSize=20'
    const urlEndPoint = 'https://www.digi-api.com/api/v1/digimon/'

    const fetchDigimon = async (url) => {
            const response = await fetch(url)
            const digi = await response.json()

            const types = digi.types.map(t => t.type)
            const skills = digi.skills.map(s => s.skill)
            const descriptions = digi.descriptions.map(d => d.description)

            return {
                id: digi.id,
                name: digi.name,
                img: digi.images[0].href,
                types,
                skills,
                descriptions
            }
        }

    useEffect(() => {
        loadDigimons()
    }, [])

        const getDigimons = async (url = currentUrl) => {
            const response = await fetch(url)
            const data = await response.json()
            const { nextPage, content } = data

            const newDigimons = await Promise.all
                (content.map((digimon) => fetchDigimon(digimon.href))
            )

            return { nextPage, newDigimons }
        }

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

        const findDigimon = async (search) => {
            const url = `${urlEndPoint}${search.toLowerCase()}`
            return await fetchDigimon(url)
        }


    return { digimons, loadMoreDigimons, more, findDigimon }
}

export default useDigimons;