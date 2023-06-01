import "./style.scss"
import Logoapigouv from "../../logo/apigouv.png"
import Logojest from "../../logo/jest.png"
import Logonode from "../../logo/node.png"
import Logoparcel from "../../logo/parcel.png"
import Logoreact from "../../logo/react.png"
import Logoopenweather from "../../logo/openweather.png"
import Logosass from "../../logo/sass.png"



export function Pied() {
    return (<>
        <footer>
            <ul>TECHNOS
                <li><img src={Logoparcel} alt="parcel"/></li>
                <li><img src={Logonode} alt="node"/></li>
                <li><img src={Logoreact} alt="react"/></li>
                <li><img src={Logojest} alt="jest"/></li>
                <li><img src={Logosass} alt="jest"/></li>
                
            </ul>
            <ul>SOURCES
                <li><img src={Logoapigouv} alt="apigouv" className="logoapigouv"/></li>
                <li><img src={Logoopenweather} alt="apigouv" className="logoapiopenweather"/></li>
                
            </ul>

        </footer>
    </>)
}