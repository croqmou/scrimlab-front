<template>
    <CommonPopUp
        v-model="openModel"
        :title="$t('popUp.prize_list.add.title')"
        :button-text="$t('components.buttons.validate')"
        @validate="addPrizeList"
        @after-leave="reset"
        :validable="
          !newPrizeList.prizeListName ||
          !newPrizeList.tournamentDate ||
          newPrizeList.result === null ||
          newPrizeList.result <= 0 ||
          !Number.isInteger(Number(newPrizeList.result))
        "
        cancelable
    >
        <v-form>
            <v-container>
                <v-row>
                    <v-col>
                        <div class="pl-6 pt-4 pb-4">
                            <p>{{ $t('popUp.prize_list.add.comment') }}</p>
                        </div>
                      <v-text-field
                        class="pl-6 pr-6 pt-4 pb-4"
                        :label="$t('popUp.prize_list.add.prize_list_name')"
                        v-model="newPrizeList.prizeListName"
                        type="text"
                        variant="outlined"
                      />
                      <v-text-field
                        class="pl-6 pr-6 pt-4 pb-4"
                        :label="$t('popUp.prize_list.add.tournament_date')"
                        v-model="newPrizeList.tournamentDate"
                        type="date"
                        variant="outlined"
                      />
                      <v-text-field
                        class="pl-6 pr-6 pt-4 pb-4"
                        :label="$t('popUp.prize_list.add.tournament_result')"
                        v-model="newPrizeList.result"
                        type="number"
                        variant="outlined"
                      />
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </CommonPopUp>
</template>

<script setup>
import CommonPopUp from '@/components/popups/common/CommonPopUp.vue'
import { ref } from 'vue'
import PrizeListModel from '@/models/PrizeListModel.js'


const openModel = defineModel();

const newPrizeList = ref(new PrizeListModel())

const emit = defineEmits("create:prizeList")


const addPrizeList = async() => {
  const player = JSON.parse(localStorage.getItem("player"));
    newPrizeList.value.playerEmail = player.email;
    emit('create:prizeList', newPrizeList.value)
    reset()
}

const reset = async() => {
    newPrizeList.value = new PrizeListModel()
    openModel.value = false
}
</script>
