<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" auto-reopen="true" class="fixed inset-0 overflow-hidden" @close="$emit('close')">
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0" />

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="w-screen max-w-md">
              <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle class="text-lg font-medium text-gray-900">
                      Editor menu
                    </DialogTitle>
                    <div class="ml-3 h-7 flex items-center">
                      <button class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="$emit('close')">
                        <span class="sr-only">Close panel</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                    {{id}}
                  <div class="mb-4">
                        <label for="text-weight" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Text Size</label>
                        <select v-model="textSize" @change="changeTextSize()" id="text-weight" name="text-weight"
                                class="dark:text-gray-100 dark:bg-gray-dark dark:border-gray-600 mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" selected disabled>Default size</option>
                            <option v-for="size in sizes" :key="size" :value="size" :class="'text-'+size">{{ size.toUpperCase() }}</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="text-size" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Text Weight</label>
                        <select v-model="textWeight" @change="changeTextWeight()" id="text-size" name="text-size"
                                class="dark:text-gray-100 dark:bg-gray-dark dark:border-gray-600 mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" selected disabled>Default weight</option>
                            <option v-for="weight in weights" :key="weight" :value="weight" :class="'font-'+ weight">{{ weight.toUpperCase() }}</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="text-typography" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Text Typography</label>
                        <select id="text-typography" name="text-typography" v-model="textFamily" @change="changeTextFamily()"
                                class="dark:text-gray-100 dark:bg-gray-dark dark:border-gray-600 mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" selected disabled>Default font</option>
                                <option v-for="family in families" :key="family" :value="family">{{ family }}</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="text-typography" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Text Style</label>
                        <select id="text-typography" name="text-typography" v-model="textStyle" @change="changeTextStyle()"
                                class="dark:text-gray-100 dark:bg-gray-dark dark:border-gray-600 mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" selected disabled>Default style</option>
                                <option v-for="style in styles" :key="style" :value="style">{{ style }}</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-900 mb-1 dark:text-gray-100">Opacity</label>
                        <div class="flex w-full">
                            <input type="range" v-model="opacityIndex" @input="changeOpacity()" name="opacity" id="opacity" class="flex-grow" min="0" max="14">
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-900 mb-1 dark:text-gray-100">Text color</label>
                        <div class="">
                            <div class="flex flex-row mb-2">
                                <label for="colorpicker" class="mr-3">Choose custom color</label>
                                <input type="color" name="colorpicker" id="colorpicker-txt" @input="changeTxtColorCustom()" v-model="customTxtColor">
                            </div>
                            <p>Choose predefined color</p>
                            <div class="grid grid-cols-11 gap-1">
                                <div v-for="color in colors" :key="color" :class="'bg-'+color" class="h-6 w-6 cursor-pointer" @click="changeTxtColor('text-'+color)"> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-900 mb-1 dark:text-gray-100">Background color</label>
                        <div class="">
                            <div class="flex flex-row mb-2">
                                <label for="colorpicker" class="mr-3">Choose custom color</label>
                                <input type="color" name="colorpicker" id="colorpicker-bg" @input="changeBgColorCustom()" v-model="customBgColor">
                            </div>
                            <p>Choose predefined color</p>
                            <div class="grid grid-cols-11 gap-1">
                                <div v-for="color in colors" :key="color" :class="'bg-'+color" class="h-6 w-6 cursor-pointer" @click="changeBgColor('bg-'+color)"> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
// import { XIcon } from '@heroicons/vue/outline'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    // XIcon,
  },
   props:{
       open: {
           type:Boolean,
            required: true
       },
       element: {
           type: String,
           required: true
       }
    },
     data() {
        return {
            textSize: '',
            sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],

            textStyle: '',
            styles: ['italic','not-italic'],

            textWeight: '',
            weights: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],

            textFamily: '',
            families: ['sans', 'serif', 'mono'],

            colors: ["white", "black", "gray-50", "gray-100", "gray-200", "gray-300", "gray-400", "gray-500", "gray-600", "gray-700", "gray-800", "gray-900", "red-50", "red-100", "red-200", "red-300", "red-400", "red-500", "red-600", "red-700", "red-800", "red-900", "yellow-50", "yellow-100", "yellow-200", "yellow-300", "yellow-400", "yellow-500", "yellow-600", "yellow-700", "yellow-800", "yellow-900", "green-50", "green-100", "green-200", "green-300", "green-400", "green-500", "green-600", "green-700", "green-800", "green-900", "blue-50", "blue-100", "blue-200", "blue-300", "blue-400", "blue-500", "blue-600", "blue-700", "blue-800", "blue-900", "indigo-50", "indigo-100", "indigo-200", "indigo-300", "indigo-400", "indigo-500", "indigo-600", "indigo-700", "indigo-800", "indigo-900", "purple-50", "purple-100", "purple-200", "purple-300", "purple-400", "purple-500", "purple-600", "purple-700", "purple-800", "purple-900", "pink-50", "pink-100", "pink-200", "pink-300", "pink-400", "pink-500", "pink-600", "pink-700", "pink-800", "pink-900"],

            opacityIndex: '',
            opacities: ['0', '5', '10', '20', '25', '30', '40', '50', '60', '70', '75', '80', '90', '95', '100'],

            customBgColor: '',

            customTxtColor: ''
        }
    },

    methods:{
        changeTextSize() {
            this.sizes.forEach(size => {
                var reg = RegExp('text-' + size)

                if (this.element.className.match(reg) != null) {
                    this.element.classList.remove(this.element.className.match(reg)[0])
                }
            })
            this.element.classList.add('text-' + this.textSize)
        },

        changeTextWeight() {

            this.weights.forEach(weight => {
                var reg = RegExp('font-' + weight)

                if (this.element.className.match(reg) != null) {
                    this.element.classList.remove(this.element.className.match(reg)[0])
                }
            })
            this.element.classList.add('font-' + this.textWeight)
        },
        changeTextFamily() {

            this.families.forEach(family => {
                var reg = RegExp('font-' + family)

                if (this.element.className.match(reg) != null) {
                    this.element.classList.remove(this.element.className.match(reg)[0])
                }
            })
            this.element.classList.add('font-' + this.textFamily)
        },
        changeTextStyle() {

            this.styles.forEach(style => {
                var reg = RegExp(style)

                if (this.element.className.match(reg) != null) {
                    this.element.classList.remove(this.element.className.match(reg)[0])
                }
            })
            this.element.classList.add(this.textStyle)
        },

        changeOpacity() {
            
            this.opacities.forEach(o => this.element.classList.remove('opacity-' + o))
            this.element.classList.add('opacity-' + this.opacities[this.opacityIndex])
        },

        changeTxtColorCustom(){
            
            this.colors.forEach(color => this.element.classList.remove('text-' + color)) //remove any colors that are currently in the classList so there is not a color specified in a class and as a style
            this.element.style.color = this.customTxtColor
        },

        changeTxtColor(color){


            if(this.element.style.color=!''){
                this.element.style.color = ''
            }
            this.customTxtColor=''
            this.colors.forEach(color => this.element.classList.remove('text-' + color))
            this.element.classList.add(color)

        },

        changeBgColorCustom(){
            
            this.colors.forEach(color => this.element.classList.remove('bg-' + color)) //remove any colors that are currently in the classList so there is not a color specified in a class and as a style
            this.element.style.backgroundColor = this.customBgColor
        },

        changeBgColor(color){


            if(this.element.style.backgroundColor=!''){
                this.element.style.backgroundColor = ''
            }
            this.customBgColor=''
            this.colors.forEach(color => this.element.classList.remove('bg-' + color))
            this.element.classList.add(color)

        }
    }
}
</script>