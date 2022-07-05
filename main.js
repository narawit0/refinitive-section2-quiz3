const axios = require('axios').default;
const cheerio = require('cheerio');

async function initial() {
    const instance = axios.create({
        baseURL: 'https://codequiz.azurewebsites.net/',
        timeout: 1000,
        headers: {'Cookie': 'hasCookie=true'}
    });


    const result = await instance.get();
    const $ = cheerio.load(result.data);
    const scrapedData = [];

    $("table > tbody > tr").each((index, element) => {
        if (index === 0) return true;
        const tds = $(element).find("td");
        const fundName = $(tds[0]).text();
        const nav = $(tds[1]).text();
        const tableRow = { fundName, nav };

        scrapedData.push(tableRow);
    });

    for(const val of scrapedData) {
        if (val.fundName === process.argv[2]) {
            console.log(`Nav value for the fund name: ${val.fundName} is equal ${val.nav}`)
            process.exit();
        }
    }

    console.log("not found");
}

initial();