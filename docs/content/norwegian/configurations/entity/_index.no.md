---
title: "Entiter"
weight: 1
---

En entiet i Veidemann er typisk en eier av et nettsted, og består av [metadata](../#veidemann-meta) og en eller flere 
tilknyttede [seeds](../seed).

![Entities list](/veidemann/docs/img/entity/veidemann_dashboard_entity_list.png)

#### Snarveier i liste over entiteter  

Ikon                                                                                      | Snarvei 
------------------------------------------------------------------------------------------|--------------------------------------------
![list_seeds icon](/veidemann/docs/img/icons/veidemann_dashboard_icon_list_seeds.png)     | Vis liste over seeds tilknyttet entiteten
![create_seed icon](/veidemann/docs/img/icons/veidemann_dashboard_icon_add_seed.png)      | Opprett en ny seed tilknyttet entiteten
![clone_entity icon](/veidemann/docs/img/icons/veidemann_dashboard_icon_clone_config.png) | Lag en klone av entiteten


#### Liste over seeds tilknyttet entitet {#entity-list-seeds}
----------------------------------------
Fra snarveien i listen, kan man se alle seeds som er tilkoblet denne entiten.

![Entity_seed_list_shortcut](/veidemann/docs/img/entity/veidemann_dashboard_entity_list_seeds_shortcut.png)
![Entity_seed_list](/veidemann/docs/img/entity/veidemann_dashboard_entity_list_seeds.png)


#### Opprette ny seed {#entity-add-seed}
---------------------
Siden en seed må ha en referanse til en entitet, er starten for å legge til en ny seed gjort fra denne siden.
Start med å finne entiteten i listen over tilgjengelige entiteter som du vil koble den nye seeden til.
Eksisterer ikke entiten, kan den opprettes ved å trykke på *opprett ny* knappen øverst i menyen.
Hold musepekeren over ønsket entitet og trykk på knappen med plussymbolet for opprette den nye seeden. 
Konfigurasjonssiden for seeds vil åpnes, med referanse til entiteten du åpnet siden fra. 
Øverst i bildet vises info om entiteten og alle seeds denne har fra før. Nederst vises skjemaet for informasjon 
om seeden kan fylles inn. En nærmere beskrivelse av felten til en seed konfigurasjon kan ses [her](../seed).  

Ettersom seeds for en entitet ofte har lik konfigurasjon, er det mulig å opprette flere seeds samtidig. 
Legg inn en URL og skill den fra den neste i listen med mellomrom eller linjeskift. Alle URL-ene blir da validert og
sjekket om de eksisterer fra før.

![Entity_create_seed](/veidemann/docs/img/entity/veidemann_dashboard_entity_add_seed.png)
![Entity_create_seeds](/veidemann/docs/img/entity/veidemann_dashboard_entity_create_seeds.png)
