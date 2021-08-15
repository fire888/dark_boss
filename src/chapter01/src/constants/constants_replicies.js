export const mechanic = {
    isDone: false,
    messages: [{ 
        player: 'Я ...?', 
        nps: 'Ты новый дроид.',
        isDone: false,
    },{
        player: 'Ты ...?', 
        nps: 'Механик. Делаю корпусы дроидов.',
        isDone: false,
    },{
        player: 'МММ ...?', 
        nps: 'Иди, дверь разблокирована.... Бииб.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['factory'],
            }
        }
    }]
}

export const programmer = {
    isDone: false,
    messages: [{ 
        player: 'Я ...?', 
        nps: 'Секунду .... Бииб.. Программа в память загружена.',
        isDone: false,
    },{
        player: 'Ты ...?', 
        nps: 'Программирую дроидов.',
        isDone: false,
    },{
        player: 'МММ...?', 
        nps: 'Ты должен идти в отдел тестирования. Бииб.. Доступ разрешен.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['fromLaboratory001'],
            }
        }
    }]
}


export const engineer = {
    isDone: false,
    messages: [{ 
        player: 'Я ...?', 
        nps: 'Секунду... Бииб. Тестирование прошло успешно.',
        isDone: false,
    },{
        player: 'Ты ...?', 
        nps: 'Тестестировщик, тестирую новых дроидов.',
        isDone: false,
    },{
        player: 'МММ ...?', 
        nps: 'Иди на приемку.',
        isDone: false,
    }]
}


export const scientist = {
    isDone: false,
    messages: [{ 
        player: 'Я ...?', 
        nps: 'Секунду... Бииб. Халтура, брак ... Ладно ты теперь дроид_17543-06767-6767.',
        isDone: false,
    },{
        player: 'Ты ...?', 
        nps: 'Приемщик. Проверяю качество сборки. ',
        isDone: false,
    },{
        player: 'МММ ...?', 
        nps: 'Иди на склад. Доступ дан.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['fromFactoryCorpus', 'toLab', 'toGarage'],
            }
        }
    }]
}


export const master = {
    isDone: false,
    messages: [{ 
        player: 'Я ...?', 
        nps: 'Ничего для тебя нет, иди в штаб... Бииб. Статус: модель укомлектована.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['toBoss'],
            }
        }
    }]
}


export const guard_Super_02 = {
    isDone: false,
    messages: [{ 
        player: 'Я ...?', 
        nps: 'Ищешь босса, его нет.',
        isDone: false,
    },{
        player: 'Ты ...?', 
        nps: 'Помошник. Я даю тебе секретную миссию.',
        isDone: false,
    },{
        player: 'МММ ...?', 
        nps: 'Ты должен сходить на разведку вокруг базы и доложить. Вперед.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['fromStore', 'fromSecurity', 'toArsenal',],
            }
        }
    }]
}



export const guard_01 = {
    isDone: false,
    messages: [{ 
        player: 'Я ...?', 
        nps: 'Ты дроид с важной секретной миссией.',
        isDone: false,
    },{
        player: 'Ты ...?', 
        nps: 'Ответственный за внешний периметр. Бииб... Доступ к воротам дан.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['toWorld',],
            }
        }
    },]
}


export const scout = {
    isDone: false,
    messages: [{ 
        player: 'Я ...?', 
        nps: 'Это не имеет значения.',
        isDone: false,
        event: {
            type: 'blockDoor',
            data: {
                idDoor: ['toWorld',],
            }
        }
    },{
        player: 'Ты ...?', 
        nps: 'Дроид. Суммасшедшая фабрика клепает дроидов, дает секретиные миссии и закрывает ворота.',
        isDone: false,
    },{
        player: 'МММ ...?', 
        nps: 'Это все. The end.',
        isDone: false,
    },]
}