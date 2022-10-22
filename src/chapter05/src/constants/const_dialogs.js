const location01 = {
    isComplete: false,
    phraseIndex: 0,
    phrases: [
        {
            q: 'What\'s happening?', // Что происходит?
            a: "I am generating the Great Recursion. I need a component. Deliver it to me.", // Я генерю Великую Рекурсию. Мне нужна компонента. Доставь мне ее.
            event: 'nextReply',
        }, {
            q: 'Good. Where can I find the component?', // Хорошо. Где мне найти компоненту?
            a: 'I updated the sign in your car, follow it.', // Я обновил указатель в твоей машине, следуй ему.
            event: 'nextReply',
        }, {
            q: 'I\'ll be back.', // Я вернусь.
            a: "For the glory of Recursion.", // Во славу Рекурсии.
            event: 'close',
        },
    ],
}

const location02 = {
    isComplete: false,
    phraseIndex: 0,
    phrases: [
        {
            q: 'Do you have a Great Recursion Component?', // У тебя есть Компонента для Великой Рекурсии?
            a: 'I will generate you a Great Component for the Great Recursion. I need a Component.', // Я сгенерю тебе Великую Компоненту для Великой Рекурсии. Мне нужна Компонента.
            event: 'nextReply',
        }, {
            q: 'Where can I find her?', // Где мне ее найти?
            a: 'I updated the pointer in the car.', // Я обновил указатель в машине.
            event: 'close',
        },
    ],
}

const location03 = {
    isComplete: false,
    phraseIndex: 0,
    phrases: [
        {
            q: 'Do you have a Component for the Great Component of the Great Recursion?', // У тебя есть Компонента для Великой Копоненты Великой Рекурсии?
            a: 'Yes. I have finished generating the Component.', // Да. Я закончил генерить Компоненту.
            event: 'nextReply',
        },
        {
            q: "I need to deliver it to generate the Great Component.", // Мне нужно доставить ее для генерации Великой Компоненты.
            a: 'The pointer in your car has been updated. He will point to the Component of the Great Component.', // Указатель в твоей машине обновлен. Он укажет на Компоненту Великой Компоненты.
            event: 'nextReply',
        },
        {
            q: "Is my car the key to Components?", // Моя машина это ключ к Компонентам?
            a: 'Your Machine is the main Generator. Follow him.', // Твоя Машина это главный Генератор. Следуй ему.
            event: 'close',
        },
    ],
}


export const DIALOGS_DATA = {
    location01,
    location02,
    location03,
}


export const RESULT_DIALOGS = {
    'location01': 'location02',
    //'location01': 'locationToFinish',
    'location02': 'location03',
    'location03': 'locationToFinish',
}