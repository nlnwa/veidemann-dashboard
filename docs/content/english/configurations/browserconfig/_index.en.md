---
title: "Browserconfig"
weight: 7
---

{{% notice info%}}
Browserconfig is used by [crawlconfig](../crawlconfig)
{{% /notice %}}  


Browserconfig contains settings for  the web browser used by the crawler. In addition to the fields described below,
does a browserconfig contain fields for [metadata](../#veidemann-meta).


![browserconfig overview](/veidemann/docs/img/browserconfig/veidemann_dashboard_browserconfig_overview.png)


 Field                                                         | Function
---------------------------------------------------------------|--------------------------------------------------------
[User agent](#browserconfig-useragent)                         | Identifies the harvester.
[Window width](#browserconfig-window-width)                    | Browser window width.
[Window height](#browserconfig-window-height)                  | Browser window height.
[Pageload timeout in ms](#browserconfig-pageload-timeout)      | How long the harvester should wait for a page to load before giving up.  
[Sleep after pageload ms](#browserconfig-sleep-after-pageload) | How long the harvester should sleep after a page is loaded.
[Browser script](#browserconfig-browserscript)                 | What [browserscript](../browserscript) the web browser should use.
[Script selector](#browserconfig-scriptselector)               | Select browserscript by label.  


#### User agent {#browserconfig-useragent}
-------------------------------------------

When the harvester visits a web page, it sends information about what browser it is and on what platform it's running on.
The user agent is the browsers way of identifying itself, and can be used by website to show custom pages for different
browsers.   

Default user agent for Veidemann is: **nlnbot/1.0**


#### Window width {#browserconfig-window-width}
-----------------------------------------------
Sets the width of the browser window. Assures that the content on the page is shown correctly, and is also used to 
determine the size of the [snapshot](../crawlconfig/#crawlconfig-create-snapshot).

#### Window height {#browserconfig-window-height}
-----------------------------------------------
Sets the height of the browser window. Assures that the content on the page is shown correctly, and is also used to 
determine the size of the [snapshot](../crawlconfig/#crawlconfig-create-snapshot).

#### Pageload timeout {#browserconfig-pageload-timeout}
-------------------------------------------------------
Determines how long the harvester should try to load a web page before giving up and continue with the next one.

#### Sleep after pageload {#browserconfig-sleep-after-pageload}
---------------------------------------------------------------
Determines how long the harvester should sleep after a page is loaded. This is used to assure that the browser has enough
time to load the entire page. 

#### Browserscript {#browserconfig-browserscript}
--------------------------------------------------
Assign one or more  [browserscript](../browserscript) for the browser to use while harvesting.   

#### Script selector {#browserconfig-scriptselector}
----------------------------------------------------
Select scripts by label
A string representing a label query. The query matches if at least one label matches the query.
If there are multiple queries, then each query must match at least one label.
Label quries are case insensitive. The basic format is <code>key:value</code> where both key and value must match.
  
  If value ends with <code>&ast;</code> then the key must match and value must match up until the <code>&ast;</code>  
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