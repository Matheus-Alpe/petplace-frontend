<template>
    <label :for="id" class="petplace-input">
        <span class="placeholder">
            {{ label }}
            <span v-if="error"> - {{ error }} </span>
        </span>
        <input
            :class="{ error: !!error || noMatch }"
            @input="(error || isLoginPage) && $emit('remove-error', isLoginPage ? 'login' : id)"
            @keyup="id === 'confirmation' && $emit('change-attribute', value)"
            :type="type"
            :id="id"
            :value="initialValue"
            v-model="value"
            @blur="$emit('change-attribute', value)"
            :autocomplete="autocomplete"
            required
        />
    </label>
</template>

<script>
export default {
    name: 'Input',
    props: {
        label: String,

        id: String,

        type: String,

        error: String,

        noMatch: Boolean,

        isLoginPage: Boolean,

        initialValue: [String, Number],

        autocomplete: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            value: undefined
        }
    },

    created() {
        this.value = this.initialValue
    }
};
</script>

<style lang="scss">
.petplace-input {
    display: block;
    color: rgba(51, 51, 51, 0.63);
    margin: 15px 0;

    .placeholder {
        position: absolute;
        line-height: 1.4;
        top: -15%;
        padding: 0 5px;
        margin-left: 5px;
        z-index: 2;
        background-color: #fff;
        font-size: 0.8rem;
    }

    .error {
        border: 2px solid rgba(255, 0, 0, 0.548) !important;
    }
}
</style>