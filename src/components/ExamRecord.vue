<<template>
    <div v-for="i, index in records" :key="i.id" class="menu-item group"
        :class="activeArea == index ? 'active-menu-item' : ''" @click="activeArea = index">
        <icon class="icon mx-3 text-xl group-hover:text-white" name="folder-1" :color="activeIcon" />
        <span class="flex-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{ i.qustionsContent }}</span>
        <icon class="icon edit-icon mx-3 text-xl group-hover:text-white" name="edit-2" :color="activeIcon"
            v-show="activeArea == index" />
    </div>
    <!-- <div class="menu-item group">
            <icon class="icon mx-3 text-xl group-hover:text-white" name="add-circle"
                :color="activeIcon" />
            <span class="flex-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">创建新题库</span>
        </div> -->
    <!-- <div class="mt-4">
                <span class="cursor-pointer hover:text-blue-300">删除</span>
                |
                <span class="cursor-pointer hover:text-blue-300">合并</span>
            </div> -->
</template>
<script setup>
import { ref, watch } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';
const props = defineProps({
    records: {
        type: Array,
        default: () => [
            {
                examId: 8,
                examStatus: "1",
                qustions: "30,31,32,33,34,35,38,39,40",
                qustionsContent: "小学数学选择题",
                type: '文件出题'
            }, {
                type: '知识点出题',
                examId: 9,
                examStatus: "2",
                qustions: "30,31,32,33,34,35,38,39,40",
                qustionsContent: "英语考研题"
            }]
    }
})
const emit = defineEmits(['change'])
const activeArea = ref(0)
const activeIcon = (index) => activeArea.value == index ? '#ffffff' : '#2F3CF4'
watch(activeArea, () => {
    emit('change', props.records[activeArea.value])
})
</script>
    <style lang="scss" scoped></style>