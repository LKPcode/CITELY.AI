<template>
    <div class="grow overflow-auto relative">


        <!-- ONE BACK AND FORTH -->
        <div>
        <div class="bg-lightgray flex justify-center">
            <!-- USER QUERY -->
            <div class=" w-[80%] max-w-[800px] text-sm py-4 relative min-h-[60px]">
                <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem placeat totam aliquam molestias iste exercitationem deserunt dolorum fuga mollitia officia eos, ipsum quo repudiandae delectus dignissimos aperiam id suscipit! Voluptas?
                </span>

                <div class="absolute -left-12 top-5 w-8 h-8 bg-accent rounded-full"></div>
            </div>
        </div>

        <!-- AI RESPONSE -->
        <div class="flex justify-center">
            <!-- USER QUERY -->
            <div class="w-[80%] max-w-[800px] text-sm py-4  min-h-[60px]">
                <!-- Loading State -->
                <div class="flex items-center mb-2 ml-2">
                    <img src="../../components/icons/Understanding.svg" class="mr-2" alt="Understanding Question">
                    <span>Understanding Question</span>
                </div>
                <!-- Loading State -->
                <div class="flex items-center mb-3  ml-2">
                    <img src="../../components/icons/Steps.svg" class="mr-2 -ml-[3px]" alt="Understanding Question">
                    <span>Splitting the Query into Steps</span>
                </div>

                <!-- Step -->
                <div class="border border-grayer p-1 px-3 mt-2 rounded-md">
                    <span class="text-accent font-bold flex items-center">
                        <span>Step 1</span>
                        <img class="ml-1" src="../../components/icons/Check.svg" alt="">
                    </span>

                    <div class="mt-1 mb-3">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima ex nihil suscipit cupiditate voluptatem pariatur ullam nisi eos magni temporibus exercitationem culpa, dicta accusamus vel molestiae vero animi quam et?
                    </div>

                    <!-- Expanded Step -->
                    <div>
                        <div class=" h-[1px] bg-grayer"></div>

                        <div class="flex justify-start items-stretch">
                            <div class="mr-2 my-2 min-w-[2px] bg-accent rounded-full"></div>
                            <span class="my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, aut! Aspernatur, delectus voluptatem, praesentium quas modi itaque dignissimos alias quos eveniet voluptatum rerum, atque vitae quis. Fugiat voluptas cumque eos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum architecto perspiciatis, quos omnis illum enim sapiente temporibus. Earum praesentium perspiciatis accusantium quo ex iusto dolor at maiores perferendis nostrum. Beatae.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsam quod dolor quam aspernatur vel, fuga consectetur, magnam culpa illum, optio velit repellendus. Odio voluptas, eum rem eaque alias exercitationem.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, aut! Aspernatur, delectus voluptatem, praesentium quas modi itaque dignissimos alias quos eveniet voluptatum rerum, atque vitae quis. Fugiat voluptas cumque eos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum architecto perspiciatis, quos omnis illum enim sapiente temporibus. Earum praesentium perspiciatis accusantium quo ex iusto dolor at maiores perferendis nostrum. Beatae.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsam quod dolor quam aspernatur vel, fuga consectetur, magnam culpa illum, optio velit repellendus. Odio voluptas, eum rem eaque alias exercitationem.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, aut! Aspernatur, delectus voluptatem, praesentium quas modi itaque dignissimos alias quos eveniet voluptatum rerum, atque vitae quis. Fugiat voluptas cumque eos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum architecto perspiciatis, quos omnis illum enim sapiente temporibus. Earum praesentium perspiciatis accusantium quo ex iusto dolor at maiores perferendis nostrum. Beatae.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsam quod dolor quam aspernatur vel, fuga consectetur, magnam culpa illum, optio velit repellendus. Odio voluptas, eum rem eaque alias exercitationem.
                            </span>

                        </div>

                    </div>

                </div>


                <!-- Step -->
                <div class="border border-grayer p-1 px-3 mt-2 rounded-md">
                    <span class="text-accent font-bold flex items-center">
                        <span>Step 1</span>
                        <img class="ml-1" src="../../components/icons/Check.svg" alt="">
                    </span>

                    <div class="mt-1 mb-3">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima ex nihil suscipit cupiditate voluptatem pariatur ullam nisi eos magni temporibus exercitationem culpa, dicta accusamus vel molestiae vero animi quam et?
                    </div>

                </div>


                <!-- Finall Answer -->
                <div class="mt-2">
                    <div class="flex items-center">
                        <img src="../../components/icons/Answer.svg" class="w-5" alt="">
                        <span class="text-accent ml-2 text-md font-bold">Final Answer</span>
                    </div>

                    <div class="ml-2 mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem placeat totam aliquam molestias iste exercitationem deserunt dolorum fuga mollitia officia eos, ipsum quo repudiandae delectus dignissimos aperiam id suscipit! Voluptas?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ducimus? Fuga quas nihil reprehenderit natus perspiciatis facilis minima praesentium voluptatum ipsa voluptatem, voluptate odit, veritatis illo exercitationem vel ad minus!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, provident minus, iste dignissimos excepturi autem eveniet perferendis, error magnam porro dolores quo officiis non. Doloribus voluptates distinctio sed ad hic!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, aut! Aspernatur, delectus voluptatem, praesentium quas modi itaque dignissimos alias quos eveniet voluptatum rerum, atque vitae quis. Fugiat voluptas cumque eos.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum architecto perspiciatis, quos omnis illum enim sapiente temporibus. Earum praesentium perspiciatis accusantium quo ex iusto dolor at maiores perferendis nostrum. Beatae.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsam quod dolor quam aspernatur vel, fuga consectetur, magnam culpa illum, optio velit repellendus. Odio voluptas, eum rem eaque alias exercitationem.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, aut! Aspernatur, delectus voluptatem, praesentium quas modi itaque dignissimos alias quos eveniet voluptatum rerum, atque vitae quis. Fugiat voluptas cumque eos.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum architecto perspiciatis, quos omnis illum enim sapiente temporibus. Earum praesentium perspiciatis accusantium quo ex iusto dolor at maiores perferendis nostrum. Beatae.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsam quod dolor quam aspernatur vel, fuga consectetur, magnam culpa illum, optio velit repellendus. Odio voluptas, eum rem eaque alias exercitationem.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, aut! Aspernatur, delectus voluptatem, praesentium quas modi itaque dignissimos alias quos eveniet voluptatum rerum, atque vitae quis. Fugiat voluptas cumque eos.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum architecto perspiciatis, quos omnis illum enim sapiente temporibus. Earum praesentium perspiciatis accusantium quo ex iusto dolor at maiores perferendis nostrum. Beatae.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsam quod dolor quam aspernatur vel, fuga consectetur, magnam culpa illum, optio velit repellendus. Odio voluptas, eum rem eaque alias exercitationem.
                    </div>

                </div>




            </div>
        </div>

    </div>

      

    </div>
</template>

<script setup lang="ts">


</script>