<template>
    <h1>Hello</h1>
</template>


<script>
export default {
    methods: {
        downloads() {
        var fileContent = "My epic novel that I don't want to lose.";
        var bb = new Blob([fileContent ], { type: 'text/plain' });
        var a = document.createElement('a');
        a.download = 'download.txt';
        a.href = window.URL.createObjectURL(bb);
        a.click();
        }
    },
    created() {
        this.downloads()
    }
}



</script>