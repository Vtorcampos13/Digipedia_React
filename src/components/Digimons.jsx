import './digimons.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import useDigimons from "../hooks/useDigimons";
import Loading from './Cargando';
import DetailsDigimon from './DetailsDigimon';
import Buscador from './Buscador';
import { useState } from 'react';

//Funcion para mostrar el modal del digimon
function Digimon({id, name, img, showDigimon}){
    return (
        <section className="digimon-card" onClick={showDigimon}>
            <img src={img} alt={name} className="digimon-img"/>
            <p className="digimon-title">
            <span>#{id}</span>
            <span>{name}</span>
            </p>
        </section>
    )
}

//Funcion para mostrar los digimons
function Digimones () {

    const { digimons, loadMoreDigimons, more, findDigimon } = useDigimons()
    const [show, setShow] = useState({ show:false, digimon: {} })
    const [search, setSearch] = useState('')

    const showDigimon = (digimon) => setShow({ show: true, digimon })

    const noShowDigimon = () => setShow({ show: false, digimon: {}})


    const searchDigimon = async(e) => {
        e.preventDefault();

        if (!search) return;

        try {
            const digimon = await findDigimon(search);

            // Verificar si se encontró el digimon
            if (digimon.id) {
                setShow({ show: true, digimon });
            } else {
                alert(`No se encontró ningún digimon con el nombre "${search}"`);
            }
        } catch (error) {
            alert('Digimon no encontrado o no existe');
        }
    };

    
    return (
        <>
            <DetailsDigimon {...show} close={noShowDigimon}/>
            <Buscador search={search} setSearch={setSearch} searchDigimon={searchDigimon}/>
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
                { digimons.map(digimon => <Digimon {...digimon} key={digimon.id} showDigimon={() => showDigimon(digimon)}/>)}
            </InfiniteScroll>
        </>
    )
}

export default Digimones;