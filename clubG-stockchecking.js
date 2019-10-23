var cheerio = require('cheerio');
var request = require('request');
var Slack = require('slack-node');

// 제고확인용 HTML 코드
var outstock = "not_stock"; // 반다이몰 제고 없음!
// var instock = "reserv_buy"; // 반다이몰 제고 있음!

// 슬랙 연결용 웹훅 코드
webhookUri = "";
var channel_input = ""


// 클럽G 제품의 웹주소를 입력하세요
// 예시: 1.PG 페넥스 2.RG 아스트레아F 3.MG 어메이징 엑시아 4.MG 샌드록 카이
var url1 = 'https://www.bandaimall.co.kr/display/goods.do?method=goods&goods_code=011453'
var url2 = 'https://www.bandaimall.co.kr/display/goods.do?method=goods&goods_code=009145'
var url3 = 'https://www.bandaimall.co.kr/display/goods.do?method=goods&goods_code=010053'
var url4 = 'https://www.bandaimall.co.kr/display/goods.do?method=goods&goods_code=012635'


// 메세지에 표현할 형태와 프로그램의 간격을 조절하세요!
var gundam = '' //클럽G 이름
var ADJ = ' / ' // 사이 간격,양식
interval = 10000; // 작동 간격 (10초 = 10000ms)


function slack_Noti (message){
 
    slack = new Slack();
    slack.setWebhook(webhookUri);
     
    slack.webhook({
        channel: channel_input,
        username: "webhookbot",
        text: gundam + ADJ + message
      }, function(err, response) {
        console.log(response.status);
      });
    
}

function slack_LINK (message){
 
    slack2 = new Slack();
    slack2.setWebhook(webhookUri);
     
    slack2.webhook({
        channel: channel_input,
        username: "webhookbot",
        text: "링크 바로가기: " + message
      }, function(err, response) {
        console.log(response.status);
      });
    
}
function reserve_finder() {
request(url2, function(error, response, html){
    if (error) {throw error};

    // console.log (html);

    var origintext = html;

    var iValue = origintext.indexOf(outstock);

        if(iValue != -1) {

            console.log ("제고 없음");
            // slack_Noti("제고 없음");

        } else {

            console.log ("제고 있음");
            slack_Noti("제고 있음");
            slack_LINK(url2);

        }

    });
}

setInterval(reserve_finder, interval);