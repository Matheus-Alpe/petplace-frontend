<template>
    <div id="app">
      
        <router-view/>

        <PetNav v-if="hasToken" />
    </div>
</template>

<script>
import { mapGetters} from 'vuex'

import PetNav from '@/components/Nav.vue'

export default {
    components: {
        PetNav
    },

    computed: {
        ...mapGetters('auth', ['hasToken'])
    },

    watch: {
        hasToken: function (has) {
            if(!has) return this.$router.push('/auth/login')
            this.$router.push('/profile')
        }
    },

     directives: {
        formatdate: {
            inserted(el) {
                if (!el || !el.innerText) return
                const [ date ] = String(el.innerText).split('T')
                el.innerText = date.split('-').reverse().join('/')
            }
        }
    },
}
</script>


<style lang="scss">
#app {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}
</style>
