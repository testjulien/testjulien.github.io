
import "./style.scss"


export function Corps({nbresultat, recherche, format, children }) {
    return (<>
        <main>
            <section>
                <div className="box-subtitle">
                    <h2>{nbresultat} résultat pour {recherche}</h2><button onClick={format}>Changer le format</button>
                </div>
                <div className="container-carte">
                    {children}
                </div>


                


            </section>
        </main>

    </>);
}