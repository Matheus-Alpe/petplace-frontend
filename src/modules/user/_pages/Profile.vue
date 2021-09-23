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
                    <label for="name" class="custom-input"
                        ><span class="placeholder">Nome</span>
                        <input
                            type="name"
                            name="name"
                            id="name"
                            required
                            v-model="dataUser.name"
                        />
                    </label>
                    <label for="email" class="custom-input"
                        ><span class="placeholder">Email</span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            v-model="dataUser.email"
                        />
                    </label>
                    <label for="password" class="custom-input"
                        ><span class="placeholder">Senha</span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="on"
                            required
                            v-model="dataUser.password"
                        />
                    </label>
                   
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
               

              
                <div class="owner__pet-card register">
                    <a href="./pet-register.html" class="add-pet">
                        <img src="@/assets/icons/plus.svg" alt="adicionar pet">
                        
                    </a>
                </div>
            </div>
        </div>

        <!-- The overlay -->
        <Overlay :user="dataUser" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Overlay from "@/components/Overlay.vue";
import PetInputImage from '@/components/InputImage.vue'

export default {
    name: "Profile",
    components: {
        Overlay,
        PetInputImage
    },
    data: () => ({
        dataUser: null,
        displayForm: false,
        inputFile: null
    }),
    computed: {
        ...mapState('user', ['user']),

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
        ]),
        ...mapActions([
            'uploadImage'
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

        async submitChanges() {
            if (this.inputFile) {
                await this.uploadImage(this.inputFile)
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
            document.getElementById("excludeOverlay").style.display = 'block'
        },

        showForm(type) {
            this.displayForm = !this.displayForm
            this.closeDropdown()
            if(type === 'close') {
                this.inputFile = null
            }
        }

    },
    mounted() {
        this.dataUser = {
            ...this.user
        };
    }
};
</script>

<style lang="scss" scoped>
.owner__profile {
    min-height: 100vh;
}

.owner__info-container {
    overflow: hidden;
    background-color: rgb(99, 99, 212);
    border-radius: 0 0 20px 20px;
    box-shadow: 0px 3px 15px -4px #00000098;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.owner__info-container h2 {
    margin-top: 1em;
}

.owner-avatar {
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    width: 125px;
    height: 125px;
    border-radius: 50%;
}

.img-selector {
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
}

.owner__pets-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.owner__pet-card {
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    box-shadow: 0 4px 8px 0 rgba(160, 121, 121, 0.2);
    transition: 0.3s;
    opacity: 0.5;
    border-radius: 10px;
    overflow: hidden;
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

input[type="file"] {
    display: none;
}

form input {
    outline: none;
    font-size: 1rem;
    background-color:  transparent;
    width: 100%;
    border: none;
    padding: 0 20px;
    line-height: 3;
    border: 2px solid rgba(0, 0, 0, 0.548);
    border-radius: 5px;
}

form input:focus,
.button-container button:focus {
    border-color: aqua;
}

.custom-input {
    display: block;
    color: black;
    margin: 15px 0;
}

.placeholder {
    position: absolute;
    line-height: 1.4;
    top: -15%;
    padding: 0 5px;
    margin-left: 5px;
    z-index: 1;
    background-color: rgb(99, 99, 212);
    font-size: 0.8rem;
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