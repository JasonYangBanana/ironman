const request = require('request')
const async = require('async')
const cheerio = require('cheerio')
let rawData = [];


const ironmans = [
    `https://ithelp.ithome.com.tw/users/20107705/ironman/1898`,
    `https://ithelp.ithome.com.tw/users/20111772/ironman/1902`,
    `https://ithelp.ithome.com.tw/users/20107697/ironman/1900`,
    `https://ithelp.ithome.com.tw/users/20107700/ironman/1901`,
    `https://ithelp.ithome.com.tw/users/20111959/ironman/1786`,
    `https://ithelp.ithome.com.tw/users/20107702/ironman/1904`,
    `https://ithelp.ithome.com.tw/users/20110801/ironman/1899`,
    `https://ithelp.ithome.com.tw/users/20107637/ironman/1927`,
    `https://ithelp.ithome.com.tw/users/20107701/ironman/1785`,
    `https://ithelp.ithome.com.tw/users/20112161/ironman/1905`,
    `https://ithelp.ithome.com.tw/users/20112158/ironman/1914`,
    `https://ithelp.ithome.com.tw/users/20110055/ironman/1920`,
    `https://ithelp.ithome.com.tw/users/20112096/ironman/1857`,
    `https://ithelp.ithome.com.tw/users/20103075/ironman/1921`,
    `https://ithelp.ithome.com.tw/users/20112307/ironman/1954`,
    `https://ithelp.ithome.com.tw/users/20112097/ironman/1858`,
    `https://ithelp.ithome.com.tw/users/20112383/ironman/1976`,
    `https://ithelp.ithome.com.tw/users/20112388/ironman/1978`,
    `https://ithelp.ithome.com.tw/users/20111529/ironman/1985`,
    `https://ithelp.ithome.com.tw/users/20112160/ironman/1988`,
    `https://ithelp.ithome.com.tw/users/20112157/ironman/1999`,
    `https://ithelp.ithome.com.tw/users/20112452/ironman/2002`
]

// async.map(ironmans, getInfo, (err, results) => {
//     rawData = results;
//     console.log(rawData)

// })

function getInfo(url, callback) {
    request(url, function (err, res, body) {
        var $ = cheerio.load(body)
        var link = url
        var name = $('.profile-header__name').text().trim()
        var title = $('.qa-list__title--ironman').text().trim().replace(' 系列', '')
        var joinDays = $('.qa-list__info--ironman span').eq(0).text().replace(/[^0-9]/g, '')
        var posts = $('.qa-list__info--ironman span').eq(1).text().replace(/[^0-9]/g, '')

        callback(null, {
            name, title, link, joinDays, posts
        });
    })
}



const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    async.map(ironmans, getInfo, (err, results) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json;charset=utf-8');
        res.end(JSON.stringify(results));
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
