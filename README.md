# Installeren

<ol>
<li>Download en installeer Yarn (https://yarnpkg.com/en/) (optioneel, aanrader)</li>
<li>Download of fork deze repo</li>
<li>Open een terminal en ga naar de project folder root</li>
<li>Type in terminal: `yarn install` of `npm run install` om alle modules te installeren</li>
<li>Om de dev-server te starten: `yarn dev` of `npm run dev`</li>
<li>ga in je browser naar localhost:8080</li>
<li>Om het project te builden (alleen voor productie): `yarn build` of `npm run dev`</li>
</ol>

# Webstorm configuratie

<ol>
<li>Om TSLint te configureren ga je naar <b>Preferences</b> (WebStorm -> Preferences of CMD + ,)</li>
<li>Dan navigeer je naar <b>Languages & Frameworks</b> -> <b>TypeScript</b> -> TSLint</li>
<li>Klik op <b>Enable</b></li>
<li>Check of de <i>Node interpreter</i> goed staat (als je Node global hebt geinstalleerd, zou er <b>/user/local/bin/node</b> moeten staan)</li>
<li>Check of TSLint package goed staat (zou moeten verwijzen naar tslint in de node_modules map van deze project folder)</li>
<li>Selecteer vervolgens <b>Configuration File</b> en klik op de <b>...</b> aan de rechterzijde om de file browser te openen</li>
<li>Zoek hier naar de <b>tslint.json</b> file in de root folder van dit project</li>
<li>Klik op Apply en OK.</li>
</ol>

# Onderdelen
<ol>
<li><b>interface:</b> zie src/game/interfaces voor alle interfaces. Zie src/game/movement/MovesY voor een implementatie.</li>
<li><b>static utility method:</b> Er zijn meerdere static (utility) methods. Zie src/utils voor verschillende static classes met utility methods.</li>
<li><b>singleton:</b> zie src/game/Game en /Score voor een singleton class.</li>
<li><b>strategy:</b> zie src/game/GameObject. Hier wordt gebruik gemaakt van strategy pattern bij de movementController.</li>
<li><b>encapsulation:</b> waar niet?</li>
<li><b>composition/Inheritance:</b> zie src/game/Plane of DistanceIndicator die inheriten van Gameobject en overriden of bekijk src/game/obstacles/Single die van ObstacleShape inherit en override.</li>
</ol>

# De game
http://sandervispoel.nl/projects/towerFlyer/

# Review (Lennart — week 4)
Geen, code is voor zo ver ik het weet goed en netjes geschreven.

<h4>Eisen deelproduct</h4>
Deel product maakt gebruik van:

- Interface 
- Static utility method
- Singleton
- Stragety
- Encapsulation
- Composition
- Inheritance

Ook is de klassendiagram aanwezig die erg uitgebreidt is, en dan ook ruim voldoende is.
Er is ook een live versie van de game aanwezig.

<h4>Eindoordeel</h4>
Alles ziet er netjes en verzorgd uit. Een duidelijk installatie uitleg waardoor je snel aan de gang kan gaan. Alle eisen aan het deelproduct
zitten er dan ook in. Van A tot Z oogt dan ook erg professioneel. Ik vond het lastig om iets aan de code toe te voegen of te veranderen, omdat 
ik het gevoel had dat dit niet nodig was. Het enigste kritiekpuntje is dat de colission nog niet toegevoegd is (de class is leeg). Maar ik ga er vanuit dat dit er 
nog aankomt.
