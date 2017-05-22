# Installeren

<ol>
<li>Download en installeer Yarn (https://yarnpkg.com/en/)</li>
<li>Download of fork deze repo</li>
<li>Open een terminal en ga naar de project folder root</li>
<li>Type in terminal: 'yarn install' om alle modules te installeren</li>
<li>Om het project te starten: 'yarn dev'</li>
<li>ga in je browser naar localhost:8080</li>
<li>Om het project te builden (alleen voor productie): 'yarn build'</li>
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
<li><b>static utility method:</b> Zie src/game/Preloader voor een static class.</li>
<li><b>singleton:</b> zie src/game/Game voor een singleton class.</li>
<li><b>strategy:</b> zie src/game/GameObject. Hier wordt gebruik gemaakt van strategy pattern bij de movementController. Ook src/game/ObstacleMgr maakt gebruik van strategy pattern met obstacles (zie src/game/obstacles folder).</li>
<li><b>encapsulation:</b> waar niet?</li>
<li><b>composition/Inheritance: zie Plane/DistanceIndicator die inheriten van Gameobject en overriden of bekijk src/game/obstacles/Single die van ObstacleShape inherit en override.</b></li>
<li><b></b></li>
</ol>
