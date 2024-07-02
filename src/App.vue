<script setup>
import PageHeader from "./components/PageHeader.vue";
import { fetchAllIssues } from "./common/fetchIssue";
import {
    genIssuesData,
    genChart11,
    genChart121,
    genChart122,
} from "./common/render.js";
import { nextTick, ref, reactive } from "vue";

const components = {
    PageHeader,
};

const isLoading = ref(true);

const chartData = reactive({
    pieChartData: {},
    barChartData: {},
    barChart2Data: {},
});

const charts = reactive({
    pieChart: null,
    barChart: null,
    barChart2: null,
});

localStorage.setItem("7d5f3327-btnDisabled", true);

nextTick(() => {
    const c11 = document.getElementById("view-11");
    const acb1 = document.getElementsByClassName("arco-card-body");
    c11.style.height = `${acb1[0].clientHeight}px`;
    for (let i = 1; i < acb1.length; i++) {
        acb1[i].style.display = "flex";
        acb1[i].style.justifyContent = "center";
        acb1[i].style.alignItems = "center";
    }
    gen();
});

const gen = () => {
    isLoading.value = true;
    fetchAllIssues()
        .then((data) => {
            [
                chartData.pieChartData,
                chartData.barChartData,
                chartData.barChart2Data,
            ] = genIssuesData(data);
            charts.pieChart = genChart11(chartData.pieChartData);
            charts.barChart = genChart121(chartData.barChartData);
            charts.barChart2 = genChart122(chartData.barChart2Data);
            isLoading.value = false;
            setTimeout(() => {
                localStorage.setItem("7d5f3327-btnDisabled", false);
            }, 3000);
        })
        .catch((status, msg) => {
            console.error(status, msg);
        });
};

const noRefetchReload = () => {
    localStorage.setItem("7d5f3327-btnDisabled", true);
    charts.pieChart.destroy();
    charts.pieChart = null;
    charts.barChart.destroy();
    charts.barChart = null;
    charts.barChart2.destroy();
    charts.barChart2 = null;
    nextTick(() => {
        charts.pieChart = genChart11(chartData.pieChartData);
        charts.barChart = genChart121(chartData.barChartData);
        charts.barChart2 = genChart122(chartData.barChart2Data);
        isLoading.value = false;
        setTimeout(() => {
            localStorage.setItem("7d5f3327-btnDisabled", false);
        }, 3000);
    });
};

const handleReload = () => {
    localStorage.setItem("7d5f3327-btnDisabled", true);
    charts.pieChart.destroy();
    charts.pieChart = null;
    charts.barChart.destroy();
    charts.barChart = null;
    charts.barChart2.destroy();
    charts.barChart2 = null;
    gen();
};
</script>

<template>
    <PageHeader @reload="handleReload" />
    <div class="container">
        <a-card class="Card1">
            <template #title>
                <span>总览</span>
                <a-tag
                    style="margin-left: 6px; transform: translateY(-2px)"
                    color="arcoblue"
                    loading
                    v-if="isLoading.valueOf()"
                    >正在加载</a-tag
                >
            </template>
            <div id="card1container">
                <div id="view-11">
                    <canvas id="typeView"></canvas>
                </div>
                <div id="view-12">
                    <div id="view-12-1">
                        <canvas id="totalView"></canvas>
                    </div>
                    <div id="view-12-2">
                        <canvas id="cancelView"></canvas>
                    </div>
                </div>
            </div>
        </a-card>
        <a-card class="Card2" title="今日新增">
            <a-result
                title="是鸽子在说话嘛?"
                subtitle="这部分还没开发好！咕~ 咕~ 咕~"></a-result>
        </a-card>
        <a-card class="Card3" title="open Issue 变化趋势">
            <a-result
                title="是鸽子在说话嘛?"
                subtitle="这部分还没开发好！咕~ 咕~ 咕~"></a-result>
        </a-card>
        <a-card class="Card4" title="这里放啥好呢？">
            <a-result
                title="是鸽子在说话嘛?"
                subtitle="这部分还没开发好！咕~ 咕~ 咕~"></a-result>
        </a-card>
    </div>
</template>

<style scoped lang="less">
.container {
    --pad: 40px;
    width: calc(100vw - var(--pad) - var(--pad));
    height: calc(100vh - 142.6px - var(--pad) - var(--pad));
    padding: var(--pad);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0 0;
    grid-auto-flow: row;
    grid-template-areas:
        "Card1 Card1 Card1 Card1 Card2"
        "Card3 Card3 Card3 Card4 Card4";
    .Card1 {
        grid-area: Card1;
        margin-right: 20px;
        margin-bottom: 20px;
        div#card1container {
            display: grid;
            grid-template-columns: 1fr 3fr;
            grid-template-rows: 1fr;
            gap: 0 16px;
            grid-template-areas: "view11 view12";
            div#view-11 {
                grid-area: view11;
                display: flex;
                justify-content: center;
            }
            div#view-12 {
                grid-area: view12;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr;
                grid-template-areas: "view121 view122";
                justify-content: center;
                align-items: center;
                gap: 16px;
                div#view-12-1 {
                    grid-area: view121;
                }
                div#view-12-2 {
                    grid-area: view122;
                }
            }
        }
    }
    .Card2 {
        grid-area: Card2;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    .Card3 {
        grid-area: Card3;
        margin-right: 20px;
        margin-top: 20px;
    }
    .Card4 {
        grid-area: Card4;
        margin-left: 20px;
        margin-top: 20px;
    }
}
</style>
