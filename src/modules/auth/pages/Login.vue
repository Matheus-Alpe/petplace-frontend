<template>
    <div class="container">
        <div class="login">
            <img
                src="assets/logo-findpet.svg"
                class="logo logo-main"
                alt="logo findpet"
            />

            <form action="">
                <label for="email" class="custom-input"
                    ><span class="placeholder">Email</span>
                    <input type="email" name="email" id="email" required />
                </label>
                <label for="password" class="custom-input"
                    ><span class="placeholder">Senha</span>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    />
                </label>
                <div class="button-container">
                    <button type="submit" class="button-main">Login</button>
                    <a href="#cadastro" class="button-secondary">
                        Cadastrar-se
                    </a>
                </div>
            </form>
        </div>

        <div class="register">
            <img
                src="assets/logo-findpet.svg"
                class="logo logo-secondary"
                alt="logo findpet"
            />

            <form action="">
                <label for="name" class="custom-input"
                    ><span class="placeholder">Nome Completo</span>
                    <input type="name" name="name" id="name" required />
                </label>
                <label for="cpf" class="custom-input"
                    ><span class="placeholder">CPF</span>
                    <input type="text" cpf="cpf" id="cpf" required />
                </label>
                <label for="email" class="custom-input"
                    ><span class="placeholder">Email</span>
                    <input type="email" name="email" id="email" required />
                </label>
                <label for="password" class="custom-input"
                    ><span class="placeholder">Senha</span>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    />
                </label>
                <label for="confirmation" class="custom-input"
                    ><span class="placeholder">Confirmar Senha</span>
                    <input
                        type="password"
                        name="confirmation"
                        id="confirmation"
                        required
                    />
                </label>
                <div class="button-container" id="cadastro">
                    <button type="submit" class="button-main">Cadastrar</button>
                </div>
            </form>
        </div>
    </div>
</template>


<style lang="scss">
.container {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100vh 100vh;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.container > div {
    height: 100%;
}

.logo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 0 0;
}

.logo-main {
    height: 40%;
}

.logo-secondary {
    height: 20%;
    top: 5%;
}

.login,
.register {
    display: grid;
    align-items: center;
    padding-top: calc(100% - 50%);
}

.login {
    padding-top: calc(100% - 50%);
}

form {
    min-height: 50%;
}

form input {
    outline: none;
    font-size: 1rem;
    background-color: #fff;
    width: 90%;
    border: none;
    padding: 0 20px;
    line-height: 3;
    border: 2px solid rgba(0, 0, 0, 0.548);
    border-radius: 5px;
}

form input:focus,
.button-container button:focus {
    border-color: aqua;
}

.custom-input {
    display: block;
    color: rgba(51, 51, 51, 0.63);
    margin: 15px 0;
}

.placeholder {
    position: absolute;
    line-height: 1.4;
    top: -15%;
    padding: 0 5px;
    margin-left: 5px;
    z-index: 2;
    background-color: #fff;
    font-size: 0.8rem;
}

.button-container button {
    outline: none;
    text-transform: uppercase;
    width: 70%;
    margin: 1rem 0;
    padding: 1rem 0;
    border-radius: 50px;
    border: 2px solid transparent;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.54);
}

.button-main {
    background-color: rgb(99, 99, 212);
    color: white;
}

.button-secondary {
    display: block;
    color: black;
    font-size: 0.8rem;
}
</style>