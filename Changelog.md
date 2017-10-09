# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

## [3.0.10] - 2017-10-09
## Changes
- Removed extra dependencies
- Removed dependencies section in package.json file
- Package.json update
- Added react 16.0 support
- Minor code changes, syntax corrections

## [3.0.9] - 2017-10-05
## Changes
- highlightTextGetter
- highlightTextSetter
- Value now its a compound object (check you code before update, see more in migration chapter)
- example changed (search with date correct now)

## [3.0.8] - missed build

## [3.0.7] - 2017-10-03
## Changes
- Added custom options map function, for usage with extra features, like dates in selector
- Custom label render function, placeholder added as second argument
- Additional example added
- Readme propTypes description

## [3.0.6] - 2017-10-02
## Changes
- Component migrated from uncontrolled to controlled
- Added closeOnChange bool flag in props

## [3.0.5] - 2017-09-29
### Changes
- Removed webpack global.require issue
- FuseBox dev dependency updated

## [3.0.1 - 3.0.4] - 2017-09-28
### Missed builds

## [3.0.0] - 2017-09-27
### Changes
- Changelog document.
- New visual identity.
- Updated the js core, migrated to the Type Script.
- Async evaluating the onChange callback
- Removed React, ReactDOM, deps, you can use library with PReact now
- onChage argument is array all time, not depend on multiple flag state in true or false
- Search moved to the options list
- New stack with unit tests with Jest instead of Karma + Jasmine
- CSS classes was restored from 2.x version and don't need to change it
- DOM changes, options list will moved to the react-select-item
- Removed button.react-select-item, we are using div.react-select-item now
- Added awesome click outside handler
- Dev migration from Webpack to FuseBox
- Hotkeys removed temporary in 3.0 beta release, will be restored later
- Highlight search text

## [2.x.x] - 2017-05-23
### Changes
- Merge react-select-box pull-request to the main branch and release new version
- Search added
- Click outside logic changed