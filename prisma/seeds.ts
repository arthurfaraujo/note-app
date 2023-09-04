import Note from '../src/models/Note'
import User from '../src/models/User'

const seeds = {
  users: [
    {
      nickname: 'dev',
      email: 'dev@gmail.com',
      password: '1234',
      name: 'Arthur Felipe'
    },
    {
      nickname: 'johndoe',
      email: 'john@gmail.com',
      password: '1234',
      name: 'John Albert Doe'
    },
    {
      nickname: 'imaginelosing',
      email: 'abracadabra@gmail.com',
      password: '1234',
      name: 'Pedro Lima'
    }
  ],
  notes: [
    {
      title: 'uaaaa',
      content: 'ola mundo',
      type: 0,
      userNickname: 'dev'
    },
    {
      title: 'frts title proplayer',
      content: 'aaaaaaaaaaaaaaaa',
      type: 0,
      userNickname: 'dev'
    },
    {
      title: 'note-app rumbles',
      content: 'mano',
      type: 0,
      userNickname: 'dev'
    },
    {
      title: 'i love you',
      content: 'como é amigo',
      type: 0,
      userNickname: 'johndoe'
    },
    {
      title: 'le a biblia po',
      content: 'caracole vei',
      type: 0,
      userNickname: 'johndoe'
    },
    {
      title: 'mais um titulo brabo',
      content: 'mano',
      type: 0,
      userNickname: 'johndoe'
    }
  ]
}

const createUsers = async () => {
  for (const user of seeds.users) {
    await User.create(user)
  }
}

const createNotes = async () => {
  for (const note of seeds.notes) {
    await Note.create(note)
  }
}

const seed = async () => {
  await createUsers()
  await createNotes()
}

seed()
