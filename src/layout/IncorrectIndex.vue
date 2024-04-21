<template>
    <div class="h-[82px] flex mb-[32px] items-center bg-white">
        <t-head-menu value="item1" style="cursor:pointer;">
            <router-link to="index">
                <icon name="chevron-left" color="#2F3CF4" class="mr-6 text-4xl icon" />
            </router-link>
            错题本
        </t-head-menu>
    </div>
    <div class="h-full bg-primary flex mt-10 relative justify-between flex-nowrap overflow-auto">
        <div class="w-[15vw] bg-white rounded-xl p-4">
            <div v-for="i,index in atlasData" :key="i.id" class="menu-item group" :class="activeArea == index ? 'active-menu-item' : ''" @click="activeArea = index">
                <icon class="icon mx-3 text-xl group-hover:text-white" name="folder-1" :color="activeArea == index ? '#ffffff' : '#2F3CF4'" />
                <span class="flex-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{ i.areasName }}</span>
                <icon class="icon edit-icon mx-3 text-xl group-hover:text-white" name="edit-2" :color="activeArea == index ? '#ffffff' : '#2F3CF4'" v-show="activeArea == index"/>
            </div>
            <div class="menu-item group">
                <icon class="icon mx-3 text-xl group-hover:text-white" name="add-circle" :color="activeArea == index ? '#ffffff' : '#2F3CF4'" />
                <span class="flex-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">创建新题库</span>
            </div>
            <div class="mt-4">
                <span class="cursor-pointer hover:text-blue-300">删除</span>
                |
                <span class="cursor-pointer hover:text-blue-300">合并</span>
            </div>
        </div>
        <div class="bg-white w-[75vw] mr-10 rounded-xl">
            <Exam></Exam>
        </div>
    </div>
</template>

<script setup>
import { Icon } from 'tdesign-icons-vue-next';
import Exam from '@/components/Exam.vue';
import { ref } from 'vue'
const atlasData = ref([{
    areasName:'英语错题本'
},{
    areasName:'数学错题本'
}])
const activeArea = ref(0)
</script>

<style lang="scss">
.t-menu {
    font-size: var(--td-size-7);
}
.menu-item{
    @apply h-[52px] px-3 my-4 flex items-center justify-between border border-menu_border rounded-xl cursor-pointer hover:text-white relative transition duration-300;
    &:hover{
        background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
    }
}
.active-menu-item{
    @apply text-white;
    background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
}
</style>