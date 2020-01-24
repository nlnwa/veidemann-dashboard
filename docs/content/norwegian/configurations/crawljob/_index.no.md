---
title: "Crawljob"
weight: 4
---

{{% notice info %}}
Benyttes av [seeds](../entities-and-seeds#seed)
{{% /notice %}}


Crawljob definerer innstillingene for en høstejobb. I tillegg til parameterene nevnt på denne siden 
inneholder også konfigurasjonen [metadata](../#veidemann-meta).

![crawljob overview](/veidemann/docs/img/crawljob/veidemann_dashboard_crawljob_overview.png)  


Felt                                | Betydning
------------------------------------|------------------------------------------
[Deaktivert](#crawljob-disabled)    | Stopper jobben fra å kjøres
[Dybde](#crawljob-depth)            | Hvor mange nivåer ned skal høsteren gå
[Maks tid](#crawljob-max-time)      | Hvor lenge skal jobben få lov til å kjøre
[Maks bytes](#crawljob-max-bytes)   | Hvor mye data kan lastes ned
[Schedule](#crawljob-schedule)      | Hvilken [schedule](../schedule) skal benyttes
[Crawlconfig](#crawljob-crawlconfig)| Hvilken [crawlconfig](../crawlconfig) skal benyttes  


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
