<template>
    <div class="term-view" @click="setSelectedTerm({})">
        {{ selectedTerm.id }}

        <TermProfile 
            :info="selectedTerm.info"
        />
    </div>
</template>

<script>
import TermProfile from '../_components/TermProfile.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'TermView',
    components: {
        TermProfile
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
    z-index: 5;
    background: #DDB967;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>