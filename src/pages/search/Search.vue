<template>
    <div>
        <h1>Pesquisa</h1>

        <form @submit.prevent="search">
            <input type="search" id="search" placeholder="pesquise">
        </form>

        <div class="search-content">

            <button
                v-for="(pet, i) in pets"
                :key="i"
                type="button"
                class="pet-card"
            >
                <div class="thumbnail">
                    <img 
                    :src="pet.avatar_url" 
                    :alt="`pet ${pet.name}`">
                </div>

                <div class="content">
                    <h2>{{ pet.name }}</h2>
                    <p>{{ pet.breed }}</p>
                </div>
            </button>


        </div>
    </div>
</template>

<script>
import searchService from '../../services/search-service'

export default {
    name: 'Search',

    data() {
        return {
            pets: []
        }
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
.search-content {
    padding: 10px;
    display: grid;
    gap: 10px;

    .pet-card {
        all: unset;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        
        .thumbnail {
            width: 100%;
            max-width: 50%;
            height: 150px;
            display: grid;
            place-items: center;
            
            img {
                max-width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .content {
            widows: 50%;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
}
</style>