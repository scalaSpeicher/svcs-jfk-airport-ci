<script>
import Toggle from '@vueform/toggle'

export default {
    components: {
        Toggle,
    },
}
</script>

<template>
    <Toggle
        on-label="On"
        off-label="Off"
        labelledby="toggle-label"
        describedby="toggle-description"
        false-value="Closed"
        true-value="Open"
        :classes="{
            container: 'focus:ring focus:ring-white-500 focus:ring-opacity-30',
        }"
    />
</template>

<style src="@vueform/toggle/themes/default.css"></style>