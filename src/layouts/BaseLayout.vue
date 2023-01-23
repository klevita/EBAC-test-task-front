<template>
    <div class="body-wrapper">
        <div class="head"></div>
        <div class="wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped lang="scss">
$head-height:56px;
.head {
    height: $head-height;
    background-color: #0B0B4D;
}
.wrapper{
    min-height:calc(100vh - $head-height);
    background-color: #E0E0E0;
}
</style>
