'use strict';

class Editor {
  constructor(container, data, cb) {
    if(process.browser) {
      const EditorJS = require('@editorjs/editorjs');
      const ImageTool = require('@editorjs/image');
      const Header = require('@editorjs/header');

      this.editor = new EditorJS({
        holder: container,
        placeholder: 'Let`s write an awesome story!',
        data: data,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: '| 제목',
              levels: [1, 2],
              defaultLevel: 2
            }
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: process.env.NODE_ENV === 'production' ? 'http://141.164.39.129:4000/api/posts/upload' : 'http://192.168.0.3:4000/api/posts/upload'
              },
              field: 'post-rsc-pool'
            }
          }
        },
        onReady: cb
      });

      return this.editor;
    }
  }

  save() {
    return this.editor().save();
  }
}

export default Editor;
