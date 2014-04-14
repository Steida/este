goog.provide 'App'

class App

  ###*
    @param {Element} element
    @param {app.todos.Collection} todos
    @param {app.react.App} reactApp
    @constructor
  ###
  constructor: (element, todos, reactApp) ->

    reactAppComponent = reactApp.reactClass()
    renderedAppComponent = React.renderComponent reactAppComponent, element

    # Square brackets syntax for external code without externs.
    observer = new goog.global['ArrayObserver'] todos.items
    observer.open ->
      renderedAppComponent.forceUpdate()

    if !Object['observe']
      setInterval goog.global['Platform']['performMicrotaskCheckpoint'], 50

    return