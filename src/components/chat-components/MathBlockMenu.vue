<template>
    <Menu as="div" class="relative group/btn text-left math-block-menu-inside">
        <div>
            <MenuButton class="text-sm group-hover/btn:text-accent font-semibold text-gray-300 hover:text-accent">
                Copy
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="z-40 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="">
                    <MenuItem v-slot="{ active }">
                    <button @click="copyToClipboard('latex')"
                        class="w-full px-2 flex justify-between group items-center cursor-pointer"
                        :class="[active ? 'bg-gray-50 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                        <span>LaTex</span>
                        <svg class="stroke-gray-600 group-hover:stroke-accent" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 7V7C14 6.06812 14 5.60218 13.8478 5.23463C13.6448 4.74458 13.2554 4.35523 12.7654 4.15224C12.3978 4 11.9319 4 11 4H8C6.11438 4 5.17157 4 4.58579 4.58579C4 5.17157 4 6.11438 4 8V11C4 11.9319 4 12.3978 4.15224 12.7654C4.35523 13.2554 4.74458 13.6448 5.23463 13.8478C5.60218 14 6.06812 14 7 14V14"
                                stroke-width="2" />
                            <rect x="10" y="10" width="10" height="10" rx="2" stroke-width="2" />
                        </svg>

                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button @click="copyToClipboard('asciimath')"
                        class="w-full px-2 flex justify-between group items-center cursor-pointer"
                        :class="[active ? 'bg-gray-50 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                        <span>AsciiMath</span>
                        <svg class="stroke-gray-600 group-hover:stroke-accent" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 7V7C14 6.06812 14 5.60218 13.8478 5.23463C13.6448 4.74458 13.2554 4.35523 12.7654 4.15224C12.3978 4 11.9319 4 11 4H8C6.11438 4 5.17157 4 4.58579 4.58579C4 5.17157 4 6.11438 4 8V11C4 11.9319 4 12.3978 4.15224 12.7654C4.35523 13.2554 4.74458 13.6448 5.23463 13.8478C5.60218 14 6.06812 14 7 14V14"
                                stroke-width="2" />
                            <rect x="10" y="10" width="10" height="10" rx="2" stroke-width="2" />
                        </svg>

                    </button>
                    </MenuItem>
                </div>
                <div class="">
                    <MenuItem v-slot="{ active }">
                        <button @click="copyToClipboard('mathml')"
                        class="w-full px-2 flex justify-between group items-center cursor-pointer"
                        :class="[active ? 'bg-gray-50 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                        <span>MathML</span>
                        <svg class="stroke-gray-600 group-hover:stroke-accent" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 7V7C14 6.06812 14 5.60218 13.8478 5.23463C13.6448 4.74458 13.2554 4.35523 12.7654 4.15224C12.3978 4 11.9319 4 11 4H8C6.11438 4 5.17157 4 4.58579 4.58579C4 5.17157 4 6.11438 4 8V11C4 11.9319 4 12.3978 4.15224 12.7654C4.35523 13.2554 4.74458 13.6448 5.23463 13.8478C5.60218 14 6.06812 14 7 14V14"
                                stroke-width="2" />
                            <rect x="10" y="10" width="10" height="10" rx="2" stroke-width="2" />
                        </svg>
                        </button>
                   </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>
  
<script  lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
//   import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const props:any = defineProps<({
    latex: String,
    mathml: String,
    asciimath: String,
})>();


const copyToClipboard = (type: string) => {
    let text = props[type];
    console.log(text);
    navigator.clipboard.writeText(text);
}

</script>