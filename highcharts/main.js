var requestURL = "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc";
var $container = document.getElementById("container");

fetch(requestURL)
    .then(parseData)
    .then(renderChart);

function parseData(response) {
    return response.json().then(function(data) {
        var repositories = data.items;

        return repositories
            .map(function(repository) {
                return {
                    id: repository.id,
                    name: repository.name,
                    url: repository.html_url,
                    forks: repository.forks,
                    stars: repository.stargazers_count
                };
            })
            .slice(0, 10);
    });
}

function renderChart(repositories) {
    new Highcharts.Chart({
        title: {
            text: "Most Starred GitHub Repositories"
        },
        
        chart: {
            renderTo : $container,
            type: "column"
        },
        
        xAxis: {
            title: {
                text: "Repositories"
            },
            categories: repositories.map(function(repository) {
                return repository.name;
            })
        },

        yAxis: {
            title: {
                text: "Stars / Forks"
            }
        },

        plotOptions: {
            series: {
                cursor: "pointer",
                point: {
                    events: {
                        click: function () {
                            location.href = repositories[this.index].url;
                        }
                    }
                }
            }
        },

        series: [{
            name: "Stars",
            data: repositories.map(function(repository) {
                return repository.stars;
            })
        }, {
            name: "Forks",
            data: repositories.map(function(repository) {
                return repository.forks;
            })
        }]
    });
}
