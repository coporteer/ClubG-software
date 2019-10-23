var cheerio = require('cheerio');
var request = require('request');
var Slack = require('slack-node');

//  클럽지 확인용 HTML 코드

var detector = "출고될";

// 슬랙 연결용 웹훅 코드
webhookUri = "";

// 클럽G 사이트 주소
var url2 = "https://www.bandaimall.co.kr/premium/index.do";


//  양식데이터 
var gundam = '' //클럽G 이름
var ADJ = ' / ' // 사이 간격,양식

// 크롤링 주기
interval = 10000; // 작동 간격 (10초 = 10000ms)


function slack_Noti (message){
 
    slack = new Slack();
    slack.setWebhook(webhookUri);
     
    slack.webhook({
        channel: "",
        username: "webhookbot",
        text: message
      }, function(err, response) {
        console.log(response.status);
      });
    
    }

function slack_LINK (message){
 
    slack2 = new Slack();
    slack2.setWebhook(webhookUri);
     
    slack2.webhook({
        channel: "",
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

    var iValue = origintext.indexOf(detector);

        if(iValue != -1) {

            console.log ("클럽G 없음");
            // slack_Noti("제고 없음");

        } else {

            console.log ("클럽G 있음");
            slack_Noti("클럽G 있음");
            slack_LINK(url2);

        }

    });
}

setInterval(reserve_finder, interval);