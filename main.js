function fetchGitHubIssues(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/repos/Hex-Dragon/PCL2/issues?q=is%3Aissue+');
  xhr.onload = function() {
    if (xhr.status === 200) {
      const issues = JSON.parse(xhr.responseText);
      const labelsCount = {};
      issues.forEach(issue => {
        issue.labels.forEach(label => {
          labelsCount[label.name] = (labelsCount[label.name] || 0) + 1;
        });
      });
      callback(labelsCount);
    } else {
      console.error('请求GitHub数据失败：', xhr.status);
    }
  };
  xhr.send();
}

// 使用Chart.js生成条形统计图
function generateChart(labelsCount) {
  const ctx = document.getElementById('issuesChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(labelsCount),
      datasets: [{
        label: 'Issue数量',
        data: Object.values(labelsCount),
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  fetchGitHubIssues(generateChart);
});
