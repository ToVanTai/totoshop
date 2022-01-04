import { httpGetMethod } from "./../utils/callApi.js";
import getParams from "./../utils/getParams.js";
let params = getParams();
if (params.name && params.type) {
    async function onRenderPolicy() {
        try {
            let url = `${params.type}?name=${params.name}`;
            let policyPm = new Promise((res, rej) => {
                httpGetMethod(url, res, rej);
            });
            policyPm.then((res) => {
                let resData = JSON.parse(res.responseText);
                renderPolicy(resData[0]);
            });
            await policyPm;
        } catch {}
    }
    onRenderPolicy();
}
function renderPolicy(data) {
    let policyHeading = document.querySelector(".policy__heading p");
    policyHeading.innerHTML = `${data.name} totoshop`;
    let policyTime = document.querySelector(".policy__time p");
    let created = new Date(data.createdAt);
    policyTime.innerHTML = `Đăng bởi <b>${
        data.poster
    }</b> on <b>${created.getDate()}-${
        created.getMonth() + 1
    }-${created.getFullYear()}</b>`;
    let policyContent = document.querySelector(".policy__content");
    policyContent.innerHTML = "";
    if (data.img) {
        policyContent.innerHTML = `<img src="${data.img}" alt="">`;
    }
    if (data.imgs) {
        for (let i = 0; i < data.imgs.length; i++) {
            policyContent.innerHTML += `<img src="${data.imgs[i].img}" alt="">`;
        }
    }
}
