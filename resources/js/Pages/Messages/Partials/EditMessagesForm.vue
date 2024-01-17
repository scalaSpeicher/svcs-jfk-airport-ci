<script setup>
import { ref, onMounted } from 'vue';
import { useForm, router, usePage } from '@inertiajs/vue3';
import FormSectionPreview from '@/Components/FormSectionPreview.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import PlayerMessageEditor from '@/Components/PlayerMessageEditor.vue';

const props = defineProps({
    playerMessage: {
        type: Object,
        default: () => ({}),
    },
    messageComponents: {
        type: Object,
        default: () => ({}),
    },
    template: {
        type: Object,
        default: () => ({}),
    },
    canEditMessages: {
        type: Boolean,
        default: () => false,
    },
    canAddMessages: {
        type: Boolean,
        default: () => false,
    },
    canRefreshMessages: {
        type: Boolean,
        default: () => false,
    },
    formMode: {
        type: String,
        default: () => (''),
    },
    flash: {
        type: Object,
        default: () => ({}),
    },
});

const setCookie = (name, value) => {
    let oldCookies = getCookie('scalaCookies');
    if (oldCookies != null) {
        oldCookies[name] = value;
    } else {
        oldCookies = {};
        oldCookies[name] = value;
    }
    document.cookie = 'scalaCookies=' + JSON.stringify(oldCookies) + '; path=/; max-age=${60 * 60 * 24 * 14};';
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {

        return JSON.parse(parts.pop().split(';').shift());
    } else {

        return null;
    }
}

const page = usePage();
const showFlashMessage = ref(false);
const refreshingPreview = ref(false);
const previewDefaultLoc = ref(true);
const previewWidth = ref(props.playerMessage.appWidth);
let editMessageForm = null;
editMessageForm = useForm('editMessage', props.playerMessage);
let messagePreviewId = null;
if (props.playerMessage) {
    messagePreviewId = props.playerMessage.id;
}
let iframeUpdate = false;
const iframeSource = props.template.full_url+'?message_id=' + props.playerMessage.id;
const previewContainerClass = ref('message-preview player-preview-md');
const playerMessageEditor = ref(null);
let playerPreviewLeft = null;
let templateDescription = null;
let playerPreviewFlex = null;
let playerPreviewHeight = null;
let messagePreviewSizeCookieName = 'messagePreviewSize-' + props.playerMessage.id;
let scalaCookies = getCookie('scalaCookies');
if (scalaCookies === null) {
    scalaCookies = {};
}

let messagePreviewSizeCookie = scalaCookies[messagePreviewSizeCookieName];
if (messagePreviewSizeCookie !== null) {
    if (messagePreviewSizeCookie) {
        previewContainerClass.value = messagePreviewSizeCookie;
    } else {
        previewContainerClass.value = 'message-preview player-preview-md';
    }
}

const showFlash = (error = false) => {
    showFlashMessage.value = true;
    // if (page.props.flash.message.includes('The name has already been taken.')) {
    //     editMessageForm.setError('name', 'Name already taken.');
    //     document.getElementById("name").classList.add("form-error-input");
    // } else {
    //     editMessageForm.clearErrors();
    //     document.getElementById("name").classList.remove("form-error-input");
    // }
    if (document.getElementById("alertnotification")) {
        document.getElementById("alertnotification").style="display:justify;"
    }
};

const hideFlash = () => {
    showFlashMessage.value = false;
    if (document.getElementById("alertnotification")) {
        document.getElementById("alertnotification").style="display:none;"
    }
};

const refreshPlayerMessage = () => {
    navBlock = false;
    showFlashMessage.value = false;
    refreshingPreview.value = true;
    editMessageForm.clearErrors();
    editMessageForm.put(route(
        'messages.refresh',
    ), {
        onError: () => {
            showFlash(true);
            editMessageForm.focus();
            navBlock = true;
            refreshingPreview.value = false;
        },
        onSuccess: () => {
            showFlash();
            iframeUpdate = !iframeUpdate;
            navBlock = true;
            let iframeLeft = document.getElementById('message-preview-container-left');
            if (iframeLeft) {
                iframeLeft.classList.remove('animate-pulse-slow');
                iframeLeft.classList.add('animate-pulse-slow');
            } else {
                let iframeBottom = document.getElementById('message-preview-container-bottom');
                if (iframeBottom) {
                    iframeBottom.classList.remove('animate-pulse-slow');
                    iframeBottom.classList.add('animate-pulse-slow');
                }
            }
        },
        onFinish: () => {
            refreshingPreview.value = false;
            editMessageForm.reset();
        },
    });
};

const cancelMessage = () => {
    navBlock = false;
    showFlashMessage.value = false;
    refreshingPreview.value = false;
    router.delete(route(
        'messages.cancel',
        messagePreviewId
    ), {
        onError: () => {
            showFlash(true);
            editMessageForm.focus();
            navBlock = true;
            refreshingPreview.value = false;
        },
        onSuccess: () => {
            window.removeEventListener('popstate', listenerManager, false);
        },
    });
};

const previewSizeChange = (classValue) => {
    previewContainerClass.value = classValue;
    playerPreviewLeft = document.getElementsByClassName('player-preview-left')[0];
    templateDescription = document.getElementsByClassName('template-description-section')[0];
    playerPreviewFlex = document.getElementsByClassName('player-preview-flex')[0];
    setCookie([messagePreviewSizeCookieName], classValue);
    switch (classValue) {
    case 'message-preview player-preview-full':
    case 'message-preview player-preview-lg':
        previewDefaultLoc.value = false;
        playerPreviewLeft.style.width = (previewWidth.value * 0.25) + 'px';
        templateDescription.style.width = (previewWidth.value * 0.25) + 'px';
        playerPreviewFlex.style.minWidth = (previewWidth.value * 0.25 + 330) + 'px';
        playerPreviewLeft.style.height = (playerPreviewHeight - (props.playerMessage.appHeight)) + 'px';
        break;
    case 'message-preview player-preview-md':
        previewDefaultLoc.value = true;
        playerPreviewLeft.style.width = (previewWidth.value * 0.5) + 'px';
        templateDescription.style.width = (previewWidth.value * 0.5) + 'px';
        playerPreviewFlex.style.minWidth = (previewWidth.value * 0.5 + 330) + 'px';
        playerPreviewLeft.style.height = (playerPreviewHeight - (props.playerMessage.appHeight * 0.5)) + 'px';
        break;
    case 'message-preview player-preview-sm':
        previewDefaultLoc.value = true;
        playerPreviewLeft.style.width = (previewWidth.value * 0.25) + 'px';
        templateDescription.style.width = (previewWidth.value * 0.25) + 'px';
        playerPreviewFlex.style.minWidth = (previewWidth.value * 0.25 + 330) + 'px';
        playerPreviewLeft.style.height = (playerPreviewHeight - (props.playerMessage.appHeight * 0.67)) + 'px';
        break;
    }
};

const postMessage = () => {
    navBlock = false;
    if (props.formMode == 'edit') {
        //editMessageForm.clearErrors();
        //todo - local validation

        editMessageForm.put(route(
            'messages.update',
        ), {
            onError: () => {
                editMessageForm.focus();
                navBlock = true;
            },
            onSuccess: () => {
                editMessageForm.reset();
                navBlock = false;
                window.removeEventListener('popstate', listenerManager);
            },
        });
    } else {
        //editMessageForm.clearErrors();
        //todo - local validation
        editMessageForm.put(route(
            'messages.update',
        ), {
            onError: () => {
                editMessageForm.focus();
                navBlock = true;
            },
            onSuccess: () => {
                editMessageForm.reset();
                navBlock = false;
                window.removeEventListener('popstate', listenerManager);
            },
        });
    }
};

let navBlockPage = (router.page.url.indexOf('/messages/edit/') > -1 || router.page.url.indexOf('/messages/create') > -1);
let navBlock = true;

const listenerManager = (event) => {
    if (navBlockPage && navBlock) {
        if (confirm('Are you sure you want to navigate away? You will lose any changes that are not finalized!')) {
            cancelMessage();
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

};

onMounted(() => {
    playerPreviewLeft = document.getElementsByClassName('player-preview-left')[0];
    playerPreviewHeight = playerPreviewLeft.clientHeight;
    previewSizeChange(previewContainerClass.value);
    router.on('before', (event) => {
        if (event.type !== 'popstate') {
            listenerManager(event);
        }
    });
    window.addEventListener('popstate', listenerManager);
});

</script>
<template>
    <FormSectionPreview
        :preview-height="props.playerMessage.appHeight"
        :preview-width="props.playerMessage.appWidth"
        :default-preview="false"
        :default-preview-slot="previewDefaultLoc"
        @submitted="postMessage"
    >
        <!-- <FormSection> -->
        <template #description>
            <div class="template-description-section">
                <span class="text-lg font-medium text-gray-900">Template Information:</span>
                <div class="mt-1 ml-6">
                    <span><b>Name:</b>&nbsp;&nbsp;</span><span class="capitalize">{{ $page.props.template.name }}</span>
                </div>
                <div class="ml-6">
                    <span><b>Category:</b>&nbsp;&nbsp;</span><span class="capitalize">{{ $page.props.template.category }}</span>
                </div>
                <div class="ml-6">
                    <span><b>Description:</b>&nbsp;&nbsp;</span><span class="capitalize">{{ $page.props.template.description }}</span>
                </div>
                <div class="mt-2 text-lg font-medium text-gray-900">
                    Message ID: {{ playerMessage.id }}
                </div>
                <div class="mt-1 mb-4">
                    <span class="text-gray-900 font-medium text-lg">Preview Size:&nbsp;&nbsp;</span>
                    <span>
                        <select
                            id="preview_size"
                            v-model="previewContainerClass"
                            name="preview_size"
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md
                                shadow-sm message-fields-modal-category mt-1"
                            @change="previewSizeChange($event.target.value)"
                        >
                            <option value="message-preview player-preview-full">
                                Full
                            </option>
                            <option value="message-preview player-preview-lg">
                                Large
                            </option>
                            <option value="message-preview player-preview-md">
                                Medium
                            </option>
                            <option value="message-preview player-preview-sm">
                                Small
                            </option>
                        </select>
                    </span>
                </div>
                <!-- <span class="text-gray-900 font-medium text-lg">Player Preview Info:</span>
                    <div class="grid-cols-1">
                        <div class="mt-1 ml-4 text-sm text-gray-600">
                            <span><b>Name:</b>&nbsp;&nbsp;</span><span class="capitalize">{{ playerMessage.name }}</span>
                        </div>
                        <div
                            v-for="(index, value, key) in messageComponents"
                            :key="key"
                            class="mt-1 ml-4 text-sm text-gray-600"
                        >
                            <div v-if="index.type == 'font'">
                                <span><b>{{ index.label }}:</b>&nbsp;&nbsp;</span><br>
                                <div class="scala-preview-fonts mt-1 ml-4 text-sm text-gray-600">
                                    <span><b>Color:</b>&nbsp;&nbsp;</span><span class="capitalize">{{ playerMessage[value].color }}</span><br>
                                    <span><b>Family:</b>&nbsp;&nbsp;</span><span class="capitalize">{{ previewOptionTranslator(playerMessage[value], index.name, true) }}</span><br>
                                    <span><b>Weight:</b>&nbsp;&nbsp;</span><span class="capitalize">{{ playerMessage[value].weight }}</span><br>
                                    <span><b>Size:</b>&nbsp;&nbsp;</span><span class="capitalize">{{ playerMessage[value].size }}</span>
                                </div>
                            </div>
                            <div v-else>
                                <span><b>{{ index.label }}:</b>&nbsp;&nbsp;</span><span class="capitalize">
                                    {{ (index.type === 'select' || index.type === 'toggle')
                                        ? previewOptionTranslator(playerMessage[value], index.name)
                                        : (index.type === 'airlines-select')
                                            ? previewMultiList(playerMessage[value])
                                            : playerMessage[value] }}
                                </span>
                            </div>
                        </div>
                    </div> -->
            </div>
        </template>
        <template #form>
            <div
                ref="playerMessageEditor"
                class="player-message-editor"
            >
                <PlayerMessageEditor
                    v-model="editMessageForm"
                    :message-components="messageComponents"
                    :show="true"
                />
            </div>
        </template>

        <template #actions>
            <!-- flash message -->
            <div
                v-show="showFlashMessage"
                id="alertnotification"
                class="flex justify-end items-center scala-alert text-white text-sm font-bold px-1"
                role="alert"
            >
                <svg
                    class="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                ><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                <p
                    v-html="flash.message"
                />
                <span class="px-4 py-3 justify-end">
                    <svg
                        class="fill-current h-6 w-6 text-indigo-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        @click="hideFlash()"
                    ><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>
            <!-- flash message end -->
            <div
                class="flex px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md"
            >
                <div
                    class="justify-start"
                    style="max-width:390px;"
                >
                    <SecondaryButton
                        :disabled="refreshingPreview || !canRefreshMessages"
                        :class="{ 'opacity-25': refreshingPreview, 'scala-edit-btn': true, 'slim-header-btn': true }"
                        style="float: left;"
                        @click="refreshPlayerMessage()"
                    >
                        <div class="scala-btn-label">
                            <div
                                v-show="refreshingPreview"
                                class="scala-btn-loader"
                            >
                                <svg
                                    id="L3"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 100 100"
                                    enable-background="new 0 0 0 0"
                                    xml:space="preserve"
                                >
                                    <circle
                                        fill="none"
                                        stroke="#4fa4fd"
                                        stroke-width="4"
                                        cx="50"
                                        cy="50"
                                        r="44"
                                        style="opacity:0.5;"
                                    />
                                    <circle
                                        fill="#DFF0D8"
                                        stroke="#4fa4fd"
                                        stroke-width="3"
                                        cx="8"
                                        cy="54"
                                        r="6"
                                    >
                                        <animateTransform
                                            attributeName="transform"
                                            dur="2s"
                                            type="rotate"
                                            from="0 50 48"
                                            to="360 50 52"
                                            repeatCount="indefinite"
                                        />

                                    </circle>
                                </svg>
                            </div>
                            <div class="scala-btn-text">
                                Refresh
                            </div>
                        </div>
                    </SecondaryButton>
                </div>
                <div class="justify-end flex-grow">
                    <SecondaryButton
                        :disabled="refreshingPreview"
                        :class="{ 'opacity-25': refreshingPreview, 'scala-delete-btn': true, 'slim-header-btn': true }"
                        @click="cancelMessage()"
                    >
                        Discard
                    </SecondaryButton>
                    <PrimaryButton
                        type="submit"
                        :class="{ 'opacity-25': refreshingPreview, 'scala-edit-btn': true, 'slim-header-btn': true }"
                        :disabled="refreshingPreview"
                    >
                        Finalize
                    </PrimaryButton>
                </div>
            </div>
        </template>
        <template #preview>
            <div
                id="message-preview"
                :style="'height: ' + props.playerMessage.appHeight + 'px; width: ' + props.playerMessage.appWidth + 'px;'"
                :class="previewContainerClass"
            >
                <iframe
                    id="iframe"
                    ref="iframe"
                    :key="iframeUpdate"
                    class="iframe-preview"
                    :src="iframeSource"
                    style="position:absolute;top:0;left:0;"
                    :height="props.playerMessage.appHeight"
                    :width="props.playerMessage.appWidth"
                />
            </div>
        </template>
    </FormSectionPreview>
</template>