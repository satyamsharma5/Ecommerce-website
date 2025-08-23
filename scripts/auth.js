// 🚀 Login user
function login() {
  // Support login with email or phone
  const emailInput = document.getElementById("login-email");
  const phoneInput = document.getElementById("login-phone");
  const passwordInput = document.getElementById("login-password") || document.getElementById("login-phone-password");
  const email = emailInput ? emailInput.value : "";
  const phone = phoneInput ? phoneInput.value : "";
  const password = passwordInput ? passwordInput.value : "";

  if (email) {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Login successful");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  } else if (phone) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('login-phone-form', {
      'size': 'invisible',
      'callback': function(response) {}
    });
    auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        const code = prompt("Enter the OTP sent to your phone:");
        return confirmationResult.confirm(code);
      })
      .then((result) => {
        alert("Login successful");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  }
}

// 🧾 Register user (email or phone)
// Register with email (new form)
function registerEmail() {
  const name = document.getElementById('reg-name-email').value;
  const gender = document.getElementById('reg-gender-email').value;
  const age = document.getElementById('reg-age-email').value;
  const email = document.getElementById('reg-email-email').value;
  const password = document.getElementById('reg-password-email').value;
  const confirmPassword = document.getElementById('reg-confirm-password-email').value;
  const msg = document.getElementById('reg-msg-email');
  msg.textContent = '';
  if (!name || !gender || !age || !email || !password || !confirmPassword) {
    msg.textContent = 'Please fill all fields.';
    return;
  }
  if (password !== confirmPassword) {
    msg.textContent = 'Passwords do not match.';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    msg.textContent = 'Please enter a valid email address.';
    return;
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Optionally save extra details to Firestore or Realtime DB
      if (firebase.firestore) {
        firebase.firestore().collection('users').doc(userCredential.user.uid).set({
          name,
          gender,
          age,
          email
        });
      }
      msg.textContent = 'Registration successful! Redirecting...';
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 1200);
    })
    .catch((error) => {
      msg.textContent = 'Registration failed: ' + error.message;
    });
}
function register() {
  // Registration with new form fields
  const name = document.getElementById("reg-name").value;
  const gender = document.getElementById("reg-gender").value;
  const age = document.getElementById("reg-age").value;
  const email = document.getElementById("reg-email").value;
  const phone = document.getElementById("reg-phone").value;
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-confirm-password").value;
  if (!name || !gender || !age || !email || !phone || !password || !confirmPassword) {
    document.getElementById("reg-msg").textContent = "Please fill all fields.";
    return;
  }
  if (password !== confirmPassword) {
    document.getElementById("reg-msg").textContent = "Passwords do not match.";
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    document.getElementById("reg-msg").textContent = "Please enter a valid email address.";
    return;
  }
  // If phone is provided, use phone auth
  if (phone) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function(response) {}
    });
    auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        const code = prompt("Enter the OTP sent to your phone:");
        return confirmationResult.confirm(code);
      })
      .then((result) => {
        alert("Phone registration successful");
        window.location.href = "index.html";
      })
      .catch((error) => {
        document.getElementById("reg-msg").textContent = "Phone registration failed: " + error.message;
      });
    return;
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Registration successful");
      window.location.href = "index.html";
    })
    .catch((error) => {
      document.getElementById("reg-msg").textContent = "Registration failed: " + error.message;
    });
}

// 🚪 Logout user
function logout() {
  auth.signOut()
    .then(() => {
      alert("Logged out successfully");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Logout failed: " + error.message);
    });
}

// 🧠 Show user greeting or redirect if not logged in
auth.onAuthStateChanged((user) => {
  const greeting = document.getElementById("user-greeting");

  if (user) {
    if (greeting) {
      // Try to get name from Firestore
      if (firebase.firestore) {
        firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
          if (doc.exists) {
            const data = doc.data();
            let msg = "Welcome, " + (data.name || user.email);
            if (data.age) msg += " | Age: " + data.age;
            if (data.gender) msg += " | Gender: " + data.gender;
            greeting.innerText = msg;
          } else {
            greeting.innerText = "Welcome, " + user.email;
          }
        }).catch(function() {
          greeting.innerText = "Welcome, " + user.email;
        });
      } else {
        greeting.innerText = "Welcome, " + user.email;
      }
    }
  } else {
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
      window.location.href = "login.html";
    }
  }
});
