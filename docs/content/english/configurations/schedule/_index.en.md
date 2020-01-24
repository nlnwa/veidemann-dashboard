---
title: "Schedule"
weight: 4
---

{{% notice info %}}
Used by [crawljob](../crawljob)
{{% /notice %}}

Schedule defines a time for scheduled job, and is used in Veidemann to determine when different harves jobs are to be run.
A schedule consists of [metadata](../#veidemann-meta) and the values in the table below.  


![schedule overview](/veidemann/docs/img/schedule/veidemann_dashboard_crawlscheduleconfig.png)



Field                              | Function
-----------------------------------|------------------------------------
[Minute](#cron-exp-minute)         | Minute part of the cron expression
[Hour](#cron-exp-hour)             | Hour part of the cron expression
[Dom](#cron-exo-dom)               | Day of the month part of the cron expression
[Month](#cron-exp-month)           | Month part of the cron expression
[Dow](#cron-exp-dow)               | Day of week part of the cron expression
[Valid from](#schedule-valid-from) | Defines a starting date for when the schedule should be valid
[Valid to](#schedule-valid-to)     | Defines an end date for when the schedule should be valid


### Cron 
--------

Schedule defines a cron expression that decides when a crawljob should be run.  
The expression consists of the following parts: 

<pre> 
<b style="color: green"> * * * * * </b>  Expression
 | | | | |
 | | | | |___________ Day of week
 | | | |
 | | | |_____________ Month
 | | |
 | | |_______________ Day of month
 | |
 | |_________________ Hour
 |
 |___________________ Minute

</pre>  

A job will start when all parts of the expression are true.
In addtion to a numeric value, the field support more characters to further specify the expression:
    
* Star wildcard (__*__):   Indicates **every**, and can be used in any of the fields 
<pre>
  <b style="color: green">* * * * * </b>  means:
  Every minute of the hour, every hour of the day, every day of the month, every month of the year and every day of the week.
</pre>  

* Comma (__,__): Each field can contain two or more comma separated values.
  <pre>
  <b style="color: green">59 11 * * 1,2,3,4,5 </b>
  This pattern causes a job to be launched at 11:59AM on Monday, Tuesday, Wednesday, Thursday and Friday.
  </pre>  

* Slash (__/__):  The slash character can be used to identify step values within a range. 
                  It can be used both in the form &ast;/c and a-b/c. 
                  The subpattern is matched every c values of the range 0,maxvalue or a-b.  
<pre>
  <b style="color: green">*/5 * * * *</b>    
  This pattern causes a job to be launched every 5 minutes (0:00, 0:05, 0:10, 0:15 and so on).
  <br>
  <b style="color: green">3-18/ 5 * * * *</b>  
  This pattern causes a job to be launched every 5 minutes starting from the third minute of the hour, 
  up to the 18th (0:03, 0:08, 0:13, 0:18, 1:03, 1:08 and so on).
</pre>

#### Minute {#cron-exp-minute}
--------------------------------
During which minutes of the hour should the job been launched? The values range is from 0 to 59.

{{% notice note %}}
Example:
{{% /notice %}}

<pre>
<b style="color: green">5 * * * *</b>  

This pattern causes a job to be launched once every hour, at the begin of the fifth minute (00:05, 01:05, 02:05 etc.).  

<b style="color: green">* * * * *</b>  

This pattern causes a job to be launched every minute.
</pre>



#### Hour {#cron-exp-hour}
--------------------------
During which hours of the day should the job been launched? The values range is from 0 to 23.

{{% notice note %}}
Example:
{{% /notice %}}

<pre>
<b style="color: green">* 12 * * Mon</b>  

This pattern causes a job to be launched every minute during the 12th hour of Monday.
</pre>

#### Day of month {#cron-exp-dom}
-------------------------------
During which days of the month should the job been launched? The values range is from 1 to 31.

{{% notice note %}}
Example:
{{% /notice %}}

<pre>
<b style="color: green">* 12 1-15,17,20-25 * *</b>  

This pattern causes a job to be launched every minute during the 12th hour of the day, 
but the day of the month must be between the 1st and the 15th, the 20th and the 25, or at least it must be the 17th.  

<b style="color: green">* 12 10-16/2 * *</b>  

This pattern causes a job to be launched every minute during the 12th hour of the day, 
but only if the day is the 10th, the 12th, the 14th or the 16th of the month.  

</pre>


#### Month {#cron-exp-month}
----------------------------
During which months of the year should the job been launched? The values range is from 1 (January) to 12 (December), 
otherwise this sub-pattern allows the aliases "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep",
"oct", "nov" and "dec".

{{% notice note %}}
Example:
{{% /notice %}}

<pre>
<b style="color: green">0 12 1 1,sep-dec *</b>  

This pattern causes a job to be launched at 12:00 on the first day of january, and september to december.
</pre>

#### Day of week {#cron-exp-dow}
------------------------------
During which days of the week should the task been launched? The values range is from 0 (Sunday) to 6 (Saturday),
otherwise this sub-pattern allows the aliases "sun", "mon", "tue", "wed", "thu", "fri" and "sat".


{{% notice note %}}
Example:
{{% /notice %}}

<pre>
<b style="color: green">59 11 * * 1,2,3,4,5</b>  

This pattern causes a task to be launched at 11:59AM on Monday, Tuesday, Wednesday, Thursday and Friday.
Values intervals are admitted and defined using the minus character.
  
<b style="color: green">59 11 * * 1-5</b>  
This pattern is equivalent to the previous one.
</pre>

### Valid from/to
------------------
The fields valid from an to are used to specify a period where the schedule config should be valid.  

The fields are not required, and if not set the config will always be valid.
If a crawljob contains a schedule that is no longer valid, the crawljob will never run.

{{% notice info %}}
All dates are given in <b>UTC</b>
{{% /notice %}}

The fields can either be set by entering the date on the form *dd.mm.yyyy* or by picking a date from the calendar by
clicking <i class="fa fa-calendar"></i>.  

Valid from will then be the beginningof the selected date from 00:00:00, while valid to will the end of the selected
date until 23:59:59.

![valid from datepicker](/veidemann/docs/img/schedule/veidemann_dashboard_schedule_validfrom.png)