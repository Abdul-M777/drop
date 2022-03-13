<template>
  <div>
    <button
      class="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
      @click="showModal"
      v-show="upHere"
    >
      Edit
    </button>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0"
      v-show="upHere"
      @click="clickSave"
    >
      Save
    </button>
    <div class="header" ms-header v-html="header"></div>

    <modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> Headers </template>

      <template v-slot:body>
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded mx-3"
          value="1"
          ref="btn_header"
          @click="changeHeader($event)"
        >
          Header 1
        </button>
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded mx-3"
          value="2"
          ref="btn_header"
          @click="changeHeader($event)"
        >
          Header 2
        </button>
      </template>

      <template v-slot:footer> </template>
    </modal>

    <editor-menu
      :open="menuOpened"
      @close="menuOpened = false"
      :element="item"
    ></editor-menu>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import EditorMenu from "../components/EditorMenu.vue";
import FileSaver from "file-saver";
import axios from "axios";

export default {
  components: {
    Modal,
    EditorMenu,
  },
  data() {
    return {
      upHere: true,
      number: 1,
      header: "",
      isModalVisible: false,
      item: "",
      menuOpened: false,
      save_btn: document.createElement("button"),
      edit_btn: document.createElement("button"),
      delete_btn: document.createElement("button"),
      div: document.createElement("div"),
      header_data: "",
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    changeHeader(event) {
      this.number = event.target.value;
      this.getHeader(this.number);
      this.isModalVisible = false;
    },
    getHeader(number) {
      if (number == 1) {
        fetch("/header/header-1.html")
          .then((response) => response.text())
          .then((data) => {
            this.header = data;
          });
      } else if (number == 2) {
        console.log(this.number);
        fetch("/header/hello.html")
          .then((response) => response.text())
          .then((data) => {
            this.header = data;
          });
      }
    },
    addEditAndDelete() {
      this.edit_btn.textContent = "E";
      this.edit_btn.setAttribute("id", "edit_element");
      this.edit_btn.setAttribute(
        "class",
        "w-6 h-6 absolute -top-6 right-7 bg-white border border-gray-200 text-black rounded hover:bg-gray-200"
      );
      this.delete_btn.textContent = "X";
      this.delete_btn.setAttribute("id", "delete_element");
      this.delete_btn.setAttribute(
        "class",
        "w-6 h-6 absolute -top-6 right-0 bg-white border border-gray-200 text-black rounded hover:bg-gray-200"
      );
    },
    checkAndRemoveEditAndDelete(event, item) {
      let edit_exist = document.getElementById("edit_element");
      let delete_exist = document.getElementById("delete_element");
      if (
        edit_exist &&
        event.target.id != "edit_element" &&
        delete_exist &&
        event.target.id != "delete_element"
      ) {
        console.log(event.target.id);
        document.getElementById("edit_element").remove();
        document.getElementById("delete_element").remove();
      } else if (!edit_exist && !delete_exist) {
        console.log(event.target.id);

        item.appendChild(this.edit_btn);
        item.appendChild(this.delete_btn);
      }
    },
    clickEdit() {
      this.edit_btn.addEventListener("click", (event) => {
        this.item = document.getElementById(event.target.parentNode.id);
        this.menuOpened = true;
      });
    },
    clickDelete(item) {
      this.delete_btn.addEventListener("click", (event) => {
        item = document.getElementById(event.target.parentNode.id);
        if (item != null) {
          item.remove();
        }
      });
    },
    showEditAndDelete() {
      // It works, but not as good as it should. Will work on it later.
      let menu_items = [...document.querySelectorAll("[ms-header]")];
      menu_items.forEach((item) => {
        item.addEventListener("mouseover", (event) => {
          if (event.target == document.getElementById("edit_element")) {
            console.log(event.target);
          } else {
            this.item = document.getElementById(event.target.id);
          }
          if (this.item == null || this.item == "" || this.item == undefined) {
          } else if (this.item) {
            this.checkAndRemoveEditAndDelete(event, this.item);
            this.clickEdit();
            this.clickDelete(this.item);
          }
        });
      });
    },
    clickSave() {
      const header = [...document.querySelectorAll("[ms-header]")];
      console.log(header);
      header.forEach((element) => {
        this.data = element;
        let file = new File([this.data.innerHTML], "hello.html", {
          type: "text/plain;charset=utf-8",
        });
        console.log(file);
        FileSaver.saveAs(file);
      });
    },
  },
  mounted: function () {
    this.getHeader(this.number);
    this.showEditAndDelete();
    this.addEditAndDelete();
  },
};
</script>

<style>
[ms-menu-item]:hover {
  box-shadow: inset 0 0 0 1px #0bb783, 0 0 0 2px #0bb783;
  border-radius: 2px;
  cursor: pointer;
}
</style>
