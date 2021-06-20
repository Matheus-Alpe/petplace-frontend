<template>
    <div class="home">
        <div class="owner__profile">
            <div class="owner__info-container">
                <div class="dropdown">
                    <svg
                        @click="openDropdown()"
                        class="config-button"
                        alt="config button"
                        width="18"
                        height="5"
                        viewBox="0 0 18 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.09434 2.5C5.09434 3.88071 3.95393 5 2.54717 5C1.14041 5 0 3.88071 0 2.5C0 1.11929 1.14041 0 2.54717 0C3.95393 0 5.09434 1.11929 5.09434 2.5Z"
                            fill="black"
                        />
                        <path
                            d="M11.5472 2.5C11.5472 3.88071 10.4068 5 9 5C7.59324 5 6.45283 3.88071 6.45283 2.5C6.45283 1.11929 7.59324 0 9 0C10.4068 0 11.5472 1.11929 11.5472 2.5Z"
                            fill="black"
                        />
                        <path
                            d="M18 2.5C18 3.88071 16.8596 5 15.4528 5C14.0461 5 12.9057 3.88071 12.9057 2.5C12.9057 1.11929 14.0461 0 15.4528 0C16.8596 0 18 1.11929 18 2.5Z"
                            fill="black"
                        />
                    </svg>

                    <div class="dropdown-content">
                        <p @click="openForm()">Editar Perfil</p>
                        <p @click="openOverlay()">Excluir Perfil</p>
                        <p @click="logOut()">Sair</p>
                    </div>
                </div>
                <div 
                    class="owner-avatar" 
                    :style="{ backgroundImage: 'url(' + user.image + ')' }"></div>
                <h2 class="main-owner-name">{{ user.name }}</h2>

                <form id="owner-form" @submit.prevent="submitChanges" v-if="dataUser">
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
                        <button class="button-main" @click="closeForm()">
                            Salvar
                        </button>

                        <a class="closebtn" @click="closeForm()">
                            <i class="material-icons md-48">close</i>
                        </a>
                        
                    </div>
                </form>
            </div>

            <div class="owner__pets-container">
               

              
                <div class="owner__pet-card register">
                    <a href="./pet-register.html" class="add-pet">
                        <svg
                            alt="adicionar pet"
                            width="33"
                            height="34"
                            viewBox="0 0 33 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.9285 3L16.5 31M30 17.2153H3"
                                stroke="black"
                                stroke-width="5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- The overlay -->
        <overlay :user="dataUser"></overlay>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Overlay from "@/components/Overlay.vue";

export default {
    name: "Home",
    components: {
        Overlay
    },
    data: () => ({
        dataUser: null
    }),
    computed: {
        ...mapState('auth', ['user'])
    },
    methods: {
        ...mapActions('auth', [
            'ActionUpdateUser',
            'ActionSignOut'
        ]),

        logOut() {
            this.ActionSignOut()
            this.$router.push({ name: 'login' })
        },


        submitChanges() {
            this.ActionUpdateUser({ user: this.dataUser })
        },

        openDropdown() {
            document.querySelector(".dropdown-content").style.display = "block";
        },

        closeDropdown() {
            document.querySelector(".dropdown-content").style.display = "none";
        },

        openOverlay() {
            this.closeDropdown();
            document.getElementById("excludeOverlay").style.display = "block";
        },

        openForm() {
            this.closeDropdown();
            document.getElementById("owner-form").style.height = "100%";
            document.querySelector(".main-owner-name").style.display = "none";
        },

        closeForm() {
            document.getElementById("owner-form").style.height = "0";
            document.querySelector(".main-owner-name").style.display = "block";
        },
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

.owner__pets-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 20px 16px 60px;
}

.owner__pet-card {
    padding: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
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

form input {
    outline: none;
    font-size: 1rem;
    background-color:  rgb(99, 99, 212);
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
    background-color: rgb(99, 99, 212);
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