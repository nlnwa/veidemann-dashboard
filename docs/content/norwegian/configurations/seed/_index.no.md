---
title: "Seeds"
weight: 2
---

En seed beskriver ett nettsted som Veidemann skal høste, og må være tilknyttet en [entitet](../entity). 
Den består av [metadata](../#veidemann-meta), men i denne implementasjonen er navn byttet ut med URL. 
Ellers består en seed av feltene:


Felt           | Betydning
---------------|------------------------------------------------------------------------------
Entitens ID    | Id for entiteten seeden er tilknyttet
Deaktiver      | Bestemmer om seeden skal høstes eller ikke
Surt prefiks   | Feltet blir automatisk generert av URL
Jobb           | Bestemmer hvilken [crawljob](../crawljob) som skal brukes til å høste seeden.  

#### Opprette en ny seed
--------------------------
Siden en seed må være tilknyttet en entitet, må en seed opprettes fra en entitet som beskrevet 
[her](../entity/#entity-add-seed).

![seeds overview](/veidemann/docs/img/seed/veidemann_dashboard_seed_detail.png)

##### Validering av URL
----------------------

##### Flytte eksisterende seed

![move_seeds](/veidemann/docs/img/seed/veidemann_dashboard_seed_move.png)

#### Søk, sortering og filtrering av tilgjengelige seeds
----------------------------------------------------------

For å redusere utvalget i listen over tilgjengelige seeds, kan man benytte seg av søk og filtrering.
Søk og sortering fungerer likt som i andre konfigurasjoner, som beskrevet [her](../#config-search-filter-sort)  
I tillegg kan listen filtreres til å:

1. Kun vise seeds tilknyttet bestemte [høstejobber](../crawljob).  
Når feltet for crawljob filteret blir trykket, hentes en liste over eksisterende høstejobber.
Krysser man av for en til flere høstejobber, vil listen over seeds kun inneholde seeds som
bruker disse jobbene. 

![crawljob_filter](/veidemann/docs/img/seed/veidemann_dashboard_seed_crawljob_filter.png)

2. Vise seeds tilknyttet en entitet.  
Ved å angi ID-en for en entitet, vil listen kun inneholde seeds som tilhører denne. 
Feltet kan enten fylles inn manuelt, eller automatisk ved å følge snarveien 
[*gå til seedliste*](../entity/#entity-list-seeds) for en entitet. 
