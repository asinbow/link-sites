Sites in One
---

### Ambitions
* Link sites
* Product prototype

### TODO
* Request via background.js
* Config hosting
  * TAPD
* Data Transformers
  * jQuery for HTML text
  * jQuery for HTML elements
  * lodash `get`
  * JSON/YAML
  * By HTTP GET/POST
  * Transformer chaining
  * Transformer splitting
* Data Transformers
  * For Config
  * For Data
* Watchers
  * By config
  * `Mutation`
* Locators
  * jQuery, search then relatively locate
  * Locate by current cursor
  * Locate by current selection
* Config UI
  * List of URLs 
  * Save
* Popup
  * Template engine [Handlebars.js](https://github.com/wycats/handlebars.js)
  * Click handlers
  * Rich interaction embeded
* Fill inputs
  * Keyboard events simulation


### TODO
##### Link it
* Config
  * locate context
```yaml
cursorElement:
	element
	classNames: []
currentElement: # auto update during locating
	element
	classNames: []
```
  * transform context
```yaml
origin: ""
current: ""
```
  * config
```yaml
locate:
  - type: selector, # "selector"
    args:
      - ":contains('name')" # jQuery selector
    search: child # "child", "before", "after", "domain"
    setContext:
      pickElement: this
watch:
  - {} # TODO resonate with `locate`
action:
  - type: "link"
    transforms:
      - type: "regex"
        args: [],
        setContext:
          matches: "matches"
        format: "http://example.com/User-${matches[0]}" // lodash index rule
```
##### Fetch data on page
* context
```yaml
url: "http://example.com/wh/*" # pattern
fetch:
  type: "HTTP"
  args:
    - "GET",
    - "http://example.com/api/..." # url
    - "params" # params
    - "body" # body
  transform:
    - type: "get",
      args:
        - "data[0]"
render:
  data: "current" # "" = "current", lodash `get`
  type: "div"
  text: ""
  style: ""
  children:
    - data: "current",
      type: "ul"
      text: "",
      style: "",
      children:
        - data: "current[${i}]",
          type: "li"
          text: "",
          style: "",
          click: "setupData",
          children:
            - type: "div"
```
##### Setup data
```yaml
events:
  - name: "setupData",
    action:
      - locate: []
        transform: []
```
