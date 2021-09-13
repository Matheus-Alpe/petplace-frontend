<template>
    <div class="login">

        <form @submit.prevent="userLogin">
            <PetLogo class="center"/>
            
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
                <PetButton 
                    class="main"
                    type="submit"
                    label="Login"
                />
                    
                <PetLink
                    to="/auth/register" 
                    label="Cadastrar-se"
                />
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import PetLogo from '@/components/Logo.vue'
import PetInput from '@/components/Input.vue'
import PetButton from '@/components/Button.vue'
import PetLink from '@/components/Link.vue'

export default {
    name: 'Login',
    
    components: {
        PetLogo,
        PetInput,
        PetButton,
        PetLink
    },

    data: () => ({
        form: {
            email: '',
            password: '',
        },
        erros: {
            login: '',
        },
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

<style lang="scss">
.text-error {
    color: red !important;
}
</style>
