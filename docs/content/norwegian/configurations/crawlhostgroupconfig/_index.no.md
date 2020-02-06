---
title: "CrawlHostGroup"
weight: 7
---
{{% notice info %}}
Brukes av [politenessconfig](../politenessconfig)
{{% /notice %}}

En crawlhostgroupconfig brukes til å angi et utvalg av IP-addresser.
Dette blir brukt av politenessconfig til å bestemme en felles regel for sider som ligger på disse IP-addressene.  

![crawlhostgroupconfig overview](/veidemann/docs/img/crawlhostgroupconfig/veidemann_dashboard_crawlhostgroup_overview.png)

#### Liste over tilgjengelige crawlhostgroupconfigs
---------------------------------------------------

##### Snarveier
---------------
Ikon                                                                                         | Snarvei
---------------------------------------------------------------------------------------------|------------------
![clone_crawlhostgroup](/veidemann/docs/img/icons/veidemann_dashboard_icon_clone_config.png) | Lag en klone av konfigurasjonen

#### IP-range
-------------

I tillegg til [metadata](../#veidemann-meta), kan en crawlhostgroupconfig inneholde en eller flere IP-range.

IP-addressene kan enten være en IPv4 eller IPv6 addresse, men både til og fra addresse må være av samme IP-versjon.
I tillegg må verdien før første punktum (IPv4) eller kolon (IPv6), i hver av dem være lik for IP-rangen skal ses som gyldig.


