<template>
    <div class="petplace-nav">
        <PetLink to="/search">
            <img src="@/assets/icons/search_icon.svg" alt="Pesquisar Pet">
        </PetLink>
        
        <PetLink to="/">
            <img src="@/assets/icons/home_icon.svg" alt="Inicio">
        </PetLink>
        
        <PetLink to="/profile">
            <img src="@/assets/icons/profile_icon.svg" alt="Perfil">
        </PetLink>
    </div>
</template>

<script>
import PetLink from '@/components/Link.vue'

export default {
    components: {
        PetLink
    },
}
</script>

<style lang="scss" scoped>
.petplace-nav {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgb(99, 99, 212);
    display: flex;
    justify-content: space-around;
    align-items: center;

    .petplace-link {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>