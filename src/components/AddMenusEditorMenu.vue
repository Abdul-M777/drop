<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      auto-reopen="true"
      class="fixed inset-0 overflow-hidden"
      @close="$emit('close')"
    >
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0">
          <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <div class="w-screen max-w-md">
                <div
                  class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
                >
                  <div class="px-4 sm:px6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">
                        Editor Menu
                      </DialogTitle>
                      <div class="ml-3 h-7 flex items-center">
                        <button
                          class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          @click="$emit('close')"
                        >
                          <span class="sr-only">Close panel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 relative flex-1 px-4 sm:px-6">
                    <div class="mb-4">
                      <label
                        for="textName"
                        class="block text-sm font-medium text-black dark:text-black"
                        >Name</label
                      >

                      <input
                        type="text"
                        class="appearance-none block w-full mb-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        v-model="textName"
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        for="textLink"
                        class="block text-sm font-medium text-black dark:text-black"
                      >
                        Link</label
                      >

                      <input
                        type="text"
                        class="appearance-none block w-full mb-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        v-model="textLink"
                      />
                    </div>
                    <div class="mb-4">
                      <button
                        class="basis-full w-full btn bg-green-500 font-bold mb-3"
                        @click="addName"
                      >
                        Save
                      </button>
                    </div>
                    <div class="mb-4">
                      <button
                        class="basis-full w-full btn bg-green-500 font-bold mb-3"
                        @click="addLink"
                      >
                        Add Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </DialogOverlay>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";

  export default {
    components: {
      Dialog,
      DialogOverlay,
      DialogTitle,
      TransitionChild,
      TransitionRoot,
    },
    props: {
      open: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        textName: "",
        textLink: "",
      };
    },
    methods: {
      addName() {
        console.log(this.textName);
        console.log(this.textLink);
      },
      addLink() {
        console.log("hello");
      },
    },
  };
</script>
