
export const inspect = (domRoot, html) => {
  let exludeRules = [
    // validation rules
    "validate-elements",
    "validate-element-location",
    "validate-attributes",
    "duplicate-ids",
    "unique-elements",

    // best-practices
    "inline-event-handlers",
    "script-placement",
    "unused-classes",
    "unnecessary-elements",

    // convention
    "bem-conventions",
  ]

  let config = {
    domRoot: "html",
    useRules: null,
    excludeRules: exludeRules,
    excludeElements: "svg",
    excludeSubTrees: ["svg", "iframe"],
    onComplete: function (errors) {
      errors.forEach(function (error) {
        console.warn(error.message, error.context)
      })
    }
  }

  let result = ''

  const log = (message) => {
    result += `${message}\n`
    console.log(message)
  }

  const extractText = (domElement) => {
    if (domElement.innerHTML) return domElement.innerHTML

    return Object.keys(domElement.attributes)
      .map(key => domElement.attributes[key])
      .sort((a, b) => {
        let aName = a.name.toLowerCase()
        let bName = b.name.toLowerCase()
        if (aName < bName) {
          return -1
        }
        if (aName > bName) {
          return 1
        }
        return 0
      })
      .map(attribute => `${attribute.name}=${attribute.value}`)
      .join(', ')
  }


  let elements = {}
  const trackElement = (elementName, domElement) => {
    if (elements[elementName] === undefined) {
      elements[elementName] = []
    }

    let item = {
      name: elementName,
      element: domElement,
      text: extractText(domElement)
    }

    elements[elementName].push(item)
  }

  let trackedElements = ['h1', 'h2', 'h3', 'meta']

  log(`inspecting HTML at domRoot=${domRoot.id}...`)
  let start = Date.now()

  window.HTMLInspector.rules.add('spokeo-seo', {}, function (listener, reporter, config) {
    listener.on('element', function (elementName, domElement) {
      if (trackedElements.indexOf(elementName) !== -1) {
        trackElement(elementName, domElement)
      }
    })
  })

  let c = { ...config, domRoot: domRoot }

  window.HTMLInspector.inspect(c)
  log(`DONE (${Date.now() - start} ms)`)
  trackedElements.forEach((elementName, i) => {
    let found = elements[elementName] || []
    log(`=== ${elementName} - ${found.length} item(s) found`)
    found.forEach((element, j) => {
      log(`\t${j + 1}. ${elementName} - ${element.text}`)
    })
  })

  return result
}