class Question {
    constructor(id,date,btn,check,good,wrong,animation){
        this.id = id
        this.date = date
        this.btn = btn
        this.check = check
        this.good = good
        this.wrong = wrong
        this.animation = animation
    }
    bonneReponse(){
        this.id.classList.add(this.good)
        this.id.classList.remove(this.wrong)
        this.id.classList.remove(this.animation)
    }
    mauvaiseReponse(){
        this.id.classList.add(this.wrong)
        this.id.classList.add(this.animation)
        this.id.classList.remove(this.good)
    }
}
let infosEcriture = new Question('ecriture','-3000','btnEcriture','checkEcriture','good','wrong','animation')
let infosRomain = new Question('romain','476','btnRomain','checkRomain','good','wrong','animation')
let infosAmerique = new Question('amerique','1492','btnAmerique','checkAmerique','good','wrong','animation')
let infosFrance = new Question('france','1789','btnFrance','checkFrance','good','wrong','animation')
let infosGuerre = new Question('guerre','1914','btnGuerre','checkGuerre','good','wrong','animation')

let array = [infosEcriture,infosRomain,infosAmerique,infosFrance,infosGuerre]
console.log(array[0].id)

array.map( element => {
    element.id = document.getElementById(element.id)
    element.btn = document.getElementById(element.btn) 
    element.check = document.getElementById(element.check)

    element.btn.addEventListener('click',function(e){
        if(element.id.value === element.date){
            element.check.removeAttribute('disabled')
            element.bonneReponse()
            element.check.setAttribute('checked',true)
            element.id.setAttribute('disabled',true)
        }
        else if(element.id.value === '' || element.id.value === null){
            alert('Veuillez rentrer une réponse, merci !!')
        }
        else{
            element.mauvaiseReponse()
        }
    })
})
let numberTable = 1
let numberTableLine = 1
let tablesMultiplications = document.getElementById('tablesMultiplications')

for( let i = 1; i <= 10; i++){
    let div = document.createElement('div')
        div.classList.add('table')
    let tablename = document.createElement('h3')
        tablename.innerText = `Table de ${numberTable}`
    let listeTable = document.createElement('ul')

    while( numberTableLine < 11){
        let listeLine = document.createElement('li')
        let listeSpan = document.createElement('span')
            listeSpan.innerText = `${numberTable} x ${numberTableLine} = `
        let listeInput = document.createElement('input')
            listeInput.setAttribute('id',`inputValue${numberTable}${numberTableLine}`)
            listeInput.setAttribute('type','number')
            listeInput.setAttribute('min','0')
            listeInput.setAttribute('max','100')
                        
        listeTable.appendChild(listeLine)
        listeLine.appendChild(listeSpan)
        listeLine.appendChild(listeInput)

        let result = numberTable*numberTableLine/*Résultat de la ligne*/

        listeInput.addEventListener('change',function(e){
            e.preventDefault()
            if(e.target.value > 100 || (/^0/.test(e.target.value))){
                listeInput.classList.remove('good')
                listeInput.classList.add('wrong')
                e.target.value = ''
                console.log('Veuillez saisir une réponse comprise entre 1 et 100 !!')
            }
            else if(e.target.value != result){
                listeInput.classList.remove('good')
                listeInput.classList.add('wrong')
                console.log(result)
                console.log('Mauvaise réponse !!')
            }
            else{
                listeInput.classList.remove('wrong')
                listeInput.classList.add('good')
                console.log('Bonne réponse !!')
            }
        })
        
        numberTableLine++
    }

    div.appendChild(tablename)
    div.appendChild(listeTable)
    tablesMultiplications.appendChild(div)
    numberTable++
    numberTableLine = 1
}