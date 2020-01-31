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
  
![seeds overview](/veidemann/docs/img/seed/veidemann_dashboard_seed_overview.png)  

#### Listen over tilgjengelige seeds
-------------------------------------

##### Snarveier i listen over seeds
-----------------------------------
Ikon                                                                                                 | Snarvei
-----------------------------------------------------------------------------------------------------|---------------------------------------------------                                                                              
![show_crawlexecution](/veidemann/docs/img/icons/veidemann_dashboard_icon_report_crawlexecution.png) | Vis høstinger som er blitt gjort av denne seeden
![show_crawljob](/veidemann/docs/img/icons/veidemann_dashboard_icon_crawljob.png)                    | Vis høstejobben som brukes for å høste denne seeden
![filter_seeds_with_entity](/veidemann/docs/img/icons/veidemann_dashboard_icon_entity.png)           | Filtrer listen til å vise seeds med samme entitet.
![clone_seed](/veidemann/docs/img/icons/veidemann_dashboard_icon_clone_config.png)                   | Lag en klone av seeden  
  
##### Søk, sortering og filtrering
----------------------------------

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

    
#### Opprette en ny seed
--------------------------
Siden en seed må være tilknyttet en entitet, må en seed opprettes fra en entitet som beskrevet 
[her](../entity/#entity-add-seed).


##### Validering av URL
----------------------
Når det skrives i URL-feltet, vil innholdet i feltet bli validert.
Dersom det blir lagt til en URL som ikker er gyldig, vil en feilmelding vises under feltet.
En URL blir her regnet som gyldig så lenge den inneholder:
- Skjema: http / https etterfulgt av ://
- Host: hostnavn bestående av minimum 2 delere. Eks. **nb.no** eller **www.nb.no**

##### Flytte eksisterende seed
En annen del av valideringen er at det sjekkes om en seed med samme URL finnes fra før.
Dersom dette er tilfellet vil en liste med treff vises under feltet.

Den første sjekken ser om en seed med samme URL allerede eksisterer for entiteten. 
Dersom det gjør det, vises snarveier for å fjerne URL fra listen som hindrer at duplikate seeds blir opprettet for entiteten.
Her kan man enten fjerne alle duplikater man har i feltet, eller fjerne en og en. 
Dersom man likevel mener at seeden bør legges til, kan skjemaet fortsatt lagres selv om det ikke validerer.

Videre sjekkes det om en seed med samme URL eksisterer for en annen entitet. 
Om en match finnes vises også dette i listen. 
Om man mener at seeden hører til under entiteten man jobber med, kan denne flyttes ved å trykke på pilen.
Er det mange i listen kan knappen øverst benyttes for å flytte alle.
En seed som er flyttet fra en annen entitet vil få en label med ID-en til entiteten den er flyttet fra.
![seed_exists_for_entity](/veidemann/docs/img/seed/veidemann_dashboard_seed_remove_duplicates.png)


![move_seeds](/veidemann/docs/img/seed/veidemann_dashboard_seed_move.png)

 

