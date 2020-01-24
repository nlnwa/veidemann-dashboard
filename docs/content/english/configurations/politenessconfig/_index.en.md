---
title: "Politenessconfig"
weight: 9
---

{{% notice info %}}
Used by [crawlconfig](../crawlconfig)
{{% /notice %}}  

Politenessconfig contains settings that determines how much pressure the crawler should expose the websites it visits.
In addition to limit the crawler from overloading a website, it also set policies for how the crawler shall follow  
robots.txt. Apart from the fields described below, a politenessconfig also consists of [metadata](../#veidemann-meta).

![politenessconfig overview](/veidemann/docs/img/politenessconfig/veidemann_dashboard_politenessconfig_overview.png)  


Field                                                               | Function
--------------------------------------------------------------------|-----------------------------------------
[Policy](#config-policy)                                            | What policy should be used
[Crawlhostgroup selector](#config-crawlhostgroup-selector)          | Use crawlhostgroupconfigs that matches the selector
[Minimum robots validity](#config-min-robots-validity)              | How much time should pass before fetching a sites robots.txt again.
[Minimum time between page load](#config-min-time-between-pageload) | Minimum time before the next page should be fetched.
[Maximum time between page load](#config-max-time-between-pageload) | Maximum time before next page should be fetched
[Delay factor](#config-delay-factor)                                | Factor to determine how long to wait before next page is fetched.
[Maximum retries](#config-max-retries)                              | Maximum amount of retries for fetching a page
[Retry delay](#config-retry-delay)                                  | How many seconds to wait before trying to fetch a page again.


#### Policy {#config-policy}
----------------------------  
Determines if the crawler should follow the rules given in a sites robots.txt.
The available policies are:

- **OBEY_ROBOTS:**  
    Follow the rules given in the robots.txt.
   
- **IGNORE_ROBOTS:**  
    Ignore the rules given in the robots.txt.

- **CUSTOM_ROBOTS:**  
    Create a custom robots.txt for the crawler to use instead of the one created for the site.
 

#### Crawlhostgroup selector {#config-crawlhostgroup-selector}
--------------------------------------------------------------
Select crawl host groups by label
  A string representing a label query. The query matches if at least one label matches the query.
  If there are multiple queries, then each query must match at least one label.
  Label quries are case insensitive. The basic format is <code>key:value</code> where both key and value must match.
  
  If value ends with <code>&ast;</code> then the key must match and value must match up until the <code>&ast;</code>.
  If value is empty, all labels matching the key will match.
  If key is empty, then the matching is done on the value for all keys.
  If key is empty, then the <code>:</code> might be ommitted.

<pre>
   Examples:
     "foo:bar"  - matches exactly labels with key=foo and value=bar  
     
     "foo:"     - matches all labels with key=foo  
     
     ":bar"     - matches all labels with value=bar  
       
     "foo:ba*"  - matches labels with key=foo and value starting with ba 
                  (e.g. matches bar, but not ber)  
     
     ":ba*"     - matches labels with any key and value starting with ba 
                  (e.g. matches bar, but not ber)  
     
     ":"        - matches every label
</pre>

#### Minimum robots validity {#config-min-robots-validity}
----------------------------------------------------------
The minimum amount of time the harvester should wait before fetching a websites robots.txt again.
 
#### Minimum time between page load {#config-min-time-between-pageload}
-----------------------------------------------------------------------
The minimum amount of time, given in milliseconds, the harvester should wait before continuing with the next URI.

#### Maximum time between page load {#config-max-time-between-pageload}
-----------------------------------------------------------------------
The maximum amount of time, given in milliseconds, the harvester should waith before continuing with the next URI.

#### Delay factor {#config-delay-factor}
----------------------------------------
The fetch time of the URI is multiplied with this value to get the delay time before fetching the next URI.
If minimum time between page_load and/or maximum time between page load are set, then those values are used as
the upper/lower limits for delay.
If delay factor is unset or zero, then a delay facor of one is assumed. If delay factor is negative,
a delay factor of zero is assumed.

#### Maximum retries {#config-max-retries}
------------------------------------------
The maximum amount of retries the harvester should use on trying to fetch a URI before giving up.

#### Retry delay {#config-retry-delay}
--------------------------------------
How many seconds the harvester should before trying to fetch a URI again. 


    
 
