export const startDefaultStoreData = {
    isShowControls: true,
    isInfo: false,
    infoPanelData: {
        title: 'Discovery of small android',
        topText: 'Few chapters:',
        chapters: [
            { text: 'Factory', href: 'http://js.otrisovano.ru/factory/' },
            { text: 'Brige', href: 'http://js.otrisovano.ru/bridge/' },
            { text: 'Cube', href: 'http://js.otrisovano.ru/levels/' },
            { text: 'in production' },
        ],
        currentChapter: null,
        bottomText: 'Wait next chapter.',
        afterWords: [
            { text: 'Author: ',  aText: 'www.otrisovano.ru', href: 'http://otrisovano.ru' },
            { text: 'Github: ',  aText: 'https://github.com/fire888/levels', href: 'https://github.com/fire888/levels' },
        ],
    }
}

/*
<p>
{`1 ${window.t('chapter')}: `}
<a href="http://js.otrisovano.ru/factory/" target="blank">{ window.t('link') }</a>
</p>
<p>
{`2 ${window.t('chapter')}: `}
<a href="http://js.otrisovano.ru/bridge/" target="blank">{ window.t('link') }</a>
</p>
<p><br /><br />
{window.t('Author: ')}
<a href="http://otrisovano.ru" target="blank">{ window.t('link') }</a>
</p>
<p>
{window.t('Github: ')}
<a href="https://github.com/fire888/levels/" target="blank">{ window.t('link') }</a>
</p>
*/