module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/vue3-recommended',
        //'plugin:vue/vue3-essential', // This option doesn't impose formatting rules
        'plugin:vue/vue3-strongly-recommended', // This option imposes formatting rules on your code to improve readability
    ],
    "rules": {
        "vue/script-indent": ["warn", 4],
        "vue/html-indent": ["warn", 4],
        'vue/multi-word-component-names': 0,
        'vue/no-mutating-props': 0,
        'vue/prop-name-casing': 0,
        'vue/no-v-html': 0,
        'vue/valid-define-props': 0,
        'vue/no-parsing-error': 0,
        'vue/no-v-text-v-html-on-component': 0,
        'vue/comment-directive': 0
    },
}
