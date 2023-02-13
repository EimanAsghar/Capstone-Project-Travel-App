
import {performAction} from './js/performAction'

import './styles/mystyle.scss'

window.addEventListener('DOMContentLoaded', ()=> {
    const buttonsubmit = document.getElementById('generate')
    buttonsubmit.addEventListener('click', (event)=>{
        performAction(event)
    })
})

export {performAction}