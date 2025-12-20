// Toast variables
const ToastSuccess = document.querySelector('#success');
const ToastError = document.querySelector('#error');

// Header variables
const HeaderWrapper = document.querySelector('.header');
const HeaderTitle = document.querySelector('.header__title');
const HeaderList = document.querySelector('.header__list');
const HeaderBox = document.querySelector('.header__box');
const HeaderButtonLogin = document.querySelector('.header__button-login');
const HeaderButtonRegister = document.querySelector('.header__button-register');
const HeaderBoxLogout = document.querySelector('.header__box-logout');
const HeaderButtonLogout = document.querySelector('.header__button-logout');
const HeaderButtonDelet = document.querySelector('.header__button-delet');

// Register page variables
const RegisterWrapper = document.querySelector('.register');
const RegisterForm = document.querySelector('.register__form');
const RegisterClose = document.querySelector('.register__close');
const registerInputUsername = document.querySelector('.register__input-username');
const registerInputEmail = document.querySelector('.register__input-email');
const registerInputPassword = document.querySelector('.register__input-password');
const RegisterButton = document.querySelector('.register__button');

// Login page variables
const LoginWrapper = document.querySelector('.login');
const LoginForm = document.querySelector('.login__form');
const LoginClose = document.querySelector('.login__close');
const loginInputEmail = document.querySelector('.login__input-email');
const loginInputPassword = document.querySelector('.login__input-password');
const LoginButton = document.querySelector('.login__button');

// Document variables
const About = document.querySelector('.about');

// Add card


// RegEx variables
const RegExUsername = /^[a-zA-Z0-9]{3,16}$/;
const RegExEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const RegExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// Api variables
const ApiUrl = 'https://fakestoreapi.com/auth/login';

// Admin Panel Show
HeaderTitle.addEventListener('click', () => {
    if (localStorage.getItem('password') === 'derek' && localStorage.getItem('username') === 'jklg*_56') {
        window.location.href = '../pages/admin.html';
    }
});

// Token check
if (localStorage.getItem('token') !== null|| (localStorage.getItem('username') !== null && localStorage.getItem('password') !== null)){
    if (localStorage.getItem('username') === 'derek' && localStorage.getItem('password') === 'jklg*_56') {
        window.location.href = '../pages/admin.html';
    } else {
        HeaderBox.style.display = 'none';
        HeaderBoxLogout.style.display = 'flex';
        HeaderButtonLogout.style.display = 'block';
        HeaderButtonDelet.style.display = 'block';
    }
}

// Login Api
const HandelSubmit = (e) => {
    e.preventDefault();

    const user = {
        username: 'derek',
        password: 'jklg*_56'
    };

        if (user.username === loginInputEmail.value.trim() && user.password === loginInputPassword.value.trim()){
            window.location.href = '../pages/admin.html';
            localStorage.setItem('username', user.username);
            localStorage.setItem('password', user.password);

            fetch(ApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => { 
                    const token = data.token;
                    console.log(token);
                    
                    localStorage.setItem('token', token);
                }); 

                

            loginInputEmail.value = '';
            loginInputPassword.value = '';
        }else if (localStorage.getItem('username') === loginInputEmail.value.trim() && localStorage.getItem('password') === loginInputPassword.value.trim()){
            
            fetch(ApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => { 
                    const token = data.token;
                    console.log(token);
                    
                    localStorage.setItem('token', token);
                });

                loginInputEmail.style.border = '1px solid green';
                loginInputPassword.style.border = '1px solid green';

                ToastSuccess.style.display = 'flex';
                ToastSuccess.style.transition = '1s ease-in-out';
                ToastSuccess.style.transform = 'translateY(0)';
                ToastSuccess.style.opacity = '0';
                setTimeout(() => {
                    ToastSuccess.style.transform = 'translateY(5%)';
                    ToastSuccess.style.opacity = '1';
                }, 1000);
                setTimeout(() => {
                    ToastSuccess.style.display = 'none';
                }, 5000);

                setTimeout(() => {
                    loginInputEmail.style.border = '1px solid inhert';
                    loginInputPassword.style.border = '1px solid inhert';
                    loginInputEmail.value = '';
                    loginInputPassword.value = '';
                    LoginForm.style.transform = 'translateX(-400%)';
                    LoginForm.style.transition = '1s ease-in-out';

                    setTimeout(() => {
                        LoginWrapper.style.display = 'none';
                        LoginForm.style.display = 'none';
                        HeaderBox.style.display = 'none';
                        HeaderBoxLogout.style.display = 'flex';
                        HeaderButtonLogout.style.display = 'block';
                        HeaderButtonDelet.style.display = 'block';
                        loginInputEmail.value = '';
                        loginInputPassword.value = '';
                    }, 1000);
                }, 500);
        } else {
            loginInputEmail.style.border = '2px solid red';
            loginInputPassword.style.border = '2px solid red';

            ToastError.style.display = 'flex';
            ToastError.style.transition = '1s ease-in-out';
            ToastError.style.transform = 'translateY(0)';
            ToastError.style.opacity = '0';
            setTimeout(() => {
                ToastError.style.transform = 'translateY(5%)';
                ToastError.style.opacity = '1';
            }, 1000);
            setTimeout(() => {
                ToastError.style.display = 'none';
            }, 5000);
        }   
}

// Event listeners
LoginButton.addEventListener('click', HandelSubmit);
LoginForm.addEventListener('submit', HandelSubmit);

// Register Event listeners
RegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (RegExUsername.test(registerInputUsername.value.trim()) && RegExEmail.test(registerInputEmail.value.trim()) && RegExPassword.test(registerInputPassword.value.trim())) {
        registerInputUsername.style.border = '1px solid green';
        registerInputEmail.style.border = '1px solid green';
        registerInputPassword.style.border = '1px solid green';
        localStorage.setItem('username', registerInputUsername.value.trim());
        localStorage.setItem('password', registerInputPassword.value.trim());
        localStorage.setItem('email', registerInputEmail.value.trim());

        ToastSuccess.style.display = 'flex';
        ToastSuccess.style.transition = '1s ease-in-out';
        ToastSuccess.style.transform = 'translateY(0)';
        ToastSuccess.style.opacity = '0';
        setTimeout(() => {
            ToastSuccess.style.transform = 'translateY(5%)';
            ToastSuccess.style.opacity = '1';
        }, 1000);
        setTimeout(() => {
            ToastSuccess.style.display = 'none';
        }, 5000);

        setTimeout(() => {
            registerInputUsername.style.border = 'none';
            registerInputEmail.style.border = 'none';
            registerInputPassword.style.border = 'none';
            registerInputUsername.value = '';
            registerInputEmail.value = '';
            registerInputPassword.value = '';
            RegisterForm.style.transform = 'translateX(400%)';
            RegisterForm.style.transition = '1s ease-in-out';

            setTimeout(() => {
                RegisterWrapper.style.display = 'none';
                RegisterForm.style.display = 'none';
                HeaderBox.style.display = 'none';
                HeaderBoxLogout.style.display = 'flex';
                HeaderButtonLogout.style.display = 'block';
                HeaderButtonDelet.style.display = 'block';
            }, 1000);
        }, 500);
    } else {
        if (!RegExUsername.test(registerInputUsername.value.trim())) {
            registerInputUsername.style.border = '2px solid red';
        }
        if (!RegExEmail.test(registerInputEmail.value.trim())) {
            registerInputEmail.style.border = '2px solid red';
        }
        if (!RegExPassword.test(registerInputPassword.value.trim())) {
            registerInputPassword.style.border = '2px solid red';
        }

        ToastError.style.display = 'flex';
        ToastError.style.transition = '1s ease-in-out';
        ToastError.style.transform = 'translateY(0)';
        ToastError.style.opacity = '0';
        setTimeout(() => {
            ToastError.style.transform = 'translateY(5%)';
            ToastError.style.opacity = '1';
        }, 1000);
        setTimeout(() => {
            ToastError.style.display = 'none';
        }, 5000);
    }
});

// Header Box Show
HeaderBoxLogout.addEventListener('click', () => {
    HeaderBox.style.display = 'flex';
    HeaderBoxLogout.style.display = 'none';
});

// Login Wrapper Show
HeaderButtonLogin.addEventListener('click', () => {
    LoginWrapper.style.display = 'flex';
    LoginForm.style.transform = 'translateX(-400%)';
    LoginForm.style.display = 'flex';

    setTimeout(() => {
        LoginForm.style.transform = 'translateX(0)';
        LoginForm.style.transition = '1s ease-in-out';
    }, 1000)
});

// Register Wrapper Show
HeaderButtonRegister.addEventListener('click', () => {
    RegisterWrapper.style.display = 'flex';
    RegisterForm.style.transform = 'translateX(400%)';
    RegisterForm.style.display = 'flex';

    setTimeout(() => {
        RegisterForm.style.transform = 'translateX(0)';
        RegisterForm.style.transition = '1s ease-in-out';
    }, 1000)
});

// Register Wrapper Hide
RegisterClose.addEventListener('click', () => {
    RegisterForm.style.transform = 'translateX(400%)';
    RegisterForm.style.transition = '1s ease-in-out';

    setTimeout(() => {
        RegisterWrapper.style.display = 'none';
        RegisterForm.style.display = 'none';
    }, 1000);
});

// Login Wrapper Hide
LoginClose.addEventListener('click', () => {
    LoginForm.style.transform = 'translateX(-400%)';
    LoginForm.style.transition = '1s ease-in-out';

    setTimeout(() => {
        LoginWrapper.style.display = 'none';
        LoginForm.style.display = 'none';
    }, 1000);
});

// Logout 
HeaderButtonLogout.addEventListener('click', () => {
    localStorage.removeItem('token');
    HeaderBox.style.display = 'flex';
    HeaderBoxLogout.style.display = 'none';
    HeaderButtonLogout.style.display = 'none';
    HeaderButtonDelet.style.display = 'none';
});

// Delete
HeaderButtonDelet.addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('profileImage');
    HeaderBox.style.display = 'flex';
    HeaderBoxLogout.style.display = 'none';
    HeaderButtonLogout.style.display = 'none';
    HeaderButtonDelet.style.display = 'none';
});

// About
About.addEventListener('click', () => {
    window.location.href = 'https://docs.spline.design';
});