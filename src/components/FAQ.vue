<template>
    <div class="bg-white">
      <div class="mx-auto max-w-7xl divide-y divide-gray-900/10 px-6">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
        <dl class="mt-10 space-y-8 divide-y divide-gray-900/10">

          <div v-for="_ in [1,2,3,4,5,6,7,8,9]" class="pt-8 group lg:grid lg:grid-cols-12 lg:gap-8">
            <dt class="text-base font-semibold leading-7 text-gray-900 lg:col-span-5 group-hover:underline group-hover:decoration-accent">What&#039;s the best thing about Switzerland?</dt>
            <dd class="mt-4 lg:col-span-7 lg:mt-0">
              <p class="text-base leading-7 text-gray-600">I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p>
            </dd>
          </div>

        <!-- More questions... -->
      </dl>
    </div>
</div>
</template>

<script lang="ts" setup >

</script>