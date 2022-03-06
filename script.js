const themeBtns = document.querySelectorAll('.theme-indicators button'),
    output = document.querySelector('#output span'),
    calculator = document.querySelector('.btn-container'),
    operatorKeys = calculator.querySelectorAll('[data-type="operator"]'),
    calcKeys = calculator.querySelectorAll('button');

calcKeys.forEach(btn => btn.addEventListener('mousedown', (e) => {
    e.target.style.transform = 'translateY(3px)';
}));

calcKeys.forEach(btn => btn.addEventListener('mouseup', (e) => {
    e.target.style.transform = '';
}));

themeBtns.forEach(btn => btn.addEventListener('click', changeTheme));

calculator.addEventListener('click', (e) => {
    if (!e.target.matches('button')) {return false;}

    const key = e.target,
        keyValue= key.textContent,
        outputValue = output.textContent,
        {type} = key.dataset,
        { previousKeyType } = calculator.dataset;

        console.log(outputValue);

    if (type === 'number') {
        if (outputValue === '0' || previousKeyType === 'operator') {
            output.textContent = keyValue;
        } else {
            output.textContent = outputValue + keyValue;
        }
    }

    if (type === 'operator') {
        operatorKeys.forEach(key => { key.dataset.state = ''; });
        key.dataset.state = 'selected';
        
        calculator.dataset.firstNum = outputValue;
        calculator.dataset.operator = key.dataset.key;
    }

    if (type === 'equal') {
        const firstNum = calculator.dataset.firstNum,
            operator = calculator.dataset.operator,
            secondNum = outputValue;
            output.textContent = calc(firstNum, operator, secondNum);
    }

    if (type === 'delete') {
        output.textContent = output.textContent.slice(0, -1);
    }

    if (type === 'reset') {
        output.textContent = '0';
        delete calculator.dataset.firstNum;
        delete calculator.dataset.operator;
    }

    calculator.dataset.previousKeyType = type;

});

function calc(num1, operator, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    if (operator === 'plus') { return num1 + num2; }
    if (operator === 'minus') { return num1 - num2; }
    if (operator === 'multi') { return num1 * num2; }
    if (operator === 'divide') { return num1 / num2; }
}

function changeTheme(e) {
    const target = e.target,
        theme = target.dataset.theme;
    
    document.querySelector('.theme-indicators button.active').classList.remove('active');
    target.classList.add('active');
    document.body.setAttribute('class', theme);
}
