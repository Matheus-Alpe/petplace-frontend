<template>
	<div class="register">
		<PetLink to="/auth/login">
			<img src="@/assets/icons/login.svg" alt="login">
		</PetLink>

		<form @submit.prevent="registerIn">

			<PetInputImage 
				class="center"
				@image-selected="setRegisterAttribute('inputFile', $event)" 
			/>

			<PetInput 
				label="Nome Completo"
				id="name"
				type="text"
				@change-attribute="setRegisterAttribute('name', $event)"
			/>

			<PetInput 
				label="CPF"
				id="cpf"
				type="text"
				@change-attribute="setRegisterAttribute('cpf', $event)"
				@remove-error="removeError"
				:error="errors.cpf"
			/>

			<PetInput 
				label="Email"
				id="email"
				type="email"
				@change-attribute="setRegisterAttribute('email', $event)"
				@remove-error="removeError"
				:error="errors.email"
			/>

			<PetInput 
				label="Senha"
				id="password"
				type="password"
				@change-attribute="setRegisterAttribute('password', $event)"
			/>

			<PetInput 
				label="Confirmar Senha"
				id="confirmation"
				type="password"
				@change-attribute="setRegisterAttribute('confirmation', $event)"
				:noMatch="!isValid"
			/>

			<PetButton 
				class="secondary"
				type="submit" 
				label="Cadastrar"
			/>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

import PetInputImage from '@/components/InputImage.vue'
import PetInput from '@/components/Input.vue'
import PetButton from '@/components/Button.vue'
import PetLink from '@/components/Link.vue'

export default {
	name: 'Register',

	components: {
		PetInputImage,
		PetInput,
		PetButton,
		PetLink
	},

	data: () => ({
		register: {
			name: '',
			cpf: '',
			email: '',
			image: 'http://localhost:5000/static/users/default-profile.svg',
			password: '',
			confirmation: '',
		},
		errors: {
			email: '',
			cpf: '',
			confirmation: false,
		},
		inputFile: null,
	}),

	computed: {
        isValid() {
            return (
                (this.register.password &&
                    this.register.password === this.register.confirmation) ||
                (this.register.confirmation === '' && this.register.password === '')
            );
        },

    },

    methods: {
        ...mapActions('user', ['createUser']),

		setRegisterAttribute(attribute, value) {
			if (attribute === 'inputFile') {
				this['inputFile'] = value
				return
			}

			this.register[attribute] = value
		},

        async registerIn() {
            if (!this.isValid) return;
            try {
                if (this.inputFile) {
                    this.register.image = this.inputFile.name;
                }
                const response = await this.createUser({
                    user: this.register,
                    saveImage: this.inputFile,
                });
                if (response) {
                    this.errors = response;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        },

        removeError(typeError) {
			if (typeError === 'confirmation') {
				this.errors[typeError] = true;
			}
            this.errors[typeError] = '';
        },
    },
};
</script>

<style lang="scss">
.register {
	display: flex;
	align-items: center;

	.petplace-link {
		display: block;
		position: absolute;
		padding: 10px 10px 10px 0;
		background: #8c8c8c;
		left: 0;
		top: 0;
		border-radius: 0 0 90% 0;
		
		img {
			max-width: 100%;
		}
	}
}
</style>