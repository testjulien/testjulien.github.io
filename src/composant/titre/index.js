import './style.scss';

export function Titre({useCODE}) {
    return(<>
    <h1>Recherche par {!useCODE?"nom de la commune":"code postal de la commune"}</h1>
    </>)
}