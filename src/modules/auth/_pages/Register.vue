<template>
	<div class="register">
		<div class="owner-avatar logo logo-secondary" :style="imageUrl">
			<div class="img-selector">
				<label for="image">
					<i class="material-icons md-24">add_a_photo</i>
				</label>
				<input
					@change="previewFiles"
					type="file"
					name="image"
					id="image"
					accept="image/*"
				/>
			</div>
		</div>
		<form @submit.prevent="registerIn">
			<label for="name" class="custom-input"
				><span class="placeholder">Nome Completo</span>
				<input
					type="name"
					name="name"
					id="name"
					v-model="register.name"
					required
				/>
			</label>
			<label for="cpf" class="custom-input">
				<span class="placeholder">
					CPF
					<span v-if="erros.cpf"> - {{ erros.cpf }} </span>
				</span>
				<input
					:class="{ error: !!erros.cpf }"
					@input="removeError('cpf')"
					type="text"
					cpf="cpf"
					id="cpf"
					v-model="register.cpf"
					required
				/>
			</label>
			<label for="email" class="custom-input">
				<span class="placeholder">
					Email
					<span v-if="erros.email"> - {{ erros.email }} </span>
				</span>
				<input
					:class="{ error: !!erros.email }"
					@input="removeError('email')"
					type="email"
					name="email"
					id="email"
					v-model="register.email"
					required
				/>
			</label>
			<label for="password" class="custom-input"
				><span class="placeholder">Senha</span>
				<input
					type="password"
					name="password"
					id="password-register"
					v-model="register.password"
					autocomplete="on"
					required
				/>
			</label>
			<label for="confirmation" class="custom-input"
				><span class="placeholder">Confirmar Senha</span>
				<input
					:class="{ error: !isValid }"
					type="password"
					name="confirmation"
					id="confirmation-register"
					v-model="register.confirmation"
					autocomplete="on"
					required
				/>
			</label>
			<div class="button-container" id="cadastrar">
				<button type="submit" class="button-main">Cadastrar</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	data: () => ({
		register: {
			name: '',
			cpf: '',
			email: '',
			image: 'http://localhost:5000/static/users/default-profile.svg',
			password: '',
			confirmation: '',
		},
		erros: {
			email: '',
			cpf: '',
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

        imageUrl() {
            const image =
                (this.inputFile && URL.createObjectURL(this.inputFile)) ||
                require('@/assets/icons/default-profile.svg');
            return {
                backgroundImage: `url(${image})`,
            };
        },
    },

    methods: {
        ...mapActions('user', ['createUser']),

        previewFiles(event) {
            const file = event.target.files[0];
            const providerImage = 'http://localhost:5000/static/users/';
            Object.defineProperty(file, 'name', {
                writable: true,
                value: `${providerImage}d${new Date()
                    .toISOString()
                    .replace(/[^\w\s]/gi, '')}.${file.type.split('/')[1]}`,
            });
            this.inputFile = file;
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
                    this.erros = response;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        },

        removeError(typeError) {
            this.erros[typeError] = '';
        },
    },
};
</script>

<style>
</style>