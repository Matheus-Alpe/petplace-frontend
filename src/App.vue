<template>
    <div id="app">
      
        <router-view/>
    </div>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters('auth', ['hasToken'])
    },

    watch: {
        hasToken(has) {
            if(!has) return this.$router.push('/auth/login')
            this.$router.push('/profile')
        }
    }
}
</script>


<style lang="scss" scoped>
#app {
  max-width: 400px;
  margin: 0 auto;
}
</style>
