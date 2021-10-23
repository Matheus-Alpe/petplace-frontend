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
                        <span>{{ formatDate(petData.birthday) }}</span>
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
                <tr class="head">
                    <th>Descrição</th>
                    <th>Data</th>
                </tr>
                <tr v-for="(history, index) in vetHistory" :key="index" class="data">
                    <td class="description">{{ history.description }}</td>
                    <td class="date">{{ formatDate(history.date) }}</td>
                    <td class="edit">
                        <span 
                            @click="editVetHistory(history)"
                            class="material-icons"
                        >settings</span>
                    </td>
                </tr>
                <tr class="action">
                    <td colspan="2">
                        <span 
                            class="material-icons"
                            @click="vetOverlay = true"    
                        >add_circle</span>
                    </td>
                </tr>
            </table>
        </div>

        <PetOverlay
            :data="petData"
            :callback="deleteCallback"
            :should-show="shouldShowOverlay"
            @close-overlay="shouldShowOverlay = false"
        />

        <PetOverlayForm
            v-if="vetOverlay"
            :data="petData"
            :should-show="vetOverlay"
            @close-overlay="closeCallback"
        />
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import PetOverlay from "@/components/Overlay.vue";
import PetInputImage from '@/components/InputImage.vue'
import PetOverlayForm from '@/modules/vethistory/_components/OverlayForm'

export default {
    name: 'PetProfile',

    components: {
        PetOverlay,
        PetInputImage,
        PetOverlayForm
    },

    data() {
        return {
            petData: {},
            vetHistory: [],
            shouldShowOverlay: false,
            vetOverlay: false
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
            'getVetHistory',
        ]),

        ...mapActions('vetHistory', [
            'setSelectedVetHistory'
        ]),

        async deleteCallback(pet) {
            try {
                await this.deletePet(pet)
                await this.loadSession()
                this.$router.push('/profile')
            } catch (error) {
                return error
            }
        },

        closeCallback() {
            this.vetHistory = this.getVetHistory()(this.petData.id) || []
            this.vetOverlay = false
        },

        editVetHistory(vetHistory) {
            this.setSelectedVetHistory(vetHistory)
            this.vetOverlay = true
        },

        formatDate(date) {
            return date.split('T')[0].split('-').reverse().join('/')
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

.pet-info-content {
    table {
        box-sizing: border-box;
        padding: 0 10px;
        width: 100%;
        
        tr {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            gap: 5px;
            margin: 20px 0;

            &.head {
                justify-content: space-evenly;
            }

            &.data {
                border: 2px solid black;
                border-radius: 5px;
                padding: 0 5px;
            }

            &.action {
                justify-content: center;
                margin-bottom: 50px;
            }
            
            td {
                padding: 5px 0;

                &:first-child {
                    word-break: break-all;
                }
                
                &.description {
                    width: 55%;
                }

                &.date,
                &.edit {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                &.date {
                    border-left: 2px solid rgba(0, 0, 0, .1);
                    width: 40%;
                }

                &.edit {
                    width: 5%;
                    padding: 0 10px;
                    border-left: 2px solid rgba(0, 0, 0, .1);

                    .material-icons {
                        font-size: 13px;
                    }
                }
            }
            
        }
    }
}
</style>