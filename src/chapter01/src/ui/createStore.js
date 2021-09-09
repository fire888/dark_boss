

const storeStartState = {
    replicies: {
        mechanic: {
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
        },
        programmer: {
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
        },
        engineer: {
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
        },
        scientist: {
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
        },
        master: {
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
        },
        guard_Super_02: {
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
        },
        guard_01: {
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
        },
        scout: {
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
        },
    },

    isButtonDialog: false,
    isShowPalleteDialog: false,
    currentBotKey: null,
} 



export const dialogs = (store = storeStartState, action) => {
    if (action.type === 'BUTTON_DIALOG_TOGGLE') {

        const {  isButtonDialog, currentBotKey } = action

        return {
            ...store,
            isButtonDialog,
            currentBotKey,
        }
    }

    console.log('!!!!')
    if (action.type === 'SHOW_PALLETE_DIALOG') {
        return {
            ...store,
            isButtonDialog: !action.is,
            isShowPalleteDialog: action.is,
        }
    }
        

    return store
}



