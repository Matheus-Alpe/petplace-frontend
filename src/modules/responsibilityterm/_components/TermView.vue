<template>
    <div 
        class="term-view"
        :class="[{ 'institution': isInstitution }, selectedTerm.status]"
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
                <template v-if="isInstitution && selectedTerm.status === 'pendente'">
                    <button @click="updateTermStatus(false)">Rejeitar</button>
                    <button @click="updateTermStatus(true)">Aprovar</button>
                </template>
                <template v-else>
                    <span>Status:</span>
                    <span class="message">{{ selectedTerm.status }}</span>
                </template>
                
            </div>
        </div>
    </div>
</template>

<script>
import TermProfile from '../_components/TermProfile.vue'
import TermPet from '../_components/TermPet.vue'
import TermText from "@/components/TermText.vue";
import { mapState, mapActions, mapGetters } from 'vuex'

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

        ...mapGetters('user', ['isInstitution'])
    },

    methods: {
        ...mapActions('responsibilityTerm', ['setSelectedTerm', 'updateSelectedTerm', 'updateTerm']),
        
        async updateTermStatus(status) {
            const response = status ? 'aprovado' : 'arquivado'
            await this.updateSelectedTerm(response)
            await this.updateTerm()
            this.setSelectedTerm({})
        }
    },

    beforeMount() {
    }
};
</script>

<style lang="scss" scoped>
.term-view {
    z-index: 2;
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 40px;
    background: #6ea551;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    &.institution {
        background: #7371FC;
    }

    &.arquivado {
        background: #b0b1af;
    }

    &.aprovado {
        background: #b0b1af;
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