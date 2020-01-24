---
title: "Crawljob"
weight: 3
---

{{% notice info %}}
Used by [seeds](../entities-and-seeds#seed)
{{% /notice %}}

Crawljob is used for define a job for harvesting. In addition to the parameters shown in the table below, 
the configuration also contains [metadata](../#veidemann-meta).

![crawljob overview](/veidemann/docs/img/crawljob/veidemann_dashboard_crawljob_overview.png)  


Field                                | Function
-------------------------------------|------------------------------------------
[Deactivated](#crawljob-disabled)    | Stop the job from running
[Depth](#crawljob-depth)             | The depth to crawl
[Max time](#crawljob-max-time)       | How long the job should run
[Max bytes](#crawljob-max-bytes)     | Maximum amount of data to download
[Schedule](#crawljob-schedule)       | The [schedule](../schedule) to use
[Crawlconfig](#crawljob-crawlconfig) | The [crawlconfig](../crawlconfig) to use  


#### Deactivated {#crawljob-disabled}
--------------------------------------
The switch is used to deativate the crawljob. With the switch set in the on position, the job will never run.

#### Depth {#crawljob-depth}
----------------------------
The depth decides how many levels of a web page to crawl. For example will a depth of the 3 mean that the crawler can
visit 3 URL's way from the start page.

#### Max time {#crawljob-max-time}
----------------------------------  
The maximum time in seconds that the job is allowed to run. The job will then run from the start time given in the 
schedule, until it reaches it's max time.

#### Max bytes {#crawljob-max-bytes}
------------------------------------- 
The maximum amount of data, given in bytes, that crawler can download. If exceeded the job should be stopped.
 
#### Schedule {#crawljob-schedule}
----------------------------------  
Set the time for when the job should be run by defining a [schedule](../schedule).  
The field is not required, but if the crawljob is missing a schedule the job will never run and must be started 
manually. 

#### Crawlconfig {#crawljob-crawlconfig}
----------------------------------------
Choose what settings the crawljob should use be setting a [crawlconfig](../crawlconfig).
The crawlconfig includes settings for the web browser used for harvesting and politeness settings. 