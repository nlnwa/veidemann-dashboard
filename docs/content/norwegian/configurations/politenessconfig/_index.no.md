---
title: "Politeness"
weight: 11
---

{{% notice info %}}
Benyttes av [crawlconfig](../crawlconfig)
{{% /notice %}}  

Politeness setter innstillinger som avgjør hvor høy belastning en høstejobben skal utsette en host for.
I tillegg til å begrense høsteren fra å overbelaste en nettside, settes også regler for hvordan høsteren skal forholde
seg til robots.txt. I tillegg til feltene nevnt nedenfor, inneholder også en politnessconfig [metadata](../#veidemann-meta)

![politeness_overview](/veidemann/docs/img/politeness/veidemann_dashboard_politeness_overview.png)  


Felt                                                                | Betydning
--------------------------------------------------------------------|-----------------------------------------
[Policy](#config-policy)                                            | Hvilken policy skal benyttes.
[Crawlhostgroup selector](#config-crawlhostgroup-selector)          | Skal bruke crawlhostgroups som har labels som matcher disse selector.
[Minimum robots validity](#config-min-robots-validity)              | Hvor lenge det skal ventes før nettstedetes robots.txt sjekkes på nytt.
[Minimum time between page load](#config-min-time-between-pageload) | Minimum tid det skal ta før neste side hentes.
[Maximum time between page load](#config-max-time-between-pageload) | Maksimum tid det skal ta før neste side hentes.
[Delay factor](#config-delay-factor)                                | Faktor som bestemmer hvor lang tid det skal ta før neste side hentes.
[Maximum retries](#config-max-retries)                              | Maks antall forsøk på å hente en side.
[Retry delay](#config-retry-delay)                                  | Hvor mange sekund skal man vente før siden lastes på nytt.


#### Listen over tilgjengelige politeness
-----------------------------------------

##### Snarveier
----------------
Ikon                                                                                     | Snarvei
-----------------------------------------------------------------------------------------|---------------------------------------------
![show_crawlconfig](/veidemann/docs/img/icons/veidemann_dashboard_icon_crawlconfig.png)  | Vis crawlconfigs som bruker konfigurasjonen
![clone_politeness](/veidemann/docs/img/icons/veidemann_dashboard_icon_clone_config.png) | Lag en klone av konfigurasjonen  

 
#### Policy {#config-policy}
----------------------------  

Bestemmer hvordan høsteren skal forholde seg til robots.txt.  
Valgene man har her er:  

- **OBEY_ROBOTS:**  
  Følg reglene angitt i robots.txt for nettstedet.  

- **IGNORE_ROBOTS:**  
  Overse reglene i robots.txt for nettstedet.

- **CUSTOM_ROBOTS:**  
  Definer en egen robots.txt som høsteren skal benytte i stedet for den som nettstedet har satt. 

#### Crawlhostgroup selector {#config-crawlhostgroup-selector}
--------------------------------------------------------------

Velger crawlhostgroupconfig med en gitt label.  
Dersom selector blir satt vil det letes etter en crawlhostgroupconfig som har en label som matcher.
Vi har en match dersom selectoren matcher minst en label. Om det er angitt flere selectorer, må hver selector
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

#### Minimum robots validity {#config-min-robots-validity}
----------------------------------------------------------
Tiden høsteren minimum skal vente med å hente ned nettstedets robots.txt på nytt. 

#### Minimum time between page load {#config-min-time-between-pageload}
-----------------------------------------------------------------------

Tid i millisekund høsteren minimum skal vente før den går videre til neste URI.

#### Maximum time between page load {#config-max-time-between-pageload}
-----------------------------------------------------------------------
Tid i millisekund høsteren maksimalt skal vente før den går videre til neste

#### Delay factor {#config-delay-factor}
----------------------------------------

Tiden det tar å hente URIen blir multiplisert med denne verdien for å få forsinkelsestiden før hentingen av neste URI.
Hvis minimum time between page load og/eller maksimum time between page load er satt, blir disse verdiene brukt som
øvre/nedre grense for forsinkelse.
Hvis delay factor ikke er satt eller null, blir en delay facor på 1 brukt.   
Hvis delay facor er negativ, blir en delay factor på 0 brukt.


#### Maximum retries {#config-max-retries}
------------------------------------------
Det maksimale antall forsøk høsteren vil bruke på å hente en URI, før den gir opp og går videre.


#### Retry delay {#config-retry-delay}
--------------------------------------
Hvor mange sekund høsteren skal vente med å forsøke å hente URI på nytt.

    
 
