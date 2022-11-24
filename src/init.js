

//make all styles use border-box, for easier size calculations
document.head.insertAdjacentHTML("beforeEnd", "<style>*{box-sizing:border-box}</style>");


//make the content cover the web page vertically 100% without scrollbars
let htmlElement = document.getElementsByTagName("html")[0];
htmlElement.style.height = "100%";
htmlElement.style.margin = 0;
document.body.style.height = "100%";
document.body.style.margin = 0;
