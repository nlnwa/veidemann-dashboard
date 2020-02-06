---
title: "BrowserConfig"
weight: 8
---

{{% notice info%}}
Browserconfig blir brukt av [crawlconfig](../crawlconfig)
{{% /notice %}}  


Browserconfig inneholder innstillinger for nettleseren som benyttes til høstingen. I tilegg til feltene i tabellen
nedenfor, har browserconfig  felter for [metadata](../#veidemann-meta).


![browserconfig overview](/veidemann/docs/img/browserconfig/veidemann_dashboard_browserconfig_overview.png)


 Felt                                                          | Funksjon
---------------------------------------------------------------|-----------------------------------------------------------------------------
[Brukeragent](#browserconfig-useragent)                        | Identifisering av høsteren.
[Vindusbredde](#browserconfig-window-width)                    | Bredden på nettleservinduet.
[Vindushøyde](#browserconfig-window-height)                    | Høyeden på nettleservinduet.
[Pageload timeout in ms](#browserconfig-pageload-timeout)      | Hvor lenge høsteren skal vente på svar før den gir opp.
[Sleep after pageload ms](#browserconfig-sleep-after-pageload) | Hvor lenge høsteren skal vente etter en side er lastet før den gjøre noe nytt.
[Browser script](#browserconfig-browserscript)                 | Hvilke [browserscript](../browserscript) skal nettleseren kjøre.
[Script selector](#browserconfig-scriptselector)               | Sette browserscript med label.  

#### Listen over tilgjengelige  browserconfigs
----------------------------------------------

##### Snarveier
----------------
Ikon                                                                                        | Snarvei
--------------------------------------------------------------------------------------------|-----------------------------------------------------
![show_crawlconfig](/veidemann/docs/img/icons/veidemann_dashboard_icon_crawlconfig.png)     | Vis crawlconfiger som bruker denne konfigurasjonen
![clone_browserconfig](/veidemann/docs/img/icons/veidemann_dashboard_icon_clone_config.png) | Lag en klone av konfigurasjonen
  
##### Søk, sortering og filtrering
----------------------------------
Listen over konfigurasjoner kan søkes i og sorteres på samme måte som beskrevet [her](../#config-search-filter-sort).  
I tillegg kan listen filtreres til å kun vise browserconfigs som bruker et bestemt browserscript.
Ved å trykke på et av feltene, hentes en liste over tilgjengelige konfigurasjoner av denne typen. 
    
#### Brukeragent {#browserconfig-useragent}
-------------------------------------------

Når en høsteren besøker en nettside, sender de informasjon om hvilken nettleser den er og 
hvilken plattform den kjører på. Det er nettleserens måte å identifisere seg på, og kan blant annet brukes av
nettsteder til å vise tilpassede sider til forskjellige nettlesere.

Veidemann bruker som standard følgende brukeragent: **nlnbot/1.0**

#### Vindusbredde {#browserconfig-window-width}
-----------------------------------------------
Konfigurerer bredden på nettleservinduet. Sørger for at innholdet på siden man besøker blir vist riktig, og er også med
på å bestemme størrelsen på [snapshot](../crawlconfig/#crawlconfig-create-snapshot). 


#### Vindushøyde {#browserconfig-window-height}
-----------------------------------------------
Konfigurerer høyden på nettleservinduet. Sørger for at innholdet på siden man besøker blir vist riktig, og er også med
på å bestemme størrelsen på [snapshot](../crawlconfig/#crawlconfig-create-snapshot).


#### Pageload timeout {#browserconfig-pageload-timeout}
-------------------------------------------------------
Konfigurerer hvor lenge høsteren skal forsøke å laste inn en side før den gir opp og går videre til neste.

#### Sleep after pageload {#browserconfig-sleep-after-pageload}
-----------------------------------------------------------------
Konfigurerer hvor lenge høsteren skal vente etter en side har blitt lastet før den gjør noe nytt. På denne måten gir vi
nettleseren tid til å laste inn hele siden.

#### Browserscript {#browserconfig-browserscript}
--------------------------------------------------
Setter ett eller flere [browserscript](../browserscript) som nettleseren skal bruke under høstingen. 

#### Script selector {#browserconfig-scriptselector}
----------------------------------------------------

Velger browserscript med en gitt label.  
Dersom selector blir satt vil det letes etter et browserscript som har en label som matcher.
Vi har en match dersom minst selectoren matcher minst en label. Om det er angitt flere selectorer, må hver selector
minst matche en label.  

Søket med selector skiller mellom små og store bokstaver. Standardformatet er **nøkkel:verdi**, 
hvor både nøkkel og verdi må matche.

Hvis verdien slutter med <code>&ast;</code>, så må nøkkelen og verdi matche frem til <code>&ast;</code>.  
Hvis verdien er tom, vil alle labels med lik nøkkel matche.  
Hvis nøkkelen er tom, vil det matches mot verdien til alle nøkkler.

<pre>
     Eksempler:  
      "foo:bar"  - matcher nøyaktig labels med nøkkel=foo og verdi=bar  
        
      "foo:"     - matcher alle labels med nøkkel=foo  
        
      ":bar"     - matcher alle labels med verdi=bar  
        
      "foo:ba*"  - matcher labels med nøkkel=foo og verdier som starter 
                   med ba (eks. matcher bar, men ikke ber)  
                     
      ":ba*"     - matcher labels med hvilken som helst nøkkel og verdier 
                   som starter med ba (eks. matcher bar, men ikke ber)  
                     
      ":"        - matcher alle labels
</pre>
