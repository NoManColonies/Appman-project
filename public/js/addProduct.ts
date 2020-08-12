class AddProductForm {
    private form?: HTMLElement;

    constructor (name: string) {
        this.createForm();
        this.genHiddenNode('name', name);
    }

    public getForm () {
        return this.form;
    }

    private createForm () {
        this.form = document.createElement('form');
        this.form.setAttribute('action', '/api/wow');
        this.form.setAttribute('method', 'post');
        this.genFormNode('Price/Day', 'pricePday', 'number');
        this.genFormNode('Deposite', 'deposite', 'number');
        this.genFormNode('Color', 'color', 'text');
        this.genFormNode('Size', 'size', 'text');
        this.genFormNode('Quantity', 'quatity', 'number');
        let button = document.createElement('button');
        button.setAttribute('type', 'submit');
        button.setAttribute('name', 'submit');
        button.setAttribute('value', '1');
        button.innerHTML = "Submit";
        this.form.appendChild(button);
        button = document.createElement('button');
        button.setAttribute('type', 'submit');
        button.setAttribute('name', 'submit');
        button.setAttribute('value', '2');
        button.innerHTML = "Add more";
        this.form.appendChild(button);
    }

    private genFormNode (innerText: string, id: string, type: string) {
        let formNode = document.createElement('div');
        formNode.classList.add('label');
        let labelNode = document.createElement('label');
        labelNode.innerHTML = innerText;
        labelNode.setAttribute('for', id);
        formNode.appendChild(labelNode);
        let inputNode = document.createElement('input');
        if (type === 'number') {
            inputNode.setAttribute('min', '1');
        }
        inputNode.setAttribute('type', type);
        inputNode.setAttribute('id', id);
        inputNode.setAttribute('name', id);
        formNode.appendChild(inputNode);
        this.form!.appendChild(formNode);
    }

    private genHiddenNode (name: string, value: string) {
        let hiddenNode = document.createElement('input');
        hiddenNode.setAttribute('type', 'hidden');
        hiddenNode.setAttribute('name', name);
        hiddenNode.setAttribute('value', value);
        this.form?.appendChild(hiddenNode);
    }
}