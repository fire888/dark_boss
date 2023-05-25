export const startDefaultStoreData = {
    isShowControls: true,
    isShowControlSound: false,
    isMute: false, 
    isInfo: false,
    infoPanelData: {
        title: 'Discovery of small android',
        topText: '',
        chapters: [
            // { text: 'Factory', href: 'http://js.otrisovano.ru/factory/' },
            // { text: 'Brige', href: 'http://js.otrisovano.ru/bridge/' },
            // { text: 'Cube', href: 'http://js.otrisovano.ru/levels/' },
            // { text: 'Endways', href: 'http://js.otrisovano.ru/endways/' },

            { text: 'Factory', href: './../chapter01' },
            { text: 'Brige', href: './../chapter02' },
            { text: 'Cube', href: './../chapter03' },
            { text: 'Endways', href: './../chapter04' },
            { text: 'Machine', href: './../chapter05' },
            { text: 'Rooms', href: './../chapter06' },
            { text: 'Platform', href: './../chapter07' },
            { text: 'in production' },
        ],
        currentChapterIndex: null,
        bottomText: '',
        afterWords: [
            { text: 'Author: ',  aText: 'www.otrisovano.ru', href: 'http://otrisovano.ru' },
            { text: 'Github: ',  aText: 'https://github.com/fire888/dark_boss', href: 'https://github.com/fire888/dark_boss' },
        ],
    }
}
