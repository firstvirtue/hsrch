'use strict';

class Editor {
  constructor(container, data) {
    if(process.browser) {
      const EditorJS = require('@editorjs/editorjs');
      const ImageTool = require('@editorjs/image');
      const Header = require('@editorjs/header');

      this.editor = new EditorJS({
        holder: container,
        data: data,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: '소제목',
              levels: [1, 2],
              defaultLevel: 2
            }
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: 'http://192.168.0.14:4000/api/posts/upload'
              },
              field: 'post-rsc-pool'
            }
          }
        }
      });

      return this.editor;
    }
  }

  save() {
    return this.editor().save();
  }
}

export default Editor;
