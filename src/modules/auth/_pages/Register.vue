<template>
	<div class="register">
		<PetLink to="/auth/login">
			<img src="@/assets/icons/login.svg" alt="login">
		</PetLink>

		<h2>Cadastra-se</h2>

		<form @submit.prevent="registerIn">
			<div class="pet-radio-group">
				<div class="label">Tipo de Usuário:</div>

				<div class="pet-radio">
					<span 
						class="pet-check tutor"
						:class="{ selected: userType === 'tutor' }"	
					>
						<input
							type="radio"
							class="pet-check-input"
							value="tutor"
							id="tutor"
							v-model="userType"
							required
						/>
						<label 
							class="pet-check-label" 
							for="tutor"
						>
							<span class="material-icons-round">account_circle</span>
							Tutor
						</label>
					</span>

					<span 
						class="pet-check institution"
						:class="{ selected: userType === 'institution' }"	
					>
						<input
							type="radio"
							class="pet-check-input"
							value="institution"
							id="institution"
							v-model="userType"
						/>
						<label 
							class="pet-check-label" 
							for="institution"
						>
							Instituição
							<span class="material-icons-round">business_center</span>
						</label>
					</span>
				</div>
			</div>

			<div 
				class="form-wrapper"
				:class="{ 
					tutor: userType === 'tutor',
					institution: userType === 'institution' 
				}"		
			>
					
				<PetInputImage 
					class="center"
					:img-url="register.avatar_url"
					@image-selected="setRegisterAttribute('inputFile', $event)" 
				/>

				<PetInput 
					label="Nome Completo"
					id="name"
					type="text"
					@change-attribute="setRegisterAttribute('name', $event)"
				/>

				<template>
					<PetInput 
						v-if="isInstitution"
						label="CNPJ"
						id="cnpj"
						type="text"
						@change-attribute="setRegisterAttribute('cnpj', $event)"
						@remove-error="removeError"
						:error="errors.cnpj"
					/>
					<PetInput 
						v-else
						label="CPF"
						id="cpf"
						type="text"
						@change-attribute="setRegisterAttribute('cpf', $event)"
						@remove-error="removeError"
						:error="errors.cpf"
					/>
				</template>

				<PetInput 
					label="CEP"
					id="cep"
					type="text"
					@change-attribute="setRegisterAttribute('cep', $event)"
				/>

				<PetInput 
					label="Celular"
					id="cellphone"
					type="text"
					@change-attribute="setRegisterAttribute('cellphone', $event)"
				/>

				<PetInput 
					label="Telefone (opcional)"
					id="telephone"
					type="text"
					:is-required="false"
					@change-attribute="setRegisterAttribute('telephone', $event)"
				/>

				<template>
					<PetInput 
						v-if="isInstitution"
						label="Data de Fundação"
						id="foundation"
						type="date"
						@change-attribute="setRegisterAttribute('foundation', $event)"
					/>
					<PetInput 
						v-else
						label="Data de Nascimento"
						id="birthday"
						type="date"
						@change-attribute="setRegisterAttribute('birthday', $event)"
					/>
				</template>

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
			</div>
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

	data() {
		return {
			userType: 'tutor',
			register: {
				name: '',
				cpf: '',
				cnpj: '',
				cep: '',
				email: '',
				telephone: '',
				cellphone: '',
				birthday: '',
				foundation: '',
				avatar_url: '',
				password: '',
				confirmation: '',
			},
			errors: {
				email: '',
				cpf: '',
				cnpj: '',
				confirmation: false,
			},
			inputFile: null,
		}
	},

	computed: {
		isInstitution () {
			return this.userType === 'institution'
		},
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
                    this.register.avatar_url = this.inputFile.name;
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
                return error;
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
	flex-direction: column;
	margin-bottom: 10px;

	.petplace-link {
		display: block;
		align-self: flex-start;
		padding: 10px 20px 10px 0;
		background: #8c8c8c;
		left: 0;
		top: 0;
		border-radius: 0 0 90% 0;
		
		img {
			max-width: 100%;
		}
	}

	.pet-radio-group {
		
		.label {
			text-align: left;
			margin: 15px 0 10px;
		}

		.pet-radio {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.pet-check {
				width: 45%;
				display: flex;
				border-radius: 5px 5px 0 0;
				padding: 2px 0;
				justify-content: center;

				&.selected {
					
					&.tutor {
						background: #FFC145;
					}

					&.institution {
						background: #A2BCE0;
					}
				}

				.pet-check-input {
					display: none;
				}

				.pet-check-label {
					display: flex;
					align-items: center;
					gap: 5px;
				}
			}
		}
	}

	.form-wrapper {
		padding: 10px;
		
		&.tutor {
			border-radius: 0 10px 10px 10px;
			box-shadow: inset #FFC145 0px 0px 0px 3px;
		}

		&.institution {
			border-radius: 10px 0 10px 10px;
			box-shadow: inset #A2BCE0 0px 0px 0px 3px;
		}

		.petplace-button {
			margin: 0;
		}
	}
}
</style>