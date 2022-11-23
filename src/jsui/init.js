

//make all styles use border-box, for easier size calculations
document.head.insertAdjacentHTML("beforeEnd", "<style>*{box-sizing:border-box;}</style>");


//make the html and body elements cover 100% of height
let htmlElement = document.getElementsByTagName("html")[0];
htmlElement.style.height = "100%";
document.body.style.height = "100%";
