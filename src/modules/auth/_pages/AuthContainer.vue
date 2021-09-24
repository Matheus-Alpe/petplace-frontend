<template>
    <div class="container">
        <router-view/>
    </div>
</template>

<script>
export default {
   name: 'AuthContainer'
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

    > form {
        width: 90%;
        margin: 0 auto;
    }
}

.opacity {
    opacity: 0;
}

.login,
.register {
    text-align: center;
}
</style>