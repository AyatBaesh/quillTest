class ImageText {
    static create() {
        let node = super.create();
        let textInput = document.createElement('input');
        let imageInput = document.createElement('input');
        let inputButtton = document.createElement('button');
        let inputModal = document.createElement
        image.setAttribute('type', 'file');
        image.setAttribute('id', 'imageInput');
        image.setAttribute('accept', 'image/*');

        text.setAttribute('type', 'text');

        inputButtton.setAttribute('id', 'inputButton');
        node.appendChild(imageInput);
        node.appendChild(textInput);

        return node;
    }
}