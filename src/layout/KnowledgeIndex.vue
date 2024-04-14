<template>
  <div id="KnowledgeIndex">
    <t-layout>
      <t-header class="menu-header">
        <t-head-menu value="item1" class="font-small" style="cursor:pointer;">
          <router-link to="index">
            <icon class="icon" name="chevron-left" color="#2F3CF4" style="margin-right: 24px;font-size: 40px;" />
          </router-link>
          知识图谱
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside width="15%" class="myexam-left-side" style="border-top: 1px solid var(--component-border)">
          <t-menu v-model="activeAreas" class="myexam-subjects-items" theme="light" value="dashboard" style="margin-right: 74px;width:100%;border-radius: 0px 32px 0px 0px;">
            <t-menu-item class="subjects-item" :class="{ active:activeAreas === areas.areasName }" :key="index" v-for="areas,index in atlasData" :value="areas.areasName">
              <icon class="icon" name="folder-1" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
              <span style="flex: 1;">{{ areas.areasName }}</span>
              <icon class="icon edit-icon" :class="{ active:activeAreas === areas.areasName }" name="edit-2" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
            </t-menu-item>
            <t-menu-item class="subjects-item"  value="创建新题库">
              <icon class="icon" name="add-circle" color="#2F3CF4" style="margin: 0 10px;font-size: 20px;"/>
              <span>创建新题库</span></t-menu-item>
          </t-menu>
        </t-aside>
        <t-layout>
          <t-content>
            <div class="knowledgeGraph-main-content">
              <div ref="networkContainer" style="height: 800px;width:800px"></div>
            </div>
          </t-content>
          <t-footer></t-footer>
        </t-layout>
        <t-aside class="myexam-menu-side" style="border-top: 1px solid var(--component-border)">
          <div title="出卷组题" class="myexam-menu-side-item"><icon title="出卷组题" name="article" ></icon></div>
          <div title="二级——所有迁移" class="myexam-menu-side-item"><icon title="二级——所有迁移" name="folder-import" ></icon></div>
          <div title="删除" class="myexam-menu-side-item"><icon title="删除" name="delete" ></icon></div>
        </t-aside>
        <t-aside class="myexam-date-side" width="15%" style="border-top: 1px solid var(--component-border)">
          
        </t-aside>
      </t-layout>
    </t-layout>
  </div>
</template>
<script setup>
import {  ref,onMounted,watch  } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
import * as d3 from 'd3';
const networkContainer = ref(null);

const atlasData = ref([]);
const activeAreas = ref('小学');

const contentData = ref({});
const transformData = () => {
  
}
const buildGraphData = () =>  {
  const data = {
    nodes: [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
    ],
    links: [
      { source: 1, target: 2 },
      { source: 1, target: 3 },
    ],
  };
  const container = networkContainer.value;
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  const simulation =  d3.forceSimulation(data.nodes)
    .force('link', d3.forceLink(data.links)
      .id(d => d.id)
      .distance(100) // 调整连接线的距离
    )
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(10).strength(100)); // 添加节点碰撞力


  data.nodes.forEach((node, index) => {
    node.x = simulation.nodes()[index].x;
    node.y = simulation.nodes()[index].y;
  });

  const link = svg.selectAll('line')
  .data(data.links)
  .join('path')
  .attr('stroke', 'gray')
  .attr('fill', 'none')
    
  const node = svg.selectAll('g')
    .data(data.nodes)
    .join('g')
    .call(drag(simulation))

  const circle = node.append('circle')
    .attr('r', 5);

  const text = node.append('text')
    .text((d) => d.label)
    .style('font-size', '16px')
    .style('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em');

  node.each(function () {
    const nodeWidth = this.getBBox().width + 3;
    circle.attr('r', nodeWidth / 2);
    text.attr('x', 0).attr('y', 0).attr('transform', `scale(${nodeWidth / 100},${nodeWidth / 100})`);
  });
  let nodeWeights = Array(data.nodes.length).fill(0);
  data.links.forEach(link => {
    let source = link.source.id;
    if (!nodeWeights[source]) {
      nodeWeights[source] = 0;
    }
    nodeWeights[source] += 1;
  });
  let maxValue = Math.max(...nodeWeights);
  let minValue = Math.min(...nodeWeights);
  nodeWeights = nodeWeights.map((weight) => (weight - minValue) / (maxValue - minValue));
  simulation.on('tick', () => {
    link.attr('d', (d) => {
      const path = d3.path();
      path.moveTo(d.source.x, d.source.y);
      path.quadraticCurveTo(
        (d.source.x + d.target.x) / 2, // 控制点的x坐标
        d.source.y, // 控制点的y坐标
        d.target.x, d.target.y
      );
      return path.toString();
    });
    node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    node.attr('fill', d => {
      const nodeWeight = nodeWeights[d.id] || 0;
        if (nodeWeight >= 0.8) {
          return 'orange'; 
        } else if (nodeWeight >=  0.5) {
          return 'yellow'; 
        } else {
          return 'gray'; 
        }
    });
  });

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }
}
const loadNetwork = () => {
  
}
const fetchApiData = async () => {
  try {
    const response = await fetch('/api/reviewmaster/atlas/list');
    const data = await response.json();
    if(data.code === 200) {
      atlasData.value = data.data;
    }
  } catch (error) {
    console.error('Error fetching API data:', error);
  }
};
watch(activeAreas, (newValue) => {
  contentData.value = atlasData.value.find(item => item.areasName === newValue);
  transformData()
});
onMounted(() => {
  fetchApiData()
  loadNetwork()
  buildGraphData()
})

</script>

<style>
.t-icon {
  cursor: pointer;
}
#KnowledgeIndex {

}
#KnowledgeIndex .menu-header{
  height: 82px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
#KnowledgeIndex .menu-header .t-menu {
  font-size: var(--td-size-7);
}
#KnowledgeIndex .t-menu__item {
  user-select: none;
  color:#000;
  height:53px;
  font-size: var(--td-size-6);
  margin: 12.5px 0;
  border: solid 1px  #4566FC;
  border-radius: 16px;
  transition: .3s;
}
#KnowledgeIndex .t-menu__item .t-menu__content {
  display: flex;
  width:100%;
  align-items: center;
}
#KnowledgeIndex .t-menu__item.t-is-active,
#KnowledgeIndex .t-menu__item:hover{
  transition: .3s;
  color:#fff;
  opacity: 1;
  border-radius: 16px;
  background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
}
#KnowledgeIndex .t-menu__item.t-is-active .icon ,
#KnowledgeIndex .t-menu__item:hover .icon{
  color:#fff;
}
#KnowledgeIndex .t-menu__item.t-is-active .edit-icon {
  display: inline-block;
}
#KnowledgeIndex  .edit-icon {
  display: none;
}
#KnowledgeIndex .myexam-left-side{
  left: 0px;
  opacity: 1;
  position: sticky;
  border-radius: 0px 32px 0px 0px;
  padding-top: 25px;
  min-height: 100vh;
  background: rgba(255, 255, 255, 1);
}
#KnowledgeIndex  .knowledgeGraph-main-content {
  background: #fff;
  margin-left: 80px;
  height: 100%;
  padding: 20px 20px;
  border-radius: 32px 32px 0px 0px;
}

#KnowledgeIndex .myexam-menu-side {
  background: none;
  position: sticky;
  top: 54vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 340px;
  width: 100px;
  display: flex;
}
#KnowledgeIndex .myexam-menu-side-item {
  border-radius:50%;
  background: #fff;
  color: #575B66;
  width: 64px;
  font-size: var(--td-size-9);
  margin: 20px 40px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
}

#KnowledgeIndex  .myexam-date-side {
  border-radius: 32px 0px 0px 0px;
}
</style>