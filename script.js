
const container = document.querySelector("#container");
const powerlight = container.getElementsByClassName('power')[0];
const buttons = document.querySelectorAll("button")
const screen = container.getElementsByClassName("number")[0];
const formuladisplay = container.getElementsByClassName("displayformula")[0];



let displaynumber = 0;
let digit = 0;
let powerOn = false;
let operator = "";
let stack = [];
let decimaladd = false;
let mode = false;
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
        return "NAN"
    }
    return x/y;
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
    }
}


function checkstart(){

    if(this.id == 21){
        if(!powerOn){
            powerOn = true;
            powerlight.style.backgroundColor="red";
            this.style.border = "2px solid red";
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
            formuladisplay.textContent ="";
            displaynumber = 0;
        }
    }
    if(powerOn){
        
        
        if(this.id == 1){
            displaynumber = 0;
            operator = "";
            mode = 0;
            stack = [];
            formuladisplay.textContent ="";
        }else if(this.id == 2){
            displaynumber *= -1;
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
            decimaladd = true;
        }else if(this.id == 19){
            evaluate();
        }

        updateDisplay();
    }



}
function evaluate(){
    
    if(operator == ""){
        return;
    }

    if(stack.length == 1){

        displaynumber = operate(stack.pop(), displaynumber, operator);

        stack.push(displaynumber);
        
        operator = "";
        formuladisplay.textContent = "";
    }
}

function setoperator(op){
    mode = !mode;


    formuladisplay.textContent += ` ${displaynumber}`;
    formuladisplay.textContent += " " + op;
    let str = formuladisplay.textContent
    if(str.length > 43){
        let dif = str.length - 43;
        formuladisplay.textContent = str.substring(dif, str.ength)
    }
    if(stack.length == 0){
        stack.push(displaynumber);
        operator = op;
        displaynumber = 0;
    }else if(stack.length == 1){
        displaynumber = operate(stack.pop(), displaynumber,op);
        stack.push(displaynumber);
        displaynumber = 0;
        operator = op;
    }


};
function updatenumber(n){





    if(displaynumber != 0){
        displaynumber *= 10;
    }
    displaynumber += n;

}

function updateDisplay(){

    screen.textContent = `${displaynumber}`;


}

buttons.forEach(button =>{ 
    button.addEventListener('click', checkstart);
});
