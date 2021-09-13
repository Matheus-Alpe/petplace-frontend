<template>
    <div class="login">
        <PetLogo class="center"/>

        <form @submit.prevent="userLogin">
            
			<PetInput 
				label="Email"
				id="email"
				type="email"
				@change-attribute="setRegisterAttribute('email', $event)"
				@remove-error="removeError"
                :isLoginPage="true"
			/>
            
			<PetInput 
				label="Senha"
				id="password"
				type="password"
				@change-attribute="setRegisterAttribute('password', $event)"
                @remove-error="removeError"
                :isLoginPage="true"
			/>
            <sub :class="{ opacity: !erros.login }" class="text-error">
                * {{ erros.login }}
            </sub>
            <div class="button-container">
                <button type="submit" class="button-main">Login</button>
                <router-link to="/auth/register" class="button-secondary">Cadastrar-se</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import PetLogo from '@/components/Logo.vue'
import PetInput from '@/components/Input.vue'

export default {
    name: 'Login',
    
    components: {
        PetLogo,
        PetInput
    },

    data: () => ({
        form: {
            email: '',
            password: '',
        },
        erros: {
            login: '',
        },
        inputFile: null,
    }),

    methods: {
        ...mapActions('auth', ['logIn']),

        async userLogin() {
            try {
                await this.logIn(this.form);
            } catch ({ response }) {
                this.erros.login = response.data.message || 'Erro no servidor. ):';
            }
        },

        setRegisterAttribute(attribute, value) {
			this.form[attribute] = value
		},

        removeError(typeError) {
            this.erros[typeError] = '';
        },
    }
}
</script>
