import './details.css'
function DetailsDigimon({show, digimon, close}) {
  
    return (
        <div className='modal-container' onClick={close} style={{ display: show ? 'grid' : 'none' }}>
            <section className='modal-body'>
                <div className='img-container'>
                    <img src={digimon.img} alt={digimon.name} className='img-detail'/>
                    <section>
                        {digimon.types?.map(type => <span key={type} className='tag'>{type}</span>)}
                    </section>
                </div>
                <div className='data'>
                    <h2 className='title'>{digimon.name} ({digimon.id})</h2>

                    <h3 className='title-section'>Descripcion</h3>
                    {digimon.descriptions?.map(description => <span className='tag'>{description}</span>)}

                    <h3 className='title-section'>Habilidades</h3>
                    <div className='skills'>
                        {digimon.skills?.map(skill => 
                            <section>
                                <span className='tags'>{skill}</span>
                            </section>
                        )}
                    </div>

                </div>
            </section>
        </div>
    )
}

export default DetailsDigimon;