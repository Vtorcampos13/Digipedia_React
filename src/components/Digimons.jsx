import './digimons.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import useDigimons from "../hooks/useDigimons";
import Loading from './Cargando';


function Digimon({id, name, img}){
    return (
        <section className="digimon-card">
            <img src={img} alt={name} className="digimon-img"/>
            <p className="digimon-title">
            <span>#{id}</span>
            <span>{name}</span>
            </p>
        </section>
    )
}


function Digimones () {

    const { digimons, loadMoreDigimons, more } = useDigimons()
    
    return (
        <InfiniteScroll 
            dataLength={digimons.length}
            next={loadMoreDigimons}
            hasMore={more}
            loader={<Loading />}
            endMessage={
                <h3 className='titulo' style={{ gridColumn: '1/6' }}>Lo siento, no hay más digimons para mostrar</h3>
            }
            className='digimon-container'
        >
            { digimons.map(digimon => <Digimon {...digimon} key={digimon.id}/>)}
        </InfiniteScroll>
    )
}

export default Digimones;