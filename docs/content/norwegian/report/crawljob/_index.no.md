---
title: "CrawlJob"
weight: 1
---

Fra denne siden kan man lese statusrapporter for høstejobber som kjører og som har blitt kjørt tidligere.
Rapportene inneholder data om hvordan en kjøring av en [crawljob](../../configurations/crawljob) har gått.
Her finner man en overordnet statistikk for hele kjøringen, samt status for alle seeds som ble høstet i denne jobben. 

![report_crawljob_overview](/veidemann/docs/img/report/crawljob/veidemann_dashboard_report_crawljob_overview.png)


#### Liste over jobber
-----------------------
Listen inneholder alle kjørende og kjørte jobber som finnes i Veidemann.
Hver rad viser navnet på jobben, status, start og slutttid (om jobben er avsluttet).
Ved å trykke på en rad i listen vil [JobExecution](#jobExecution) for denne jobben vises.

##### Snarveier
---------------
Ikon                                                                         | Snarvei
-----------------------------------------------------------------------------|-------------------------------------------------------------
![crawljob](/veidemann/docs/img/icons/veidemann_dashboard_icon_crawljob.png) | Gå til [crawljob](../../configuration/crawljob) konfigurasjonen

##### Sortering og filtrering
-----------------------------
Listen kan sorteres og filtreres på ulike måter.   
Kolonnene **jobb** og **status** kan sorteres alfabetisk, mens **start** og **sluttid** sorterer 
dato fra eldste til nyeste eller omvendt.

Filtrene som kan benyttes er:

Filter   | Funksjon
---------|---------
State    | Velg en state for å kun vise jobexecutions som har denne statusen i listen
Crawljob | Velg en CrawlJob for å kun vise jobexecutions som bruker denne jobben
Fra      | Skriv inn en dato eller klikk på kalenderen for å velge en dato. Listen vil da vise jobber som ble startet fra og med denne datoen
Til      | Skriv inn en dato eller klikk på kalenderen for å velge en dato. Listen vil da vise jobber som ble avsluttet til og med denne datoen  

#### JobExecution {#jobExecution}
-----------------------------------
Når en rad i listen velges vises all tilgjengelig informasjon om kjøringen av en jobb (JobExecution).

I øverste del av bildet finner man den overordnede statusen for jobben med følgende felter:   

Felt         | Beskrivelse
-------------|-------------------
Jobb         | Navnet på jobben. Hvilken [crawljob](../../configurations/crawljob) som ble benyttet
Status       | Statusen for kjøringen av jobben. En oversikt over de forskjellige statusene er gitt i tabellen under
Start        | Tidspunktet (UTC) jobben ble startet 
Slutt        | Tidspunktet (UTC) jobben ble avsluttet

##### JobExecution status
Status         | Betydning 
-------------- |--------------- 
CREATED        | Jobben er opprettet
RUNNING        | Jobben kjører
FINISHED       | Jobben er ferdig
ABORTED_MANUAL | Jobben er blitt stoppet manuelt
FAILED         | Jobben har stoppet grunnet en feil
DIED           | Ikke i bruk

##### Statistikk
---------------
Tabellen viser et samlet resultat for hele kjøringen,
og består av feltene som vist i tabellen under.

Statistikk             | Beskrivelse
-----------------------|-------------------------------
URIs crawled           | Antall URI-er som er blitt høstet
Documents crawled      | Antall dokumenter som er blitt høstet
Documents denied       | Antall dokumenter som ble nektet adgang til å høstes (betalingsmur, robots.txt etc.)
Documents failed       | Antall dokumenter som feilet under høsting
Documents out of scope | Antall dokumenter som ble funnet utenfor omfanget til seeden (bestemt av [surt prefix](../../configurations/seed/#seed-surtPrefix)
Documents retried      | Antall dokumenter som ble forsøkt lastet flere ganger for å høstes


##### Status {#jobexecution-state}
-----------------------------------
Tabellen viser antall seeds i jobben som har de ulike statusene. 
Tabellen under viser en beskrivelse av de ulike statusene.

Status          | Beskrivelse
----------------|---------------------
ABORTED_MANUAL  | Høstingen av seeden ble avsluttet manuelt.
ABORTED_SIZE    | Høstingen av seeden ble avbrutt, da den har overskredet [maks bytes](../../configurations/crawljob/#crawljob-max-bytes) verdien satt i konfigurasjonen av jobben
ABORTED_TIMEOUT | Høstingen av seeden ble avbrutt, da jobben måtte avsluttes etter å ha nådd sin [maks tid](../../configurations/crawljob/#crawljob-max-time)
CREATED         | Jobb for å høste seeden er opprettet
DIED            | Ikke i bruk
FAILED          | Høsting av seeden feilet
FETCHING        | Seeden høstes
FINISHED        | Seeden er ferdig høstet
SLEEPING        | En tilstand seeden har mellom FETCHING for å tilfredstille kravene satt i [politeness](../../configurations/politenessconfig)
UNDEFINED       | Skal ikke oppstå. Om en seed har denne statusen har det skjedd en feil.
UNRECOGNIZED    | Ikke i bruk


##### Feilmeldinger
---------------------
Om en feil har oppstått under kjøringen av jobben, vil den vises her.

##### ID-er
--------------

I bunnen på siden finner man to ID-er.

- Id: Et unikt nummer som identifiserer den aktuelle kjøringen av jobben (JobExecution)
- Job Id: ID-en til [crawljob](../../configurations/crawljob) brukt i høstingen. Ved å trykke på linken blir man tatt til konfigurasjonssiden for jobben.
