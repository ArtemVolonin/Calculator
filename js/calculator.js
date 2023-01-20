let DivButtons = document.querySelector(".buttons");
let arBtn = document.querySelectorAll(".btn");
let main_string = document.querySelector(".main_string");
let main_primer = document.querySelector(".main_primer");
let znak = '';

arBtn.forEach(btn => {
    //  console.log(btn);
    btn.addEventListener("mousedown", function () {
        btn.classList.add("keydown");
    })

    btn.addEventListener("mouseup", function () {
        btn.classList.remove("keydown");
    })
    btn.addEventListener("mouseleave", function () {       
        btn.classList.remove("keydown");
    })
   
        btn.addEventListener("click", function() {  
            if (main_string.textContent == "0")  main_string.textContent = '';        
        main_string.textContent +=  btn.textContent;
         })
});
document.querySelector(".buttons").addEventListener("click", function(e){
    const avent = e.target.dataset.action;
    if (avent) {ActionGo[avent](); }
})

let ActionGo = {
    reset(){ main_string.textContent = "0"; znak='';  main_primer.textContent =''},
    delenie(){ 
        main_primer.textContent = main_string.textContent;
        main_string.textContent = '0';
        znak = "/";
    },
    ravno(){
        main_primer.textContent += main_string.textContent;
         main_string.innerHTML = main_primer.textContent ;}   
}

/* console.log(arButtons); */