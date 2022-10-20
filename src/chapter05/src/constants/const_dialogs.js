const location01 = {
    isComplete: false,
    phraseIndex: 0,
    phrases: [
        {
            q: 'What is this place?',
            a: "It's The Great Way to the surface.",
            event: 'nextReply',
        }, {
            q: 'Who are you?',
            a: 'I help The Creator.',
            event: 'nextReply',
        }, {
            q: 'What are you doing?',
            a: "Don't distract me, I have to dig the tunnel.",
            event: 'close',
        },
    ],
}

const location02 = {
    isComplete: false,
    phraseIndex: 0,
    phrases: [
        {
            q: 'Such enormous dungeons...',
            a: 'The Creator gave the order to dig.',
            event: 'nextReply',
        }, {
            q: 'How long have you been digging?',
            a: 'Time does not matter, the goal is what\'s important.',
            event: 'close',
        },
    ],
}

const location03 = {
    isComplete: false,
    phraseIndex: 0,
    phrases: [
        {
            q: 'What do you do here?',
            a: 'Long ago, the Creator fell under the ground. He created us and gave us an assignment to dig.',
            event: 'nextReply',
        },
        {
            q: "But you already dug the way out...",
            a: 'When we dug a tunnel, The Creator went through it.',
            event: 'nextReply',
        },
        {
            q: "And...",
            a: 'We are made to dig. And we keep on doing it. We believe that he will return to us.',
            event: 'close',
        },
    ],
}


export const RESULT_DIALOGS = {
    'location01': 'location02',
    'location02': 'location03',
    'location03': 'location01',
}


export const DIALOGS_DATA = {
    location01,
    location02,
    location03,
}