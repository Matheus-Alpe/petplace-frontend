<template>
    <div class="term-profile" v-if="info && info.id">
        <h2>{{ info.name }}</h2>
    </div>
</template>

<script>

export default {
    name: 'TermProfile',

    props: {
        info: Object
    },

    components: {
    },
    data() {
        return {

        }
    },
    computed: {
    },

    methods: {
    },

    beforeMount() {
        
    }
};
</script>

<style lang="scss" scoped>
.term-profile {
    background: #D1603D;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>