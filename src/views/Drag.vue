<template>
  <div class="row">
    <div class="col-3">
      <h3 class="font-bold mx-3">Items</h3>
      <draggable
        class="dragArea list-group border border-black border-dashed w-20 cursor-pointer mx-2"
        :list="list1"
        tag="section"
        @add="getFile"
        :sort="false"
        :group="{ name: 'html-components', pull: 'clone', put: false }"
        :clone="cloneDog"
        @change="log"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="list-group-item my-5 mx-2">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>

    <div class="col-3">
      <h3 class="hidden">Draggable 2</h3>
      <draggable
        class="dragArea list-group2 border border-sky-500 h-auto mx-2 my-80 py-20"
        :list="list2"
        group="html-components"
        @change="log"
        item-key="file"
      >
        <template #item="{ element }">
          <div class="list-group-item">
              <section v-html="element.components"></section>
          </div>
        </template>
      </draggable>
    </div>

    <rawDisplayer class="col-3" :value="list1" title="List 1" />

    <rawDisplayer class="col-3" :value="list2" title="List 2" />
  </div>
</template>

<script>
import draggable from "../../node_modules/vuedraggable";
import axios from "axios";



let idGlobal = 8;
export default {
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable
  },
  data() {
    return {
      data: '',
      list1: [
        { name: "1.html", id: 1, components: "<input placeholder='Write something'></input>" },
        { name: "2.html", id: 2, components: '<p>Hello World</p>'},
        { name: "3.html", id: 3, components: "<h1>This is a new Header</h1> <br> <p>This is a new Paragraph</p> <br> <img src='https://pressgazette.co.uk/wp-content/uploads/2020/11/shutterstock.jpg'>" },
        { name: "4.html", id: 4, components: "<section style='background-color:#364838' class='py-20'>"+ 
        "<div class='container mx-auto px-4 flex flex-wrap'>"+
        "<div class='w-full md:w-1/4'>"+
        "<div class='bg-yellow-50 rounded-lg pb-5 mx-10 mb-5'>" +
        "<h3 class='text-green-900 font-bold text-xl text-center py-5'> AKSEL </h3>"},
        {name: "5.html", id: 5, components: ''}


      ],
      list2: [
        
      ]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    cloneDog({ components }) {
    //     fetch('hello.txt')
    //       .then(response => response.text())
    //       .then(data => {
    //         this.data = data;
  	// // Do something with your data
  	//       console.log(this.data);
    //     this.list1[4].components = this.data
    //     console.log(this.list1[4])
    //     console.log(this.data)
        return {
        id: idGlobal++,
        // name: `${components}`
        components: components
      };
  // });
  
    },
  //   async getFile() {
  //     this.data;
  //    await fetch('hello.txt')
  //     .then(response => response.text())
  //     .then(data => {
  //       this.data = data;
  // 	// Do something with your data
  // 	console.log(this.data);
  // });
  //   },
  },
};
// getFile()
</script>
<style scoped></style>