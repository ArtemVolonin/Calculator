let DivButtons = document.querySelector(".buttons");
//массив кнопок
let arBtn = document.querySelectorAll(".btn");
//экраны
let main_string = document.querySelector(".main_string");
let main_primer = document.querySelector(".main_primer");
let main_history = document.querySelector(".history_res");
let znak = '';
let a = '';
let b = '';
let finish = false;

const Digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.','00'];
const sign = ['*', '/', '-', '+', '%', '+/-', '=','<='];

function ClearAll() {
    a = '';
    znak = '';
    b = '';
    finish = false;
    main_string.textContent = '0';
    main_primer.textContent = '';
    //main_history.textContent = main_primer.textContent;
}
//навешиваем обработку событий на кнопки
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

    btn.addEventListener("click", function () {
        // если сложение более чем в несколько действий, то выполняем первое дейстивие
        if (sign.includes(btn.textContent)) {
        if (znak !== '' && a!=='' && b !== '') {
            RESULT(); // нажать равно
        }}
        if (main_string.textContent == "0" && btn.textContent !== '.' && !finish) main_string.textContent = '';

        //если нажата цифра - не знак то
        if (Digits.includes(btn.textContent)) {
            if (finish) {
               // ClearAll() ;
                if ( btn.textContent == '.') {main_string.textContent = '0';}
                else if (btn.textContent !== '00') { a = ''; b =''; main_string.textContent = ''; finish = false; znak='';}
            }

            main_string.textContent += btn.textContent;
            if (znak ==='') { a += btn.textContent;  console.log("a += btn.textContent")}  // запоминаем а
            else if (znak !== '') { b += btn.textContent };//запоминаем b
            console.log(a, b, 'Finish ='+finish, 'ZNAK '+znak);
        }
       // после вычисления и нажатого равно - если нажат знак применяем к результату если число - начинаем сначала
        if (finish) {
            //цифра
            // if (Digits.includes(btn.textContent)) {
            //             //ClearAll() ;
            //             if ( btn.textContent == '.')
            //                {main_string.textContent = '0';}  else main_string.textContent = '';
            //     if (znak ==='') { a += btn.textContent;  console.log("a_finish += btn.textContent")}  // запоминаем а
            //     console.log(a, b, 'Finish ='+finish, 'ZNAK '+znak);
            // }


              //если нажат знак тогда в а записывем первое число
            if (sign.includes(btn.textContent)) {
               a = main_string.textContent;
               b = '';
               znak = btn.textContent;
               finish = false;
               console.log(a, b, znak, "finish");
            }
        }
        //вытягиваем знак
        if (znak !== "="){
        const avent = btn.getAttribute("data-action"); //btn.target.dataset.action; //аттрибут data-action
        console.log(btn.getAttribute("data-action"))
        if (avent) {
            ActionGo[avent]();
        }
        } else znak = '';

    })
});
//вытягиваем знак
// document.querySelector(".buttons").addEventListener("click", function (e) {
//     const avent = e.target.dataset.action; //аттрибут data-action
//     console.log(e.target.dataset.action)
//     if (avent) {
//         ActionGo[avent]();
//     }
//     // else {main_string.textContent +=  btn.textContent;}
// })

let ActionGo = {
    reset() { ClearAll() },
    bsp() {
        console.log("back")
        if (main_string.textContent.length >1)
        {main_string.textContent = main_string.textContent.substring(0, main_string.textContent.length - 1);
         a = main_string.textContent;
        }
        else { main_string.textContent ='0'; ClearAll();}
    },
    delenie() {
        znak = "/";  
        main_string.textContent += znak;
    },
    umn() {
        znak = "*";  
        main_string.textContent += znak;
    },
    minus() {
        znak = "-";  
        main_string.textContent += znak;
    },
    plus() {
        znak = "+";  
        main_string.textContent += znak;
    },
    prc() {
        znak = "%";  
        main_string.textContent += znak;
    },

    ravno() {
        main_primer.textContent = main_string.textContent;
        RESULT()
    }
}

function RESULT() {
    if (b==='') b = a;
    main_primer.textContent = main_string.textContent;
    switch (znak) {
        case "/": { main_string.textContent = Math.round((+a) / (+b)*100)/100;  break;}
        case "+": { main_string.textContent =  Math.round(((+a) + (+b))*100)/100;  console.log(a, b, znak); break;}
        case "-": { main_string.textContent =  Math.round(((+a) - (+b))*100)/100;   console.log(a, b, znak); break;}
        case "%": { main_string.textContent = (Math.round(((+a) * 100)/(+b)*100)/100);  console.log(a, b, znak); break;}
        case "*": { main_string.textContent = Math.round((+a) * (+b)*100)/100;  console.log(a, b, znak); break;}
        case "00": { main_string.textContent = (+a) / (+b); console.log((+a) / (+b)); console.log(a, b, znak); break;}


    }
    znak = '';
    finish = true;
    a = main_string.textContent;
    main_history.textContent = main_primer.textContent+'='+main_string.textContent;
    console.log(a, b, znak, "ravno");
}

//слушатель клавиатуры
document.addEventListener("keydown", function(e){
    let k = e.key;
    //------Enter - Backspace ---
    if (e.key == "Enter") {k = "="};
    if (e.key == "Backspace") {k = "<="};

         arBtn.forEach(button => {
         if (button.textContent == k) {button.click(); };
        })

})


/* console.log(arButtons); */