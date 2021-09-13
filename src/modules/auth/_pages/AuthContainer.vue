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

.opacity {
    opacity: 0;
}

.text-error {
    color: red !important;
}

.login,
.register {
    text-align: center;
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