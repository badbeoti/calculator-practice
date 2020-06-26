class Calculator {
    constructor(preEle, curEle) {
        this.preEle = preEle
        this.curEle = curEle
        this.allClear()
    }

    allClear() {
        this.curOp = ''
        this.preOp = ''
        this.op = undefined
    }

    clear() {
        this.curOp = this.curOp.toString().slice(0, -1)
    }

    setNum(num) {
        this.curOp = this.curOp.toString() + num.toString()
    }

    setOp(op) {
        if (this.curOp === '') return
        if (this.preOp !== '') {
            this.compute()
        }
        this.op = op
        this.preOp = this.curOp
        this.curOp = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.preOp)
        const current = parseFloat(this.curOp)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.op) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.curOp = computation
        this.op = undefined
        this.preOp = ''
    }

    resultView() {
        this.curEle.innerText = this.curOp
        if (this.op != null) {
            this.preEle.innerText =
                `${this.preOp} ${this.op}`
            console.log('done')
        } else {
            this.preEle.innerText = ''
        }
    }

}

const numBtn = document.querySelectorAll('.num');
const opBtn = document.querySelectorAll('.op');
const allClearBtn = document.querySelector('.is-allClear');
const clearBtn = document.querySelector('.is-clear');
const eqBtn = document.querySelector('.is-equals');
const preEle = document.querySelector('.previous-operand')
const curEle = document.querySelector('.current-operand')

const calculator = new Calculator(preEle, curEle);

numBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.setNum(button.innerText)
        calculator.resultView()
    })
})

opBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.setOp(button.innerText)
        calculator.resultView()
    })
})

eqBtn.addEventListener('click', () => {
    calculator.compute()
    calculator.resultView()
})

allClearBtn.addEventListener('click', () => {
    calculator.allClear()
    calculator.resultView()
})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.resultView()
})