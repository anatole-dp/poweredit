Element.prototype.newEl = function (elType,_elSelectors) {
    let element = newEl(elType,_elSelectors)
    this.appendChild(element)

    return element
}

function newEl (elType,_elSelector) {
    let element = document.createElement(elType)

    if (_elSelector) {
        if (_elSelector.includes('#')) {
            if (_elSelector.includes('.')) {
                let elID = _elSelector.substring(0, _elSelector.indexOf('.'))
                createClass(_elSelector.replace(elID,''))
                element.id = elID.substring(1)
            } else {
                element.id = _elSelector.substring(1)
            }
        } else {
            if (_elSelector.includes('.')) createClass(_elSelector)
        }

        function createClass (classStr) {
            let classSet = classStr.split('.')
            classSet.forEach(name => {
                if (name !== '') element.classList.add(name)
            })
        }
    }

    return element
}

function getEl (elSelectors) {
    return document.querySelector(elSelectors)
}

export { getEl }