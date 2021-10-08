<template>
    <div class="container-register">

        <div class="title-register">
            <h1>Cadastro de Pet</h1>
        </div>
        
        <form 
            class="register"
            @submit.prevent="registerIn"    
        >

            <div 
                class="step-form _1"
            >
                
                <div class="form-group">
                    <PetInputImage 
                        image-type="pet"
                        class="center"
                        @image-selected="setRegisterAttribute('inputFile', $event)"
                    />

                    <PetInput 
                        label="Nome"
                        id="name"
                        type="text"
                        :initial-value="register.name"
                        @change-attribute="setRegisterAttribute('name', $event)"
                    />

                    <PetInput 
                        label="Idade (opcional)"
                        id="age"
                        type="number"
                        :is-required="false"
                        :initial-value="register.age"
                        @change-attribute="setRegisterAttribute('age', $event)"
                    />

                    <PetInput 
                        label="Data de Nascimento (opcional)"
                        id="birthday"
                        type="date"
                        :is-required="false"
                        :initial-value="register.birthday"
                        @change-attribute="setRegisterAttribute('birthday', $event)"
                    />

                    
                    <div class="pet-radio-group">
                        <label>Sexo:</label>

                        <span class="pet-check">
                            <input
                                type="radio"
                                class="pet-check-input"
                                value="M"
                                id="masculino"
                                v-model="register.sex"
                                required
                            />
                            <label 
                                class="pet-check-label" 
                                for="masculino"
                            >
                                Masculino
                            </label>
                        </span>

                        <span class="pet-check">
                            <input
                                type="radio"
                                class="pet-check-input"
                                value="F"
                                id="feminino"
                                v-model="register.sex"
                            />
                            <label 
                                class="pet-check-label" 
                                for="feminino"
                            >
                                Feminino
                            </label>
                        </span>
                    </div>

                    <div class="pet-select-group">
                        <label>Tipo:</label>
                        <select
                            class="pet-control"
                            v-model="register.type"
                        >
                            <option 
                                v-for="(type, index) in types"
                                :key="index"
                                :value="type.value"
                            >
                                {{ type.value }}
                            </option>
                        </select>
                    </div>

                    <div class="pet-select-group">
                        <label>Raça:</label>
                        <select
                            class="pet-control"
                            v-model="register.breed"
                        >
                            <option 
                                v-for="(breed, index) in breedList"
                                :key="index"
                                :value="breed"
                            >
                                {{ breed }}
                            </option>
                        </select>
                    </div>

                    <div class="pet-select-group">
                        <label>Porte:</label>
                        <select
                            class="pet-control"
                            v-model="register.size"
                        >
                            <option 
                                v-for="(size, index) in sizes"
                                :key="index"
                                :value="size"
                            >
                                {{ size }}
                            </option>
                        </select>
                    </div>

                    <PetButton
                        class="secondary"
                        type="submit" 
                        label="Cadastrar"
                    />
                    
                </div>

               
            </div>


        </form>

        <PetLink
            @click="resetRegister"
            to="/profile"
        >
            Cancelar
        </PetLink>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import PetInputImage from '@/components/InputImage.vue'
import PetInput from '@/components/Input.vue'
import PetButton from '@/components/Button.vue'
import PetLink from '@/components/Link.vue'

export default {
    name: 'PetRegister',
    components: {
        PetInputImage,
        PetInput,
        PetButton,
        PetLink
    },
    
	data() {
        return {
            register: {
                name: '',
                age: '',
                sex: 'M',
                type: 'cachorro',
                breed: 'SRD (Sem Raça Definida)',
                size: 'Médio',
                avatar_url: 'http://localhost:5000/static/pets/default-profile-pet.svg',
                birthday: '',
                user_id: '',
                adoptable: false,
                adopted: false,
            },
            inputFile: null,
            sizes: [
                'Pequeno',
                'Médio',
                'Grande'
            ],
            types: [
                {
                    value: 'cachorro',
                    breed: [
                        "Affenpinscher",
                        "Airedale Terrier",
                        "Akita Americano",
                        "Akita Japonês",
                        "Alano Espanhol",
                        "American Staffordshire Terrier",
                        "American Water Spaniel",
                        "Barbet",
                        "Basenji",
                        "Basset Azul da Gasconha",
                        "Basset Fulvo da Bretanha",
                        "Basset Hound",
                        "Beagle",
                        "Beagle Harrier",
                        "Bearded Collie",
                        "Bedlington Terrier",
                        "Bernese Mountain Dog",
                        "Bichon Bolonhês",
                        "Bichon Havanês",
                        "Bichon Frisé",
                        "Bichon Maltês",
                        "Bloodhound",
                        "Boiadeiro Australiano",
                        "Boiadeiro Bernês",
                        "Border Collie",
                        "Border Terrier",
                        "Borzoi",
                        "Boston Terrier",
                        "Boxer",
                        "Bull Terrier",
                        "Bulldog Inglês",
                        "Bulldog Francês",
                        "Bullmastiff",
                        "Cairn Terrier",
                        "Cane Corso",
                        "Cão de Água Português",
                        "Cão de Crista Chinês",
                        "Cão de Montanha dos Pirinéus",
                        "Cão lobo checoslovaco",
                        "Cão da Groenlândia",
                        "Poodle",
                        "Cavalier King Charles Spaniel",
                        "Chesapeake Bay Retriever",
                        "Chihuahua",
                        "Chow Chow",
                        "Cirneco do Etna",
                        "Cocker Spaniel Americano",
                        "Cocker Spaniel Inglês",
                        "Collie",
                        "Coton de Tuléar",
                        "Dachshund",
                        "Dafghan Hound",
                        "Dálmata",
                        "Dandie Dinmont Terrier",
                        "Doberman",
                        "Dogue Alemão",
                        "Dogo Argentino",
                        "Dogue Canário",
                        "Dogue de Bordeaux",
                        "Elkhound Norueguês",
                        "Fila Brasileiro",
                        "Fox Terrier (Pêlo Duro e Pêlo Liso)",
                        "Foxhound Inglês",
                        "Galgo Escocês",
                        "Galgo Irlandês",
                        "Golden Retriever",
                        "Gos d’Atura",
                        "Grande Boiadeiro Suiço",
                        "Greyhound",
                        "Grifo da Bélgica",
                        "Husky Siberiano",
                        "Jack Russel Terrier",
                        "King Charles",
                        "Komondor",
                        "Kuvasz",
                        "Labradoodle",
                        "Labrador Retriever",
                        "Laika",
                        "Lakeland Terrier",
                        "Leonberger",
                        "Lhasa Apso",
                        "Malamute-do-Alasca",
                        "Maltês",
                        "Mastife",
                        "Mastin dos Pirenéus",
                        "Mastin do Tibete",
                        "Mastin Espanhol",
                        "Mastín Napolitano",
                        "Norfolk Terrier",
                        "Norwich Terrier",
                        "Old English Sheepdog (Bobtail)",
                        "Papillon",
                        "Pastor Alemão",
                        "Pastor Australiano",
                        "Pastor Belga",
                        "Pastor de Brie",
                        "Pastor dos Pirenéus de Cara Rosa",
                        "Pequeno Cão Leão",
                        "Pequinês",
                        "Perdigueiro",
                        "Pinscher miniatura",
                        "Pitbull",
                        "Podengo",
                        "Poodle",
                        "Pointer",
                        "Pug",
                        "Rhodesian Ridgeback",
                        "Rottweiler",
                        "Rough Collie",
                        "Sabueso Espanhol",
                        "Sabueso Italiano",
                        "Saluki",
                        "Samoieda",
                        "São Bernardo",
                        "SRD (Sem Raça Definida)",
                        "Scottish Terrier",
                        "Setter Irlandés",
                        "Shar-Pei",
                        "Shiba Inu",
                        "Shih Tzu",
                        "SilKy Terrier",
                        "Skye Terrier",
                        "Smooth Collie",
                        "Spitz",
                        "Staffordshire Bull Terrier",
                        "Tamaskan",
                        "Teckel",
                        "Terra Nova",
                        "Terrier Australiano",
                        "Terrier Escocês",
                        "Terrier Irlandês",
                        "Terrier Japonês",
                        "Terrier Negro Russo",
                        "Terrier Norfolk",
                        "Terrier Norwich",
                        "Terrier Tibetano",
                        "Tosa",
                        "Weimaraner",
                        "Welsh Corgi (Cardigan)",
                        "Welsh Corgi (Pembroke)",
                        "West Highland White Terrier",
                        "Whippet",
                        "Xoloitzcuintli",
                        "Yorkshire Terrier",
                    ]
                },
                {
                    value: 'gato',
                    breed: [
                        "Abissínio",
                        "Angorá",
                        "Ashera",
                        "Balinês",
                        "Bengal",
                        "Bobtail americano",
                        "Bobtail japonês",
                        "Bombay",
                        "Burmês",
                        "Burmês vermelho",
                        "Chartreux",
                        "Colorpoint de Pêlo Curto",
                        "Cornish Rex.",
                        "Curl Americano",
                        "Devon Rex",
                        "Himalaio",
                        "Jaguatirica",
                        "Javanês",
                        "Korat",
                        "LaPerm",
                        "Maine Coon",
                        "Manx",
                        "Cymric",
                        "Mau Egípcio",
                        "Mist Australiano",
                        "Munchkin",
                        "Norueguês da Floresta",
                        "Pelo curto americano",
                        "Pelo curto brasileiro",
                        "Pelo curto europeu",
                        "Pelo curto inglês",
                        "Persa",
                        "Pixie-bob",
                        "Ragdoll",
                        "Ocicat",
                        "Russo Azul",
                        "Sagrado da Birmânia",
                        "Savannah",
                        "Scottish Fold",
                        "Selkirk Rex",
                        "SRD (Sem Raça Definida)",
                        "Siamês",
                        "Siberiano",
                        "Singapura",
                        "Somali",
                        "Sphynx",
                        "Thai",
                        "Tonquinês",
                        "Toyger",
                        "Usuri",
                    ]
                },
            ],
        }
    },

    computed: {
        breedList() {
            const type = this.types.find(type => type.value === this.register.type)
            return type.breed
        },
    },

    watch: {
        'register.type': function () {
            this.register.breed = 'SRD (Sem Raça Definida)'
        }
    },

    methods: {
        ...mapGetters('user', ['getUserId']),
        ...mapActions('pet', ['createPet']),

		setRegisterAttribute(attribute, value) {
			if (attribute === 'inputFile') {
				this['inputFile'] = value
                this.register.avatar_url = value.name
				return
			}

			this.register[attribute] = value
		},

        async registerIn() {
            try {
                await this.createPet({
                    pet: this.register,
                    saveImage: this.inputFile,
                });
                this.$router.push('/profile');
            } catch (error) {
                console.log(error)
            }
        },

        resetRegister() {
            this.register = {
                name: '',
                age: '',
                sex: 'M',
                type: 'cachorro',
                breed: 'SRD (Sem Raça Definida)',
                size: 'Médio',
                avatar_url: 'http://localhost:5000/static/pets/default-profile-pet.svg',
                birthday: '',
                user_id: '',
                adoptable: false,
                adopted: false,
            }

            this.inputFile = null
        }
    },

    created() {
        this.register.user_id = this.getUserId()
    }
}
</script>

<style lang="scss" scoped>
select {
    text-transform: capitalize;
    width: 50%;
}

.petplace-link {
    text-align: left;
    margin: 10px;
}

.container-register {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.actions {
    display: flex;
    justify-content: space-between;

    .action {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        background: yellow;

        &.next {
            &::before {
                content: ">>";
            }
        }

        &.prev {
            &::before {
                content: "<";
            }
        }

        &.disabled {
            opacity: .3;
        }
    }
}

.step-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &._1 {
        .actions {
            justify-content: flex-end;
        }
    }
}

.petplace-input,
.pet-radio-group,
.pet-select-group {
    margin: 20px 0;
    
    display: flex;
    gap: 10px;
}

.pet-select-group {
    label {
        text-align: left;
        display: inline-block;
        width: 50px;
    }
}
</style>