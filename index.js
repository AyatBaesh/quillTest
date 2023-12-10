


const BlockEmbed = Quill.import('blots/block/embed');
class QImageText extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.innerHTML = `<img src="${value.image}" /><p>${value.text}</p>`;
    return node;
  }

  static value(node) {
    return {
      image: node.querySelector('img').getAttribute('src'),
      text: node.querySelector('p').textContent
    };
  }
}

QImageText.blotName = 'qImage';
QImageText.tagName = 'q-img-text';
Quill.register(QImageText);


document.addEventListener('DOMContentLoaded', () => {
  const quill = new Quill('#editor', {
    modules: {
      toolbar: '#toolbar',
    },
    theme: 'snow'
  });


  document.getElementById('insert-qimage').addEventListener('click', () => {
    let value = {
      image: 'https://picsum.photos/200/300', 
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, 'qImage', value);
  });
});
