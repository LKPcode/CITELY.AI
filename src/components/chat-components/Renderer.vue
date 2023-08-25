<template>
    <div class="renderer" ref="renderer">
        <div v-html="rendered_content"></div>
    </div>
</template>


<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, onUnmounted, getCurrentInstance } from 'vue'
import renderComponent from '../../helper_functions/renderComponent.ts'
import debounce from '../../helper_functions/debounce.ts'


const props = defineProps<({
    markdown: String
})>();

const renderer = ref<HTMLElement>();
let destroyComp:any = null

const { appContext } :any = getCurrentInstance()
onUnmounted(() => destroyComp?.()) // destroy component on unmount


// https://stackoverflow.com/questions/69488256/vue-3-append-component-to-the-dom-best-practice
onMounted( async () => {
    await nextTick();
    console.log("mounted renderer");
    // Get all .math-block elements under renderer

    insertMathBlockMenu();
})

const insertMathBlockMenu = () => {

    let mathBlocks = renderer.value!.querySelectorAll('.math-block');
    console.log(mathBlocks);


    mathBlocks.forEach( async (mathBlock:Element) => {
        // console.log(mathBlock);
        // Get the contents of the math-block child with element name latex
        const latex = mathBlock.querySelector('latex')?.innerHTML;
        // Get the contents of the math-block child with element name mathml
        const mathml = mathBlock.querySelector('mathml')?.innerHTML;
        // Get the contents of the math-block child with element name asciimath
        const asciimath = mathBlock.querySelector('asciimath')?.innerHTML;
        // add a div child for math-block element
        const math = document.createElement('div');
        mathBlock.appendChild(math);
        math.classList.add('math-block-menu');

        destroyComp?.() // destroy previous component
        destroyComp = renderComponent({
            el: math,
            component: (await import("./MathBlockMenu.vue")).default,
            props: {
                latex: latex,
                mathml: mathml,
                asciimath: asciimath,
            },
            appContext,
        })

    });
}

// Options for mathpix markdown to html conversion MMD
const options = {
            htmlTags: true,
            codeHighlight: {
                auto:true,
                code: true,
            },
            outMath: { //You can set which formats should be included into html result
                include_mathml: true,
                include_asciimath: true,
                include_latex: true,
                include_svg: true, // sets in default
                include_tsv: true,
                include_table_html: true, // sets in default
            },
            htmlWrapper	:{
                includeStyles: true,
                includeFonts: true
            },
            parserErrors: 'show_input' // does not work
        }

const debouncedInsertMathBlockMenu = debounce(insertMathBlockMenu, 1000);

const rendered_content = computed(() => {
        // debounce_(insertMathBlockMenu, 1000);
        let html;
        try{
            html = window.markdownToHTML( props.markdown as string, options);
            debouncedInsertMathBlockMenu();
            // insertMathBlockMenu();
        }
        catch(e){
            console.log(e);
        }
      return html;
})

</script>
