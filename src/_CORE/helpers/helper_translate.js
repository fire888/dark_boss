let lang = 'en'
export const changeLang = l => lang = l 
export const createTranslater = vocab => word => (vocab[lang] && vocab[lang][word]) || word
