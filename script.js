
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


function checkstart(){

    if(this.id == 21){
        if(!powerOn){
            powerOn = true;
            powerlight.style.backgroundColor="red";
            this.style.border = "2px solid rgb(249,166,179)";
            screen.textContent = `${displaynumber}`;
            const audio = document.querySelector(`audio[data-key="1"]`);
            if (!audio) return;;
            audio.currentTime = 0;
            audio.play();
        }else{
            powerOn = false;
            powerlight.style.backgroundColor='#b98181';
            this.style.border = "0px";
            screen.textContent = "";
            formuladisplay.textContent =" ";
            prev = curr = undefined;
            displaynumber = 0;
        }
    }
    if(powerOn && !disable){
        if(this.id == 1){
            settodefault();
        }else if(this.id == 2){
            if(curr != undefined){
                curr *= -1;
                displaynumber = curr;
            }else if(prev != undefined){
                prev *= -1;
                displaynumber = prev;
            }
            
        }else if(this.id == 3){
            setoperator('%');
        }else if(this.id == 4){
            setoperator('/');
        }else if(this.id == 5){
            updatenumber(7);
        }else if(this.id == 6){
            updatenumber(8);
        }else if(this.id == 7){
            updatenumber(9);
        }else if(this.id == 8){
            setoperator('*');
        }else if(this.id == 9){
            updatenumber(4);
        }else if(this.id == 10){
            updatenumber(5);
        }else if(this.id == 11){
            updatenumber(6);
        }else if(this.id == 12){
            setoperator('-');
        }else if(this.id == 13){
            updatenumber(1);
        }else if(this.id == 14){
            updatenumber(2);
        }else if(this.id == 15){
            updatenumber(3);
        }else if(this.id == 16){
            setoperator('+');
        }else if(this.id == 17){
            updatenumber(0);
        }else if(this.id == 18){
            
            if(!decimaldigit){
                if(curr == undefined){
                    curr = 0;
                }
                curr = curr + ".";
                displaynumber = curr;
                decimaldigit = true;
            }
            

        }else if(this.id == 19){
            formuladisplay.textContent = " ";
            evaluate();
        }else if(this.id == 20){
            backspace();
        }

        updateDisplay();
    }else if(powerOn && disable){
        if(this.id == 1){
            settodefault();
            disable = false;
            updateDisplay();
        }
        
    }



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
        console.log(curr);
        
        if(curr.indexOf('.') == -1){
            decimaldigit = false;
            console.log("hi");
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
function backbg(){
    if(this.id < 20){
        this.style.backgroundColor = "transparent";
    }else{
        this.style.backgroundColor = "#999";
    }
    
}


buttons.forEach(button =>{ 
    button.addEventListener('click', checkstart);
    button.addEventListener('mouseover', changebg);
    button.addEventListener('mouseout', backbg);
});
