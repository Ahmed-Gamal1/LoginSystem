function signUp() {
  let name = document.getElementById('signupName').value;
  let email = document.getElementById('signupEmail').value;
  let password = document.getElementById('signupPassword').value;
  let existMessage = document.getElementById('exist');

  if (!name || !email || !password) {
      existMessage.textContent = 'All fields are required!';
      return;
  }

  if (!validateEmail(email)) {
      existMessage.textContent = 'Please enter a valid email address!';
      return;
  }

  if (localStorage.getItem(email)) {
      existMessage.textContent = 'User already exists. Please sign in.';
  } else {
      let user = {
          name: name,
          email: email,
          password: password
      };
      localStorage.setItem(email, JSON.stringify(user));
      existMessage.textContent = 'Sign up successful. Please sign in.';
  }
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function signIn() {
  let email = document.getElementById('signinEmail').value;
  let password = document.getElementById('signinPassword').value;
  let signInMessage = document.getElementById('signInMessage');

  if (!email || !password) {
      signInMessage.textContent = 'All fields are required!';
      return;
  }

  if (!validateEmail(email)) {
      signInMessage.textContent = 'Please enter a valid email address!';
      return;
  }

  let user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
      signInMessage.textContent = '';
      localStorage.setItem('loggedInUser', email);
      showHomePage(user.name);
  } else {
      signInMessage.textContent = 'Invalid email or password.';
  }
}

function showSignInForm() {
  document.getElementById('signUpForm').classList.add('d-none');
  document.getElementById('signInForm').classList.remove('d-none');
}

function showSignUpForm() {
  document.getElementById('signInForm').classList.add('d-none');
  document.getElementById('signUpForm').classList.remove('d-none');
}

function showHomePage(name) {
  document.getElementById('loginPage').classList.add('d-none');
  document.getElementById('homePage').classList.remove('d-none');
  document.getElementById('welcomeName').textContent = name;
}

function logout() {
  localStorage.removeItem('loggedInUser');
  document.getElementById('homePage').classList.add('d-none');
  document.getElementById('loginPage').classList.remove('d-none');
}

window.onload = function() {
  let loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
      let user = JSON.parse(localStorage.getItem(loggedInUser));
      showHomePage(user.name);
  }
};
