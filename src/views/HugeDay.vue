<template>
    <div class="box">
        <span class="class1">{{ hugeDay }} </span>
        <div class="box1">
            <span class="class2">{{ hugeDay }} </span>
        </div>
    </div>
</template>
<script setup>
defineProps({
    hugeDay: {
        type: Number
    }
})
</script>
<style scoped>
.box {
    position: absolute;
    left: 1em;
    height: 200px;
    width: 200px;
    bottom: -92px;
}
.class1, .class2{ 
    font-size: 5em;
    line-height: 200px;
}
.class2 {
    color: white;
    vertical-align: bottom;

}
.box1{
    position: absolute;
    overflow: hidden;
    top: 0;
    height: 105px;
}
</style>