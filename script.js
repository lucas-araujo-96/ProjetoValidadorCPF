(() => { //escopo
    const _entryCPF = Symbol();
    class CPF { //classe a ser utilizada no processo
        
        constructor(cpf) { //construtor
            this[_entryCPF] = cpf;
        };

        get entryCPF() {
            return this[_entryCPF];
        };

        set entryCPF(val) {
            this[_entryCPF] = val;
        };

        static nextDigit(cpfArray) { //calcula o próximo digito com base no recebido
            const arrayLength = cpfArray.length + 1;
            let summation = cpfArray.reduce((accumulator, current, index) => {
                accumulator += current * (arrayLength - index);
                return accumulator;
            }, 0);
            const nextDigit = (11 - (summation % 11));
            return nextDigit === 10 ? 0 : nextDigit;
        };

        static completeDigits(cpfArray) {
            for (let i = 0; i< 2; i++) {
                cpfArray.push(CPF.nextDigit(cpfArray).toString());
            };
            return cpfArray;
        };

        static calculateCPF(entryCPF) {
            let cpfArray = Array.from(entryCPF.slice(0, 9));
            cpfArray = CPF.completeDigits(cpfArray);
            return cpfArray.join(``);
        };

        static validateCPF(entryCPF) {
            const calculatedCPF = CPF.calculateCPF(entryCPF);
            console.log(`${entryCPF} ${entryCPF === calculatedCPF ? `` : `não`} é um cpf válido`);
        }
    };
        

    //main 
    (function main() {
        const meuCPF = new CPF();
        CPF.validateCPF(meuCPF.entryCPF);
    })();
})();