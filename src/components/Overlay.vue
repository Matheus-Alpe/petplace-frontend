<template>
    <div id="excludeOverlay" class="overlay">
        <!-- Overlay content -->
        <div class="overlay-content">
            <p>Deseja excluir a conta?</p>
            <a @click.prevent="closeOverlay" class="button-main">Cancelar</a>
            <a @click.prevent="remove">Confirmar</a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "Overlay",
    methods: {

        ...mapActions('auth', ['ActionSignOut']),

        remove() {
            this.ActionSignOut()
            this.$router.push({ name: 'login' })
        },

        closeOverlay() {
            document.getElementById("excludeOverlay").style.display = "none";
        },
    }
};
</script>

<style lang="scss" scoped>
.overlay {
    display: none;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
    overflow-x: hidden;
    transition: 0.5s;
}

.overlay-content {
    position: relative;
    background-color: #fff;
    margin: 0 auto;
    padding: 1.5em 0 1em;
    top: 25%;
    width: 90%;
    text-align: center;
    margin-top: 30px;
}

.overlay-content p {
    font-size: 1.2rem;
}

.overlay a {
    outline: none;
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    margin: 1rem 5px 0;
    padding: 0.5rem 0.5rem;
    border-radius: 50px;
    font-size: 0.8rem;
    border: 2px solid transparent;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.54);
}

.button-main {
    background-color: rgb(99, 99, 212);
    color: white;
}

@media screen and (max-height: 450px) {
    .overlay a {
        font-size: 20px;
    }
}
</style>