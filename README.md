# React-Custom-Calendar

## Installation
1. Open new terminal window
2. `git clone https://github.com/aarboleda1/react-custom-calendar.git` - clone repo
3. `cd ./react-custom-calendar`
4. `npm install` - install dependencies
5. `npm run start`

** To see each component in action run `npm run storybook` **

[__DEMO and Docs__](http://antonarboleda.io/react-custom-calendar/)
## Milestones and Tasks

## Libraries/Resources used
- ** React **
- **_lodash_** 

## Folder Directory Guideline
- All of my work is in the `src` folder
* **_/src_**
   - **_/components_** _In the root of this folder are the main components that make up the UI_        
   + app.js - _main entry point into app_   

[]
# API 
React-custom-calendar is a calendar component for managing events and dates. I used moden flexbox for layout to make it responsive and performant. 

# Props

## view
- type: `string`
React-custom-calendar comes with the ability to add a Dashboard and Calendar View to display events and dates in 

## events
- type: `object`
types= ['Birthdays',	'Holidays',	'Company Events', 'Miscellaneous']
Pass for each event, generate a unique id for each event. 
types: []
id - `ak324nj`
`[id]: {
   name: 'EventName',
   date: '14',
   month: 'August',
   type: one of type, see above,
   start_hour: '6',
   start_minute: '30',
   start_amPm: 'amPm',
   end_hour: '8',
   end_minute: '30',
   end_amPm: '40',
   key: id
 }         
}`

## elementProps

Customize how different sections of the calendar render by providing custom Components. Props to be passed to the main calendar <div>
- type: `object`
You have the option of passing in a <Filter/> component, in order to see a select number of events
You also have the option of toggling between views and passing in a custom dashboard view 
## Todo
- Snapshots don't take a snapshot of the month, but rather a a snapshot of all events with the correct type. 
- Edit and Delete events 
- Deploy online





## License
The content of this repository is licensed under a MIT license.
[LICENSE](/LICENSE) file.


