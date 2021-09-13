<template>
    <div class="petplace-avatar" :style="imageUrl">
        <div class="petplace-image-selector">
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
</template>

<script>
export default {
    name: 'InputImage',

    data() {
        return {
            imgInput: null
        }
    },

    computed: {
        imageUrl() {
            const image =
                (this.imgInput && URL.createObjectURL(this.imgInput)) ||
                require('@/assets/icons/default-profile.svg');
            return {
                backgroundImage: `url(${image})`,
            };
        },
    },

    methods: {
        previewFiles(event) {
            const [ file ] = event.target.files
            const providerImage = 'http://localhost:5000/static/users/'
            
            Object.defineProperty(file, 'name', {
                writable: true,
                value: `${providerImage}d${new Date()
                    .toISOString()
                    .replace(/[^\w\s]/gi, '')}.${file.type.split('/')[1]}`,
            })
            
            this.imgInput = file;
            this.$emit('image-selected', file)
        },
    }
};
</script>

<style lang="scss">

.petplace {
    &-avatar {
        background-color: rgb(92, 92, 92);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        width: 125px;
        height: 125px;
        border-radius: 50%;

        
        &.center {
            margin: 0 auto;
        }
    }

    &-image-selector {
        position: absolute;
        bottom: 10px;
        right: 15px;
        color: white;

        input[type="file"] {
            display: none;
        }
    }

}
</style>