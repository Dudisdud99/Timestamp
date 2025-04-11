const url = 'http://localhost:3000/api';

const currentUix = document.getElementById("unix-date-current");
const currentUtc = document.getElementById("utc-date-current");

const form1 = document.getElementById("inputDate");
const dateInput = document.getElementById("date-input");
const result1 = document.getElementById("result-1");
const processUnix = document.getElementById("unix-date-process");
const processUtc = document.getElementById("utc-date-process");

const form2 = document.getElementById("diffDate");
const result2 = document.getElementById("result-2");
const resultDate1 = document.getElementById("resultDate-1");
const resultDate2 = document.getElementById("resultDate-2");
const diffDays = document.getElementById("diffDays");
const diffHours = document.getElementById("diffHours");
const diffMinutes = document.getElementById("diffMin");
const diffSeconds = document.getElementById("diffSec");
const diffMilliseconds = document.getElementById("diffMs");
const dateInput1 = document.getElementById("date-input-1");
const dateInput2 = document.getElementById("date-input-2");

async function fetchData() {
    try {
        const response = await fetch(url + '/', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        currentUix.textContent = data.date.unix;
        currentUtc.textContent = data.date.utc;

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}
setInterval(fetchData, 1000);

async function submitForm(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const date = dateInput.value.trim(); // Obtém o valor do campo de entrada e remove espaços extras
    const timeZone = document.getElementById("timezone-input").value.trim(); // Obtém o valor do campo de entrada de fuso horário

    if (!date) {
        result.textContent = "Por favor, insira uma data válida.";
        return;
    }

    try {
        const response = await fetch(`${url}/${date}?timeZone=${timeZone}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.error) {
            result.textContent = `Erro: ${data.error}`;
        } else {
            processUnix.textContent = data.date.unix;
            processUtc.textContent = data.date.utc;
            result.textContent = "Data processada com sucesso!";
        }
    } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        result.textContent = "Erro ao processar a solicitação.";
    }
}
form1.addEventListener("submit", submitForm);

async function submitForm2(event) {
    event.preventDefault(); 

    const date1 = dateInput1.value.trim(); 
    const date2 = dateInput2.value.trim(); 

    if (!date1 || !date2) {
        result2.textContent = "Por favor, insira datas válidas.";
        return;
    }

    try {
        const response = await fetch(`${url}/diff/${date1}/${date2}?`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.error) {
            result2.textContent = `Erro: ${data.error}`;
        } else {
            resultDate1.textContent = data.dates.data1;
            resultDate2.textContent = data.dates.data2;
            diffDays.textContent = data.diferencaEmDias;
            diffHours.textContent = data.diferencaEmHoras;
            diffMinutes.textContent = data.diferencaEmMinutos;
            diffSeconds.textContent = data.diferencaEmSegundos;
            diffMilliseconds.textContent = data.diferencaEmMilissegundos;
            result2.textContent = "Datas processadas com sucesso!";
        }
    } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        result2.textContent = "Erro ao processar a solicitação.";
    }
}
form2.addEventListener("submit", submitForm2);