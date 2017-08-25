# React-Custom-Calendar

A fully customizable calendar app

## Principles
Calendar component lives 

Why I chose to use divs for the table

https://css-tricks.com/responsive-data-tables/

 ## Calendar   View

  - [ ] Reusable Calednar View
	- [ ] Create, edit, delete events
	- [ ] Modal Popover for each event
	- [ ] Should take a Filter Sidebar Component
	- [ ] Sidebar is completely separate

## Styles 

All classnames are prefixed with rc
 The   calendar   view   should   incorporate   a   reusable    calendar   component    with   the   ability   to   create,   edit, delete   events.   Creating,   editing,   and   deleting   events   should   be   done   via   modal/popover.   Clicking   on an   empty   cell   should   bring   up   the   event   creation   modal   where   the   user   can   edit   the   following attributes:
Title   -   Title   of   the   event
Date   -   Which   date   the   event   takes   place   (pre-populated   if   clicking   on   a   calendar   cell) Time   -   Start   time   and   End   time
Type   -   The   category   of   the   event   (birthday,   holiday,   company   event,   miscellaneous)
If   the   cell   is   not   empty,   the   user   should   be   able   to   click   on   an   event   to   bring   up   a   modal   to   edit   the above   fields.
A   reusable    filter   component    should   be   developed   separately   from   the    calendar   component .   The filter   component   should   be   able   to   filter   over   the   different   types   of   events   (birthday,   holiday, company   event,   miscellaneous)   and   be   multi-selectable   (i.e.   have   more   than   one   filter   at   a   time).
There   should   be   an   “Add   to   Dashboard”   button   that   will   take   a   snapshot   of   the   current   calendar   view with   applied   filters   (if   any)   and   will   save   to   the   dashboard   view   [detailed   below]   under   a   configurable name,   which   can   then   be   clicked   to   access   the   calendar   with   these   same   specified   parameters.
 - []