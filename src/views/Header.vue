<template>
    <button @click="showModal" v-show="upHere">Edit</button>
    <div @mouseover="upHere = true" @mouseleave="upHere = false" v-html="header"></div>
    <!-- <h1 @mouseover="upHere = true" @mouseleave="upHere = false">Goal</h1>
    <h1 v-show="upHere">Delete</h1> -->

    <modal v-show="isModalVisible" @close="closeModal">

        <template v-slot:header>
            Headers
        </template>

        <template v-slot:body>
            <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded mx-3" value="1" ref="btn_header" @click="changeHeader($event)">Header 1</button>
            <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded mx-3" value="2" ref="btn_header" @click="changeHeader($event)">Header 2</button>
        </template>

        <template v-slot:footer>
        </template>

    </modal>

</template>


<script>
import Modal from '../components/Modal.vue'

export default {
    components: {
        Modal,


    },
    data() {
        return {
            upHere: false,
            number: 1,
            header: "",
            isModalVisible: false,
        }
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        changeHeader(event) {
            console.log(event.target.value)
            this.number = event.target.value;
            console.log(this.number)
            this.getHeader(this.number);
            this.isModalVisible = false;

        },
        getHeader(number) {
            console.log('Hello');
            if(number == 1){
                fetch('/header/header-1.html')
                        .then(response => response.text())
                        .then(data => {
                        // console.log(data)
                        this.header = data
          });
            } else if (number == 2) {
                console.log(this.number)
                    fetch('/header/header-2.html')
                        .then(response => response.text())
                        .then(data => {
                        // console.log(data)
                        this.header = data
          });
            }
        //     switch (number) {
        //         case 1:
        //             console.log('test')
        //             fetch('/header/header-1.html')
        //                 .then(response => response.text())
        //                 .then(data => {
        //                 // console.log(data)
        //                 this.header = data
        //   });
        //             break;

        //         case 2:
        //             console.log(this.number)
        //             fetch('/header/header-2.html')
        //                 .then(response => response.text())
        //                 .then(data => {
        //                 console.log(data)
        //                 this.header = data
        //   });
        //             break;

        //         default:
        //             break;
        //     }


        },

        getElement() {
            

        }
    },
    
    mounted: function() {
        this.getHeader(this.number)
    }
    
}

</script>