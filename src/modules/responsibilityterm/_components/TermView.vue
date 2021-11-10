<template>
    <div class="term-view" @click="setSelectedTerm({})">
        <TermProfile 
            :info="selectedTerm.info"
        />

        <TermPet
            :pet="selectedTerm.petInfo"
        />
    </div>
</template>

<script>
import TermProfile from '../_components/TermProfile.vue'
import TermPet from '../_components/TermPet.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'TermView',
    components: {
        TermProfile,
        TermPet
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState('responsibilityTerm', [
            'selectedTerm'
        ]),
    },

    methods: {
        ...mapActions('responsibilityTerm', ['setSelectedTerm']),
    },

    beforeMount() {
    }
};
</script>

<style lang="scss" scoped>
.term-view {
    z-index: 2;
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 40px;
    background: #DDB967;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}
</style>