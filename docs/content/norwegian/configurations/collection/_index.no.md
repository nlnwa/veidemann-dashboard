---
title: "Collection"
weight: 3
---

{{% notice info%}}
Collection blir brukt av [crawlconfig](../crawlconfig)
{{% /notice %}}

Collection inneholder innstillinger for å definere en samling i Veidemann.  
I tillegg til parameterene nevnt på denne siden inneholder også konfigurasjonen [metadata](../#veidemann-meta).

![collection_overview](/veidemann/docs/img/collection/veidemann_dashboard_collection_overview.png)

Felt                                                  | Betydning
------------------------------------------------------|----------------------------------------------------------------
[Komprimer](#collection-compress)                     | Skal filene komprimeres
[Deduplisering policy](#collection-dedup-policy)      | Hvilken policy for deduplisering skal benyttes.
[Filrotasjon policy](#collection-file-rotation-policy)| Hvilken policy for filrotasjon skal benyttes.
[Filstørrelse](#collection-filesize)                  | Hvor stor skal WARC filene være.
[Subcollection](#collection-subcollection)            | Skal collection inneholde en subcollection. 


#### Listen over tilgjengelige collections
------------------------------------------

##### Snarveier
---------------
Ikon                                                                                     | Snarvei
-----------------------------------------------------------------------------------------|---------
![show_crawlconfig](/veidemann/docs/img/icons/veidemann_dashboard_icon_crawlconfig.png)  | Vis crawlconfiger som bruker denne collectionen
![clone_collection](/veidemann/docs/img/icons/veidemann_dashboard_icon_clone_config.png) | Lag en klone av collection                                 

#### Navn
----------
I tillegg til å gi navn til konfigurasjonen, blir også navnet som blir satt her brukt som en del av filnavnet for WARC-filene. 
Til eksempel vil en høstejobb som er satt opp til å bruke collection-konfigurasjonen i bildet over, 
produsere WARC-filer med dette filnavnet:
  
_Veidemann_2020-20200608081755-veidemann_contentwriter_6c6cd8bbd5_mr9rj-00001.warc.gz_

Felt                                     | Betydning
-----------------------------------------|---------------------------------------
Veidemann                                | Navn på collection
2020                                     | Timestamp brukt av deduplisering policy. 
20200608081755                           | Timestamp for når filen ble opprettet 
veidemann_contentwriter_6c6cd8bbd5_mr9rj | Hvilken contentwriter som opprettet filen
00001                                    | Løpenummer (Fil nr. x opprettet av contentwriter y)
warc.gz                                  | Filtype (.gz angir om den er komprimert)
                                               
#### Komprimer {#collection-compress}
-------------------------------------
Bestemmer om en WARC-fil skal komprimeres eller ikke. Komprimeringen sørger for at hver record i filen blir komprimert og tar mindre plass.
Burde som standard benyttes. 

#### Deduplisering policy {#collection-dedup-policy}
----------------------------------------------------                                               
Deduplisering policy bestemmer hvor lenge det skal ventes med å laste ned et duplikat. 
  
Eksempel:  
Collection _nettaviser_ er satt opp med deduplisering policy satt til **YEARLY**.
I dette tilfellet vil alle seeds som høstes i denne samlingen, sjekkes om de er blitt endret siden første gang de ble høstet dette året.
Om innholdet er likt, vil ikke den siste innhøstingen blir lagret men heller bruke den eksisterende versjonen. Dersom siden ikke endrer seg
i løpet av året, vil ikke inneholdet lagres igjen før første høsting neste år.  

Mulige valg for policy er YEARLY, MONTHLY, DAILY, HOURLY og NONE.  
Timestamp i filnavnet for deduplisering endrer granularitet etter hvilken policy som er valgt. 

#### Filrotasjon policy {#collection-file-rotation-policy}
----------------------------------------------------------
Filrotasjon policy bestemmer når det skal opprettes nye filer.

Om denne ikke er satt vil innhøstet materiale skrives til ekisterende WARC-filer som ikke er lukket.
Dersom en annen policy velges , bestemmer denne når nye filer skal opprettes. En collection med filrotasjon satt til for eksempel **DAILY**
vil da opprette nye WARC-filer, selv om det er ledig plass i filene fra dagen før.

#### Filstørrelse {#collection-filesize}
----------------------------------------
Feltet bestemmer filstørrelsen for en WARC-fil. Når en fil når denne størrelsen, blir filen lukket og en ny opprettet.  
Størrelsen kan angis i de fleste enheter (b, kb, mb, gb, tb).

{{% notice note%}}
Ved lagring konvertes filstørrelsen til byte (1 MB = 1024^2).
Når tallet vises i grensesnittet igjen vil den konvertere fra bytes til å vises  avrundet i sin største måleenhet.  
Eksempelvis vil en collection som blir lagret med filstørrelse = 1024MB vises som 1GB.
{{% /notice %}}

#### Subcollection {#collection-subcollection}
----------------------------------------------
En collection kan også ha en eller flere subcollections. Disse består av et navn (dette blir også en del av filnavnet) og en av to tilgjenglige typer:
 1. Screenshot  
    Oppretter egne WARC-filer for å samle skjermbilder fra innhøstingen.  
 2. DNS
    Oppretter egne WARC-filer for å samle DNS records
