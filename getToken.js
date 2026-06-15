const fs = require('fs');
const path = require('path');

// 1. 여기에 복사하신 값을 넣어주세요!
const CLIENT_ID = "AYhXQpJLtU6_PNb61jzWK84ot_NvJYrzveZI5Y7eJ-OBf8Un-ON5jA_5PFWighqsUl1Gj0VmaLg-WNdn";
const CLIENT_SECRET = "EBx-UDN295EYkKO2yseu7-uyiQ6IVZ0jF32ZeCth5RM8JkdACduuscv4lwSQ7mOPpeBTJ3K_Sih6DTsV";

async function getAccessToken() {
    if (CLIENT_ID === "여기에_Client_ID_입력" || CLIENT_SECRET === "여기에_Secret_입력") {
        console.log("❌ 오류: getToken.js 파일 안에 Client ID와 Secret을 먼저 입력해주세요!");
        return;
    }

    try {
        console.log("🔄 페이팔에서 Access Token을 발급받는 중...");
        const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
        
        const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials"
        });
        
        const data = await response.json();
        
        if (data.access_token) {
            console.log("\n✅ 성공! 아래의 토큰이 사장님의 PAYPAL_ACCESS_TOKEN 입니다:\n");
            console.log(data.access_token);
            console.log("\n(이 값을 mcp.json 파일의 PAYPAL_ACCESS_TOKEN 부분에 붙여넣어 주세요.)");
        } else {
            console.log("❌ 발급 실패:", data);
        }
    } catch (error) {
        console.error("❌ 에러 발생:", error.message);
    }
}

getAccessToken();
