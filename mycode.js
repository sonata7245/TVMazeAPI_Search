const form = document.querySelector('#searchForm');
const resultsWrapper = document.querySelector('#results');

function clearResults() {
    while (resultsWrapper.lastElementChild) {
        resultsWrapper.removeChild(resultsWrapper.lastElementChild);
    }
}


const displayResults = (shows) => {
    clearResults();
    try {

        for (let result of shows) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('p');

            img.src = result.show.image.medium;
            title.innerText = result.show.name;
            div.append(img);
            div.append(title);
            resultsWrapper.append(div);

        }
    }
    catch (e) {
        console.log("error", e)
    }
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    displayResults(res.data);
})

