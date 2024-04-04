function fetchAllIssues(url, issues = [], callback) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Network response was not ok: " + response.statusText
                );
            }
            // 解析link头部，用于分页
            const linkHeader = response.headers.get("link");
            let nextPageLink = null;
            if (linkHeader) {
                const links = linkHeader.split(",");
                const linkContainNext = links.find((link) =>
                    link.includes('rel="next"')
                );
                if (linkContainNext != undefined) {
                    nextPageLink = linkContainNext
                        .split(";")[0]
                        .trim()
                        .slice(1, -1);
                }
            }
            return response.json().then((data) => {
                const combinedIssues = issues.concat(data);
                if (nextPageLink) {
                    return fetchAllIssues(
                        nextPageLink,
                        combinedIssues,
                        callback
                    );
                } else {
                    callback(combinedIssues);
                }
            });
        })
        .catch((error) => console.error("Fetching issues failed:", error));
}

// 使用Chart.js生成条形统计图
function generateChart(labelsCount) {
    const ctx = document.getElementById("issuesChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(labelsCount),
            datasets: [
                {
                    label: "Issue数量",
                    data: Object.values(labelsCount),
                    backgroundColor: "rgba(0, 123, 255, 0.5)",
                    borderColor: "rgba(0, 123, 255, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function handleIssuesData(issues) {
    const labelsCount = {};
    issues.forEach((issue) => {
        issue.labels.forEach((label) => {
            labelsCount[label.name] = (labelsCount[label.name] || 0) + 1;
        });
    });
    generateChart(labelsCount);
}
document.addEventListener("DOMContentLoaded", () => {
    const issuesUrl =
        "https://api.github.com/repos/Hex-Dragon/PCL2/issues?per_page=100&state=all";
    fetchAllIssues(issuesUrl, [], handleIssuesData);
});
