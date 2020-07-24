import './index.css'

import './utils/dom'
import './topPanel/topPanel'
import './utils/simplebar'

import grapesjs from './grapesFramework/grapes'
import { getEl } from './utils/dom'

import { topPanel } from './topPanel/topPanel'
import { leftPanel } from './leftPanel/leftPanel'
import { centerPanel } from './centerPanel/centerPanel'
import { rightPanel } from './rightPanel/rightPanel'

let editorBody = getEl('#poweredit')
let bottomPanel = editorBody.newEl('div','#bottomPanel')

topPanel.init(editorBody.newEl('div','#topPanel'))
leftPanel.init(bottomPanel.newEl('div','#leftPanel'))
centerPanel.init(bottomPanel.newEl('div','#centerPanel'))
rightPanel.init(bottomPanel.newEl('div','#rightPanel'))

let editor = grapesjs.init({
    container: '#centerPanel',
    fromElement: true,
    height: '100%',
    width: 'auto',
    storageManager: false,
    deviceManager: {
        devices: [
            {
                name: 'desktop',
                width: 'calc(100% - 15px)',
                widthMedia: ''
            },{
                name: 'tablet',
                width: '770',
                widthMedia: '770'
            },{
                name: 'mobileLandscape',
                width: '570',
                widthMedia: '570',
            },{
                name: 'mobilePortrait',
                width: '320',
                widthMedia: '320'
            }
        ]
    },
    panels: {defaults: [
        {id: 'topPanel', el: '#topPanel'},
        {
            id: 'topPanel_title',
            el: '#topPanel_title',
            buttons: {
                id: 'topPanel_title',
                active: false,
                className: 'topPanel_title',
                label: 'POWEREDIT',
                command: 'topPanel:title'
            }
        },
        {
            id: 'topPanel_windowControl',
            el: '#topPanel_windowControl',
            buttons: [
                {
                    id: 'windowControl_desktop',
                    active: true,
                    className: 'topPanel_windowControl tpWC_desktop',
                    label: '<i class="fas fa-desktop"></i>',
                    command: 'topPanel:resizeWindow'
                },{
                    id: 'windowControl_tablet',
                    active: false,
                    className: 'topPanel_windowControl tpWC_tablet',
                    label: '<i class="fas fa-tablet-alt"></i>',
                    command: 'topPanel:resizeWindow'
                },{
                    id: 'windowControl_mPortrait',
                    active: false,
                    className: 'topPanel_windowControl tpWC_mobileLandscape',
                    label: '<i class="fas fa-mobile-alt  fa-rotate-270"></i>',
                    command: 'topPanel:resizeWindow'
                },{
                    id: 'windowControl_mLandscape',
                    active: false,
                    className: 'topPanel_windowControl tpWC_mobilePortrait',
                    label: '<i class="fas fa-mobile-alt"></i>',
                    command: 'topPanel:resizeWindow'
                }
            ]
        },
        {
            id: 'topPanel_settings',
            el: '#topPanel_settings',
            buttons: [{
                id: 'topPanel_settings',
                active: false,
                className: 'topPanel_settings',
                label: '<i class="fas fa-cog"></i>'
            }]
        },
        {id: 'leftPanel', el: '#leftPanel'},
        {id: 'rightPanel', el: '#rightPanel'},
        {
            id: 'rightPanel_control',
            el: '#rightPanel_control',
            buttons: [
                {
                    id: 'styleControl',
                    active: true,
                    className: 'rightPanel_controlButton rpCB_style',
                    label: '<i class="fas fa-paint-brush"></i>',
                    command: 'rightControl:setTab'
                },{
                    id: 'traitControl',
                    active: false,
                    className: 'rightPanel_controlButton rpCB_trait',
                    label: '<i class="fas fa-wrench"></i>',
                    command: 'rightControl:setTab'
                },{
                    id: 'layerControl',
                    active: false,
                    className: 'rightPanel_controlButton rpCB_layer',
                    label: '<i class="fas fa-stream"></i>',
                    command: 'rightControl:setTab'
                },{
                    id: 'styleList',
                    active: false,
                    className: 'rightPanel_controlButton rpCB_layer',
                    label: '<i class="fas fa-swatchbook"></i>'
                }
            ]
        },
    ]},
    selectorManager: {
        appendTo: '#rightPanel_styleSelectors'
    },
    styleManager: {
        appendTo: '#rightPanel_styleSet',
        sectors: [
            {
                name: 'General',
                open: false,
                buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
            },{
                name: 'Dimension',
                open: false,
                buildProps: [ 'width', 'height', 'max-width', 'min-height', 'margin', 'padding']
            },{
                name: 'Typography',
                open: false,
                buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow']
            },{
                name: 'Decorations',
                open: false,
                buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
            },{
                name: 'Extra',
                open: false,
                buildProps: ['opacity', 'transition', 'perspective', 'transform'],
                properties: [{
                    type: 'slider',
                    property: 'opacity',
                    defaults: 1,
                    step: 0.01,
                    max: 1,
                    min:0,
                }]
            }
        ],
    },
    layerManager: {
        appendTo: '#rightPanel_layer'
    },
    traitManager: {
        appendTo: '#rightPanel_trait'
    }
})

editor.setDevice('desktop')

topPanel.setCommands(editor)
rightPanel.setCommands(editor)