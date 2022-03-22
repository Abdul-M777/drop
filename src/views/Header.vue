<template>
  <div>
    <button
      class="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
      @click="showModal"
      v-show="upHere"
    >
      Change
    </button>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0"
      v-show="upHere"
      @click="clickSave"
    >
      Save
    </button>

    <div id="header" class="header" ms-header v-html="header"></div>

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

    <add-menus-editor-menu
      :open="submenuOpened"
      @close="submenuOpened = false"
      @name="newMenu"
    >
    </add-menus-editor-menu>
  </div>
</template>

<script>
  import Modal from "../components/Modal.vue";
  import EditorMenu from "../components/EditorMenu.vue";
  import AddMenusEditorMenu from "../components/AddMenusEditorMenu.vue";
  import FileSaver from "file-saver";

  export default {
    components: {
      Modal,
      EditorMenu,
      AddMenusEditorMenu,
    },
    data() {
      return {
        upHere: true,
        number: 1,
        header: "",
        isModalVisible: false,
        item: "",
        menuOpened: false,
        submenuOpened: true,
        save_btn: document.createElement("button"),
        edit_btn: document.createElement("button"),
        delete_btn: document.createElement("button"),
        add_btn: document.createElement("button"),
        addsubmenu_btn: document.createElement("button"),
        div: document.createElement("div"),
        li: document.createElement("li"),
        a: document.createElement("a"),
      };
    },
    methods: {
      // This method is to show the Modal.
      showModal() {
        this.isModalVisible = true;
      },
      // This method is to close the Modal.
      closeModal() {
        this.isModalVisible = false;
      },
      // This method is to change the header based on the number.
      changeHeader(event) {
        this.number = event.target.value;
        this.getHeader(this.number);
        this.isModalVisible = false;
      },
      // This method is to pick a header from the header folder.
      getHeader(number) {
        if (number == 1) {
          fetch("/header/header-1.html")
            .then((response) => response.text())
            .then((data) => {
              this.header = data;
            });
        } else if (number == 2) {
          fetch("/header/hello.html")
            .then((response) => response.text())
            .then((data) => {
              this.header = data;
            });
        }
      },
      // This method is to create the Edit and Delete buttons and their id's and classe's.
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
      // This method is to check if the Edit and Delete buttons exists or not.
      // If the Buttons exits when they should not, they will be removed.
      // If they do not exist and have to then we append them as a child for that element.
      checkAndRemoveEditAndDelete(event, item) {
        let edit_exist = document.getElementById("edit_element");
        let delete_exist = document.getElementById("delete_element");
        if (
          edit_exist &&
          event.target.id != "edit_element" &&
          delete_exist &&
          event.target.id != "delete_element" &&
          event.target.id == ""
        ) {
          document.getElementById("edit_element").remove();
          document.getElementById("delete_element").remove();
        }
        if (event.target.id) {
          item.appendChild(this.edit_btn);
          item.appendChild(this.delete_btn);
        }
      },
      // This method is to show the editor menu.
      clickEdit() {
        this.edit_btn.addEventListener("click", (event) => {
          this.item = document.getElementById(event.target.parentNode.id);
          this.menuOpened = true;
        });
      },
      // This method is to delete an element.
      clickDelete(item) {
        this.delete_btn.addEventListener("click", (event) => {
          item = document.getElementById(event.target.parentNode.id);
          if (item != null) {
            item.remove();
          }
        });
      },
      // This method is to show the Edit and Delete buttons.
      // We call all the methods from this method.
      showEditAndDelete() {
        console.log(this.$emit("name"));
        // It works, but not as good as it should. Will work on it later.
        let menu_items = [...document.querySelectorAll("[ms-header]")];
        menu_items.forEach((item) => {
          item.addEventListener("mouseover", (event) => {
            if (
              event.target == document.getElementById("edit_element") ||
              event.target == document.getElementById("delete_element")
            ) {
            } else {
              this.item = document.getElementById(event.target.id);
            }
            this.createAddBtn();
            this.clickAddBtn();
            this.createSubMenuAddBtn();
            this.clickSubMenuAddBtn();

            if (this.item) {
              this.checkAndRemoveEditAndDelete(event, this.item);
              this.clickEdit();
              this.clickDelete(this.item);
            } else if (event.target) {
              this.checkAndRemoveEditAndDelete(event, this.item);
            }
          });
        });
      },
      // This method is to save the html into an html file.
      // The file will be in the download folder.
      // Then you have to copy/paste it in the public/html folder.
      clickSave() {
        const header = [...document.querySelectorAll("[ms-header]")];
        header.forEach((element) => {
          if (document.getElementById("add_element")) {
            document.getElementById("add_element").remove();
          }
          if (document.getElementById("addsubmenu_element")) {
            document.getElementById("addsubmenu_element").remove();
          }
          if (document.getElementById("add_element")) {
            document.getElementById("add_element").remove();
          }
          if (document.getElementById("delete_element")) {
            document.getElementById("delete_element");
          }
          this.data = element;
          let file = new File([this.data.innerHTML], "hello.html", {
            type: "text/plain;charset=utf-8",
          });
          FileSaver.saveAs(file);
        });
      },
      // This method is to create the add button.
      createAddBtn() {
        let menu_items = [...document.querySelectorAll("[ms-header]")];
        menu_items.forEach((item) => {
          let sum = document.getElementById("group");
          this.add_btn.textContent = "ADD MENU";
          this.add_btn.setAttribute("id", "add_element");
          this.add_btn.setAttribute(
            "class",
            "w-2/6 h-6 absoulte top-72 float-right bg-green-400 border border-gray-200 text-black rounded hover:bg-green-600"
          );
          if (sum != null) {
            sum.appendChild(this.add_btn);
          }
        });
      },
      clickAddBtn() {
        this.add_btn.addEventListener("click", (event) => {
          this.item = document.getElementById(event.target.parentNode.id);
          this.menuOpened = true;
        });
      },
      createSubMenuAddBtn() {
        let menu_items = [...document.querySelectorAll("[ms-header]")];
        menu_items.forEach((item) => {
          let sum = document.getElementById("submenu");
          this.addsubmenu_btn.textContent = "ADD SUBMENU";
          this.addsubmenu_btn.setAttribute("id", "addsubmenu_element");
          this.addsubmenu_btn.setAttribute(
            "class",
            "w-2/6 h-6 absoulte top-72 float-right bg-green-400 border border-gray-200 text-black rounded hover:bg-green-600"
          );
          if (sum != null) {
            sum.appendChild(this.addsubmenu_btn);
          }
        });
      },
      clickSubMenuAddBtn() {
        this.addsubmenu_btn.addEventListener("click", (event) => {
          this.item = document.getElementById(event.target.parentNode.id);
          this.menuOpened = true;
        });
      },
      newMenu(value) {
        console.log(value);
        this.a.textContent = value;
        this.a.setAttribute("id", value);
        this.a.setAttribute("href", value);
        document.body.appendChild(this.a);
      },
    },
    mounted: function () {
      this.getHeader(this.number);
      this.showEditAndDelete();
      this.addEditAndDelete();
      this.createAddBtn();
    },
  };

  // TODO:
  // Create a new Editor for adding menus and submenus.
  // You should be able to add different submenus with the editormenu.
  // Be able to add links from the menu to any editable element from the header.
  // Use your editor to edit already existing menus and submenus.
  // Maybe create a footer.
  //
</script>

<style>
  [ms-menu-item]:hover {
    box-shadow: inset 0 0 0 1px #0bb783, 0 0 0 2px #0bb783;
    border-radius: 2px;
    cursor: pointer;
  }
</style>
