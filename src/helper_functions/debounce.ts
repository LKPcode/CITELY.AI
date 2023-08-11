
export default function debounce(fn, wait){
    console.log('debounce called')
    let timer;
   return function(...args){
     if(timer) {
        clearTimeout(timer); // clear any pre-existing timer
     }
     const context = this; // get the current context
     timer = setTimeout(()=>{
        console.log('debounce timer expired')
        fn.apply(context, args); // call the function if time expires
     }, wait);
   }
}