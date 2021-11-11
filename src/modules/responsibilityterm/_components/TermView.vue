<template>
    <div 
        class="term-view"
        :class="selectedTerm.status"
    >
        <div>
            <span @click.prevent="setSelectedTerm({})" class="material-icons-round">close</span>
        </div>
        <TermProfile 
            :info="selectedTerm.info"
        />

        <TermPet
            :pet="selectedTerm.petInfo"
        />

        <TermText/>

        <div class="actions">
            <div class="status">
                <span>Status:</span>
                <span class="message">{{ selectedTerm.status }}</span>
            </div>
            <div class="buttons">

            </div>
        </div>
    </div>
</template>

<script>
import TermProfile from '../_components/TermProfile.vue'
import TermPet from '../_components/TermPet.vue'
import TermText from "@/components/TermText.vue";
import { mapState, mapActions } from 'vuex'

export default {
    name: 'TermView',
    components: {
        TermProfile,
        TermPet,
        TermText
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
        ...mapActions('responsibilityTerm', ['setSelectedTerm', 'updateSelectedTerm']),
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
    background: #BDBBB6;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    &.arquivado {
        background: #7c7e76;
    }

    &.aprovado {
        background: #6ea551;
    }

    .actions {

        .status {
            display: flex;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.5);
            padding: 5px;
            border-radius: 0 0 5px 5px;

            span {
                text-transform: capitalize;

                &.message {
                    font-weight: bold;
                }
            }
        }


    }
}
</style>