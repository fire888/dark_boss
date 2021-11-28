export const startDefaultStoreData = {
    isShowControls: true,
    isInfo: false,
    infoPanelData: {
        title: 'Discovery word of small android.',
        topText: 'Few chapters:',
        chapters: [
            {
                title: '1. Factory',
                a: "http://js.otrisovano.ru/factory/"
            },
            {
                title: '2. Brige',
                a: "http://js.otrisovano.ru/factory/"
            },
            {
                title: '3. Cube',
                a: "http://js.otrisovano.ru/factory/"
            },
        ],
        bottomText: 'Wait next chapter',
        afterWolds: 'Author: \"http://otrisovano.ru\"<br /> Github: https://github.com/fire888/levels/',
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