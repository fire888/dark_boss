import { startDefaultStoreData } from '../../_CORE/ui/store/defaultUiData'
import './style.css'


const $El = (type, classNames = [], content = '', data = null) => {
    const elem = document.createElement(type)
    for (let i = 0; i < classNames.length; ++i) {
        elem.classList.add(classNames[i])
    }
    elem.innerHTML = content

    if (data) {
        if (type === 'a') {
            if (data.href) {
                elem.setAttribute('href', data['href'])
            }
        }
    }

    return elem
}



const showContent = () => {
    const wrapper = document.getElementsByClassName('app-wrapper')[0]
    const container = $El('div',['container'])



    const mess = $El('h2', ['mess'], 'To be continued')
    container.appendChild(mess)

    {
        const hr = $El('hr')
        container.appendChild(hr)
    }

    const mess2 = $El('p', ['mess'], 'Previous parts:')
    container.appendChild(mess2)


    const chCont = $El('ul')
    const { chapters } = startDefaultStoreData.infoPanelData
    for (let i = 0; i < chapters.length; ++i) {
        const li = $El('a', [], chapters[i].text, {
            href: chapters[i].href
        })
        chCont.appendChild(li)
    }
    container.appendChild(chCont)


    {
        const hr = $El('hr')
        container.appendChild(hr)
    }






    wrapper.appendChild(container)
}




window.addEventListener('load', showContent )
