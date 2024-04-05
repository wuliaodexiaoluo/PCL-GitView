export const fetchAllIssues = () => {
    return new Promise((resolve, reject) => {
        const pat = process.env.VUE_APP_GITHUB_PAT
        console.log(pat) // TODO: Remove this [Debug Line]
        const fetchIssues = (url, issues) => {
            fetch(url, {
                headers: {
                    Authorization:
                        `token ${pat}`,
                },
            })
                .then(async (response) => {
                    if (!response.ok) {
                        reject({
                            status: response.status,
                            message: "Error on fetch data",
                        });
                    }
                    // Prase Link Header, For Paging
                    const linkHeader = response.headers.get("link");
                    let nextPageLink = null;
                    if (linkHeader) {
                        const links = linkHeader.split(",");
                        const linkContainNext = links.find((link) =>
                            link.includes('rel="next"')
                        );
                        if (linkContainNext != undefined) {
                            // Verify whether there is the nextpage url, if yes, prase the url
                            nextPageLink = linkContainNext
                                .split(";")[0]
                                .trim()
                                .slice(1, -1);
                        }
                    }
                    const data = await response.json();
                    const combinedIssues = issues.concat(data);
                    if (nextPageLink) {
                        fetchIssues(nextPageLink, combinedIssues);
                    } else {
                        resolve(combinedIssues);
                    }
                })
                .catch((error) => {
                    reject({
                        status: 0,
                        message: "Fetching issues failed: " + error.message,
                    });
                });
        };
        fetchIssues(
            "https://api.github.com/repos/Hex-Dragon/PCL2/issues?per_page=100&state=all",
            []
        );
    });
};
