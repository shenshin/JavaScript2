// Your code goes in here

/* const billSum = document.getElementById('bill-sum')
const serviceQuality = document.getElementById('service-quality')
const peopleNumber = document.getElementById('people-number') */
const tipAmount = document.getElementById('tip-amount')
const each = document.getElementById('each')
const form = {
    billSum: document.getElementById('bill-sum'),
    serviceQuality: document.getElementById('service-quality'),
    peopleNumber: document.getElementById('people-number')
}

// listen to submit button
document.getElementById('form').addEventListener('submit', event => {
    // cancel actual sending form to server
    event.preventDefault()
    // save values from input fields and convert them
    // to numbers of appropriate types
    const formValues = {
        billSum: parseFloat(form.billSum.value),
        serviceQuality: parseInt(form.serviceQuality.value),
        peopleNumber: parseInt(form.peopleNumber.value)
    } 
    // find out what form fields contain illegal values
    // put names of illegal fields in array
    const fieldsWithError = Object.keys(formValues).filter(key=>!isValid(formValues[key]))
    
    if(fieldsWithError.length === 0) {
        const result = calculateResult(formValues)
        showResult(result, formValues)
    } else {
        showAlert(fieldsWithError)
    }
})
function showAlert(keysArray) {
    alert('You need to fill in all the fields with valid numbers!')
    // delete entered text only in the fiels with illegal entries
    keysArray.forEach(key=>{
        form[key].value = ''
    })
}
function showResult(result, values) {
    // show actual values used in calculations
    form.peopleNumber.value = values.peopleNumber
    form.billSum.value = values.billSum.toFixed(2)
    // show calculations result here
    tipAmount.innerHTML = result
    // remove the word 'each' if there is only one person
    each.innerHTML = values.peopleNumber > 1 ? 'each' : ''
}
function calculateResult(values) {
    return (values.billSum * (1 + values.serviceQuality / 100) / values.peopleNumber).toFixed(2)
}
function isValid(number) {
    // valid argument should be defined,
    return number !== undefined &&
    // should be number
    !isNaN(number) && 
    // shold be not zero
    number !== 0 && 
    // should not be infinity
    isFinite(number)
}
