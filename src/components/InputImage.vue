<template>
    <div class="petplace-avatar" :style="imageUrl">
        <div class="petplace-image-selector" v-if="showInput">
            <label for="image">
                <span class="material-icons md-24">add_a_photo</span>
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

    props: {
        showInput: {
            type: Boolean,
            default: true
        },

        imgUrl: String,

        imageType: {
            type: String,
            default: 'user'
        }
    },

    data() {
        return {
            imgInput: null
        }
    },

    computed: {
        imageUrl() {
            const image = (this.imgInput && URL.createObjectURL(this.imgInput)) 
                || this.imgUrl 
                || require(`@/assets/icons/${this.selectDefaultImage()}.svg`);

            return {
                backgroundImage: `url(${image})`,
            };
        },
    },

    methods: {
        selectDefaultImage() {
            return this.imageType === 'user' ? 'default-profile' : 'default-profile-pet'
        },

        previewFiles(event) {
            const [ file ] = event.target.files
            const providerImage = `http://localhost:5000/static/${this.imageType === 'user' ? 'users': 'pets'}/`
            
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
        inset: 0;
        border-radius: 50%;
        color: black;

        label {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            
            span {
                position: absolute;
                left: -3px;
                bottom: 0;
            }
        }


        input[type="file"] {
            display: none;
        }
    }

}
</style>