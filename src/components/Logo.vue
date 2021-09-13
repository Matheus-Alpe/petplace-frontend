<template>
    <div class="petplace-logo">
        <img src="@/assets/logo-petplace.svg" alt="logo petplace">
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.petplace-logo {
    width: 60%;

    img {
        max-width: 100%;
    }

    &.center {
        margin: 0 auto;
    }

    &.small {
        width: 10%;
    }
}

</style>