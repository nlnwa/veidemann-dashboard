---
title: "Schedule"
weight: 5
---

{{% notice info %}}
Benyttes av [crawljob](../crawljob)
{{% /notice %}}


Schedule definerer et tidspunkt for en planlagt jobb, og brukes i Veidemann for å bestemme når ulike høstejobber skal kjøres.
En schedule består [metadata](../#veidemann-meta) samt feltene i tabellen nedenfor.  


![schedule overview](/veidemann/docs/img/schedule/veidemann_dashboard_schedule_overview.png)



Felt                               | Betydning
-----------------------------------|-------------------------------
[Minutt](#cron-exp-minute)         | Minutt feltet i cron-uttrykket
[Time](#cron-exp-hour)             | Time feltet i cron-uttrykket
[Dom](#cron-exo-dom)               | Dag i månded feltet i cron-uttrykket
[Måned](#cron-exp-month)           | Feltet for måned i cron-uttrykket
[Dow](#cron-exp-dow)               | Dag i uke feltet for cron-uttrykket
[Gyldig fra](#schedule-valid-from) | Startdato schedule skal være gyldig fra
[Gyldig til](#schedule-valid-to)   | Sluttdato schedule skal være gyldig til

#### Listen over tilgjengelige schedules
----------------------------------------

##### Snarvier
--------------

Ikon                                                                                   | Snarvei
---------------------------------------------------------------------------------------|-----------------------------------------
![show_crawljobs](/veidemann/docs/img/icons/veidemann_dashboard_icon_crawljob.png)     | Vis crawljobs som bruker denne schedulen
![clone_schedule](/veidemann/docs/img/icons/veidemann_dashboard_icon_clone_config.png) | Lag en klone av schedule

#### CRON-uttrykk
-----------------

Schedules definerer et cron-uttrykk som bestemmer når en høstejobb skal kjøres.
Uttrykket inneholder følgende deler:

<pre> 
<b style="color: green"> * * * * * </b>  Uttrykk
 | | | | |
 | | | | |___________ Dag i uke
 | | | |
 | | | |_____________ Måned
 | | |
 | | |_______________ Dag i måned
 | |
 | |_________________ Time
 |
 |___________________ Minutt

</pre>  

En jobb vil starte når alle delene i uttrykket er sanne samtidig.
I tillegg til en tallverdi, støtter feltene flere tegn for å spesifisere uttrykket ytterligere:  
  

* Stjerne (__*__): Indikerer **alle**, og kan brukes for hvert enkelt felt  
<pre>
  <b style="color: green">* * * * * </b>  betyr da:
  Hvert minutt av timen, hver time av dagen, hver dag i måneden, hver måned i året, hver dag i uken
</pre>  

* Komma (__,__): Hvert felt kan støtte to eller flere kommaseparerte verdier:
  <pre>
  <b style="color: green">59 11 * * 1,2,3,4,5 </b>
  Dette mønsteret vil kjøre en jobb 11:59 på mandag, tirsdag, onsdag , torsdag og fredag.
  </pre>  

* Skråstrek (__/__): Kan brukes til sette steg verdier innen et intervall.
 Det kan bli brukt både på formen &ast;/c og a-b/c.
Feltet er da matchet hver c verdi i intervallet 0, maksverdi eller a-b.  
<pre>
  <b style="color: green">*/5 * * * *</b>
  Dette mønsteret vil få en jobb til å kjøre hvert 5 minutt
  (0:00, 0:05, 0:10, 0:15 osv.).  
  <b style="color: green">3-18/ 5 * * * *</b>
  Dette mønsteret vil kjøre en jobb hvert 5 minutt fra og med det 3 minuttet i timen opp til det 18.  
  (0:03, 0:08, 0:13, 0:18, 1:03, 1:08 osv.). 
</pre>

#### Minutt {#cron-exp-minute}
--------------------------------
I løpet av hvilke minutter i timen skal jobben kjøre? Gyldig verdi som kan brukes her er et tall mellom 0 til 59.

{{% notice note %}}
Eksempel:
{{% /notice %}}

<pre>
<b style="color: green">5 * * * *</b>
Dette mønsteret vil få en jobb til å kjøre en gang hver time ved starten på det femte minuttet (00:05, 01:05, 02:05 osv.).  

<b style="color: green">* * * * *</b>
Dette mønsteret vil få en jobb til å kjøre hvert minutt.
</pre>



#### Time {#cron-exp-hour}
--------------------------

I løpet av hvilke timer i døgnet skal jobben kjøres? Gyldig verdi som kan brukes her er et tall mellom 0 og 23

{{% notice note %}}
Eksempel:
{{% /notice %}}

<pre>
<b style="color: green">* 12 * * Mon</b>  

Dette mønsteret vil få en jobb til å kjøre hvert minutt i løpet av den 12. timen på mandager.
</pre>

#### Dag i måned {#cron-exp-dom}
-------------------------------

I løpet av hvilke dager i måneden skal jobben kjøres? Gyldig verdi som kan brukes her er tall mellom 1 og 31

{{% notice note %}}
Eksempel:
{{% /notice %}}

<pre>
<b style="color: green">* 12 1-15,17,20-25 * *</b>  

Dette mønsteret vil få en jobb til å kjøre hvert minutt i løpet av den 12. timen av dagen, 
men dagen av månden må være mellom den første og femtende, tjuende og tjuefemte, eller det må være den 17.  

<b style="color: green">* 12 10-16/2 * *</b>  

Dette mønsteret vil få en jobb til å kjøre hvert minutt i løpet av den 12. timen av dagen,
men bare vis det er den tiende, tolvte, fjortende eller 16. dagen i måneden.

</pre>


#### Måned {#cron-exp-month}
----------------------------

I løpet av hvilke måneder av året skal jobben kjøres? Gyldig verdi som kan brukes her er tall mellom 1 og 12, 
eventuelt kan kan de engelske forkortelsene for månedene (*jan*, *feb*, *mar*, *apr*, *may*, *jun*, *jul*,
 *aug*, *sep*, *oct*, *nov*, *dec*) benyttes.

{{% notice note %}}
Eksempel:
{{% /notice %}}

<pre>
<b style="color: green">0 12 1 1,sep-dec *</b>

Dette mønsteret vil få en jobb til å kjøre klokken 12:00 den første i måneden for januer og september til desember.
</pre>

#### Dag i uke {#cron-exp-dow}
------------------------------

I løpet av hvilke dager i uken skal jobben kjøres? Gyldig verdi som kan brukes her er tall mellom 0 (søndag) og 6 (lørdag),
 eventuelt kan de engelske forkortelsene for dagene (*sun*, *mon*, *tue*, *wed*, *thu*, *fri*, *sat*) benyttes.

{{% notice note %}}
Eksempel:
{{% /notice %}}

<pre>
<b style="color: green">59 11 * * 1,2,3,4,5</b>  

Dette mønsteret vil få en jobb til å kjøre klokken 11:59 på mandag, tirsdag, onsdag, torsdag and fredag.  

<b style="color: green">59 11 * * 1-5</b>  

Samme som over.
</pre>

#### Gyldig fra/til
------------------

Feltene gyldig fra og til benyttes til å spesfiere et tidsrom hvor schedule konfigurasjonen er gyldig. 

Feltet er ikke påkrevd, og dersom ingenting er satt vil konfigurasjonen alltid være gyldig. 
Dersom en crawljob er satt opp med en schedule-konfigurasjon som ikke lenger er gyldig, vil ikke denne crawljobben bli kjørt.

{{% notice info %}}
Alle tider er i <b>UTC</b>
{{% /notice %}}

Feltene kan enten settes ved å skrive datoen på form *dd.mm.åååå* eller ved å velge en dato i kalenderen ved å trykke på <i class="fa fa-calendar"></i>

Gyldig fra gjelder da fra begynnelsen av valgte dato klokken 00:00:00, mens gyldig til går til slutten av valgt dato til klokken 23:59:59.  


![valid from datepicker](/veidemann/docs/img/schedule/veidemann_dashboard_schedule_valid_from.png)
