---
title: "Crawllog"
weight: 4
---

Fra denne siden kan man lese statusrapporter for høstingen av en spesifikk URI.
Rapporten inneholder detaljert informasjon om hvordan høstingen ressurs gikk. 

![report_crawllog_overview](/veidemann/docs/img/report/crawllog/veidemann_dashboard_report_crawllog_overview.png)  

#### Liste over crawllogs
-------------------------  
Listen inneholder alle URI'er som har blitt høstet av Veidemann.
Her har vi kolonnene:

Kolonne        | Beskrivelse
---------------|------------
Requested URI  | URI som ble høstet
Timestamp      | Tidspunktet URI var ferdig høstet
Status code    | Hilken [HTTP-statuskode](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) høsteren fikk ved henting av ressursen
Discovery path | Stegene som ble tatt for å finne URI. Se [Discovery path](#discoveryPath)
Content type   | Hvilken type innhold som er høstet

Ved å trykke på en rad i listen vil [Crawllog](#crawllog) for URI vises.

##### Sortering og filtrering
-----------------------------
Listen kan filtreres på ulike måter.   

Filtrene som kan benyttes er:

Filter          | Funksjon
----------------|---------------------------------------------------------------------------------------------------------------------------------------------
JobExecution ID | Skriv inn en [JobExecution ID](../../report/crawljob) for å bare vise crawllog for sider høstet i denne jobben
Execution ID    | Skriv inn en [Execution ID](../../report/crawlexecution) for å bare vise crawllog for høsting av en bestemt seed


#### Crawllog {#crawllog}
--------------------------
![crawllog_details](/veidemann/docs/img/report/crawllog/veidemann_dashboard_report_crawllog_details.png)

Når en rad i listen velges vises en detaljert oversikt over hvordan høstingen av URI gikk. 
Følgende informasjon kan leses:

Felt              | Beskrivelse
------------------|-----------------------------------------------------------------------
Requested URI     | URI som ble høstet
Referrer          | Adresse (URI) til hvor URI som er høstet ble funnet
Response URI      | Hvilken addresse svaret kom fra
Discovery path    | Stegene som ble tatt for å finne URI. Se [Discovery path](#discoveryPath)
SURT              | Sort-friendly URI Reordering Transform for URI som ble høstet
Status code       | Hilken [HTTP-statuskode](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) høsteren fikk ved henting av ressursen
Fetch timestamp   | Tisdpunkt for når høstingen av ressursen ble startet. 
Fetch time        | Tiden det tok å høste ressursen
Block digest      | Sjekksum av WARC record
Payload digest    | Sjekksum av payload i WARC record
Size              | Filstørrelse for ressursen
Content type      | Hvilken type innhold som er høstet
Storage reference | Hvor innholder er blitt lagret
Record type       | Hvilken [type WARC record](https://iipc.github.io/warc-specifications/specifications/warc-format/warc-1.0/#warc-record-types) innholdet ble skrevet til
WARC refers to    | ID til WARC record som også inneholder på data for denne ressursen
IP address        | IP-adresse inneholdet ble hentet fra.
Retries           | Hvor mange forsøk ble brukt til å høste innholdet
Collection name   | Navn på kolleksjonen ressursen ble høstet til
Method            | Hvilken [HTTP metode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) som ble brukt til å hente ressursen

##### Disacovery path {#discoveryPath}
 {{% notice note %}}
 Hver URI har en funnsti. Stien inneholder en bokstav for hver link eller embed som er blitt fulgt fra seeden.  
 Funnstien for en seed er tom.
  ```
    R - Redirect
    E - Embed
    X - Speculative embed (aggressive/Javascript link extraction)
    L - Link
    P - Prerequisite (as for DNS or robots.txt before another URI)
  ```
 {{% /notice %}}



##### ID-er
------------
I bunnen på siden finner man tre ID-er.  

- WARC id: ID til WARC-record hvor det innehøstede materialet er lagret.
- Job execution id: ID-en til [JobExecution](../crawljob) som blir brukt til å høste seeden. Ved å trykke på linken blir man tatt til rapportsiden for jobben.
- Crawl execution id: ID-en til [CrawlExection](../crawlexecution) som blir brukt til å høste seeden. Ved å trykke på linken blir man tatt til rapportsiden for høstingen av seeden.
