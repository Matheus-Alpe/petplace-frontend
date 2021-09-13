<template>
    <router-link 
        class="petplace-link"
        :to="to"
    >
        {{ label }}
    </router-link>
</template>

<script>
export default {
    name: 'Link',
    props: {
        label: String,
        to: String
    },
}
</script>