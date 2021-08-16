export class Translater {
    constructor (gameContext) {
        this._lang = 'en'
        this._words = gameContext.CONSTANTS.TRANSLATE_WORLDS

        gameContext.emitter.subscribe('setLanguage')(lang => this._lang = lang)

        window['t'] = this.t.bind(this)
    }

    t (w) {
        return (this._words[this._lang] && this._words[this._lang][w]) || w
    }
}
