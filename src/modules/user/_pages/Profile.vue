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
                        <p @click="userLogOut">Sair</p>
                    </div>
                </div>

                <PetInputImage 
                    class="center"
                    :show-input="displayForm"
                    :img-url="dataUser && dataUser.image"
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
                    v-for="(pet, i) in pets"
                    :key="i"
                    type="button"
                    class="owner__pet-card"
                    @click="openPetProfile(pet)"
                >
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
import { mapState, mapActions } from 'vuex'

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
    data: () => ({
        dataUser: null,
        displayForm: false,
        inputFile: null,
        shouldShowOverlay: false
    }),
    computed: {
        ...mapState('user', ['user']),

        ...mapState('pet', ['pets']),

        imageUrl() {
            return this.inputFile && URL.createObjectURL(this.inputFile)
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

        userLogOut() {
            this.logOut()
        },

        openPetProfile(pet) {
            this.setSelectedPet(pet)
            this.$router.push('/pet/profile')
        },

        async submitChanges() {
            if (this.inputFile) {
                await this.uploadUserImage(this.inputFile)
                this.dataUser.image = this.inputFile.name
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
        }

    },

    beforeMount() {
        this.dataUser = Object.assign({}, this.user)
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
        background: black;

        &:not(.register) img {
            max-width: 100%;
            height: 100%;
            object-fit: cover;
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