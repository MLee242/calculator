
const container = document.querySelector("#container");
const powerlight = container.getElementsByClassName('power')[0];
const buttons = document.querySelectorAll("button")
const screen = container.getElementsByClassName("number")[0];
const formuladisplay = container.getElementsByClassName("displayformula")[0];



let displaynumber = 0;
let prev = undefined;
let curr = 0;
let powerOn = false;
let operator = "";
let mode = false;
let disable = false;
let decimaldigit = false;

function add(x, y){
    return x + y;
}
function subtract(x,y){
    return x - y;
}
function multiply(x,y){
    
    return x * y;
}
function divide(x, y){
    if(y == 0){
        disable = true;
        return "NAN: Press AC"
        
    }
    return x/y;
}
function mod(x, y){
    if(y == 0){
        disable = true;
        return "NAN: Press AC";
        
    }
    return x%y;
}

function operate(x,y,op){

    if(op == '+'){
        return add(x,y);
    }else if(op == '-'){
        return subtract(x,y);
    }else if(op =='*'){
        return multiply(x,y);
    }else if(op == '/'){
        return divide(x,y);
    }else if(op == '%'){
        return mod(x,y);
    }
}


function checkstart(button){
    
    console.log(button.id);
    if(button.id == 21){
        if(!powerOn){
            powerOn = true;
            powerlight.style.backgroundColor="red";
            button.style.border = "2px solid rgb(249,166,179)";
            screen.textContent = `${displaynumber}`;
            const audio = document.querySelector(`audio[data-key="1"]`);
            if (!audio) return;;
            audio.currentTime = 0;
            audio.play();
            
        }else{
            powerOn = false;
            powerlight.style.backgroundColor='#b98181';
            button.style.border = "0px";
            screen.textContent = "";
            formuladisplay.textContent =" ";
            prev = curr = undefined;
            displaynumber = 0;
        }
    }
    if(powerOn && !disable){
        if(button.id == 1){
            settodefault();
        }else if(button.id == 2){
            if(curr != undefined){
                curr *= -1;
                displaynumber = curr;
            }else if(prev != undefined){
                prev *= -1;
                displaynumber = prev;
            }
            
        }else if(button.id == 3){
            setoperator('%');
        }else if(button.id == 4){
            setoperator('/');
        }else if(button.id == 5){
            updatenumber(7);
        }else if(button.id == 6){
            updatenumber(8);
        }else if(button.id == 7){
            updatenumber(9);
        }else if(button.id == 8){
            setoperator('*');
        }else if(button.id == 9){
            updatenumber(4);
        }else if(button.id == 10){
            updatenumber(5);
        }else if(button.id == 11){
            updatenumber(6);
        }else if(button.id == 12){
            setoperator('-');
        }else if(button.id == 13){
            updatenumber(1);
        }else if(button.id == 14){
            updatenumber(2);
        }else if(button.id == 15){
            updatenumber(3);
        }else if(button.id == 16){
            setoperator('+');
        }else if(button.id == 17){
            updatenumber(0);
        }else if(button.id == 18){
            
            if(!decimaldigit){
                if(curr == undefined){
                    curr = 0;
                }
                curr = curr + ".";
                displaynumber = curr;
                decimaldigit = true;
            }
            

        }else if(button.id == 19){
            formuladisplay.textContent = " ";
            evaluate();
        }else if(button.id == 20){
            backspace();
        }

        updateDisplay();
    }else if(powerOn && disable){
        if(button.id == 1){
            settodefault();
            disable = false;
            updateDisplay();
        }
        
    }


    button.blur();
}

function settodefault(){
    prev = undefined;
    curr = undefined
    displaynumber = 0;
    operator = "";
    mode = false;
    decimaldigit = false;
    formuladisplay.textContent =" ";
}
function evaluate(){
    
    if(operator == ""){
        prev = curr = displaynumber;
        curr = undefined;
        return;
    }
    if(curr == undefined){
        curr = prev;
    }

    
    prev = parseFloat(prev);
    curr = parseFloat(curr);

    prev = operate(prev, curr, operator);
    displaynumber = prev;
    curr = undefined;
    operator = "";
    
    mode = false;
    decimaldigit = false;
}

function setoperator(op){

    
    if(!mode){
        mode = true;
        formuladisplay.textContent += ` ${displaynumber}`;
        formuladisplay.textContent += ` ${op}`;
        let str = formuladisplay.textContent
        if(str.length > 43){
            let dif = str.length - 43;
            formuladisplay.textContent = str.substring(dif, str.length)
        }
        operator = op;
        if(prev != undefined && curr != undefined){
            evaluate();
            operator = op;
        }else if(prev == undefined && curr == undefined){
            prev = displaynumber = 0;
        }else if(prev == undefined && curr != undefined){
            prev = curr = displaynumber;
            decimaldigit = false;
            curr = undefined;
        }
    

    }else{
        let str = formuladisplay.textContent;
        str = str.substring(0, str.length-2);
        formuladisplay.textContent = str + " " +  op;
        operator = op;
        decimaldigit = false;
    }
    

}

function updatenumber(n){

    
    if(operator == ""){
        prev = undefined;
    }

    if(mode){
        mode = false;
    }
    if(curr == undefined){
        curr = 0;
    }
    if(curr.toString().length > 14){
        return;   
    }



    if(!decimaldigit && curr != 0){
        curr *= 10;
        if(curr < 0){
            curr -= n;
        }else{
            curr += n;
        }
    }else{
        curr += n;
    }
    displaynumber = curr;

}
function backspace(){
    if(curr == undefined){
        return;
    }
   
    if(decimaldigit){
        curr = curr.substring(0,curr.length-1);
        
        if(curr.indexOf('.') == -1){
            decimaldigit = false;
        }

    }else{
        curr = Math.floor(curr / 10);
    }
    displaynumber = curr;



}

function updateDisplay(){


    
    screen.textContent = `${displaynumber}`;


}

function changebg(){
    

    this.style.backgroundColor = "gold";
}
function backbg(button){
    if(button.id < 20){
        button.style.backgroundColor = "transparent";
    }else{
        button.style.backgroundColor = "#999";
    }
    
}



buttons.forEach(button =>{ 
    button.addEventListener('click', function(){
        
        checkstart(button);
    });
    button.addEventListener('mouseover', changebg);
    button.addEventListener('mouseout', function(){
        
        backbg(button);
    });
});



document.onkeydown = function(event){


    let k = checkingkey(event, event.shiftKey);
    console.log(k);
  
    if(k != null){
        checkstart(k);
        k.style.backgroundColor = "gold";
    }
}


function checkingkey(event, shiftstatus){
    let k = null;
    console.log(shiftstatus);
    if(event.keyCode == 49 || event.keyCode == 97){
        k = buttons[12];
    }else if(event.keyCode == 50 || event.keyCode == 98){
        k = buttons[13];
    }else if(event.keyCode == 51 || event.keyCode == 99){
        k = buttons[14];
    }else if(event.keyCode == 52 || event.keyCode == 100){
        k = buttons[8];
    }else if(!shiftstatus && event.keyCode == 53 || event.keyCode == 101){
        k = buttons[9];
    }else if(event.keyCode == 54 || event.keyCode == 102){
        k = buttons[10];
    }else if(event.keyCode == 55 || event.keyCode == 103){
        k = buttons[4];
    }else if(!shiftstatus && event.keyCode == 56 || event.keyCode == 104){
        k = buttons[5];
    }else if(event.keyCode == 57 || event.keyCode == 105){
        k = buttons[6];
    }else if(event.keyCode == 106 || shiftstatus && event.keyCode == 56){
        k = buttons[7];
    }else if(event.keyCode == 107 || shiftstatus && (event.keyCode = 187 || event.keyCode == 61)){
        k = buttons[15];
    }else if(event.keyCode == 173 || event.keyCode == 109 || event.keyCode == 189){
        k = buttons[11];
    }else if(event.keyCode == 111 || event.keyCode == 191){
        k = buttons[3];
    }else if(event.keyCode == 61 || event.keyCode == 13){
        k = buttons[18];
    }else if(event.keyCode == 190 || event.keyCode == 110){
        k = buttons[17];
    }else if(event.keyCode == 48 || event.keyCode == 96){
        k = buttons[16];
    }else if(shiftstatus && event.keyCode == 53 ){
        k = buttons[2];
    }else if(event.keyCode == 8){
        k = buttons[19];
    }
    return k;
    
}

document.onkeyup = function(event){
    let k = checkingkey(event, event.shiftKey);
    
  
    if(k != null){
        backbg(buttons[7]);
        backbg(buttons[15]);
        backbg(buttons[2]);
        backbg(k);
    }

}