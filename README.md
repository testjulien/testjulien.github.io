# Trouve ta ville

C'est parti pour un atelier sur lequel tu vas trouver 2 types d'exercice

- Un premier exercice qui va te permettre de reprendre avec les étapes les notions de la saison, ni plus, ni moins
- Des fonctionnalités à ajouter ensuite en exploration selon tes envies

Sur ce projet prends le temps sur les étapes qui t'intéressent, le but est de faire la synthèse des jours passés, se faire plaisir et de peaufiner une interface qu'on pourra pourquoi pas mettre dans ses projets sur github.

Autrement au niveau de la structure en place, on a juste configuré Parcel et Jest et installé React et React-DOM, ensuite tout est à faire. Pour la partie CSS sens-toi libre de suivre les captures d'écran ou de faire selon tes choix. 

---

## Partie 1 - Retour sur la saison

On va commencer par des fonctionnalités qu'on connait un peu histoire de reprendre tout ça.

Voici l'interface attendue

Ecran d'accueil

![](./docs/screen1.png)

Ecran de résultat

![](./docs/screen2.png)

Après changement de format de la population

![](./docs/screen3.png)

1. Commence par te représenter ton découpage en composant et leurs props
2. Demande toi ce qui nécessitera d'être représenté par un state

Ensuite on attaque, voici le plan :

- Décrire une interface déjà statique
- Ajouter la recherche à la soumission du formulaire
- Ajouter le formattage de l'affichage de la population, pour cette partie on va mettre en place des tests unitaires en prime

Pour récupérer les informations des villes on va utiliser l'[api du gouvernement](https://geo.api.gouv.fr/decoupage-administratif/communes)

Si tu le sens, organise-toi par toi-même pour atteindre ces objectifs

Sinon voici une proposition de plan plus détaillé 

### Décrire une interface déjà statique

- Complète l'`index.html` avec une `div` pour accueillir le rendu de React et une balise `script` pour lier le point d'entrée JS
- Complète ton point d'entrée JS avec le rendu d'un élement React avec ReactDOM
- Décrit ton interface à travers des composants (ça devrait te rappeler notre dernier projet)
  - Un composant `FindCity` (ou appelle le comme tu veux) qui appelle 2 enfants
    - Un composant `Search` pour le formulaire de recherche
    - Un composant `List` pour la liste de résultats qui appelle plusieurs fois un composant en fant
      - `Item` pour le détail d'une ville
- Complète la structure de chaque composant en faisant tes choix de balises
- Tu peux déjà poser tes classes et appliquer quelques styles CSS pour mettre en forme ton interface  
  Tu es libre d'aller au plus simple pour te concentrer sur les fonctionnalités et y revenir plus tard
- Ajoute des props à `Item` dans sa définition pour rendre paramétrable le nom de la ville, son code postal et sa populaltion
- Passe des valeurs en dur via ces props depuis le composant `List` à tes `Item` pour voir si ça les configure bien
- Ajoute une props à `List` dans sa définition pour rendre paramétrable une liste de résultat
- Passe un tableau définit en dur via cette props depuis le composant `FindCity` à `List`  
  Ce tableau doit représenter une liste de ville caractérisée par un nom, un code postal et une population
  Par anticipation tu peux regarder le format de ce que nous renverra l'api dans la [doc du gouvernement](https://geo.api.gouv.fr/decoupage-administratif/communes#name)
- Remplace tes appels à `Item` dans `List` par la construction d'une liste d'`Item` via `map` sur le tableau reçu en props

Et voilà, arrivé à ce stade on a fait le rendu avec ReactDOM d'une interface décrite dans des composants React paramétrés via des props.  
En modularisant judicieusement nos composants afin d'éviter les répétitions, une bonne pratique indispensable à tout projet évolutif.  
C'est la mise en application de ce qu'on a fait les jours 4 à 7 de ce module.

Passons à la suite

### Ajouter la recherche à la soumission du formulaire

On se représente ce qu'on va faire : la recherche va évoluer dans le temps ainsi que la liste de résultats donc on va les réprésenter via l'état de l'application.  
On va déclencher un nouveau state pour la recherche à la soumission du formulaire.  
En réaction à ce nouveau state on va déclencher un effet pour appeler l'api.  
Au retour de l'api on va déclencher un nouveau state pour la liste de résultats.  
On va faire en sorte de diffuser ce state via les props à `List` pour que la liste affichée reflètent le state.

Donc concrètement :

- Initialise un state dans `FindCity` qui représente le terme recherché (initialement une chaîne vide)
- Passe la fonction qui permet de modifier ce state à `Search` via les props
- Récupère la fonction dans la définition des props de `Search`
- Pose un écouteur au submit du formulaire présent dans `Search`
- Empeche la soumission par défaut
- Déclenche un nouveau state au submit en execution la fonction précédente et en lui passant la valeur du champ en argument (fais un champ contrôlé ou non ou passe par le DOM pour connaitre la valeur du champ, comme tu le sens)
- Tu peux contrôler dans le devtools que le state de `FindCity` évolue au submit
- Pose un useEffect dans `FindCity` avec un tableau de dépendance contenant ton state représentant la recherche  
  Ainsi ton effet ce déclenchera après chaque rendu ou la recherche a changé
- Dans ton rendu, vérifie que la recherche n'est pas vide (on ne veut pas appeler l'api quand la recherche est vide)  
- Si ce n'est pas vide déclenche un appel API vers le [endpoint qui permet la recherche par nom](https://geo.api.gouv.fr/decoupage-administratif/communes#name)  
  C'est à dire `https://geo.api.gouv.fr/communes?nom=NOM_A_CHERCHER` où `NOM_A_CHERCHER` est la valeur de ton state représentant la recherche
- Récupère et contrôle le retour de l'api
- Initialise un 2ème state dans `FindCity` qui représente cette fois la liste de résultats (initialement un tableau vide)
- Execute la fonction qui permet de modifier ce state au retour de l'api en lui passant les résultats obtenus
- Tu peux contrôler dans le devtools que le state de `FindCity` évolue au submit puis au retour de l'api
- Passe la valeur du state représentant la liste de résultats depuis `FindCity` via la props que tu avais prévu sur le composant `List`

A ce stade la recherche doit être complètement fonctionnelle, tu peux si tu le souhaite ajouter un état de chargement

- Initialise un 3ème state dans `FindCity` qui représente l'état de chargement (initialement faux)
- Execute la fonction qui modifie ce state juste avant l'appel à l'api pour activer l'état de chargement
- Execute la à nouveau après le retour de l'api pour désactive l'état de chargement
- Ajoute un affichage conditionnel (via l'opérateur `&&`) dans la descriptions de tes élements pour un paragraphe invitant à patienter quand l'état de chargement est vrai

Bravo, à ce stade tu as repris ce qu'on a vu sur les 3 premiers jours de la saison avec l'AJAX ainsi que les journées 8 à 11 sur les hooks

### Ajouter le formattage de l'affichage de la population avec des tests

Si tu compte bien il ne reste plus que la journée 12 sur les tests qu'on n'a pas mis en application

On va construire une fonction capable de formatter un nombre selon nos règles dont on pourra ensuite se servir dans notre application

On veut une fonction qui prend en entrée un nombre représantant une population et
1. qui devrait, pour une popultation d'au moins 1 milion d'habitants, retourner le nombre divisé par 1 milion, avec une virgule comme marqueur de décimal et le caractère M
2. qui devrait, pour une popultation d'au moins 1000 d'habitants, retourner le nombre divisé par 1000, avec une virgule comme marqueur de décimal et le caractère K
3. qui devrait, pour une population inférieure à 1000 habitants, retourner le nombre d'habitant inchangé

Construisons cette fonction avec des tests

- Crée un fichier `formatPopulation.js` dans `./src/components/Item` qui contiendra notre fonction qu'on exportera
- Crée un fichier `formatPopulation.test.js` au même endroit, il contiendra nos tests
- Tu peux appeler `describe` dans ton fichier test pour ranger les tests qu'on s'apprête à écrire, ils décrivent `formatPopulation` (tu peux donc passer ce nom en string à describe)
- Pose un premier test via la fonction `test` de jest, il devra vérifier le point 1. précédent (tu peux donc reprendra la phrase dans la string passé à test)
- Dans ton test, execute la fonction `formatPopulation` en lui passant en argument un nombre supérieur à 1 milion, disons `1234567`
- Passe le résultat obtenu à la fonction `expect` de jest et appelle directement dessus la méthode `toBe` pour dire que tu attend le résultat `1,23 M`
- Execute tes tests avec `npm run test:watch`, pour le moment il doit échouer (en rouge), forcément on n'a pas encore compléter la fonction
- Complète ta fonction pour dire _Si la valeur du paramètre d'entrée est supérieure ou égale à 1 milion, je retourne ce nombre divisé par 1 milion après avoir remplacé le `.` des décimales par une `,` et ajouté la lettre `M` au bout_
- Quand tu auras effectivement bien codé ça, ton test devrait passer en vert
- Passons au point 2., pour cela pose une nouveau `test` qui reprend cette phrase
- Place l'assertion avec `expect` dans ce test. Essaye cette fois-ci `1234` en entrée, on devrait avoir `1,23 K` en sortie et regarde ton test passer en rouge
- Complète ta fonction pour dire _Si la valeur du paramètre d'entrée est supérieure ou égale à 1000, je retourne ce nombre divisé par 1000 après avoir remplacé le `.` des décimales par une `,` et ajouté la lettre `K` au bout_
- Dès que ton test passe au vert, passe au point 3., ajoute un `test` pour cela
- Fais la dernière assertion avec `expect`
- Complète ta fonction pour faire passer ce 3ème test

Bravo tu viens de construire une fonction en TDD. On vient donc de reprendre la dernière journée

Mais ce n'est pas fini, il nous reste à exploiter cette fonction

Maintenant que tu as tout revu je te guide moins sur les dernières étapes.

- Ajoute une state qui réprésente le fait qu'on formatte oui ou non la population
- Change la valeur de ce state au clic sur le bouton correspondant
- Passe la valeur de ce state jusqu'au composant qui affiche la population via les props
- En fonction de la valeur du state, affiche soit la valeur de la population inchangée, soit la valeur retournée par ta fonction `formatPopulation`

Et voilà, bien joué, à ce stade on a déjà un projet canon.

Tu peux peaufiner ton CSS maintenant puis voir ce qui t'intéresse dans la suite.

---

## Partie 2 - Exploration

Voici des idées de fonctionnalités. Je ne te donne pas de détails.  
Sens-toi libre de faire ce qui t'inspire, dans l'ordre que tu le souhaite.  
Tu peux même faire des fonctionnalités complètement différentes si cela te dis.  
Voir même travailler un autre projet de ton invention pour alimenter ton portfolio si tu préfères.

### Recherche par code postal

En regardant plus en détail la [doc du gouvernement](https://geo.api.gouv.fr/decoupage-administratif/communes), tu verras qu'il est possible de faire une recherche par code postal

Essaye de la mettre, avec exactement la même présentation que la partie 1. 

2 options : soit tu répètes énormément de code, soit tu rends ton composant `FindCity` paramétrable via les props et tu l'utilises 2 fois, un coup pour rechercher par nom, un coup par code postal. Je te laisse deviner quelle solution est préférable.

### Découverte du hook [`useContext`](https://react.dev/reference/react/useContext)

Diffuser le state via les props, ça peut être fastidieux. 

Par exemple si tu as mis en place la recherche par commune et par code postal, et que tu veux que le state gérant le formattage ou non de la population soit globale aux résultats de ces 2 formulaire. Il va falloir placer ton state haut dans l'arbre des composants et le diffuser vers le bas via plein de props

Ou pas si tu pars sur l'utilisation d'un context. C'est de l'exploration je te laisse essayer

### Tester une bibliotèque de composant

On avait cité [AntD](https://ant.design/) et [MUI](https://mui.com/) pour éviter d'avoir à poser trop de CSS

Pourquoi pas tester [AriaKit](https://ariakit.org/) qui fourni des composants acessibles.
Par exemple son composant [Tab](https://ariakit.org/components/tab) pourrait nous permettre de passer d'un formulaire à l'autre si tu as fais le premier exercice. Autrement test le composant Heading pour les titres.

### Se réconcilier avec l'URL avec React-router-dom

C'est souvent une question qu'on se pose quand on fait une SPA. Pourquoi pas tester [React-Router-DOM](https://reactrouter.com/en/main) qui utilise l'api history du navigateur qui permet de modifier l'historique et l'url dans le navigateur via javascript.

Je te laisse explorer la documentation, il pourrait être intéressant d'avoir 3 routes (qui donneront l'impression d'avoir 3 pages sur notre SPA)
- Une route d'accueil pour souhaiter la bienvenue et présenter notre application
- Une route de recherche pour l'affichage de nos formulaires
- Une route à propos pour préciser que c'est TOI qui a réalisé cette interface

### La météo des villes

L'api [OpenWeather](https://openweathermap.org/api) permet de récupérer la météo des villes [par code postal](https://openweathermap.org/current#zip).

Cela pourrait être chouette sur notre site. Au clic sur une ville par exemple ou autrement selon ce que tu imagines.

Pour utiliser cette API il faudra créer un compte pour obtenir une clé API (gratuite)

### Autre

Si tu as d'autres idées, fais-toi plaisir !
