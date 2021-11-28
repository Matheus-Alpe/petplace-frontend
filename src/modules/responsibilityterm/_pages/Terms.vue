<template>
    <div class="terms">
        <header>
            <h2>Termos de Responsabilidade</h2>
        </header>

        <div class="container-terms">
            
            <div 
                v-for="term in termOrder"
                class="card-term"
                :class="[{ 'institution': isInstitution }, term.status]"
                :key="term.id"
                @click="setSelectedTerm(term)"
            >
                <div v-if="isInstitution" class="thumbnail">
                    <img :src="term.info.avatar_url" :alt="`Pet Avatar ${term.petInfo.name}`">
                </div>
                <p class="message">
                    {{ isInstitution ? getFirstName(term.info.name) : 'Você' }} 
                    {{ term.status === 'aprovado' ? 'adotou' : term.status === 'arquivado' ? 'não pode adotar' : 'quer adotar'}} 
                    {{ term.petInfo.name }}
                </p>
                <div class="thumbnail">
                    <img :src="term.petInfo.avatar_url" :alt="`Pet Avatar ${term.petInfo.name}`">
                </div>
            </div>

        </div>

        <TermView v-if="selectedTerm && selectedTerm.id"/>
        
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

        ...mapGetters('user', ['isInstitution']),

        termOrder() {
            const reverse = this.terms && [...this.terms].reverse()
            return  reverse || this.terms;
        }
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

    header {
        background: #5f5fa8;
        padding: 10px;
    }

    .container-terms {
        padding: 10px;
        display: grid;
        gap: 10px;
        margin-bottom: 34px;

        .card-term {
            all: unset;
            background: #6ea551;
            display: grid;
            grid-template-columns: 2fr 100px;
            place-items: center;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

            &.institution {
                background: #7371FC;
                grid-template-columns: 1fr 2fr 1fr;
            }

            &.arquivado {
                background: #b0b1af;
                opacity: .3;
            }

            &.aprovado {
                background: #b0b1af;
            }

            .message {
                padding: 5px;
                text-align: center;
            }

            .thumbnail {
                width: 100%;
                height: 100px;
                display: grid;
                place-items: center;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
                
                img {
                    max-width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

}
</style>