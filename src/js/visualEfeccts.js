export function showElement(element, start = 0, displayValue, velocity = 85) {
    element.style.display = displayValue
    const newStart = start + 0.1

    if (newStart <= 1) {
        element.style.opacity = newStart
        setTimeout(() => showElement(element, newStart, displayValue, velocity), velocity)
    } else {
        return
    }
}

export function hideElement(element, Start = 1, velocity = 85, callback) {
    const newStart = Start - 0.1
    if (newStart >= 0.0) {
        element.style.opacity = newStart
        setTimeout(() => hideElement(element, newStart, velocity, callback), velocity)
    } else {
        element.style.display = "none"
        callback()
    }
}
