---
title: "Crawlhostgroupconfig"
weight: 6
---
{{% notice info %}}
Used by [politenessconfig](../politenessconfig)
{{% /notice %}}

A crawlhostgroupconfig  is used to specify a collection of IP addresses.
The crawlhostgroupconfig could then be used by a politenessconfig to determine rules for sites hosted on these IPs.  

#### IP-range
-------------

In addition to [metadata](../#veidemann-meta), a crawlhostgroupconfig  could contain on or more IP-ranges.

The IP addresses could either be IPv4 or IPv6 addresse,  but both the from and to address has to be of the same IP version.
The first part of the address (before the first *.* in IPv4 and the first *:* in IPv&) in each of them  should also be
the same to be considered as a valid range.

![crawlhostgroupconfig overview](/veidemann/docs/img/crawlhostgroupconfig/veidemann_dashboard_crawlhostgroupconfig_overview.png)
