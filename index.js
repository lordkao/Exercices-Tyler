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

