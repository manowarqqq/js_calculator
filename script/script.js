const DAY_STRING = ['день', 'дня', 'дней'];
const ANSWER = ['Да', 'Нет'];
const DATA = {
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    deadlineDay: [[2, 7], [3, 10], [7, 14]],
    deadlinePercent: [20, 17, 15]
};

const startButton = document.querySelector('.start-button');
const firstScreen = document.querySelector('.first-screen');
const mainForm = document.querySelector('.main-form');
const formCalculate = document.querySelector('.form-calculate');
const endButton = document.querySelector('.end-button');
const total = document.querySelector('.total');
const fastRange = document.querySelector('.fast-range');
const totalPriceSum = document.querySelector('.total_price__sum');


const desktopTemplates = document.getElementById('desktopTemplates');
const adapt = document.getElementById('adapt');
const mobileTemplates = document.getElementById('mobileTemplates');
const editable = document.getElementById('editable');

const checkboxLabelDesktopTemplatesValue = document.querySelector('.checkbox-label.desktopTemplates_value');
const checkboxLabelAdaptValue = document.querySelector('.checkbox-label.adapt_value');
const checkboxLabelMobileTemplatesValue = document.querySelector('.checkbox-label.mobileTemplates_value');
const checkboxLabelEditableValue = document.querySelector('.checkbox-label.editable_value');
const typeSite = document.querySelector('.type-site');
const maxDeadline = document.querySelector('.max-deadline');
const rangeDeadline = document.querySelector('.range-deadline');
const deadlineValue = document.querySelector('.deadline-value');

function declOfNum(n, titles) {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

function showElem(elem) {
    elem.style.display = 'block';
}

function hideElem(elem) {
    elem.style.display = 'none';
}

function renderTextContent(total, site, maxDay, minDay) {
    totalPriceSum.textContent = total;
    typeSite.textContent = site;
    maxDeadline.textContent = declOfNum(maxDay, DAY_STRING);
    rangeDeadline.min = minDay;
    rangeDeadline.max = maxDay;
    deadlineValue.textContent = declOfNum(rangeDeadline.value, DAY_STRING);
}

function priceCalculation(elem) {
    let result = 0;
    let index = 0;
    let options = [];
    let site = '';
    let maxDeadlineDay = '';
    let minDeadlineDay = '';

    if (elem.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
            }
        }
        hideElem(fastRange);
    }
    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value);
            site = item.dataset.site;
            maxDeadlineDay = DATA.deadlineDay[index][1];
            minDeadlineDay = DATA.deadlineDay[index][0];
        } else if (item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value);
        }
    }
    options.forEach(function (key) {
        if (typeof (DATA[key]) === 'number') {
            if (key === 'sendOrder') {
                result += DATA[key]
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if (key === 'desktopTemplates') {
                result += DATA.price[index] * DATA.desktopTemplates[index] / 100
            } else {
                result += DATA[key][index];
            }
        }
    });


    result += DATA.price[index];

    renderTextContent(result, site, maxDeadlineDay, minDeadlineDay);
}


function handlerCallBackForm(event) {
    const target = event.target;

    if (adapt.checked) {
        mobileTemplates.disabled = false;

    } else {
        mobileTemplates.disabled = true;
        mobileTemplates.checked = false;
    }

    if (target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }

    if (target.classList.contains('calc-handler')) {
        priceCalculation(target);
    }

    desktopTemplates.checked ? checkboxLabelDesktopTemplatesValue.textContent = ANSWER[0] : checkboxLabelDesktopTemplatesValue.textContent = ANSWER[1];
    adapt.checked ? checkboxLabelAdaptValue.textContent = ANSWER[0] : checkboxLabelAdaptValue.textContent = ANSWER[1];
    mobileTemplates.checked ? checkboxLabelMobileTemplatesValue.textContent = ANSWER[0] : checkboxLabelMobileTemplatesValue.textContent = ANSWER[1];
    editable.checked ? checkboxLabelEditableValue.textContent = ANSWER[0] : checkboxLabelEditableValue.textContent = ANSWER[1];


}


startButton.addEventListener('click', function () {
    showElem(mainForm);
    hideElem(firstScreen);
});

endButton.addEventListener('click', function () {
    for (const elem of formCalculate.elements) {
        if (elem.tagName === 'FIELDSET') {
            hideElem(elem);
        }
    }
    showElem(total);
});

formCalculate.addEventListener('change', handlerCallBackForm);