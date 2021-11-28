<template>
    <div>
        <form class="search-form">
            <h2>
                <span class="material-icons-round md-24">search</span>
                Pesquisar Pet
                <span class="material-icons-round md-24">pets</span>
            </h2>
            <div class="search-input">
                <input type="search" id="search" placeholder="Pesquise por: tipo, nome, raça..." v-model="term">
                
            </div>

        </form>

        <div class="search-content">

            <button
                v-for="pet in filteredPets"
                :key="pet.id"
                type="button"
                class="pet-card"
                :class="[
                    pet.sex && pet.sex.toLowerCase(),
                    pet.type && pet.type.toLowerCase()
                ]"
                @click="openPetProfile(pet)"
            >
                <div class="thumbnail">
                    <img 
                    :src="pet.avatar_url" 
                    :alt="`pet ${pet.name}`">
                </div>

                <div class="content">
                    <h2>{{ pet.name }}</h2>
                    <sub>{{ pet.breed }}</sub>
                    <sub>Porte: {{ pet.size }}</sub>
                </div>
            </button>


        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import searchService from '@/services/search-service'

export default {
    name: 'Search',

    data() {
        return {
            pets: [],
            term: ''
        }
    },

    computed: {
        filteredPets() {
            const shuffled = [...this.pets].sort(() => Math.random() - 0.5)
            return this.term 
                ? this.pets.filter(pet => {
                    if (Object.values(pet).find(value => {
                        if (typeof value === 'string' && value.toLowerCase().includes(this.term.toLowerCase())) return value;
                    })) return pet
                }) 
                : shuffled;
        }
    },

    methods: {
        ...mapActions('pet', [
            'setSelectedPet'
        ]),

        openPetProfile(pet) {
            this.setSelectedPet(pet)
            this.$router.push('/pet/profile')
        },
    },

    async created() {
        try {
            const { data } = await searchService.getAllAvailablePets()
            this.pets = data.pets
        } catch (error) {
            return error
        }
    }
}
</script>

<style lang="scss" scoped>
.search-form {
    background: #5f5fa8;
    padding: 10px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 5;

    h2 {
        margin: 0 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .search-input {
        display: flex;
        align-items: center;

        input {
            all: unset;
            flex: 1;
            padding: 10px;
            color: black;
            box-shadow:inset 0px 1px 5px black; 
            background: white;
        }
    }
}

.search-content {
    padding: 10px;
    display: grid;
    gap: 10px;
    margin: 92px 0 34px;

    .pet-card {
        all: unset;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

        &.m {
            background-color: #C1CAD6;
        }

        &.f {
            background-color: #FFDAC6;
        }
        
        .thumbnail {
            width: 100%;
            max-width: 55%;
            height: 150px;
            display: grid;
            place-items: center;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
            
            img {
                max-width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .content {
            width: 100%;
            max-width: 45%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            
            > * {
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            h2 {
                word-break: break-all;
            }
        }

         &:nth-child(even) {

            .content {
                order: -1;
            }
        }
    }
}
</style>