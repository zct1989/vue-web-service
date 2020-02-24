interface IMessageUser {
    id: number
    username: string
}

interface IMessage {
    sender: IMessageUser,
    receiver: IMessageUser,
    message: string
}

export default {
    namespaced: true,
    state: {
        currentUser: 1,
        userList: [{
            id: 1,
            username: 'Jack',
            messages: [{
                sender: {
                    id: 1,
                    username: 'Jack'
                },
                message: 'hello! I\'m Jack',
                time: Date.parse('2020-02-11 12:12')
            }],
            latest: Date.parse('2020-02-11 12:12')
        }, {
            id: 2,
            username: 'Jim',
            messages: [{
                sender: {
                    id: 2,
                    username: 'Jim'
                },
                message: 'hello! I\'m Jim',
                time: Date.parse('2020-02-10 12:12')
            }],
            latest: Date.parse('2020-02-10 12:12')
        }, {
            id: 3,
            username: 'Rose',
            messages: [
                {
                    sender: {
                        id: 3,
                        username: 'Rose'
                    },
                    message: 'hello! I\'m Rose',
                    time: Date.parse('2020-02-08 12:12')
                }
            ],
            time: Date.parse('2020-02-08 12:12')
        }]
    },
    mutations: {
        changeChatUser(state, id) {
            state.currentUser = id
        },
        addUserMessage(state, { sender, receiver, message }) {
            let target = state.userList.find(x => x.id === receiver.id)

            if (!target) {
                target = {
                    id: receiver.id,
                    username: receiver.username,
                    messages: []
                }
                state.userList.push(target)
            }

            target.messages.push({
                sender: {
                    id: sender.id,
                    username: sender.username,
                },
                message: message,
                time: Date.now()
            })

            target.latest = Date.now()

            setTimeout(() => {
                target.messages.push({
                    sender: receiver,
                    message: "I Receiver this Message:\r\n" + message,
                    time: Date.now() + 10
                })
            }, 2000 + Math.random() * 1000)
        }
    }
}
