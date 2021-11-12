<template>
    <div 
        v-if="info && info.id"
        class="term-profile"
    >
        <h2>{{ !isInstitution ? "Instituição": "Tutor" }}</h2>
        <p>Nome: {{ info.name }}</p>
        <p>Email: {{ info.email }}</p>
        <p>Celular: {{ info.cellphone }}</p>
        <p v-if="info.telephone">Telefone: {{ info.telephone }}</p>
        <div class="button-container">
            <button @click="showCEP = !showCEP">
                <span class="material-icons-round">map</span> Ver localização
            </button>

            <div class="content" v-if="showCEP">
                <div v-if="location && location.localidade">
                    <h3>Local:</h3>
                    <p v-if="location.cep">CEP: {{ location.cep }}</p>
                    <p v-if="location.uf">UF: {{ location.uf }}</p>
                    <p v-if="location.localidade">Cidade: {{ location.localidade }}</p>
                    <p v-if="location.bairro">Bairro: {{ location.bairro }}</p>
                    <p v-if="location.logradouro">Bairro: {{ location.logradouro }}</p>
                    
                </div>
                <div v-else>
                    <h3>Local:</h3>
                    <p>CEP: {{ info.cep }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'TermProfile',

    props: {
        info: Object
    },

    components: {
    },
    data() {
        return {
            showCEP: false,
            location: undefined
        }
    },
    computed: {
        ...mapGetters('user', ['isInstitution'])
    },

    methods: {
    },

    async beforeMount() {
        if (this.info && !this.info.cep) return;
        try {
            const { data } = await axios(`https://viacep.com.br/ws/${this.info.cep}/json/`)
            if (data && data.erro) return;
            this.location = data;
        } catch (error) {
            console.log(error)
        }
        
    }
};
</script>

<style lang="scss" scoped>
.term-profile {
    background: rgba(255, 255, 255, 0.5);
    gap: 10px;
    padding: 10px;
    border-radius: 10px 10px 0 0;

    h1, h2, h3 {
        margin-bottom: 5px;
        font-size: 19px;
    }

    hr {
        margin: 5px 0 10px ;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: rgba(255, 255, 255, 0.5);
        margin-top: 5px;

        button {
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.1);

            padding: 0 5px;
            border-radius: 5px;
        }

        .content {
            padding: 10px;
        }
    }
}
</style>