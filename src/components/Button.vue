<template>
    <button 
        class="petplace-button"
    >
        {{ label }}
    </button>        
</template>

<script>
export default {
    name: 'Button',
    props: {
        label: String,
    },
}
</script>

<style lang="scss">
.petplace-button {
    outline: none;
    text-transform: uppercase;
    width: 70%;
    margin: 1rem 0;
    padding: 1rem 0;
    border-radius: 50px;
    border: 2px solid transparent;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.54);

    &:focus {
        border-color: aqua;
    }

    &.main {
        background-color: rgb(99, 99, 212);
        color: white;
    }

    &.secondary {
        color: black;
        font-size: 0.8rem;
    }
}
</style>