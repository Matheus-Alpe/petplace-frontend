<template>
    <div>
        <h1>Olá {{ $store.state.user.user.name }}</h1>
        <router-link to="profile">profile</router-link>
    </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style>

</style>