<template>
    <v-dialog :model-value="model"
              :persistent="persistable"
              :scrollable="scrollable"
              class="commonPopUp"
    >
        <v-card class="sheet">
            <h2 class="pl-6 pt-4 pb-4 bg-light-grey">{{ title }}</h2>
            <div class="main-content-container overflow-y-auto">
                <slot></slot>
            </div>
            <div class="mainButtonContainer">
                <div class="subButtonContainer">
                    <common-button v-if="cancelable" class="commonPopupButton" flat variant="outlined" @click="cancel">
                        {{ $t('components.buttons.cancel') }}
                    </common-button>
                    <common-button v-if="resettable" class="commonPopupButton" flat @click="$emit('reset')">
                        {{ $t('components.buttons.reset') }}
                    </common-button>
                    <common-button v-if="nextable" :disabled="disableNext" class="commonPopupButton" flat @click="$emit('next')">
                        {{ $t('components.buttons.next') }}
                    </common-button>
                    <common-button v-else :disabled="validable" class="commonPopupButton" flat @click="validate">
                        {{ buttonText }}
                    </common-button>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import CommonButton from "@/components/popups/common/CommonButton.vue";

defineProps<{
    title: string,
    opened?: boolean,
    buttonText: string,
    cancelable?: boolean,
    scrollable?: boolean,
    persistable?: boolean,
    nextable?: boolean,
    resettable?: boolean,
    validable?: boolean,
    disableNext?: boolean
}>()
const model = defineModel<boolean>()
const emit = defineEmits(['validate', 'next', 'cancel', 'reset'])

function cancel() {
    model.value = false
    emit('cancel')
}

function validate() {
    model.value = false
    emit('validate')
}

</script>

<style scoped>

.commonPopupButton {
    margin: 0.5rem
}

.commonPopUp {
    width: min(40rem, 70svw)
}

.main-content-container {
    display: grid;
}

.mainButtonContainer {
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
}

.subButtonContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    grid-column: 2;
}

@media screen and (max-width: 700px) {
    .commonPopUp {
        width: 100svw;
        height: 100svh;
    }

    .sheet {
        width: 100svw;
        height: 100svh;
        margin: 0;
    }
}
</style>
