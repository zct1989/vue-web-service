import faker from 'faker'
interface IMessageUser {
    id: number
    username: string
}

interface IMessage {
    sender: IMessageUser
    receiver: IMessageUser
    message: string
}

const fakerUser = number => {
    return Array.from(Array(number), (x, i) => {
        const username = faker.name.findName()
        const time = Date.parse(faker.date.recent())
        const user = {
            id: i + 1,
            username
        }
        return {
            ...user,
            messages: [
                {
                    sender: user,
                    message: `hello! I am ${username}`,
                    time
                }
            ],
            latest: time,
            avatar: faker.image.avatar()
        }
    })
}

export default {
    namespaced: true,
    state: {
        currentUser: 1,
        userList: fakerUser(12)
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
                    username: sender.username
                },
                message: message,
                time: Date.now()
            })

            target.latest = Date.now()

            setTimeout(() => {
                target.messages.push({
                    sender: receiver,
                    message: 'I Receiver this Message:\r\n' + message,
                    time: Date.now() + 10
                })
            }, 2000 + Math.random() * 1000)
        }
    }
}
