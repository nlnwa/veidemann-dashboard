---
title: "Configurations"
pre: "<i class='fa fa-cog'></i>"
weight: 3
---

From Veidemann dashboard users can set numerous different configurations to control the harvesting of web pages.

This part of the documentation will focus on giving an insight to the different configurations and the settings they consists of. 

All available configurations are shown in the table below, with a short description of their use case.  
A more in-depth description can be found be navigating to the page for the specific configuration.

#### Configurations
--------------------  

Config                                 | Description
---------------------------------------|--------------------------------------------------------------------------------
[Entities/Seeds](entities-and-seeds)   |  Administrate and configure web pages to harvest.
[Crawljobs](crawljob)                  |  Define jobs used for harvesting.
[Schedule](schedule)                   |  Create time-based job schedules used by crawljobs.
[Crawlconfig](crawlconfig)             |  Settings for the crawler. Crawlconfig is used by crawljobs.
[Crawlhostgroup](crawlhostgroupconfig) |  Create collections of IP-addresses. For use with politenessconfig.
[Browserconfig](browserconfig)         |  Settings for the browser used for harvesting.
[Browserscript](browserscript)         |  Create scripts to be used be the harvesting browser.
[Politeness](politenessconfig)         |  Politeness settings for the crawler.
[Logging](logging)                     |  Administrate logs in Veidemann.
[Users](users)                         |  Administrate users af Veidemann dashboard.
[WARC status](warcstatus)              |  Validation status of harvested material.


#### Use of the configuration pages
----------------------------------

Most of the configuration pages have the same layout, and consists of two parts:  
- List of all available configurations.
- Details for a selected configuration. 

![configuration pages overview](/veidemann/docs/img/config/veidemann_dashboard_configuration_pages_overview.png)  

##### Create a new config

A new configuration of a given type is created by pressing the *add button* in the upper right corner.
An empty form will be shown to enter the values. When the required fields are filled with correct values, a save button 
will become available. If a field contains invalid values, an error message will be shown below the field.

{{% notice note %}}
If more than one config is selected, it's not possible to create new configurations. Remove the selections to start 
creating a new configuration. 
{{% /notice %}}


##### Tilgjengelige konfigurasjoner

The list on the top shows available configurations of a given type. By clicking a config in the list, the details of the
configuration will be shown below. You will then be able to edit or delete the configuration. Unsaved changes can be 
reverted to initial values by pressing the revrt button.

#### Update multiple configurations
------------------------------------------
Several of the configurations have support for multiple update.
Veidemann dashboard have two different methods of updating multiple configs at once:

1. Update a selection  
2. Update all available configs.  

##### Update selection
If more than one config is selected it's possible to edit the fields for all, except meta. If a field contains data, it 
means that the shown value is common for all selected configurations. If a field is updated, the new value will be set
for all the selected configs. If a field remains empty, all configurations will keep their original values.   

{{% notice note %}}
Fields with on/off values (true/false), will be deactivated if the value is not common for all the selected. To set a 
common value for all, the field most be activated by clicking on it, and the set to the desired value. 
{{% /notice %}}

![config selected multiupdate](/veidemann/docs/img/config/veidemann_dashboard_configuration_selected_multiupdate.png)


##### Update all available configurations

When selecting all configurations on a page, you will be given the choice of selecting all available configs. In this case
there will be no comparing for common values. If a field remains empty when updating all available, the configurations will
keep the orignal value of this field. 


![config all on page selected](/veidemann/docs/img/config/veidemann_dashboard_all_configs_on_page_selected.png)

![config all configs selected](/veidemann/docs/img/config/veidemann_dashboard_all_configs_selected.png)


#### Meta {#veidemann-meta}
----------------------------

Common to most of the configurations in Veidemann is that they have associated metadata describing basic information
about the configuration. 

The content in meta can be found in the table below.  

![meta overview](/veidemann/docs/img/config/veidemann_dashboard_meta_overview.png)  


Field                                       | Function
--------------------------------------------| -----------------------------------------------------------------------------
[Name](#meta-name)                          | Name of the config. 
[Description](#meta-description)            | Descripton of the config.
[Label](#meta-label)                        | Labels for grouping, search etc.
[Created](#meta-created)                    | Creation timestamp 
[Created by](#meta-created-by)              | Name of user that created the config
[Last modified](#meta-last-modified)        | Last modified timestamp
[Last modified by](#meta-last-modiefied-by) | Name of user that last modified the config.
[Id](#meta-id)                              | Unique number for identifying the config.


##### Name {#meta-name}
----------------------
Contains a custom name for identifying the config. The field is required and must consist of at least two characters.


##### Description {#meta-description}
------------------------------------
Contians a custom description for the configuration. Use this field to give more info about the config. The field is not
required.

##### Label {#meta-label}
------------------------

A label consist of a key-value-pair on the form: **key:value**, and is created by clicking on the line a enter the 
desired value in before mentioned form and press enter.

Existing labels can be edited or deleted. By clicking on a label you will also be able to edit key and/or value.
![meta label](/veidemann/docs/img/config/veidemann_dashboard_meta_label.png)


![meta edit label](/veidemann/docs/img/config/veidemann_dashboard_meta_edit_label.png)

##### Created {#meta-created}
------------------------------
Contains a timestamp in UTC for when the config was created. The field is automatically generated
when a new config is saved.
  
##### Created by {#meta-created-by}
------------------------------------
Contains the name or e-mail of the user responsible for creating the config. The field is automatically generated 
when a new config is saved.

##### Last modified {#meta-last-modified}
--------------------------------------
Contains a timestamp of when the config was updated last. The field is automatically updated when a config is updated.
      
##### Last modified by {#meta-last-modified-by}
--------------------------------------------
Contains name or e-mail of the user responsible for the latest update og the config. The field is automatically updated
when a config is updated.

##### Id {#meta-id}
-------------------
Contains an unique ID for the configuration. The field is automatically created when a configuration is created.
