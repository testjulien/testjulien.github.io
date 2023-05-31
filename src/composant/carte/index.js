import { useEffect, useState, } from 'react';
import "./style.scss"

export function Carte({ nom, dpt, cp, pop }) {

    const [TEMP, setTEMP] = useState("")
    const [METEOcode, setMETEOcode] = useState("")

    const apiKEY = "767a7cce68ed2b3098d41e24364ec56c"

    const fetchWEATHER = async () => {
        try {
            const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + cp + ",fr&appid="+apiKEY+"&lang=fr&units=metric"
            const response = await fetch(url);
            const data = await response.json();
            setTEMP(data.main.temp)
            setMETEOcode(data.weather[0].icon)
            
          
        } catch (error) {
            //alert('Erreur lors de la récupération des données OPEN WEATHER');
            console.log(error)
        }
    };
    useEffect(() => {
        fetchWEATHER();

    }, [TEMP]);

    return (<>

        <article className='card'>



            <h3 className='card-title'>{nom} <span>- {dpt}</span> </h3>

            <div className='card-box'>

            <div className='card-text'>
                <p>Code postal: <span>{cp}</span> </p>
                <p> Population: <span>{pop}</span></p>
            </div>



            <div className='card-meteo'>
                <img src={`https://openweathermap.org/img/wn/${METEOcode}@2x.png`} alt="test" ></img>
                <p><span>{TEMP}</span>°C</p>
            </div>
            
            
            </div>



        </article>

    </>)
}