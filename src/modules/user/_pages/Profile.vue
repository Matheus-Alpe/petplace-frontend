<template>
    <div class="home" @click="checkDropdown">
        <div class="owner__profile">
            <div class="owner__info-container">
                <div class="dropdown">
                    <img 
                        @click="openDropdown()"
                        src="@/assets/icons/config_icon.svg"
                        class="config-button"
                        alt="config button"
                    >

                    <div class="dropdown-content" ref="dropdownContent">
                        <p @click="showForm">Editar Perfil</p>
                        <p @click="openOverlay">Excluir Perfil</p>
                        <p @click="logOut">Sair</p>
                    </div>
                </div>

                <PetInputImage 
                    class="center"
                    :show-input="displayForm"
                    :img-url="dataUser && dataUser.avatar_url"
                    @image-selected="setRegisterAttribute('inputFile', $event)" 
                />
                
                <h2 class="main-owner-name" v-if="!displayForm">{{ user.name }}</h2>

                <form id="owner-form" 
                    @submit.prevent="submitChanges" 
                    v-if="dataUser"
                    :class="{ active: displayForm }"
                >
                    <PetInput 
                        label="Nome"
                        id="name"
                        type="text"
                        style="--input-bg: rgb(99, 99, 212);"
                        :initialValue="dataUser.name"
                        @change-attribute="setRegisterAttribute('name', $event)"
                    />

                    <PetInput 
                        label="CEP"
                        id="cep"
                        type="text"
                        style="--input-bg: rgb(99, 99, 212);"
                        :initialValue="dataUser.cep"
                        @change-attribute="setRegisterAttribute('cep', $event)"
                    />

                    <PetInput 
                        label="Celular"
                        id="cellphone"
                        type="text"
                        style="--input-bg: rgb(99, 99, 212);"
                        :initialValue="dataUser.cellphone"
                        @change-attribute="setRegisterAttribute('cellphone', $event)"
                    />

                    <PetInput 
                        label="Telefone (opcional)"
                        id="telephone"
                        type="text"
                        style="--input-bg: rgb(99, 99, 212);"
                        :initialValue="dataUser.telephone"
                        :is-required="false"
                        @change-attribute="setRegisterAttribute('telephone', $event)"
                    />

                    <template>
                        <PetInput 
                            v-if="isInstitution"
                            label="Data de Fundação"
                            id="foundation"
                            type="date"
                            style="--input-bg: rgb(99, 99, 212);"
                            :initialValue="dataUser.foundation"
                            @change-attribute="setRegisterAttribute('foundation', $event)"
                        />
                        <PetInput 
                            v-else
                            label="Data de Nascimento"
                            id="birthday"
                            type="date"
                            style="--input-bg: rgb(99, 99, 212);"
                            :initialValue="dataUser.birthday"
                            @change-attribute="setRegisterAttribute('birthday', $event)"
                        />
                    </template>

                    <PetInput 
                        label="Email"
                        id="email"
                        type="email"
                        style="--input-bg: rgb(99, 99, 212);"
                        :initialValue="dataUser.email"
                        @change-attribute="setRegisterAttribute('email', $event)"
                    />

                    <PetInput 
                        label="Senha"
                        id="password"
                        type="password"
                        style="--input-bg: rgb(99, 99, 212);"
                        :initialValue="dataUser.password"
                        @change-attribute="setRegisterAttribute('password', $event)"
                    />
                   
                    <div class="button-container">
                        <button class="button-main" @click="showForm">
                            Salvar
                        </button>

                        <a class="closebtn" @click="showForm('close')">
                            <i class="material-icons md-48">close</i>
                        </a>
                        
                    </div>
                </form>
            </div>

            <div class="owner__pets-container">
                <button
                    v-for="pet in pets"
                    :key="pet.id"
                    type="button"
                    class="owner__pet-card"
                    @click="openPetProfile(pet)"
                >
                    <div class="overlay">
                        <h3>{{ pet.name }}</h3>
                    </div>

                    <img 
                        :src="pet.avatar_url" 
                        :alt="`pet ${pet.name}`">
                </button>

                <PetLink
                    to="/pet/register"
                    class="owner__pet-card register"
                >
                    <img src="@/assets/icons/plus.svg" alt="adicionar pet">
                </PetLink>
            </div>
        </div>

        <!-- The overlay -->
        <PetOverlay 
            :data="dataUser"
            :callback="deleteUser"
            :should-show="shouldShowOverlay"
            @close-overlay="shouldShowOverlay = false"
        />
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import PetOverlay from "@/components/Overlay.vue";
import PetInputImage from '@/components/InputImage.vue'
import PetInput from '@/components/Input.vue'
import PetLink from '@/components/Link.vue'


export default {
    name: "Profile",
    components: {
        PetOverlay,
        PetInputImage,
        PetInput,
        PetLink
    },
    data() {
        return {
            dataUser: Object.assign({}, this.user),
            displayForm: false,
            inputFile: null,
            shouldShowOverlay: false
        }
    },
    computed: {
        ...mapState('user', ['user']),

        ...mapState('pet', ['pets']),

        ...mapGetters('user', ['isInstitution']),

        imageUrl() {
            return this.inputFile && URL.createObjectURL(this.inputFile)
        }
    },
    watch: {
        user: {
            handler() {
                this.dataUser = Object.assign({}, this.user)
                if (this.dataUser.foundation) {
                    this.dataUser.foundation = this.formatDate(this.dataUser.foundation)
                }

                if (this.dataUser.birthday) {
                    this.dataUser.birthday = this.formatDate(this.dataUser.birthday)
                }
            },
            deep: true
        }
    },
    methods: {
        ...mapActions('auth', [
            'logOut',
        ]),
        ...mapActions('user', [
            'updateUser',
            'deleteUser'
        ]),
        ...mapActions([
            'uploadUserImage'
        ]),
        ...mapActions('pet', [
            'setSelectedPet'
        ]),

        setRegisterAttribute(attribute, value) {
			if (attribute === 'inputFile') {
				this['inputFile'] = value
				return
			}

			this.dataUser[attribute] = value
		},

        openPetProfile(pet) {
            this.setSelectedPet(pet)
            this.$router.push('/pet/profile')
        },

        async submitChanges() {
            if (this.inputFile) {
                await this.uploadUserImage(this.inputFile)
                this.dataUser.avatar_url = this.inputFile.name
            }
            this.updateUser({ user: this.dataUser })
        },

        checkDropdown(event) {
            if (event.target.classList.contains('config-button')) return
            this.closeDropdown()
        },

        openDropdown() {
            const dropdown = this.$refs.dropdownContent
            if (dropdown) {
                dropdown.style.display = 'block'
            }
        },

        closeDropdown() {
            const dropdown = this.$refs.dropdownContent
             if (dropdown) {
                dropdown.style.display = 'none'
            }
        },

        openOverlay() {
            this.closeDropdown();
            this.shouldShowOverlay = true;
        },

        showForm(type) {
            this.displayForm = !this.displayForm
            this.closeDropdown()

            if(type === 'close') {
                this.inputFile = null
            }
        },

        formatDate(date) {
            if(!date) return
            return date.split('T')[0]
        },
    },

    async beforeMount() {
        this.dataUser = Object.assign({}, this.user)
        if (this.dataUser.foundation) {
            this.dataUser.foundation = this.formatDate(this.dataUser.foundation)
        }

        if (this.dataUser.birthday) {
            this.dataUser.birthday = this.formatDate(this.dataUser.birthday)
        }

        this.setSelectedPet({})
    }
};
</script>

<style lang="scss" scoped>
.home {
    min-height: 100vh;
}

.owner__info-container {
    overflow: hidden;
    background-color: rgb(99, 99, 212);
    border-radius: 0 0 20px 20px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    h2 {
        margin-top: 1em;
    }
}

.owner__pets-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 10px;
    padding-bottom: 44px;
    
    .owner__pet-card {
        all: unset;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;


        &:not(.register) {
            position: relative;

            .overlay {
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(356deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 50%, rgba(0,212,255,0) 100%);
                display: flex;
                justify-content: center;
                align-items: flex-end;
                padding: 10px;
                word-break: break-all;

                h3 {
                    color: #fff;
                    font-weight: normal;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
            }

            img {
                max-width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &.register {
            background: transparent;
            opacity: 0.5;
        }
    }
}


.dropdown {
    display: inline-block;
    position: absolute;
    top: 20px;
    right: 20px;
}

.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown-content p {
    padding: 1em 10px;
}

.dropdown-content p:hover {
    background-color: #0000001a;
}

form {
    overflow: hidden;
    height: 0;
}

.active {
    height: 100%;
}

.button-container button:focus {
    border-color: aqua;
}

.button-container {
    padding: 0 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-container button {
    outline: none;
    text-transform: uppercase;
    width: 70%;
    margin: 1rem 0;
    padding: 1rem 0;
    border-radius: 50px;
    border: 2px solid transparent;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.54);
}

.button-main {
    background-color: transparent;
    color: white;
}

.button-secondary {
    display: block;
    color: black;
    font-size: 0.8rem;
}

.closebtn {
    text-decoration: none;
    opacity: 0.5;
}
</style>