const usernameEntry = document.querySelector('#usernameInput');
const passwordEntry = document.querySelector('#passwordInput');

document.querySelector('#loginButton').addEventListener('click', async (e) => {
  const username = usernameEntry.value,
    password = passwordEntry.value;
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 200) window.location.href = '/';
});

document.querySelector('#signupButton').addEventListener('click', async (e) => {
  const username = usernameEntry.value,
    password = passwordEntry.value;
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 200) window.location.href = '/';
});
