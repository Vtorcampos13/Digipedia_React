import './Buscador.css';
import { Buscar } from './Icons';
function Buscador() {

    return (
        <>
            <h3 className='titulo'>Mas de 200 digimons, elige tu favorito</h3>
            <section className='container-buscador'>
                <input type="text" placeholder='Encuentra tu digimon' className='input-buscar'/>
                <button className='btn-buscar'>
                    <Buscar />
                    Buscar digimon
                </button>
            </section>
        </>
    )
}

export default Buscador;