let btn = document.querySelectorAll('.col');
let p = document.querySelector('.p');
let p2 = document.querySelector('.p2');

function addImplicitMultiplication(str) {
    return str.replace(/(\d)(\()/g, '$1*$2')
        .replace(/(\))(\d)/g, '$1*$2')
        .replace(/(\))(\()/g, '$1*$2');
}

function callback(event) {
    let element_value = event.target.value;
    let str_values = '';

    switch (true) {
        case !isNaN(element_value) || ['+', '-', '*', '/', '%', '**', '***', '(', ')', '.'].includes(element_value):
            if (element_value === '**') {
                p.innerHTML += '^2';
                str_values = addImplicitMultiplication(p.innerHTML).replace(/\^/g, '**');
                p2.innerHTML = eval(str_values);
                return;
            } else if (element_value === '***') {
                p.innerHTML += '^3';
                str_values = addImplicitMultiplication(p.innerHTML).replace(/\^/g, '**');
                p2.innerHTML = eval(str_values);
                return;
            }

            p.innerHTML += element_value;

            if (p.innerHTML.search(/\^/) !== -1) {
                let updatedString = p.innerHTML.replace(/\^/g, '**');
                return p2.innerHTML = eval(updatedString);
            }


            str_values = addImplicitMultiplication(p.innerHTML);
            p2.innerHTML = eval(str_values);
            break;

        case element_value === 'clear':
            p.innerHTML = '';
            p2.innerHTML = '';
            break;

        case event.target.classList.contains('backSpace'):
            p.innerHTML = p.innerHTML.slice(0, -1);
            if (p.innerHTML === '^') {
                str_values = addImplicitMultiplication(p.innerHTML).replace(/\^/g, '**');
                p2.innerHTML = eval(str_values);
                return;
            }
            str_values = addImplicitMultiplication(p.innerHTML);
            if(p.innerHTML == ''){
                return p2.innerHTML = ''
            }
            p2.innerHTML = eval(str_values);
            break;

        case element_value === '=':
            p.innerHTML = p2.innerHTML;
            p2.innerHTML = ''
            break;
    }
}

for (let sign of btn) {
    sign.addEventListener('click', callback);
}
