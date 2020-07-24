import { getEl } from "../utils/dom"

let rightPanel = new class {
    constructor () {
        let rightPanel, control, controlTab, styleTab, styleSelectors, styleSet, traitTab, layerTab = null
        let buttonSet = []
        let activeTab = 'rightPanel_style'

        this.init = function (rp) {
            rightPanel = rp
            control = rightPanel.newEl('div','#rightPanel_control')
            controlTab = rightPanel.newEl('div','#rightPanel_controlTab')
            styleTab = controlTab.newEl('div','#rightPanel_style.rightPanel_tabs')
            styleSelectors = styleTab.newEl('div','#rightPanel_styleSelectors')
            styleSet = styleTab.newEl('div','#rightPanel_styleSet')
            traitTab = controlTab.newEl('div','#rightPanel_trait.rightPanel_tabs')
            layerTab = controlTab.newEl('div','#rightPanel_layer.rightPanel_tabs')

            styleTab.setAttribute('data-simplebar','')
        }

        this.setCommands = function (editor) {
            let cmd = editor.Commands
            let cpID = 'rightPanel_control'
            buttonSet = [
                editor.Panels.getButton(cpID, 'styleControl'),
                editor.Panels.getButton(cpID, 'traitControl'),
                editor.Panels.getButton(cpID, 'layerControl')
            ]

            cmd.add('rightControl:setTab', {
                run() {
                    buttonSet.forEach(button => {
                        let target = null
                        let classSet = button.attributes.className
                        let targetClasses = getEl('.' + classSet.replace(' ', '.')).className.split(' ')
                                
                        targetClasses.forEach(name => {
                            if (name.startsWith('rpCB_')) {
                                target = getEl('#rightPanel_' + name.replace('rpCB_',''))
                            }
                        })

                        if (button.attributes.active) {
                            activeTab = target.id
                            target.style.display = 'block'
                        } else {
                            target.style.display = 'none'
                        }
                    })
                },
                stop() {
                    let stateCount = 0
                    let tButton = null

                    
                    buttonSet.forEach(button => {
                        let classSet = button.attributes.className
                        let targetClasses = getEl('.' + classSet.replace(' ', '.')).className.split(' ')

                        if (!button.attributes.active) {
                            stateCount = stateCount +1
                        }
                                    
                        targetClasses.forEach(name => {
                            if (name.startsWith('rpCB_')) {
                                if (getEl('#rightPanel_' + name.replace('rpCB_','')).id === activeTab) {
                                    tButton = button
                                }
                            }
                        })
                    })

                    if (stateCount === 3) {
                        tButton.set('active', 1)
                    }
                }
            })
        }
    }
}

export { rightPanel }