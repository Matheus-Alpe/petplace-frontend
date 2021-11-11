<template>
    <div class="petplace-nav">
        <PetLink to="/search">
            <span class="material-icons-round" title="Pesquisar">search</span>
        </PetLink>

        <PetLink to="/terms">
            <span class="material-icons-round">library_books</span>
        </PetLink>
        
        <PetLink to="/profile">
            <span class="material-icons-round" title="Perfil">account_circle</span>
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
    z-index: 2;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgb(95, 95, 168);
    display: flex;
    justify-content: space-around;
    align-items: center;

    .petplace-link {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
    }
}
</style>