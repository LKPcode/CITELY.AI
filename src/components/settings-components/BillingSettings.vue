<template>


<div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <div>
        <h2 class="text-base mt-0 font-semibold leading-7 text-gray-900">Plan</h2>
        <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>

        <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Subscription Tier</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-accent font-bold"> CITELY PRO </div>
              <button type="button" class="font-semibold text-gray-400 hover:text-red-500">
                Unsubscribe
            </button>
            </dd>
          </div>

          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Payment Method</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-700">Credit Card</div>
              <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
            </dd>
          </div>

          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Trial</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-700">Ended at 22/08/2022</div>
              <!-- <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button> -->
            </dd>
          </div>
         
        </dl>
      </div>
    </div>


    <!-- Billing history -->
    <section class="mt-16" aria-labelledby="billing-history-heading">
            <div class="">
                <h2 class="text-base mt-0 font-semibold leading-7 text-gray-900">History</h2>
                <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>
            </div>
            <div class="mt-6 flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div class="overflow-hidden border-t border-gray-200">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                          <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                          <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                          <!--
                            `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                          -->
                          <th scope="col" class="relative px-6 py-3 text-left text-sm font-medium text-gray-500">
                            <span class="sr-only">View receipt</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                            <time datetime="2020-01-01">1/1/2020</time>
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Business Plan - Annual Billing</td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">CA$109.00</td>
                          <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <a href="#" class="text-accent hover:text-orange-900">View receipt</a>
                          </td>
                        </tr>
                        <tr>
                          <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                            <time datetime="2020-01-01">1/1/2020</time>
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Business Plan - Annual Billing</td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">CA$109.00</td>
                          <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <a href="#" class="text-accent hover:text-orange-900">View receipt</a>
                          </td>
                        </tr>
                        <tr>
                          <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                            <time datetime="2020-01-01">1/1/2020</time>
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Business Plan - Annual Billing</td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">CA$109.00</td>
                          <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <a href="#" class="text-accent hover:text-orange-900">View receipt</a>
                          </td>
                        </tr>

                        <!-- More payments... -->
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

        </section>


</template>

<script setup lang="ts">

</script>