let topPanel = new class {
    constructor () {
        let topPanel = null
        let windowControl = null
        let title = null
        let settings = null
        let save = null

        let windowSize = 'desktop'

        this.init = function (tp) {
            topPanel = tp

            windowControl = topPanel.newEl('div','#topPanel_windowControl')
            title = topPanel.newEl('div','#topPanel_title')
            settings = topPanel.newEl('div','#topPanel_settings')
            save = topPanel.newEl('div','#topPanel_save')
        }

        this.setCommands = function (editor) {
            let cmd = editor.Commands
            let winCon_container = 'topPanel_windowControl'
            let winConButtons = [
                editor.Panels.getButton(winCon_container, 'windowControl_desktop'),
                editor.Panels.getButton(winCon_container, 'windowControl_tablet'),
                editor.Panels.getButton(winCon_container, 'windowControl_mPortrait'),
                editor.Panels.getButton(winCon_container, 'windowControl_mLandscape')
            ]

            cmd.add('topPanel:title', {
                run() {
                    //
                }
            })

            cmd.add('topPanel:resizeWindow', {
                run(editor) {
                    winConButtons.forEach(button => {
                        let target = null
                        let classSet = button.attributes.className.split(' ')

                        classSet.forEach(name => {
                            if (name.startsWith('tpWC_')) {
                                target = name.replace('tpWC_','')
                            }
                        })

                        if (button.attributes.active) {
                            windowSize = target
                            editor.setDevice(target)
                        }
                    })
                },
                stop() {
                    let stateCount = 0
                    let tButton = null

                    winConButtons.forEach(button => {
                        let classSet = button.attributes.className.split(' ')

                        if (!button.attributes.active) {
                            stateCount = stateCount +1
                        }

                        classSet.forEach(name => {
                            if (name.startsWith('tpWC_')) {
                                if (name.replace('tpWC_','') === windowSize) {
                                    tButton = button
                                }
                            }
                        })
                    })

                    if (stateCount === 4) {
                        tButton.set('active', 1)
                    }
                }
            })
        }
    }
}

export { topPanel }