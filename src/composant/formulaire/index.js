
import "./style.scss"


export function Formulaire({ soumissionrecherche, controledechamps, champs, changemode }) {
    return <>
        <form onSubmit={soumissionrecherche}>
            <label > nom<input type="radio" name="typederecherche" defaultChecked onChange={changemode}/></label>
            <label > code postal<input type="radio" name="typederecherche" onChange={changemode} /></label>
            <div><input type="search" value={champs} onChange={controledechamps} /><button type="submit">Lancer la recherche</button></div>
        </form>

    </>

}