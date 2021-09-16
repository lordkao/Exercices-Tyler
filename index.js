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
let wrongAnswers = 0
let goodAnswers = 0
let totalQuestions = 0
let rate = () => {
    let note = (goodAnswers*20)/totalQuestions /*Moyenne*/
    let noteRound = Math.round((goodAnswers*20)/totalQuestions)/*Moyenne arrondie*/
    let noteRoundPlus = noteRound + 0.75 /*Moyenne arrondie + 0.75*/
    let noteRoundMoins = noteRound + 0.25 /*Moyenne arrondie + 0.25*/
    if(note > noteRoundMoins && note < noteRoundPlus ){
        note = noteRound + 0.5
        console.log('if : '+note)
        return note
    }
    else{
        console.log('else : '+noteRound)
        return noteRound
    }
}

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

        listeInput.addEventListener('change',function(e){/*Réponse de l'utilisateur*/
            e.preventDefault()
            if(e.target.value > 100 || (/^0/.test(e.target.value))){
                badAnswer(listeInput,'good','wrong','animation',e)
            }
            else if(e.target.value != result){
                wrongAnswer(listeInput,'good','wrong','animation',noteFrame)
            }
            else{
                goodAnswer(listeInput,'wrong','good',noteFrame)
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

function badAnswer(element,removeClass,addClass1,addClass2,event){/*Renvoi un message d'erreur en cas de mauvaise entrée par l'utilisateur.*/
    element.classList.remove(removeClass)
    element.classList.add(addClass1)
    element.classList.add(addClass2)
    event.target.value = ''
    console.log('Veuillez saisir une réponse comprise entre 1 et 100 !!')
}
function wrongAnswer(element,removeClass,addClass1,addClass2,note){/*Met à jour les mauvaises réponses.*/
    element.classList.remove(removeClass)
    element.classList.add(addClass1)
    element.classList.add(addClass2)
    element.setAttribute('disabled','')
    wrongAnswers++
    totalQuestions++
    note.innerHTML = `Vous avez <span style="color:green;">${goodAnswers}</span> bonne(s) réponse(s) et avez commis <span style="color:red;">${wrongAnswers}</span> erreur(s) sur <span style="color:blue;">${totalQuestions}</span> question(s).<br>
    Soit une note de <span style="color:red;">${rate()}/20</span> !!`
    console.log(wrongAnswers)
    console.log('Mauvaise réponse !!')
}
function goodAnswer(element,removeClass,addClass1,note){/*Met à jour les bonnes réponses.*/
    element.classList.remove(removeClass)
    element.classList.add(addClass1)
    element.setAttribute('disabled','')
    goodAnswers++
    totalQuestions++
    note.innerHTML = `Vous avez <span style="color:green;">${goodAnswers}</span> bonne(s) réponse(s) et avez commis <span style="color:red;">${wrongAnswers}</span> erreur(s) sur <span style="color:blue;">${totalQuestions}</span> question(s).<br>
    Soit une note de <span style="color:red;">${rate()}/20</span> !!`
    console.log(goodAnswers)
    console.log('Bonne réponse !!')
}

let divButtons = document.createElement('div')
    divButtons.classList.add('div-buttons')

let btnNote = document.createElement('button')
    btnNote.classList.add('btn-note')
    btnNote.innerText = "Obtenir ma note"

let btnHide = document.createElement('button')
    btnHide.style.display = "none"
    btnHide.classList.add('btn-note')
    btnHide.innerText = "Masquer"
    
let noteFrame = document.createElement('div')
    noteFrame.style.display = 'none'
    noteFrame.innerHTML = `Vous avez <span style="color:green;">${goodAnswers}</span> bonne(s) réponse(s) et avez commis <span style="color:red;">${wrongAnswers}</span> erreur(s) sur <span style="color:blue;">${totalQuestions}</span> question(s).<br>
    Soit une note de <span style="color:red;">0/20</span> !!`

divButtons.appendChild(btnNote)
divButtons.appendChild(btnHide)
divButtons.appendChild(noteFrame)
tablesMultiplications.appendChild(divButtons)

btnNote.addEventListener('click',function(e){
    btnHide.style.display = "flex"
    btnNote.style.display = "none"
    noteFrame.style.display = 'block'
})
btnHide.addEventListener('click',function(e){
    btnNote.style.display = "flex"
    btnHide.style.display = "none"
    noteFrame.style.display = 'none'
})