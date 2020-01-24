---
title: "Crawlconfig"
weight: 5
---

{{% notice info%}}
Crawlconfig is used by [crawljob](../crawljob)
{{% /notice %}}  

Crawlconfig contains settings for how content should be crawled. Here you can set which configuration should be used 
for the web browser during harvesting, and which politeness settings should be used.  

In addition to the settings discussed on this page, the configuration also contain [metadata](../#veidemann-meta).

![crawlconfig overview](/veidemann/docs/img/crawlconfig/veidemann_dashboard_crawlconfig_overview.png)

Field                                            | Function
-------------------------------------------------|------------------------------------------
[Browserconfig](#crawlconfig-browserconfig)      | Which [browserconfig](../browserconfig) to use.
[Politenessconfig](#crawlconfig-politenessconfig)| Which [politenessconfig](../politenessconfig) to use.
[DNS TTL](#crawlconfig-dns-ttl)                  | Not implemented.
[Priority weight](#crawlconfig-priority-weight)  | Priority of the job.
[Extract text](crawlconfig-extract-text)         | Should text from the harvested material be extracted.
[Create snapshot](#crawlconfig-create-snapshot)  | Create a snapshot of the  home page.
[Depth first](#crawlconfig-depth-first)          | Not implemented.



#### Browserconfig {#crawlconfig-browserconfig}
-----------------------------------------------  
Defines what [browserconfig](../browserconfig) the config should use.
Browserconfig consists of setting for the web browser used for harvesting.
 

#### Politenessconfig {#crawlconfig-politenessconfig}
-----------------------------------------------------
Defines what [politenessconfig](../politenessconfig) the config should use.
Politenessconfig consists of settings that determines how much load the harvester should expose the pages it visits.  

#### DNS TTL {#crawlconfig-dns-ttl}
------------------------------------
Not implemented.

#### Priority weight {#crawlconfig-priority-weight}
-----------------------------------------------------
The weighting between jobs when two jobs compete on fetching resources from the same hosts.
The job will be randomly choosed, but weighted such that if that two jobs with weight 1.0 and one job with
weight 2.0 compete, then the two first jobs will each have 25% probability of beeing choosed and the the third
job will have 50% probability of beeing choosed.

#### Extract text{#crawlconfig-extract-text}
-----------------------------------------------
Decides if the text on harvested pages should be extracted and put in the database.
The text could then be used make content searchable or language processing. 


#### Create snapshot {#crawlconfig-create-snapshot}
--------------------------------------------------
Determines wheter a snapshot is taken of the home page of the harvested site.

#### Depth first {#crawlconfig-depth-first}
-------------------------------------------
Not implemented.