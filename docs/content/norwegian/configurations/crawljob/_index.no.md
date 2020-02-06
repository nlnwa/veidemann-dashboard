---
title: "Crawljobs"
weight: 4
---

{{% notice info %}}
Benyttes av [seeds](../seed)
{{% /notice %}}


Crawljob definerer innstillingene for en høstejobb. I tillegg til parameterene nevnt på denne siden 
inneholder også konfigurasjonen [metadata](../#veidemann-meta).

![crawljob overview](/veidemann/docs/img/crawljob/veidemann_dashboard_crawljob_overview.png)  


Felt                                | Betydning
------------------------------------|------------------------------------------
[Deaktivert](#crawljob-disabled)    | Deaktiver jobben fra å kjøre automatisk 
[Dybde](#crawljob-depth)            | Hvor mange nivåer ned skal høsteren gå
[Maks tid](#crawljob-max-time)      | Hvor lenge skal jobben få lov til å kjøre
[Maks bytes](#crawljob-max-bytes)   | Hvor mye data kan lastes ned
[Schedule](#crawljob-schedule)      | Hvilken [schedule](../schedule) skal benyttes
[Crawlconfig](#crawljob-crawlconfig)| Hvilken [crawlconfig](../crawlconfig) skal benyttes    

  
#### Listen over tilgjengelige crawljobs
-----------------------------------------------------------------
##### Snarveier
----------------
Listen inneholder også snarveier som vist i tabellen under.  
 
Ikon                                                                                           |Snarvei
-----------------------------------------------------------------------------------------------|--------------------------------------------------------------
![show_jobexecutions](/veidemann/docs/img/icons/veidemann_dashboard_icon_report_crawljob.png)  | Gå til jobexecution for jobb
![show_schedule](/veidemann/docs/img/icons/veidemann_dashboard_icon_schedule.png)              | Gå til schedule som er brukt for konfigurasjonen
![show_crawlconfig](/veidemann/docs/img/icons/veidemann_dashboard_icon_crawlconfig.png)        | Gå til crawlconfig som er brukt for konfigurasjonen
![show_seeds_with_crawljob](/veidemann/docs/img/icons/veidemann_dashboard_icon_list_seeds.png) | Vis seeds med samme crawljob som er brukt i konfigurasjonen
![clone_config](/veidemann/docs/img/icons/veidemann_dashboard_icon_clone_config.png)           | Lag en clone av crawljob 

##### Søk, filtrering og sortering
----------------------------------
Listen over konfigurasjoner kan søkes i og sorteres på samme måte som beskrevet [her](../#config-search-filter-sort).
I tillegg kan listen filtreres til å kun vise jobber som bruker en bestemt schedule og/eller crawlconfig.
Ved å trykke på et av feltene, hentes en liste over tilgjengelige konfigurasjoner av denne typen. 

##### Status 
------------
Fra listen kan man lese den siste statusen for jobben. En jobb kan ha en av følgende statuser:  

Status         | Betydning
-------------- |--------------- 
CREATED        | Jobben er opprettet
RUNNING        | Jobben kjører
FINISHED       | Jobben er ferdig
ABORTED_MANUAL | Jobben er blitt stoppet manuelt
FAILED         | Jobben har stoppet grunnet en feil
DIED           | Ikke i bruk

En mer detaljert beskrivelse av siste status for jobben, kan leses ved å se på [jobbstatus](#crawljob-jobexecutionstatus)
for den aktuelle konfigurasjonen. 

#### Deaktivert {#crawljob-disabled}
--------------------------------------
Bryteren brukes til å deaktivere en høstejobb. Når denne bryteren er på vil denne jobben aldri kjøre.

#### Dybde {#crawljob-depth}
----------------------------
Dybden bestemmer hvor mange nivåer ned høsteren skal få lov til å gå. Til eksempel vil en dybde på 3 tilsi at høsteren
kan følge 3 linker fra startsiden.

#### Maks tid {#crawljob-max-time}
----------------------------------  
Angir tiden i sekunder hvor lenge en høstejobb skal få lov til å kjøre.
Jobben vil da kjøre i angitte sekunder fra starttidspunktet satt av schedule og deretter avsluttes.

#### Maks bytes {#crawljob-max-bytes}
-------------------------------------  
Feltet angir den maksimale mengden data, i bytes, jobben skal få laste ned. Om tallet overskrides, vil jobben avsluttes. 


#### Schedule {#crawljob-schedule}
----------------------------------  
Her settes tidspunktet høstejobben skal kjøres ved å definere en [schedule](../schedule).
Feltet er ikke påkrevd, men dersom en schedule ikke settes vil heller ikke jobben bli kjørt og må
startes manuelt.


#### Crawlconfig {#crawljob-crawlconfig}
----------------------------------------
Bestemmer hvilke innstillinger høstejobben skal bruke ved å sette en [crawlconfig](../crawlconfig).
Crawlconfig setter innstillinger som oppsett av nettleseren som brukes til høstingen og høffligheten til høsteren.


#### Jobbstatus {#crawljob-jobexecutionstatus}
----------------------------------------------
Ved å utvide statusfeltet for en crawljob, vises den siste informasjonen om en jobb.
Den benytter seg av de samme feltene som [rapport-crawljob](../../report/crawljob), 
men viser her bare data fra den siste registrerte statusen for den aktuelle jobben. 

![crawljob_execution](/veidemann/docs/img/crawljob/veidemann_dashboard_crawljob_jobexecution.png)
