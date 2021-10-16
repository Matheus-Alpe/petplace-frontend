<template>
    <div
        v-if="petData.id"
        class="pet-profile"
    >
        <div class="pet-info-header">
            <div class="pet-actions">
                <span
                    class="material-icons edit"
                    @click="$router.push('/pet/register')"
                >
                    mode_edit
                </span>

                <span
                    class="material-icons delete"
                    @click="shouldShowOverlay = true"
                >
                    delete
                </span>
            </div>

            <div class="pet-thumbnail">
                <PetInputImage 
                    image-type="pet"
                    class="center"
                    :show-input="false"
                    :img-url="petData.avatar_url"
                />
            </div>

            <div class="pet-content">
                <p>
                    <label>Nome: </label>
                    {{ petData.name }}
                </p>
                <p>
                    <label>Idade: </label>
                    <template v-if="petData.age">
                        {{ petData.age }} {{ petData.age > 1 ? 'anos' : 'ano' }}
                    </template>
                    <template v-else>
                        Indefinido
                    </template>
                </p>
                <p>
                    <label>Nasceu: </label>
                    <template v-if="petData.birthday">
                        <span v-formatdate>{{ petData.birthday }}</span>
                    </template>
                    <template v-else>
                        Indefinido
                    </template>
                </p>
                <p>
                    <label>Sexo: </label>
                    {{ petData.sex }}
                </p>
                <p>
                    <label>Tipo: </label>
                    {{ petData.type }}
                </p>
                <p>
                    <label>Porte: </label>
                    {{ petData.size }}
                </p>
                <p>
                    <label>Raça: </label>
                    {{ petData.breed }}
                </p>
                
            </div>

        </div>

        <div class="pet-info-content">
            <h2>Histórico Veterinário</h2>
            <table>
                <tr>
                    <th>Descrição</th>
                    <th>Data</th>
                </tr>
                <tr v-for="(history, index) in vetHistory" :key="index">
                    <td>{{ history.description }}</td>
                    <td v-formatdate>{{ history.date }}</td>
                </tr>
            </table>
        </div>

        <PetOverlay
            :data="petData"
            :callback="deleteCallback"
            :should-show="shouldShowOverlay"
            @close-overlay="shouldShowOverlay = false"
        />
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import PetOverlay from "@/components/Overlay.vue";
import PetInputImage from '@/components/InputImage.vue'

export default {
    name: 'PetProfile',

    components: {
        PetOverlay,
        PetInputImage,
    },

    data() {
        return {
            petData: {},
            vetHistory: [],
            shouldShowOverlay: false
        }
    },

    computed: {
        ...mapState('pet', [
            'selectedPet'
        ])
    },

    methods: {
        ...mapActions('pet', [
            'deletePet'
        ]),

        ...mapActions('auth', [
            'loadSession'
        ]),

        ...mapGetters('vetHistory', [
            'getVetHistory'
        ]),

        async deleteCallback(pet) {
            try {
                await this.deletePet(pet)
                await this.loadSession()
                this.$router.push('/profile')
            } catch (error) {
                console.log(error)
            }
        }
    },

    directives: {
        formatdate: {
            inserted(el) {
                if (!el || !el.innerText) return
                const [ date ] = String(el.innerText).split('T')
                el.innerText = date.split('-').reverse().join('/')
            }
        }
    },

    beforeMount() {
        this.petData = Object.assign({}, this.selectedPet)
        this.vetHistory = this.getVetHistory()(this.petData.id) || []
    
        if (!this.petData.id) this.$router.push('/profile')
    },
}
</script>

<style lang="scss" scoped>
.pet-info-header {
    background: pink;

    .pet-actions {
        z-index: 5;
        display: flex;
        align-items: center;
        gap: 5px;
        justify-content: center;
        position: absolute;
        right: 0;
        top: 0;
        
        .material-icons {
            display: flex;
            align-items: center;
            justify-content: center;
            $icon-size: 40px;
            width: $icon-size;
            height: $icon-size;
            border-radius: 0 0 40px 40px;

            &.edit {    
                background: cadetblue;
            }

            &.delete {
                background: red;
            }
        }
        
    }

    .pet-content {
   
        p {

            label {
                font-weight: bold;
            }
        }
    }
}
</style>