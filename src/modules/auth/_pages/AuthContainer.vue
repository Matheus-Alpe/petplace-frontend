<template>
    <div class="container">
        <router-view/>
    </div>
</template>

<script>
export default {
   
};
</script>

<style lang='scss'>
.owner-avatar {
    background-color: rgb(92, 92, 92);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    width: 125px;
    height: 125px;
    border-radius: 50%;
}

.img-selector {
    position: absolute;
    bottom: 10px;
    right: 15px;
    color: white;
}

input[type='file'] {
    display: none;
}

.container {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
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
    top: 4%;
}

.opacity {
    opacity: 0;
}

.text-error {
    color: red !important;
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

.error {
    border: 2px solid rgba(255, 0, 0, 0.548) !important;
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