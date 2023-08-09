<template>
    <!-- AI RESPONSE -->
    <div class="flex justify-center">
        <!-- USER QUERY -->
        <div class="w-[80%] max-w-[800px] text-sm py-4  min-h-[60px]">

            <div v-for="res in content">
                <!-- Loading State -->
                    <div 
                        v-if="res.type == 'status' && res.status_type == 'understanding'" 
                        class="flex items-center mb-2 ml-2">
                        <img v-if="res.type == 'status'" src="../../components/icons/Understanding.svg" class="mr-2" alt="Understanding Question">
                        <span>Understanding Question</span>
                    </div>

                <!-- Loading State -->
                <div 
                    v-if="res.type == 'status' && res.status_type == 'splitting'" 
                    class="flex items-center mb-3  ml-2">
                    <img src="../../components/icons/Steps.svg" class="mr-2 -ml-[3px]" alt="Understanding Question">
                    <span>Splitting the Query into Steps</span>
                </div>

                <!-- <Transition name="slide-fade" > -->
                    <AgentStep
                            v-if="res.type == 'step'"
                            :step="res.step_number" 
                            :step_description="res.text" 
                            :step_body="res.content"
                            class="mt-4"
                            />
                <!-- </Transition> -->

                <AgentFinalAnswer 
                        v-if="res.type == 'answer'"
                        :answer_body="res.text"
                        class="mt-4"
                />
          

            </div>




        </div>
    </div>
</template>

<script lang="ts" setup>
import AgentStep from "./AgentStep.vue";
import AgentFinalAnswer from "./AgentFinalAnswer.vue";



const {content} = defineProps<({
    content: any
})>();


</script>
<!-- 
<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}



</style> -->