<template>
    <div 
        class="overlay"
        :class="{ show: shouldShow }"
        ref="excludeOverlay"
    >
        <!-- Overlay content -->
        <div class="overlay-content">
            <p>Deseja realmente excluir?</p>
            <a @click.prevent="closeOverlay" class="button-main">Cancelar</a>
            <a @click.prevent="confirmAction">Confirmar</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Overlay',

    props: {
        data: Object,
        
        callback: Function,

        shouldShow: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        closeOverlay() {
            this.$emit('close-overlay')
        },

        async confirmAction() {
            await this.callback(this.data)
            this.closeOverlay()
        },
    }
};
</script>

<style lang="scss" scoped>
.overlay {
    z-index: 10;
    display: none;
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
    overflow-x: hidden;
    transition: 0.5s;

    &.show {
        display: block;
    }
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
    border-radius: 5px;
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