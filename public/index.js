// Login and user register

const formRegister = document.querySelector('#formRegister')
const formSection = document.querySelector('#formSection')
const chat = document.querySelector('#chat')
const logoutButton = document.querySelector('#logoutButton')
const formLogin = document.querySelector('#formLogin')

const isSession = async () => {
  const res = await fetch('/session')
  const data = await res.json()
  console.log(data)
  if (data.status) {
    formSection.classList.add('hidden')
    chat.classList.remove('hidden')
    logoutButton.classList.remove('hidden')
  }
}

const logout = async () => {
  const res = await fetch('/logout', { method: 'POST' })
  const data = await res.json()
  console.log(data)
  if (data.status) {
    formSection.classList.remove('hidden')
    chat.classList.add('hidden')
    logoutButton.classList.add('hidden')
  }
}

const register = async (e) => {
  e.preventDefault()
  const username = document.querySelector('#name').value
  const password = document.querySelector('#password').value
  const email = document.querySelector('#email').value
  const image = document.querySelector('#image').value

  const res = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email, image })
  })

  const data = await res.json()
  if (data?.password === password) {
    formSection.classList.add('hidden')
    chat.classList.remove('hidden')
    logoutButton.classList.remove('hidden')
  }
  console.log(data)
}

const login = async (e) => {
  console.log('login')
  e.preventDefault()
  const username = document.querySelector('#nameLogin').value
  const password = document.querySelector('#passwordLogin').value

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  const data = await res.json()
  if (data?.status === true) {
    formSection.classList.add('hidden')
    chat.classList.remove('hidden')
    logoutButton.classList.remove('hidden')
  }
  console.log(data)
}

isSession()

logoutButton.addEventListener('click', logout)
formRegister.addEventListener('submit', register)
formLogin.addEventListener('submit', login)

// Messages

const messagesContainer = document.querySelector('#messagesContainer')

const createMessageTemplate = (author, message, image) => {
  return `
        <div class="chat-message">
            <div class="flex items-end">
                <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                        <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                            <b class="block font-bold">${author}</b>
                            ${message}
                        </span>
                    </div>
                </div>
                <img src="${image}" class="w-8 h-8 object-cover">
            </div>
        </div>
    `
}

const loadMessages = async () => {
  const res = await fetch('/api/messages')
  const dataMessages = await res.json()
  const templatedMessages = dataMessages.map((messageData) => {
    const author = messageData.author.username
    const message = messageData.message
    const image = messageData.author.image
    return createMessageTemplate(author, message, image)
  })
  messagesContainer.innerHTML = ''
  templatedMessages.forEach((messageTemplate) => {
    messagesContainer.innerHTML += messageTemplate
  })
}

loadMessages()

const sendMessageButton = document.querySelector('#sendMessageButton')

const sendMessage = async () => {
  const message = document.querySelector('#messageInput').value
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  const data = await res.json()
  console.log(data)
  loadMessages()
}

sendMessageButton.addEventListener('click', sendMessage)
