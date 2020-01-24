---
title: "Nettsidens struktur"
pre: "<i class='fa fa-list-alt'></i>"
weight: 2
---

Bildet under viser siden man blir møtt med i det man besøker https://nettarkivet.nb.no/veidemann.
  
Grensesnittet er oppdelt i tre seksjoner:

![site structure](/veidemann/docs/img/sitestructure/veidemann_dashboard_overview.png)

*nytt bilde for seksjoner*

Seksjon                             | Funksjon
------------------------------------|----------------- 
[1. Verkøylinje](#page-toolbar) | Verktøylinje med snarveier til menyer og innlogging 
[1.1. Innlogging](#page-login)  | Logg inn med bruker for Veidemann dashboard
[2. Meny](#page-menu)           | Meny med snarveier til sider i Veidemann dashboard
[3. Visning](#page-view)        | Innholdet på sidene lastes her
  
  
#### Verktøylinjen {#page-toolbar}
----------------------------------

Ved å trykke på knappen til venstre i verktøylinjen kan man vise/skjule hovedmenyen.

Trykker man på teksten Veidemann, blir man tatt til startsiden.

Klokken i midten av linjen viser tiden i UTC, som er tiden høsteren opererer med.

Knappen helt til høyre brukes til å logge inn/ut en bruker.  

  
  
#### Innlogging {#page-login}
------------------------------  

En administrator må gi tilgang til nye brukere av systemet gjennom brukeradministrasjonssystemet i 
Veidemann dashboard.

Når brukeren er opprettet logger man inn ved å trykke *logg på*
  

Man blir da gitt to mulige metoder å logge inn på.

![dex login](/veidemann/docs/img/sitestructure/veidemann_dashboard_login_dex.png)

*Log in with Email:* Brukere som er blitt opprettet med epost bruker denne metoden.

*Log in with Pilt:* Brukere med innlogging med en Pilt bruker kan benytte dette valget.

![pilt login](/veidemann/docs/img/sitestructure/veidemann_dashboard_login_pilt.png)


#### Meny {#page-menu}
----------------------
Fra menyen kan man som bruker utforske de ulike sidene for nettstedet.
Hvilke sider som er tilgjengelig for en spesifikk bruker, avgjøres av
rollen denne brukeren er tildelt.

Ved å trykke på knappen til venstre på verktøylinjen vil menyen vises.
Herfra vil man kunne navigere seg til ulike deler av Veidemann dashboard. 

![dashboard main_menu](/veidemann/docs/img/sitestructure/veidemann_dashboard_main_menu.png)

Disse kan igjen ha undermenyer for videre navigering, til eksempel har *konfigurasjon*
denne undermenyen. 

![dashboard menu](/veidemann/docs/img/sitestructure/veidemann_dashboard_submenu.png)


#### Visning {#page-view}
-------------------------
Innholdet for en side vises her.
