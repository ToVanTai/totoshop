import * as conFig from "./../constants/config.js";
import * as callApi from "./../utils/callApi.js";

let ssulTag = conFig.$(".product__pagination > ul");
let sstotalPages = 8; //từ 5 trở xuống sẽ render khác
function testpaginationPr(totalPages, page) {
    let liTag = "";
    let activeli;
    if (totalPages > 5) {
        let beforePage = page - 1;
        let afterPage = page + 1;
        // if (page > 1) {
        //     liTag += `<li class="button prev" onclick ="wdPaginationPr(${totalPages},${
        //         page - 1
        //     })" >Prev</li>`;
        // }
        if (page > 2) {
            //=3 tro len  1 2'3'4
            liTag += `<li class="numb" onclick="wdPaginationPr(${totalPages},1)">1</li>`;
            if (page > 3) {
                //=4 1 ..3'4'5
                liTag += `<li class="dots">...</li>`;
            }
        }
        // 7
        if (page == totalPages) {
            beforePage = beforePage - 2;
        } else if (page == totalPages - 1) {
            beforePage = beforePage - 1;
        }
        // 8
        if (page == 1) {
            afterPage = afterPage + 2;
        } else if (page == 2) {
            afterPage = afterPage + 1;
        }
        for (let i = beforePage; i <= afterPage; i++) {
            // 6
            if (i > totalPages) {
                continue;
            }
            if (i == 0) {
                i = i + 1;
            }
            //3
            if (i == page) {
                activeli = "active";
            } else {
                activeli = "";
            }
            liTag += `<li class="numb ${activeli}" onclick="wdPaginationPr(${totalPages},${i})">${i}</li>`;
        }
        if (page < totalPages - 1) {
            //8   5'6'78
            if (page < totalPages - 2) {
                // 4'5'6...8
                liTag += `<li class="dots">...</li>`;
            }
            liTag += `<li class="numb" onclick="wdPaginationPr(${totalPages},${totalPages})">${totalPages}</li>`;
        }
        // if (page < totalPages) {
        //     liTag += `<li class="button next" onclick="wdPaginationPr(${totalPages},${
        //         page + 1
        //     })">Next</li>`;
        // }
    } else {
        if (page > 1) {
            //1
            liTag += `<li class="button prev" onclick ="wdPaginationPr(${totalPages},${
                page - 1
            })" >Prev</li>`;
        }
        for (let i = 1; i <= totalPages; i++) {
            if (i == page) {
                activeli = "active";
            } else {
                activeli = "";
            }
            liTag += `<li class="numb ${activeli}" onclick="wdPaginationPr(${totalPages},${i})">${i}</li>`;
        }
        if (page < totalPages) {
            //2
            liTag += `<li class="button next" onclick="wdPaginationPr(${totalPages},${
                page + 1
            })">Next</li>`;
        }
    }
    ulTag.innerHTML = liTag;
}
// window.wdPaginationPr = paginationPr;
// wdPaginationPr(totalPages, 5);
//cach 2:
// function ppaginationPr(totalPages, page) {
//     console.log("hi");
//     let liTag = "";
//     let activeLi;
//     if (totalPages > 5) {
//         let beforePage = page - 1;
//         let afterPage = page + 1;
//         if (page > 1) {
//             liTag += `<li onclick="WdPaginationPr(${totalPages},${
//                 page - 1
//             })" class="button prev">Prev</li>`;
//         }
//         if (page > 2) {
//             liTag += `<li onclick="WdPaginationPr(${totalPages},1)" class="numb">1</li>`;
//             if (page > 3) {
//                 liTag += `<li class="dots">...</li>`;
//             }
//         }
//         if (page == 1) {
//             beforePage++;
//             afterPage++;
//         }
//         if (page == totalPages) {
//             beforePage--;
//             afterPage--;
//         }
//         for (let i = beforePage; i <= afterPage; i++) {
//             if (i == page) {
//                 activeLi = "active";
//                 liTag += `<li  class="numb ${activeLi}">${i}</li>`;
//             } else {
//                 activeLi = "";
//                 liTag += `<li onclick="WdPaginationPr(${totalPages},${i})" class="numb ${activeLi}">${i}</li>`;
//             }
//         }
//         if (page < totalPages - 1) {
//             if (page < totalPages - 2) {
//                 liTag += `<li class="dots">...</li>`;
//             }
//             liTag += `<li onclick="WdPaginationPr(${totalPages},${totalPages})" class="numb">${totalPages}</li>`;
//         }
//         if (page < totalPages) {
//             liTag += `<li onclick="WdPaginationPr(${totalPages},${
//                 page + 1
//             })" class="button next">Next</li>`;
//         }
//     }
//     ulTag.innerHTML = liTag;
// }
