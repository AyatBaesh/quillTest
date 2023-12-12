var Block = Quill.import('blots/embed');
class QImageBlot extends Block {
    static create(value) {
        let node = super.create();
        node.innerHTML = `<q-img>
                            <img width = "300px" height = "200px" src="${value.image}"/>
                            ${value.text}
                        </q-img>\n`;
        return node;
    }

    static value(node) {
        return {
            image: node.querySelector('img').src,
            text: node.textContent,
        };
    }
}

QImageBlot.blotName = 'qImage';
QImageBlot.tagName = 'q-img-text';

export default QImageBlot;