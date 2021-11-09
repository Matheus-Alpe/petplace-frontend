<template>
    <div class="terms">
        <h2>Pessoas interessadas</h2>

        <div class="container-terms">
            
            <div 
                v-for="term in terms"
                class="card-term"
                :key="term.id"
                @click="setSelectedTerm(term)"
            >
                <p>{{ isInstitution ? getFirstName(term.info.name) : 'Você' }} quer adotar: {{ term.petInfo.name }}</p>
            </div>

        </div>

        <TermView v-if="selectedTerm"/>
    </div>
</template>

<script>
import TermView from '../_components/TermView.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'Terms',
    components: {
        TermView
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState('responsibilityTerm', [
            'terms', 
            'selectedTerm'
        ]),

        ...mapGetters('user', ['isInstitution'])
    },

    methods: {
        ...mapActions('responsibilityTerm', ['setSelectedTerm']),

        getFirstName(fullname) {
            const [ firstname ] = fullname.split(' ')
            return  firstname || fullname
        }
        
    },

    beforeMount() {
        
    }
};
</script>

<style lang="scss" scoped>
.terms {
    min-height: 100vh;

    .container-terms {
        padding: 10px;
        display: grid;
        gap: 10px;
        margin-bottom: 34px;

        .card-term {
            all: unset;
            background: #D7F9F1;
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

            &.archived {
                background: #AFBC88;
                opacity: .5;
            }

            &.approved {
                background: #618B4A;
            }
        }
    }

}
</style>