export const startDefaultStoreData = {
    isShowControls: true,
    isShowControlSound: false,
    isMute: false, 
    isInfo: false,
    infoPanelData: {
        title: 'Discovery of small android',
        topText: '',
        chapters: [
            { text: 'Factory', href: './../01' },
            { text: 'Brige', href: './../02' },
            { text: 'Cube', href: './../03' },
            { text: 'Endways', href: './../04' },
            { text: 'Machine', href: './../05' },
            { text: 'Rooms', href: './../06' },
            { text: 'Platform', href: './../07' },
            { text: 'Struct', href: './../08' },
            { text: 'in production' },
        ],
        currentChapterIndex: null,
        bottomText: '',
        afterWords: [
            { text: 'Author: ',  aText: 'otrisovano.ru', href: 'https://otrisovano.ru' },
            { text: 'Github: ',  aText: 'https://github.com/fire888/dark_boss', href: 'https://github.com/fire888/dark_boss' },
        ],
    }
}
