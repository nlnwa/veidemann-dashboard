---
title: "CrawlExecution"
weight: 2
---

Fra denne siden kan man lese statusrapporter for seeds som høstes eller som har blitt høstet tidligere.
Rapportene inneholder data om hvordan høstingen av en [seed](../../configurations/seed) har gått.
 

![report_crawlexecution_overview](/veidemann/docs/img/report/crawlexecution/veidemann_dashboard_report_crawlexecution_overview.png)


#### Liste over seeds {#crawlExecution-list}
---------------------
Listen inneholder alle seeds som blir eller har blitt høstet av Veidemann.
Her har vi kolonnene:

Kolonne     | Beskrivelse
------------|------------
Seed        | URL for seed som skal høstes
Jobb        | Hvilken jobb som ble benyttet for å høste seeden
Status      | Statusen for høstingen av seeden
Opprettet   | Tidspunktet seeden ble lagt til for å høstes
Startet     | Tidspunktet høstingen av seeden startet
Sist endret | Tisdpunktet det sist skjedde noe med seeden (endret status)
Avsluttet   | Tidspunktet seeden var ferdig høstet

Ved å trykke på en rad i listen vil [CrawlExecution](#crawlExecution) for denne seeden vises.

##### Snarveier
---------------
Ikon                                                                         | Snarvei
-----------------------------------------------------------------------------|-------------------------------------------------------------
![seed](/veidemann/docs/img/icons/veidemann_dashboard_icon_seed.png)         | Gå til [seed](../../configuration/seed) konfigurasjonen
![crawljob](/veidemann/docs/img/icons/veidemann_dashboard_icon_crawljob.png) | Gå til [crawljob](../../configuration/crawljob) konfigurasjonen

##### Sortering og filtrering
-----------------------------
Listen kan sorteres og filtreres på ulike måter.   
Kolonnene **seed**,**jobb** og **status** kan sorteres alfabetisk, mens **opprettet**, **startet**, **sist endret** og **avsluttet** sorterer 
dato fra eldste til nyeste eller omvendt.

Filtrene som kan benyttes er:

Filter   | Funksjon
---------|---------
State    | Velg en state for å kun vise crawlexecutions som har denne statusen i listen
Crawljob | Velg en CrawlJob for å kun vise crawlexecutions som bruker denne jobben
Seed ID  | Skriv inn en Seed ID for å bare vise crawlexecutions for denne seeden i listen
Feilede  | Kryss av for å bare vise crawlexecutions som har status FAILED i listen
Fra      | Skriv inn en dato eller klikk på kalenderen for å velge en dato. Listen vil da vise crawlexecutions som ble startet fra og med denne datoen
Til      | Skriv inn en dato eller klikk på kalenderen for å velge en dato. Listen vil da vise crawlexecutions som ble avsluttet til og med denne datoen  

#### CrawlExecution {#crawlExecution}
-----------------------------------

Når en rad i listen velges vises all tilgjengelig informasjon om høstingen av en seed (CrawlExecution).

I øverste del av bildet finner man den overordnede statusen for høstingen med de samme feltene som  er brukt i [listen](#crawlExecution-list).   

##### Statistikk
---------------
Tabellen viser et samlet resultat for hele kjøringen,
og består av feltene som vist i tabellen under.

Statistikk             | Beskrivelse
-----------------------|-------------------------------
URIs crawled           | Antall URI-er som er blitt høstet
Bytes crawled          | Antall bytes som er høstet
Documents crawled      | Antall dokumenter som er blitt høstet
Documents denied       | Antall dokumenter som ble nektet adgang til å høstes (betalingsmur, robots.txt etc.)
Documents failed       | Antall dokumenter som feilet under høsting
Documents out of scope | Antall dokumenter som ble funnet utenfor omfanget til seeden (bestemt av [surt prefix](../../configurations/seed/#seed-surtPrefix)
Documents retried      | Antall dokumenter som ble forsøkt lastet flere ganger for å høstes

##### Feilmeldinger
---------------------
Om en feil har oppstått under høstingen av seeden, vil den vises her.

##### Current URIs
-------------------
Listen viser ID-er til

##### ID-er
--------------
I bunnen på siden finner man fire ID-er.

- Id: Et unikt nummer som identifiserer den aktuelle kjøringen av jobben (JobExecution)
- Seed Id:
- Job Id: ID-en til [crawljob](../../configurations/crawljob) brukt i høstingen. Ved å trykke på linken blir man tatt til konfigurasjonssiden for jobben.
- Job Execution Id: ID-en til [JobExecution](../crawljob) som blir brukt til å høste seeden. Ved å trykke på linken blir man tatt til rapportsiden for jobben.
