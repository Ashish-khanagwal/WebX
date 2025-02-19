/*
Validator class is used for validation purposes. 
This will be easier to change and add more functionality as need arises
*/

class Validator {
    constructor (form,fields) {
        this.form = form ;
        this.fields = fields; 
    }
    initialize() {
        this.validateOnEntry()
    }
    validateOnEntry() {
        let self = this
        this.fields.forEach(field => {
          const input = document.querySelector(`#${field}`)
    
          input.addEventListener('input', event => {
            self.validateFields(input)
          })
        })
    }

    validateFields(field) {

        // Check for empty fields
        if (field.value.trim() === "") {
          this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error")
        } else {
          this.setStatus(field, null, "success")
        }
    
        // Email address validity against a regular expression
        if (field.type === "email") {
          const re = /\S+@\S+\.\S+/
          if (re.test(field.value)) {
            this.setStatus(field, null, "success")
          } else {
            this.setStatus(field, "Please enter valid email address", "error")
          }
        }
        if (field.type === "tel") {
            
            const re = /^\d+$/ 
            if (!re.test(field.value)) {
                this.setStatus (field, 'Phone number invalid', 'error')
            }
            else {
                this.setStatus(field, null, "success")
            }
        }

    

    }
    setStatus(field, message, status) {
        const parentSuccess = field.parentElement
        const successIcon = parentSuccess.querySelector('.icon-success')
        const errorIcon = field.parentElement.querySelector('.icon-error')
        const errorMessage = field.parentElement.querySelector('.error-message')
    
        if (status === "success") {
          if (errorIcon) { errorIcon.classList.add('hidden') }
          if (errorMessage) { errorMessage.innerText = "" }
          successIcon.classList.remove('hidden')
          field.classList.remove('input-error')
        }
    
        if (status === "error") {
          if (successIcon) { successIcon.classList.add('hidden') }
          field.parentElement.querySelector('.error-message').innerText = message
          errorIcon.classList.remove('hidden')
          field.classList.add('input-error')
        }
    }

    

}

const form = document.querySelector('.input-form')
const fields = ["name", "email", "phone", "message"]

const validator = new Validator(form, fields)
validator.initialize()