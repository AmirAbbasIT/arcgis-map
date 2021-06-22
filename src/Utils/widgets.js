const loadWidget = (Widget, view, ref, options, expression) => {
    return new Widget({
        container: ref.current,
        view: view,
        ...options,
        expression
    })
}

export { loadWidget }