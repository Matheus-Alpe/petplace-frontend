<template>
    <router-link 
        class="petplace-link"
        :to="to"
    >
        <slot />
    </router-link>
</template>

<script>
export default {
    name: 'Link',
    props: {
        to: String
    },
}
</script>

<style scoped>
.petplace-link {
    text-decoration: none;
    color: black;
}
</style>