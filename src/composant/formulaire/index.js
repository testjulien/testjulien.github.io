import { Button } from "@ariakit/react";
import "./style.scss"


export function Formulaire({ soumissionrecherche, controledechamps, champs, changemode }) {
    
    return <>
        <form onSubmit={soumissionrecherche}>
            <label ><input type="radio" name="typederecherche" defaultChecked onChange={changemode}/> nom </label>
            <label > <input type="radio" name="typederecherche" onChange={changemode} /> code postal </label>
            <div><input type="search" value={champs} onChange={controledechamps} /><Button className="button"type="submit">Lancer la recherche</Button></div>
        </form>

    </>

}