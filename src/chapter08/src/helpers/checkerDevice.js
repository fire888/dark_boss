

export const checkDevice = () => {
    const isCanTouch = checkTouch()
    const isCanChangeOrientation = checkIsCanOrientation()

    let deviceByBrowserProps = 'desktop'
    if (isCanTouch && isCanChangeOrientation) {
        deviceByBrowserProps = 'phone'
    }

    const deviceByUserAgent = checkDeviceByUserAgent()

    let deviceType
    if (deviceByBrowserProps === 'desktop') {
        deviceType = 'desktop'
    } else {
        if (deviceByUserAgent.mode === 'tablet') {
            deviceType = 'tablet'
        }
        if (deviceByUserAgent.mode === 'phone') {
            if (deviceByUserAgent.isIphone) {
                deviceType = 'iOS_phone'
            } else {
                deviceType = 'Android_phone'
            }
        }
    }


    return {
        mode: deviceByBrowserProps,
        isIphone: deviceByUserAgent.isIphone,
        isChrome: deviceByUserAgent.isChrome,
        isFirefox: deviceByUserAgent.isFirefox,
        isFirefoxIOS: deviceByUserAgent.isFirefoxIOS,
        isWebViewIOS: deviceByUserAgent.isWebViewIOS,
        deviceType,
    }
}



const checkTouch = () =>
    navigator.maxTouchPoints || 'ontouchstart' in document.documentElement



const checkIsCanOrientation = () =>
    typeof window.orientation !== 'undefined'



const checkDeviceByUserAgent = () => {
    let mode = null
    let isIphone = false

    if (window.navigator.userAgent.match(/iPhone/i)) {
        isIphone = true
    }

    if (window.navigator.userAgent.match(/Mobile/i)
        || window.navigator.userAgent.match(/iPhone/i)
        || window.navigator.userAgent.match(/iPod/i)
        || window.navigator.userAgent.match(/IEMobile/i)
        || window.navigator.userAgent.match(/Windows Phone/i)
        || window.navigator.userAgent.match(/Android/i)
        || window.navigator.userAgent.match(/BlackBerry/i)
        || window.navigator.userAgent.match(/webOS/i)) {
        mode = 'phone';
    }

    if (window.navigator.userAgent.match(/Tablet/i)
        || window.navigator.userAgent.match(/iPad/i)
        || window.navigator.userAgent.match(/Nexus 7/i)
        || window.navigator.userAgent.match(/Nexus 10/i)
        || window.navigator.userAgent.match(/KFAPWI/i)) {
        mode = 'tablet'
    }

    if (window.navigator.userAgent.match(/Intel Mac/i)) {
        mode = 'desktop'
    }

    let isChrome = false
    if (navigator.userAgent.match('CriOS')) {
        isChrome = true
    }

    let isFirefoxIOS = false
    if (navigator.userAgent.match("FxiOS")) {
        isFirefoxIOS = true
    }

    let isFirefox = false
    if (navigator.userAgent.indexOf("Firefox") > 0) {
        isFirefox = true
    }

    const isWebViewIOS = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);


    return { mode, isIphone, isChrome, isFirefox, isFirefoxIOS, isWebViewIOS }
}
