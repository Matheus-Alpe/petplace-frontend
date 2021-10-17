<template>
    <div 
        class="overlay"
        :class="{ show: shouldShow }"
        ref="excludeOverlay"
    >
        <!-- Overlay content -->
        <form 
            @submit.prevent="confirmAction"
            class="overlay-content"
        >
            <span
                v-if="hasSelectedVetHistory"
                class="material-icons delete"
                @click="deleteAction"
            >
                delete
            </span>
            <p>{{ hasSelectedVetHistory ? 'Atualizar' : 'Adicionar'}} Informação:</p>
            <PetInput 
                label="Descrição"
                id="description"
                type="text"
                :initial-value="vethistory.description"
                @change-attribute="setRegisterAttribute('description', $event)"
            />

            <PetInput 
                label="Data"
                id="date"
                type="date"
                :initial-value="vethistory.date"
                @change-attribute="setRegisterAttribute('date', $event)"
            />

            <button
                type="reset"
                @click.prevent="closeOverlay"
            >
                Cancelar
            </button>
            
            <button 
                type="submit"
                class="button-main"
            >
                {{ hasSelectedVetHistory ? 'Atualizar' : 'Salvar'}}
            </button>
        </form>
    </div>
</template>

<script>
import PetInput from '@/components/Input.vue'
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    name: 'OverlayForm',

    components: {
        PetInput
    },

    props: {
        data: Object,
        
        shouldShow: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            pet_id: '',
            vethistory: {
                date: '',
                description: ''
            }
        }
    },

    computed: {
        ...mapState('vetHistory', [
            'selectedVetHistory'
        ]),

        ...mapGetters('vetHistory', [
            'hasSelectedVetHistory'
        ]),
    },

    methods: {
        ...mapActions('vetHistory', [
            'createVetHistory',
            'updateVetHistory',
            'deleteVetHistory',
            'setSelectedVetHistory'
        ]),

        closeOverlay() {
            console.log('penis 3')
            this.resetForm()
            console.log('penis 4')
            this.$emit('close-overlay')
        },

        async confirmAction() {
            if (this.hasSelectedVetHistory) {
                await this.updateVetHistory(this.vethistory)
            } else {
                await this.createVetHistory({ vetHistory: {
                    pet_id: this.pet_id,
                    ...this.vethistory
                }})
            }

            this.closeOverlay()
        },

        async deleteAction() {
            console.log('penis 1')
            await this.deleteVetHistory(this.vethistory)
            console.log('penis 2')
            this.closeOverlay()
        },

        setRegisterAttribute(attribute, value) {
			this.vethistory[attribute] = value
		},

        resetForm() {
            this.vethistory = {
                date: '',
                description: ''
            }
            this.setSelectedVetHistory({})
        },

        normalizeVetData(vetData) {
            if (!vetData.date) return vetData

            const [ date ] = vetData.date.split('T')
            vetData.date = date
            return vetData
        }
    },

    created() {
        this.pet_id = this.data.id

        if(!this.hasSelectedVetHistory) return
        this.vethistory = this.normalizeVetData(this.selectedVetHistory)
        console.log('hasSelectedVetHistory:', this.vethistory)
    }
};
</script>

<style lang="scss" scoped>
.overlay {
    z-index: 10;
    display: none;
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
    overflow-x: hidden;
    transition: 0.5s;

    &.show {
        display: block;
    }
}

.overlay-content {
    position: relative;
    background-color: #fff;
    margin: 0 auto;
    padding: 1.5em 10px 1em;
    top: 25%;
    width: 90%;
    text-align: center;
    margin-top: 30px;
    border-radius: 5px;

    p {
        font-size: 1.2rem;
        text-align: left;
    }

    .material-icons {
        z-index: 2;
        position: absolute;

        &.delete {
            right: 7px;
        }
    }
}

.overlay button {
    outline: none;
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    margin: 1rem 5px 0;
    padding: 0.5rem 0.2rem;
    border-radius: 50px;
    font-size: 0.8rem;
    border: 2px solid transparent;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.54);

    &.button-main {
        background-color: rgb(99, 99, 212);
        color: white;
        padding: 0.5rem 1.5rem;
    }
}



@media screen and (max-height: 450px) {
    .overlay button {
        font-size: 20px;
    }
}
</style>