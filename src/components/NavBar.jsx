import { useEffect, useState } from 'react';
import { Luna, Sol } from './Icons';
import './Navbar.css';

const Navbar = () => {

    const [theme, setTheme] = useState('light')

    const handleChange = (e) => setTheme(e.target.checked ? 'dark' : 'light')

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <nav>
            <img className="logo" src="https://cdn.discordapp.com/attachments/1100831940199858298/1176645632656670740/Mesa_de_trabajo_1digipedia_logo.png?ex=656f9fa3&is=655d2aa3&hm=12ec828dcbcce6f0bd4e69274e5f0ceac5c9cfdfe632e4498ac513e462856adc&" alt="logo" />
            <div className="switch">
                <Sol />
                <label>
                    <input type="checkbox" className='check-switch'onChange={handleChange} hidden/>
                    <span className='slider'></span>
                </label>
                <Luna />
            </div>
        </nav>
    )
};

export default Navbar;