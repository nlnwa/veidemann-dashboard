---
title: "WARC"
pre: "<i class='fa fa-archive'></i>"
weight: 4
---

Siden inneholder status for valideringen av WARC-filene av det innhøstede materialet. Siden fokuserer på å vise frem
WARC-filer som ikke er godkjent, men det kan også brukes til å vise hvor mange filer som er blitt validert til å være gyldig.

WARC-filer i Veidemann blir validert med en WARC-modul til biblioteket JHOVE. Ved validering genereres det en rapport
som viser status for valideringen. Dersom rapporten viser at WARC-filen ikke er gyldig, vil filnavnet til rapporten med
feil vises i tabellen.  

Ved å klikke på et element i listen, hentes detaljert informasjon om feilen som er blitt registrert. Alle data som vises
her er hentet ut fra rapporten som ble generert av JHOVE.


![warc status overview](/veidemann/docs/img/warcstatus/veidemann_dashboard_warcstatus_overview.png)

Felt                                                | Betydning
----------------------------------------------------|------------------------------------------------------
[Filnavn](#warcstatus-filename)                     | Filnavnet til rapporten med feil
[Status](#warcstatus-status)                        | Status fra rapporten
[Opprettet](#warcstatus-created)                    | Tidspunkt for når rapporten ble registrert
[Beskjeder](#warcstatus-messages)                   | Feilmeldinge som er nevnt i rapporten 
[Ikke-kompatibel WARC ID](#warcstatus-noncompliant) | ID for poster i WARC-filen som inneholder feil


#### Filnavn {#warcstatus-filename}
------------------------------------
Filnavnet til rapporten som ikke er godkjent. Siden rapporten får navnet sitt fra WARC-filen den har validert, vil dette
si at WARC-filen med samme navn inneholder feil. 


#### Status {#warcstatus-status}
---------------------------------
Om statusen til en rapport er noe annet enn *well-formed and valid", havner filen i listen over feil. Statusen blir 
hentet ut av rapporten og vist her.


#### Opprettet {#warcstatus-created}
-------------------------------------
Tidspunktet der validatoren registrerte at rapporten ikke var godkjent og ble oppført i databasen over filer med feil.

#### Beskjeder {#warcstatus-messages}
--------------------------------------
Når WARC-filen ikke er godkjent, vil Jhove legge til feilmeldinger i rapporten over feil den har funnet med feilen.


#### Ikke-kompatibel WARC ID {#warcstatus-noncompliant}
--------------------------------------------------------
Her vises IDen til oppføringer i WARC-filen som inneholder feil.
