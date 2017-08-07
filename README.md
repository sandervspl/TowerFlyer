# De game
http://sandervispoel.nl/projects/towerFlyer/

# Installeren


1. Download en installeer Yarn (https://yarnpkg.com/en/) (optioneel, aanrader)
2. Download of fork deze repo
3. Open een terminal en ga naar de project folder root
4. Type in terminal: `yarn install` of `npm install` om alle modules te installeren
5. Om de dev-server te starten: `yarn dev` of `npm run dev`
6. ga in je browser naar `localhost:8080`
7. Om het project te builden (alleen voor productie): `yarn build` of `npm run dev`

# Webstorm configuratie

1. Om TSLint te configureren ga je naar **Preferences** (WebStorm -> Preferences of CMD + ,).
2. Dan navigeer je naar **Languages & Frameworks** -> **TypeScript** -> TSLint.
3. Klik op **Enable**.
4. Check of de *Node interpreter* goed staat (als je Node global hebt geinstalleerd, zou er **/user/local/bin/node** moeten staan).
5. Check of TSLint package goed staat (zou moeten verwijzen naar tslint in de node_modules map van deze project folder).
6. Selecteer vervolgens **Configuration File** en klik op de **...** aan de rechterzijde om de file browser te openen.
7. Zoek hier naar de `tslint.json` file in de root folder van dit project.
8. Klik op **Apply** en **OK**.

# Onderdelen
* **interface**: zie `src/game/interfaces` voor alle *interfaces*. Zie `src/game/movement/MovesY` voor een implementatie.
* **static utility method**: Er zijn meerdere static (utility) methods. Zie `src/utils` voor verschillende static classes met utility methods.
* **singleton**: zie `src/game/Game` en `/Score` voor een *singleton class*.
* **strategy**: zie `src/game/GameObject`. Hier wordt gebruik gemaakt van *strategy pattern* bij de `movementController`.
* **encapsulation**: waar niet?
* **composition/Inheritance**: zie `src/game/Plane` of `src/game/DistanceIndicator` die *inheriten* van `GameObject` en overriden of bekijk `src/game/obstacles/Single` die van `ObstacleShape` inherit en override.
* **observer pattern**: De interfaces voor observer en subject zijn te vinden onder `src/interfaces`. *Observers* zijn `src/game/obstacles/ObstacleShape`s en de *Subject* is `src/game/ObstacleMgr`.

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
