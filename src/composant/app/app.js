import { useEffect, useState, } from 'react';

import { formatpopulation } from "../../components/Item/formatPopulation.js";

import { Carte } from "../carte";
import { Corps } from "../corps";
import { Formulaire } from "../formulaire";
import { Pied } from "../pied";
import { Titre } from "../titre";

export function App() {
  const [DATA, setDATA] = useState([]);
  const [FORMATpop, setFORMATpop]=useState(true)
  const [APIprete, setAPIprete] = useState(false);
  const [CHAMPS, setCHAMPS] = useState("");
  const [useCODE,setuseCODE] = useState(false)
  const [RECHERCHE, setRECHERCHE] = useState("Dordogne");

  const fetchGOUV = async () => {
    if (RECHERCHE.length>2) {
          try {
      setAPIprete(false)
      const url = useCODE
  ? `https://geo.api.gouv.fr/communes?codePostal=${RECHERCHE}`
  : `https://geo.api.gouv.fr/communes?nom=${RECHERCHE}&fields=code,nom,population,codesPostaux,departement`;
      const response = await fetch(url);
      const data = await response.json();
      setDATA(data);
      setAPIprete(true)
    } catch (error) {
      alert('Erreur lors de la récupération des données du gouvernement.');
    }
    }

  };

  const controledeCHAMPS = (event) => {
    setCHAMPS(event.target.value);
  };
  const soumissionRECHERCHE = (event) => {
    event.preventDefault();
    setRECHERCHE(CHAMPS);
    setCHAMPS("");
    
  };
  const changeFORMAT = (event)=>{
    setFORMATpop(!FORMATpop)
  }
  const changeMODE = (event)=>{
    setuseCODE(!useCODE)
  }
  

    useEffect(() => {
      fetchGOUV();
    }, [RECHERCHE]);

 

    return (<>
      <header>
        <Titre useCODE={useCODE} />
        <Formulaire 
        soumissionrecherche={soumissionRECHERCHE} 
        controledechamps={controledeCHAMPS}
        champs={CHAMPS}
        usecode={useCODE}
        changemode={changeMODE}/>

      </header>

      {RECHERCHE.length< 3 && <p className='info'>mininum 3 caractére</p>}

      <Corps nbresultat={DATA.length} recherche={RECHERCHE} format={changeFORMAT} >

        {!APIprete && <h2 className='info'>recherche en cours</h2>}

        {DATA.map(element => <Carte
          key={element.code}
          nom={element.nom}
          dpt={element.departement?.code || element.codeDepartement }
          cp={element.codesPostaux[0]}
          pop={FORMATpop? element.population : formatpopulation(element.population)}
        />)}

      </Corps>

      <Pied />

    </>);

  }