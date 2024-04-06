function csscolor(key) {
    const element = document.querySelector("body");
    const style = window.getComputedStyle(element);
    const cssVariableValue = style.getPropertyValue(key);
    return cssVariableValue;
}

export const genIssuesData = (issues) => {
    const labelsCount = {};
    issues.forEach((issue) => {
        issue.labels.forEach((label) => {
            labelsCount[label.name] = (labelsCount[label.name] || 0) + 1;
        });
    });
    const pieChartData = {
        Bug: labelsCount["· Bug"] ?? 0,
        优化: labelsCount["· 优化"] ?? 0,
        新功能: labelsCount["· 新功能"] ?? 0,
    };
    const barChartData = {
        待处理: labelsCount["待处理"] ?? 0,
        处理中: labelsCount["处理中"] ?? 0,
        等待反馈者: labelsCount["等待反馈者"] ?? 0,
        投票中: labelsCount["投票中"] ?? 0,
        重要: labelsCount["重要"] ?? 0,
        破坏性改动: labelsCount["破坏性改动"] ?? 0,
        推迟: labelsCount["推迟"] ?? 0,
        第三方: labelsCount["第三方"] ?? 0,
        需要社区帮助: labelsCount["需要社区帮助"] ?? 0,
        需要社区复现: labelsCount["需要社区复现"] ?? 0,
    };
    const barChart2Data = {
        完成: labelsCount["完成"] ?? 0,
        忽略: labelsCount["忽略"] ?? 0,
        重复: labelsCount["重复"] ?? 0,
        "拒绝 / 放弃": labelsCount["拒绝 / 放弃"] ?? 0,
    };
    return [pieChartData, barChartData, barChart2Data];
};

export const genChart11 = (pieChartData) => {
    const ctx = document.getElementById("typeView");
    const pieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(pieChartData),
            datasets: [
                {
                    data: Object.values(pieChartData),
                    backgroundColor: [
                        `rgba(${csscolor("--orange-6")}, 0.5)`,
                        `rgba(${csscolor("--lime-6")}, 0.5)`,
                        `rgba(${csscolor("--pinkpurple-6")}, 0.5)`,
                    ],
                    borderColor: [
                        `rgba(${csscolor("--orange-6")}, 1)`,
                        `rgba(${csscolor("--lime-6")}, 1)`,
                        `rgba(${csscolor("--pinkpurple-6")}, 1)`,
                    ],
                    borderWidth: 1,
                },
            ],
        },
    });
    return pieChart;
};

export const genChart121 = (barChartData) => {
    const ctx = document.getElementById("totalView");
    const barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(barChartData),
            datasets: [
                {
                    label: "Issue 量",
                    data: Object.values(barChartData),
                    backgroundColor: [
                        `rgba(${csscolor("--yellow-6")}, 0.5)`,
                        `rgba(${csscolor("--yellow-6")}, 0.5)`,
                        `rgba(${csscolor("--purple-6")}, 0.5)`,
                        `rgba(${csscolor("--arcoblue-6")}, 0.5)`,
                        `rgba(${csscolor("--magenta-6")}, 0.5)`,
                        `rgba(${csscolor("--magenta-6")}, 0.5)`,
                        `rgba(${csscolor("--gray-6")}, 0.5)`,
                        `rgba(${csscolor("--gray-6")}, 0.5)`,
                        `rgba(${csscolor("--magenta-6")}, 0.5)`,
                        `rgba(${csscolor("--magenta-6")}, 0.5)`,
                    ],
                    borderColor: [
                        `rgba(${csscolor("--yellow-8")}, 1)`,
                        `rgba(${csscolor("--yellow-8")}, 1)`,
                        `rgba(${csscolor("--purple-8")}, 1)`,
                        `rgba(${csscolor("--arcoblue-8")}, 1)`,
                        `rgba(${csscolor("--magenta-8")}, 1)`,
                        `rgba(${csscolor("--magenta-8")}, 1)`,
                        `rgba(${csscolor("--gray-8")}, 1)`,
                        `rgba(${csscolor("--gray-8")}, 1)`,
                        `rgba(${csscolor("--magenta-8")}, 1)`,
                        `rgba(${csscolor("--magenta-8")}, 1)`,
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
    return barChart;
};

export const genChart122 = (barChartData) => {
    const ctx = document.getElementById("cancelView");
    const barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(barChartData),
            datasets: [
                {
                    label: "Issue 量",
                    data: Object.values(barChartData),
                    backgroundColor: [
                        `rgba(${csscolor("--green-6")}, 0.5)`,
                        `rgba(${csscolor("--gray-6")}, 0.5)`,
                        `rgba(${csscolor("--gray-6")}, 0.5)`,
                        `rgba(${csscolor("--red-6")}, 0.5)`,
                    ],
                    borderColor: [
                        `rgba(${csscolor("--green-8")}, 1)`,
                        `rgba(${csscolor("--gray-8")}, 1)`,
                        `rgba(${csscolor("--gray-8")}, 1)`,
                        `rgba(${csscolor("--red-8")}, 1)`,
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
    return barChart;
};