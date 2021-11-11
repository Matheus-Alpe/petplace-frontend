<template>
    <div class="term-pet" v-if="pet && pet.id">
        <h2>Pet</h2>
        <p>Nome: {{ pet.name }}</p>
        <p>Raça: {{ pet.breed }}</p>
        <p>Porte: {{ pet.size }}</p>
    </div>
</template>

<script>

export default {
    name: 'TermPet',

    props: {
        pet: Object
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
.term-pet {
    background: #ADBCA5;
    gap: 10px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    h1, h2, h3 {
        margin-bottom: 5px;
        font-size: 19px;
    }
}
</style>