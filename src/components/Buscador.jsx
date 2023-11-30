import './Buscador.css';
import { Buscar } from './Icons';


function Buscador({ search, setSearch, searchDigimon }) {

    return (
        <>
            <h3 className='titulo'>Mas de 1000 digimons, elige tu favorito</h3>
            <form className='container-buscador' onSubmit={searchDigimon}>
                <input type="text" placeholder='Encuentra tu digimon' className='input-buscar'
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}/>
                <button className='btn-buscar' type='submit'>
                    <Buscar />
                    Buscar digimon
                </button>
            </form>
        </>
    )
}

export default Buscador;