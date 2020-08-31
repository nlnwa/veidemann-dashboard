---
title: "Pagelog"
weight: 3
---

Fra denne siden kan man lese statusrapporter for høstingen av en spesifikk side. 
Rapportene inneholder data om hvilke ressurser som ble lastet ned, og linker som ble funnet på siden.
 

![report_pagelog_overview](/veidemann/docs/img/report/pagelog/veidemann_dashboard_report_pagelog_overview.png)


#### Liste over pagelogs {#pagelog-list}
---------------------
Listen inneholder alle URI'er som har blitt høstet av Veidemann.
Her har vi kolonnene:

Kolonne     | Beskrivelse
------------|------------
URI         | Adresse til siden som er høstet
Resources   | Antall ressurser som er funnet på siden
Outlinks    | Antall linker som er funnet på siden

Ved å trykke på en rad i listen vil [Pagelog](#pagelog) for denne siden vises.

##### Snarveier
---------------
Ikon                                                                                            | Snarvei
------------------------------------------------------------------------------------------------|-------------------------------------------------------------
![jobexecution](/veidemann/docs/img/icons/veidemann_dashboard_icon_report_crawljob.png)         | Gå til  [rapport](../../report/crawljob) for høstejobben som høstet siden
![crawlexecution](/veidemann/docs/img/icons/veidemann_dashboard_icon_report_crawlexecution.png) | Gå til [rapport](../../report/crawlexecution) for høstingen av seeden hvor denne siden ble funnet
![search_wayback](/veidemann/docs/img/icons/veidemann_dashboard_icon_wayback.png)               | Søk etter siden i visningstjeneste

##### Sortering og filtrering
-----------------------------
Listen kan filtreres på ulike måter.   

Filtrene som kan benyttes er:

Filter          | Funksjon
----------------|---------------------------------------------------------------------------------------------------------------------------------------------
JobExecution ID | Skriv inn en [JobExecution ID](../../report/crawljob) for å bare vise pagelog for sider høstet i denne jobben
Execution ID    | Skriv inn en [Execution ID](../../report/crawlexecution) for å bare vise pagelog for høsting av en bestemt seed
URI             | Filtrer listen til å bare vise resultater for en bestemt URI
  
  
#### Pagelog {#pagelog}
----------------------------------

Når en rad i listen velges vises en detaljert oversikt over resultatet av innhøstingen av siden. 

Øverst i bildet blir det vist grunnleggende informasjon om høstingen av siden.

Kolonne         | Beskrivelse
----------------|-------------------------------------------------------------------------------------------------------------------------
URI             | Adresse til siden som er høstet 
Referrer        | Adresse til hvor siden ble funnet 
Collection name | Navnet på samlingen innholdet ble lagret i
Method          | Hvilken [HTTP metode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) som ble brukt til å hente innholdet 

##### Resources 
----------------

Ved å trykke på panelet utvides dette til å vise en liste over ressurser funnet på siden, som bilder, styling, javascript osv.
I listen vises URI, finsti og en snarvei for å søke opp ressursen i visningstjenesten.   

![pagelog_resources](/veidemann/docs/img/report/pagelog/veidemann_dashboard_report_pagelog_resources.png)

Ved å trykke på en ressurs i listen, utvides denne og viser ytterligere informasjon om ressursen.

Felt           | Besrkivelse
---------------|------------
uri            | Adresse til ressursen
From cahce     | Er ressursen hentet fra cache
Renderable     | ...
Resource type  | Type ressurs 
Mime type      | [MIME type](https://en.wikipedia.org/wiki/Media_type) for ressursen
Status code    | Hilken [HTTP-statuskode](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) høsteren fikk ved henting av ressursen 
Discovery path | Stegene som ble tatt for å finne URI. Se [Discovery path](../crawllog/#discoveryPath)
WARC ID        | ID for WARC record
Referrer       | Adresse for hvor ressursen ble funnet
Method         | Hvilken [HTTP metode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) som ble brukt til å hente ressursen


##### Outlinks
---------------  

Ved å trykke på panelet utvides dette til å vise en liste med lenker som ble funnet på siden. 
Listen er utformet som et tre, så ved å trykke på en lenke, vises andre lenker som ble funnet under denne. 
Ved å trykke på en av lenkene, går nettleseren til lenken på web. 

![pagelog_outlinks](/veidemann/docs/img/report/pagelog/veidemann_dashboard_report_pagelog_outlinks.png)  

##### ID-er
-------------
I bunnen på siden finner man tre ID-er.  

- WARC id: ID til WARC-record hvor det innehøstede materialet er lagret.
- Job execution id: ID-en til [JobExecution](../crawljob) som blir brukt til å høste seeden. Ved å trykke på linken blir man tatt til rapportsiden for jobben.
- Crawl execution id: ID-en til [CrawlExection](../crawlexecution) som blir brukt til å høste seeden. Ved å trykke på linken blir man tatt til rapportsiden for høstingen av seeden.

