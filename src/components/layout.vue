<template>
    <div>
        <app-header></app-header>
        <app-main></app-main>
        <app-navbar></app-navbar>
        
        
    </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppMain from './AppMain'
import AppNavbar from './AppNavbar'
export default {
    data() {
        return {};
    },
    components:{
        AppHeader,
        AppMain,
        AppNavbar
    }
};
</script>

<style lang='stylus'>
.header {
    position: absolute;
    line-height: 50px;
    height: 50px;
    background-color: #2d3a4b;
    top: 0px;
    left: 0px;
    right: 0px;
}

.navbar {
    position: absolute;
    width: 230px;
    top: 50px;
    background-color: #545c64;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
}

.main {
    position: absolute;
    top: 50px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
}
</style>