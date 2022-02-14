<template>
    <div id="app">
        <context-menu :display="showContextMenu" ref="menu">

        <ul>
            <li ref="number" @click="numberm($event)" value="1">List item 1</li>
        </ul>

        <ul>
            <li ref="number" @click="numberm($event)" value="2">List item 2</li>
        </ul>
        </context-menu>

        <button v-on:click.right.prevent="openContextMenu">activate context menu</button>
    </div>
</template>


<script>
import ContextMenu from '../components/ContextMenu.vue';

export default {
    components: {
        ContextMenu,
    },
    data() {
        return {showContextMenu: false}
    },
    methods: {
        openContextMenu(e) {
            this.$refs.menu.open(e);
        },
        numberm(event){
            console.log(event.target.value);
            switch (this.$refs.number.value) {
                case 1:
                    console.log('Hello 1');
                    break;

                    case 2:
                        console.log('Hello 2');
            
                    break;
                default:
                    break;
            }
        }
    }


}
</script>