import { useEffect,useState } from "react";

function useDigimons(){
    const [digimons, setDigimons] = useState([])
    const [nextUrl, setNextUrl] = useState('')
    const [more, setMore] = useState(true)
    const currentUrl = 'https://www.digi-api.com/api/v1/digimon?pageSize=20'

    useEffect(() => {
        loadDigimons()
    }, [])

        const getDigimons = async (url = currentUrl) => {
            const response = await fetch(url)
            const data = await response.json()
            const { nextPage, content } = data

            const newDigimons = await Promise.all(content.map(async (digimon) => {
                const response = await fetch(digimon.href)
                const digi = await response.json()

                const types = digi.types.map(name => name.type)
                const skills = digi.skills.map(name => name.skill)
                const descriptions = digi.descriptions.map(name => name.description)

                return {
                    id: digi.id,
                    name: digi.name,
                    img: digi.images[0].href
                }
            }))

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


    return { digimons, loadMoreDigimons, more}
}

export default useDigimons;