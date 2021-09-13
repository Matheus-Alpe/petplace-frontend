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

.login,
.register {
    text-align: center;
}
</style>