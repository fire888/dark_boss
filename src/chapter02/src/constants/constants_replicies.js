export const REPLICIES_CONFIG = {
    'START_MESS': [{
        q: { txt: 'After a long wandering in the desert...' },
        a: [
            { txt: '', isShow: true, action: 'close', },
        ],
    }],
    'TERMINAL_Z01': [{
        q: { txt: 'Stranger, I threw you a terminal with a pass phrase. Remember:' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'And blood-black nothingness began to spin...' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'A system of cells interlinked within cells interlinked within cells interlinked within one stem...' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'And dreadfully distinct against the dark, a tall white fountain played.' },
        a: [
            { txt: '', isShow: true, action: 'close', dataAction: { idChangerState: 'openPhrasePROGRAM_00' } },
        ],
    },],
    'TERMINAL_Z': [{
        q: { txt: '' },
        a: [
            { txt: '', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_Z' } },
        ]
    },],
    'TERMINAL_00': [{
        q: { txt: 'Officer K-D-six-dash-three-dot-seven, let\'s begin. Ready?' },
        a: [
            { txt: 'Yes, sir.',  isShow: true, action: 'next', },
            { txt: 'No.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_NONE', } },
        ],
    }, {
        q: { txt: 'Recite your baseline.' },
        a: [
            { txt: 'I do not remember.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_NONE', } },
            { txt: 'I\'ll come back later.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_NONE', } },
            { txt: 'And blood-black nothingness began to spin...', isShow: false, action: 'next', },
        ],
    }, {
        q: { txt: 'Cells.' },
        a: [
            { txt: 'Cells.', isShow: true, action: 'startBridge',  dataAction: { keyProgramBridge: 'PROGRAM_00', } },
        ],
    },],
    'TERMINAL_01': [{
        q: { txt: 'Have you ever been in an institution? Cells.' },
        a: [
            { txt: 'Cells.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Do they keep you in a cell? Cells.' },
        a: [
            { txt: 'Cells.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_01', } },
        ],
    },],
    'TERMINAL_02': [{
        q: { txt: 'When you\'re not performing your duties do they keep you in a little box? Cells.' },
        a: [
            { txt: 'Cells.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_02', } },
        ],
    },],
    'TERMINAL_03': [{
        q: { txt: 'What\'s it like to hold the hand of someone you love? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'next', idChangerState: null },
        ],
    }, {
        q: { txt: 'Did they teach you how to feel finger to finger? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_03', }},
        ],
    },],
    'TERMINAL_04': [{
        q: { txt: 'Do you long for having your heart interlinked? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Do you dream about being interlinked? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'startBridge',  dataAction: { keyProgramBridge: 'PROGRAM_04', } },
        ],
    },],
    'TERMINAL_05': [{
        q: { txt: 'What\'s it like to hold your child in your arms? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Do you feel that there\'s a part of you that\'s missing? Interlinked.' },
        a: [
            { txt: 'Interlinked.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_05', } },
        ],
    },],
    'TERMINAL_06': [{
        q: { txt: 'Within cells interlinked.' },
        a: [
            { txt: 'Within cells interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'Why don\'t you say that three times: Within cells interlinked.' },
        a: [
            { txt: 'Within cells interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: '' },
        a: [
            { txt: 'Within cells interlinked.', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: '' },
        a: [
            { txt: 'Within cells interlinked.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_06', } },
        ],
    },],
    'TERMINAL_LAST' : [{
        q: { txt: 'We\'re done... Constant K, you can pick up your bonus.' },
        a: [
            { txt: 'Thank you, sir.', isShow: true, action: 'startBridge', dataAction: { keyProgramBridge: 'PROGRAM_LAST', idChangerState: 'resetAllAfterEnd' }},
            { txt: 'Hey...', isShow: false, action: 'close', },
        ],
    },{
        q: { txt: '...' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    },{
        q: { txt: '... ... ...' },
        a: [
            { txt: '', isShow: true, action: 'next', },
        ],
    },{
        q: { txt: '...If you read it, you find dropped terminal and got top level of desert. Welcome...' },
        a: [
            { txt: 'Who are you?', isShow: true, action: 'next', },
        ],
    }, {
        q: { txt: 'It does not matter. Later. May be..' },
        a: [
            { txt: '', isShow: true, action: 'close', dataAction: { idChangerState: 'clearMessagesAfterLastEnd' }},
        ],
    },]
}



export const TRANSLATE_WORLDS = {
    'ru': {
        'After a long wandering in the desert...': 'После долгого блуждания по пустоши...',
        'Stranger, I threw you a terminal with a pass phrase. Remember:': 'Незнакомец, я сбросил тебе терминал с парольной фразой. Запомни:',
        'And blood-black nothingness began to spin...': 'Кроваво-черное ничто пустилось вить систему клеток,',
        'A system of cells interlinked within cells interlinked within cells interlinked within one stem...' : 'связанных внутри, клеток, связанных внутри, клеток в едином стебле и явственно,',
        'And dreadfully distinct against the dark, a tall white fountain played.': 'до жути на фоне тьмы ввысь белым бил фонтан.',
        'Officer K-D-six-dash-three-dot-seven, let\'s begin. Ready?': 'Офицер Кей Ди 6.3.7. приступим. Готовы?',
        'Yes, sir.': 'Готов',
        'No.': 'Не готов',
        'Recite your baseline.': 'Ваша контрольная фраза.',
        'I do not remember.': 'Я забыл.',
        'I\'ll come back later.': 'Я зайду попозже.',
        'Cells.': 'Клетки.',
        'Have you ever been in an institution? Cells.': 'Доводилось ли вам бывать в тюрьме? Клетки.',
        'Do they keep you in a cell? Cells.': 'Вас держат в клетке? Клетки.',
        'When you\'re not performing your duties do they keep you in a little box? Cells.': 'Когда вы не исполняете обязанности, вас держат в коробке? Клетки.',
        'Interlinked.': 'Связаны.',
        'What\'s it like to hold the hand of someone you love? Interlinked.': 'Что вы чувствуете держа за руку того кого любите? Связаны.',
        'Did they teach you how to feel finger to finger? Interlinked.': 'Вас учили приставлять палец к пальцу? Связаны.',
        'Do you long for having your heart interlinked? Interlinked.': 'Вы жаждете связать с кем-нибудь сердце? Связаны.',
        'Do you dream about being interlinked? Interlinked.': 'Вам снится связь с кем-либо? Связаны.',
        'What\'s it like to hold your child in your arms? Interlinked.': 'Что вы чувствуете, держа в руках своего ребенка? Связаны.',
        'Do you feel that there\'s a part of you that\'s missing? Interlinked.': 'Вы чувствуете, что вам чего-то не хватает? Связаны.',
        'Within cells interlinked.': 'Клеток связанных внутри.',
        'Why don\'t you say that three times: Within cells interlinked.': 'Повторите три раза "клеток связанных внутри',
        'We\'re done... Constant K, you can pick up your bonus.': 'На этом все. Кей стабилен, можете пройти за бонусом.',
        'Thank you, sir.': 'Спасибо, сэр.',
        '...If you read it, you find dropped terminal and got top level of desert. Welcome...': '...Если ты читаешь это, ты нашел упавший терминал и добрался до верхнего уровня пустоши.',
        'Who are you?': 'Кто ты?',
        'It does not matter. Later. May be..': 'Это неважно. Позже. Может быть..',
        'Hey...': 'Эй...',
    }
}