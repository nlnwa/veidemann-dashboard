---
title: "Konfigurasjoner"
pre: "<i class='fa fa-cog'></i>"
weight: 3
---

Veidemann Dashboard gir deg muligheten til å sette en rekke forskjellige konfigurasjoner for innhøstingen av websider.

I denne delen vil vi gå gjennom bruken av de ulike konfigurasjonene og parameterene som kan settes.  

I tabellen under vises alle tilgjengelige konfigurasjoner og en kort beskrivelse av hvilke oppgaver disse har.
For en mer utfyllende beskrivelse av deres funksjon, gå til siden for den aktuelle konfigurasjonen. 

#### Konfigurasjoner
--------------------  

Konfigurasjon                          | Beskrivelse
---------------------------------------|--------------------------------------------------------------------------------
[Entity](entity)                       | Eier av nettstedet
[Seed](seed)                           | Nettstedet som skal høstes
[Collection](collection)               | Brukes av crawlconfig til å angi en samling.
[Crawljobs](crawljob)                  | Definerte jobber for innhøsting av websider.
[Schedule](schedule)                   | Setter tidspunkt for start av høstejobber, brukes av crawljob.
[Crawlconfig](crawlconfig)             | Sett med innstillinger for høsteren, brukes av crawljob.
[Crawlhostgroup](crawlhostgroupconfig) | Opprett samlinger med IP-addresser, brukes av politeness. 
[Browserconfig](browserconfig)         | Innstillinger for nettleseren som brukes til høstingen. 
[Browserscript](browserscript)         | Scripts tilgjengelig for nettleseren brukt til høstingen.
[Politeness](politenessconfig)         | Høffligheten til høsteren
[Brukere](users)                       | Administrasjon av brukere i systemet



#### Bruk av konfigurasjonssidene
----------------------------------
De fleste av konfigurasjonssidene er utformet likt, og består av to deler:  
- Liste over tilgjengelige konfigurasjoner.  
- Detaljer for en valgt konfigurasjon.

![configuration pages overview](/veidemann/docs/img/config/veidemann_dashboard_config_page_overview.png)  


#### Tilgjengelige konfigurasjoner
Listen på toppen viser tilgjengelige konfigurasjoner av den valgte typen. Ved å klikke på en konfigurasjon i listen
vises detaljene for den valgte konfigurasjonen. Man vil da få muligheten til å redigere dataene eller slette
konfigurasjonen. Om man starter å redigere en konfigurasjon, kan denne tilbakestilles til sin opprinnelige stand ved å
trykke på tilbakestill-knappen.  
  
    
##### Opprette en konfigurasjon
--------------------------------
En ny konfigurasjon av den valgte typen, opprettes ved å trykke knappen  *opprett ny* øverst til venstre i menyen.
Et tomt skjema vil da dukke opp og data kan skrives inn.  Når kravet til påkrevde felter, og innholdet i disse
tilfredsstiller kravene, vil lagre-knappen på bunnen av siden bli tilgjengelig. Dersom et felt inneholder feil data,
vil en feilmelding vises under feltet.

##### Søk, filtrering og sortering {#config-search-filter-sort}
---------------------------------
Grensesnittet inneholder funksjoner for å enklere finne frem til spesifikke konfigurasjoner i listen.
Hvilke filter og sorteringer som er tilgjengelig avhenger av typen konfigurasjon. 
 
##### Søk
For alle konfigurasjoner finnnes det et felt for å søke etter en konfigurasjon.
Her kan man søke etter konfigurasjoner på:
 
 - Navn  
 Som standard vil et søk forsøke å finne konfigurasjoner som har et navn som stemmer med søkeordet.   
 Treff på konfigurasjoner med dette navnet vil da vises i listen.
 Søk etter navn kan gjøres på to måter:
 1. Fritekst:
 Et søkeord som f.eks. *Nasjonalbiblioteket* vil lete etter en konfigurasjon som inneholder Nasjonalbiblioteket i navnet.  
 Det er i tillegg mulig å søke etter konfigurasjoner som matcher eksakt ved å sette anførselstegn rundt søkeordet.  
 For seeds finnes det noen flere muligheter for fritekstsøk, som beskrevet [her.](seed/#veidemann-seed-search)  
 
 ![config_query](/veidemann/docs/img/config/veidemann_dashboard_config_query.png)   ![config_query_exact](/veidemann/docs/img/config/veidemann_dashboard_config_query_exact.png)
 
 1. Regulært uttrykk:  
 Man kan også søke etter konfigurasjoner med et bestemt navn ved hjelp av et [regulært uttrykk](https://en.wikipedia.org/wiki/Regular_expression), ved å bruke prefikset *regex:* etterfulgt av uttrykket.
 
 {{% notice note %}}
 Om man vil søke etter konfigurasjon med navn ved hjelp av et regulært uttrykk, må  utrykket ha prefikset *regex:*
 Eksempel: regex:^nb.no$
 {{% /notice %}}
    
 - Label  
 Søk etter konfigurasjoner som inneholder en bestemt label gjøres med et søk etter *label:*[nøkkel:verdi](#meta-label).  
 Her er det mulig å søke etter en eksakt label, hvor både nøkkel og verdi er angitt. Men det er også mulig å søke
 etter konfigurasjoner som har en label som matcher andre kriterier:
 
  ```
     Eksempel:
       "foo:bar"  - matcher nøyaktig label med nøkkel=foo og verdi=bar
       "foo:"     - matcher alle labels med nøkkel=foo
       ":bar"     - matcher alle labels med verdi=bar
       "bar"      - matcher alle labels med verdi=bar
       "foo:ba*"  - matcher labels med nøkkel=foo og med verdi som starter med ba (eks. matcher bar, men ikke ber)
       ":ba*"     - matcher labels med hvilken som helst nøkkel og med verdi som starter med ba (eks. matcher bar, men ikke ber)
       "ba*"      - matcher labels med hvilken som helst nøkkel og med verdi som starter med ba (eks. matcher bar, men ikke ber)
       ":"        - matcher alle labels
       ""         - matcher alle labels
  ```
 
 
 - Kombinasjon  
 Det er også mulig å søke etter kombinasjon av både navn(tekst eller regulært uttrykk) og label.
{{% notice note %}}
For å søke etter label, må søket inneholde prefikset *label:*, før labelen man ønsker å søke etter.
 I tilfeller hvor man vil søke både på navn (tekst eller regex) og label, må label komme til slutt i søkestrengen.
{{% /notice %}}

![config_query_combined_text_label](/veidemann/docs/img/config/veidemann_dashboard_config_query_combined_text_and_label.png)
![config_query_combined_regex_label](/veidemann/docs/img/config/veidemann_dashboard_config_query_combined_regex_and_label.png)
  
  
##### Filtrering
Ved å sette et filter reduseres utvalget i listen til å kun vise konfigurasjoner som stemmer med filteret.
Hvilke filter som kan benyttes avhenger av typen konfigurasjon. en beskrivelse av tilgjengelige filter blir 
gitt for hver av konfigurasjonene. 

##### Sortering
Liste over konfigurasjoner kan sorteres på navn i stigende eller synkende rekkefølge, ved å trykke på pilene i tabellen.
{{% notice note %}}
I enkelte av listene sorteres det ikke på navn men på ID. Her vil ikke navnene stå i alfabetisk rekkefølge, men i forhold til
verdien av id-nummeret.
{{% /notice %}}

![config list_sort](/veidemann/docs/img/config/veidemann_dashboard_config_list_sort.png)

##### Snarveier
----------------
Helt til høyre i listen er det for hver konfigurasjonstype et sett med snarveier.
Hvilke snarveier som er tilgjenglige avhenger av hvilken type konfigurasjon man ser på.
Ved å trykke på en snarvei, redirigeres brukeren til den aktuelle siden. 
Sørg derfor for at alle endringer er lagret, da disse ellers vil bli borte ved en redirigering. 
En nærmere beskrivelse av de forskjellige snarveiene, vil bli gitt for hver konfigurasjon. 

![shortcut_examples](/veidemann/docs/img/entity/veidemann_dashboard_entity_list.png)

##### Klone en konfigurasjon
Alle konfigurasjoner, med unntak av *brukere* har mulighet til å bli klonet. Dette er en snarvei for å opprette nye 
konfigurasjoner med de samme instillingene som en eksisterende konfigurasjon. Ved å trykke på *klone* snarveien i listen, 
vil visningen vise en kopi av den valgte konfigurasjonen. Her kan konfigurasjonen redigeres, før den gis et eget navn og lagres.  

#### Gruppeoppdatering av konfigurasjoner
------------------------------------------
Flere av konfigurasjonene har støttet for gruppeoppdatering.
Veidemann dashboard har to forskjellige metoder for å oppdatere flere konfigurasjoner samtidig:    

1. Oppdatere/slette et bestemt utvalg  
2. Oppdatere alle tilgjengelige konfigurasjoner

##### Oppdatere/slette et bestemt utvalg
Om flere enn en konfigurasjon blir markert, blir det mulig 
å redigere feltene for disse bortsett fra metadata. Om et felt inneholder data betyr dette at dette feltet er likt for
alle de markerte. Om man oppdaterer et felt vil den nye verdien bli satt for alle de markerte, om feltet forblir tomt,
vil den opprinnelige verdien bli beholdt.  

{{% notice note %}}
Felter som har av/på verdier, vil bli deaktivert dersom alle de markerte ikke har lik verdi. For å sette et slikt felt
lik for alle må feltet trykkes på og deretter settes til ønsket verdi.
{{% /notice %}}

![config selected multiupdate](/veidemann/docs/img/config/veidemann_dashboard_config_multi_update.png)

Man kan også slette flere konfigurasjoner samtidig ved å benytte gruppeoppdateringen. Når flere konfigurasjoner er valgt,
blir knappen med ikonet av en søppelbøtte tilgjengelig.
Om knappen trykkes blir det vist det en dialog som vil bekrefte slettingen, ved at brukeren må skrive antallet konfigrasjoner
som blir slettet.  

![config delete_selected](/veidemann/docs/img/config/veidemann_dashboard_config_multi_delete.png)

##### Oppdatere alle tilgjengelige konfigurasjoner
Ved å trykke på boksen for å markere alle på siden, får man valget om markere alle tilgjengelige konfigurasjoner.
Dersom man velger dette vil absolutt alle konfigurasjonene av denne typen oppdateres. For dette tilfellet vil ikke
detaljevinduet vise om enkelte felter er like for alle valgte. Tomme felter her betyr at konfigurasjonen skal beholde 
sin opprinnelige verdi.

![config all on page selected](/veidemann/docs/img/config/veidemann_dashboard_config_all_in_page_selected.png)

![config all configs selected](/veidemann/docs/img/config/veidemann_dashboard_config_all_in_db_selected.png)


#### Meta {#veidemann-meta}
---------------------------
Felles for de fleste av konfigurasjonene i Veidemann, er at de har tilhørende metedata som holder på grunnleggende
informasjon om konfigurasjonen.  

Innholdet i meta kan leses ut fra tabellen nedenfor.

![meta overview](/veidemann/docs/img/config/veidemann_dashboard_meta_overview.png)  

Felt                                      | Betydning
------------------------------------------|-----------------------------------------------------------------------------
[Navn](#meta-name)                        | Navn for konfigurasjonen
[Beskrivelse](#meta-description)          | Beskrivelse av konfigurasjonen
[Label](#meta-label)                      | Merkelapper for gruppering, søk osv.
[Opprettet](#meta-created)                | Dato for når konfigurasjonen ble opprettet
[Opprettet av](#meta-created-by)          | Navnet på brukeren som opprett konfigurasjonen
[Sist endret](#meta-last-modified)        | Dato for når konfigurasjonen ble sist endret
[Sist endret av](#meta-last-modiefied-by) | Navnet på brukeren som endret konfigurasjonen sist
[Id](#meta-id)                            | Et unikt nummer som identifiserer en bestemt konfigurasjon


##### Navn {#meta-name}
----------------------
Inneholder et egendefinert navn som kan brukes til å identifisere en konfigurasjon. Feltet er påkrevd 
og må minst bestå av to tegn. 

##### Beskrivelse {#meta-description}
------------------------------------
Inneholder en egendefinert beskrivelse av konfigurasjonen. Brukes til å gi konfigurasjonen en mer utfyllende tekst om
funksjon og bruksområde. Feltet er ikke påkrevd. 

##### Label {#meta-label}
------------------------
Labels er egendefinerte merkelapper som brukes til å markere konfigurasjonene med data som det ikke er laget felter for.
Eksempelvis kan en label brukes til gruppering av ulike konfigurasjone eller som et søkeord om man leter etter en
spesifikk konfigurasjon. 

![meta label](/veidemann/docs/img/config/veidemann_dashboard_meta_label.png)

En label består av et nøkkel/verdi-par på formen: **nøkkel:verdi**, og opprettes ved å trykke på linjen og skrive inn 
ønsket verdi på nevnte form og trykke enter.  

Når linjen trykkes på hentes en liste over nøkkelverdier som er brukt på andre konfigurasjoner av samme type tidligere.
Etter hvert som det det skrives i feltet,filtreres listen til å vise nøkkelverdier som er lik. Ved å trykke på en verdi
i listen, vil dette fylles inn  i skjemaet. 

![meta_label_autocomplate](/veidemann/docs/img/config/veidemann_dashboard_meta_label_autocomplete.png) 
![meta_label_autocomplete_filter](/veidemann/docs/img/config/veidemann_dashboard_meta_label_autocomplete_filter.png)

Eksisterende labels kan også redigeres eller slettes. Ved å trykke på en label vil man få muligheten til å redigere
nøkkel og verdi.

![meta edit label](/veidemann/docs/img/config/veidemann_dashboard_config_meta_edit_label.png)

##### Opprettet {#meta-created}
------------------------------
Inneholder dato i UTC for når konfigurasjonen ble opprettet. Feltet blir automatisk generert når det opprettes en ny
konfigurasjon.  

  
##### Opprettet av {#meta-created-by}
------------------------------------
Inneholder navnet eller e-postadressen til brukeren som opprettet konfigurasjonen. Feltet blir automatisk generert når
det opprettes en ny konfigurasjon.
   
    
##### Sist endret {#meta-last-modified}
--------------------------------------
Inneholder dato i UTC for når eg konfigurasjon ble sist endret. Feltet blir automatisk generert når en konfigurasjon
oppdateres.
  
      
##### Sist endret av {#meta-last-modified-by}
--------------------------------------------
Inneholder navnet eller e-postadressen til brukeren som oppdaterte konfigurasjonen sist. Feltet blir automatisk generert
når en konfigurasjon oppdateres.
  
    
##### Id {#meta-id}
-------------------
Inneholder en unik ID for konfigurasjonen. Feltet blir automatisk generert når en konfigurasjon opprettes.
