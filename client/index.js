const chatbox = document.querySelector('#chatbox');
const messageEntry = document.querySelector('#messageEntry');

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/message');
  const messages = await response.json();
  messages.forEach(({ text, username, _id }) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('messageDiv');
    const usernameDiv = document.createElement('div');
    usernameDiv.classList.add('usernameDiv');
    usernameDiv.innerText = username;
    const textDiv = document.createElement('div');
    textDiv.classList.add('textDiv');
    textDiv.innerText = text;
    const buttonDiv = document.createElement('div');
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => {
      fetch(`api/message/${_id}`, {
        method: 'PUT',
        body: JSON.stringify({ text: messageEntry.value }),
        headers: {
          'Content-type': 'application/json',
        },
      });
    });
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      fetch(`api/message/${_id}`, {
        method: 'DELETE',
      });
    });
    buttonDiv.append(editButton, deleteButton);
    messageDiv.append(usernameDiv, textDiv, buttonDiv);
    chatbox.appendChild(messageDiv);
  });
});
document
  .querySelector('#submitMessageButton')
  .addEventListener('click', (e) => {
    console.log(messageEntry.value);
    fetch('/api/message', {
      method: 'POST',
      body: JSON.stringify({ text: messageEntry.value }),
      headers: {
        'Content-type': 'application/json',
      },
    });
  });
