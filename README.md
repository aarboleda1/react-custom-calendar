# React-Custom-Calendar

A fully customizable calendar app

## Principles
Calendar component lives 

Why I chose to use divs for the table

https://css-tricks.com/responsive-data-tables/

 ## Calendar   View

  - [X] Reusable Calednar View
	- [ ] Create, edit, delete events
	- [ ] Modal Popover for each event
	- [ ] Should take a Filter Sidebar Component
	- [ ] Sidebar is completely separate


## Todo Create Events today and save them and take snapshot
## Styles 



# Reddit Mobile
Reddit Mobile is a mobile version of [reddit](https://www.reddit.com/) using the React-Native Library. View the most up to date and trending reddit articles in an elegant UI.
## Prerequisites
- You will need Node.js, Watchman, the React Native command line interface, and Xcode.
- Please go to [React Native Setup](https://facebook.github.io/react-native/docs/getting-started.html) to install React Native

## Installation
1. Open new terminal window
2. `git clone https://github.com/aarboleda1/react-custom-calendar.git` - clone repo
3. `cd ./react-custom-calendar`
4. `npm install` - install dependencies
5. `npm run start`

## To see each component in action run `npm run storybook`

## Milestones and Tasks

**Basic:**
- [x] Use Redux.
- [x] Create a main screen that fetches from Reddit’s API (https://www.reddit.com/.json) and displays the basic content (author, title, thumbnail, up votes, etc) in a list.
- [x] Users should be able to pull to refresh the list.
- [x] Clicking on a specific item should transition to a different screen within the app. This screen's content can just simply display the same basic content. Users should be able to go back to lsthe main screen.

## Libraries used and why I chose them
- **_lodash_** 

## Folder Directory Guideline
- All of my work is in the `src` folder
* **_/src_**
   - **_/actions_** _all redux actions_
   - **_/components_** _In the root of this folder are the 3 main components that make up the UI_        
     - **_/common_** _Reusable components that are used throughout the main components_
   + app.js - _main entry point into app_    
   + configureStore.js - _redux store configuration in the app_
    
## Todo
- Verify app works on Android platform
- The refresh feature works, but I plan to refactor to keep state of list on refresh


## License
The content of this repository is licensed under a MIT license.
[LICENSE](/LICENSE) file.


