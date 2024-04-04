function fetchGitHubIssues(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/repos/Hex-Dragon/PCL2/issues?q=is%3Aissue+');
  xhr.onload = function () {
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
      console.error('请求 GitHub 数据失败：', xhr.status);
    }
  };
  xhr.send();
}

// 使用 Chart.js 生成条形统计图
function generateChart(labelsCount) {
  const ctxType = document.getElementById('issueTypeChart').getContext('2d');
  const _ = new Chart(ctxType, {
    type: 'bar',
    data: {
      labels: Object.keys(labelsCount),
      datasets: [{
        label: 'Issue 数量',
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
  const ctx = document.getElementById('issueTypeChart').getContext('2d');
  const chart2 = new Chart(ctxType, {
    type: 'bar',
    data: {
      labels: Object.keys(labelsCount),
      datasets: [{
        label: 'Issue 数量',
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
document.addEventListener('DOMContentLoaded', function () {
  fetchGitHubIssues(generateChart);
});
