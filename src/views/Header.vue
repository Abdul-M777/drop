<template>

    <div @mouseover="upHere = true" @mouseleave="upHere = false">
    <button @click="showModal" v-show="upHere">Edit</button>
    <div ms-header v-html="header"></div>
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

    <editor-menu :open="menuOpened" @close="menuOpened=false" :element="item"></editor-menu>

    </div>

    

</template>


<script>
import Modal from '../components/Modal.vue'
import EditorMenu from '../components/EditorMenu.vue';

export default {
    components: {
        Modal,
        EditorMenu,


    },
    data() {
        return {
            upHere: false,
            number: 1,
            header: "",
            isModalVisible: false,
            item: '',
            menuOpened: false,
            edit_btn: document.createElement('button'),
            delete_btn: document.createElement('button'),
            div: document.createElement('div'),
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

        addEditAndDelete() {

            this.edit_btn.textContent = "E"
            this.edit_btn.setAttribute("id", "edit_element")
            this.edit_btn.setAttribute("class", "w-6 h-6 absolute -top-6 right-7 bg-white border border-gray-200 text-black rounded hover:bg-gray-200")
                    
            this.delete_btn.textContent = "X";
            this.delete_btn.setAttribute("id", "delete_element");
            this.delete_btn.setAttribute("class", "w-6 h-6 absolute -top-6 right-0 bg-white border border-gray-200 text-black rounded hover:bg-gray-200")
                    
        },

        checkAndRemoveEditAndDelete(event,item) {

                    
            let edit_exist = document.getElementById("edit_element");
            let delete_exist = document.getElementById("delete_element");

            if (edit_exist && event.target.id != 'edit_element' && delete_exist && event.target.id != 'delete_element'){
                document.getElementById("edit_element").remove()
                document.getElementById("delete_element").remove()
                }
            else{
                    console.log(event.target.id)
                if (!edit_exist && !delete_exist){
                    item.appendChild(this.edit_btn)
                    item.appendChild(this.delete_btn)
                }
                    
            }
        },

        clickEdit() {
                this.edit_btn.addEventListener('click', (event) => {
                    this.item = document.getElementById(event.target.parentNode.id)
                    this.menuOpened = true
                });
        },

        clickDelete(item) {
                this.delete_btn.addEventListener('click', (event) => {
                    item = document.getElementById(event.target.parentNode.id)
                    if(item != null) {
                    item.remove();
                    }
                });
        },

        showEditAndDelete() {

            // It works, but not as good as it should. Will work on it later.


            let menu_items = [...document.querySelectorAll('[ms-header]')];
            console.log(menu_items)

            menu_items.forEach((item) => {
                item.addEventListener('mouseover', (event) => {
                    if(event.target == document.getElementById('edit_element')){
                        console.log("Hello Thereeeee");
                    }else {
                    this.item = document.getElementById(event.target.id);
                    }
                    // console.log(this.item)
                    if(this.item == null || this.item == '' || this.item == undefined){
                        // console.log('No Id for this element');
                    } else if (this.item) {


                        this.checkAndRemoveEditAndDelete(event, this.item);
                        this.clickEdit();
                        this.clickDelete(this.item);
                    
                    }
                    
                });
            });
        }
    },
    
    mounted: function() {
        this.getHeader(this.number)
        this.showEditAndDelete();
        this.addEditAndDelete();
    }
    
}

</script>