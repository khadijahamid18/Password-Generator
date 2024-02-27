// Select elements
const resultEl = document.getElementById("result");
const clipboardEl = document.getElementById("clipboard");
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");

const randomFun = {
    upper: generateUpper,
    lower: generateLower,
    number: generateNumber,
    symbol: generateSymbol,
};

clipboardEl.addEventListener("click", function () {
    let password = resultEl.innerText;

    if (!password) return;

    let textArea = document.createElement("textarea");
    textArea.value = password;

    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand("copy");

    textArea.remove();

    alert("Copied to the clipboard");
});

generateEl.addEventListener("click", function () {
    const length = +lengthEl.value; // string mn thi length number mn krny k liye + lagaya
    const hasUpper = upperEl.checked;
    const hasLower = lowerEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = generatePassword( // .innertext is liye likha bcz span mn add krwana 
        length,                            // .value input tag mn hota hy
        hasUpper,
        hasLower,
        hasNumber,
        hasSymbol
    );
});

function generatePassword(length, upper, lower, number, symbol) {
    let generatedPassword = "";

    let typeCheck = upper + lower + number + symbol; // to check if password is empty or not if 0 then empty
                                                     
    let typeArr = [];                                 // 1+1+1+1 = 4

    if (upper) typeArr.push({ upper });
    if (lower) typeArr.push({ lower });
    if (number) typeArr.push({ number });
    if (symbol) typeArr.push({ symbol });

    if (typeCheck === 0) {
        return "";
    }

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < typeArr.length; j++) {
            let funcName = Object.keys(typeArr[j])[0];
            generatedPassword += randomFun[funcName]();
        }
    }

    return generatedPassword.slice(0, length);
}

// Helper Functions
function generateUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function generateLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function generateNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function generateSymbol() {
    const symbols = "!@#$%^&*(){}[],/?";
    let length = symbols.length;
    return symbols[Math.floor(Math.random() * length)];
} 