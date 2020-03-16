'use strict';

class Editor {
  constructor(container, data) {
    if(process.browser) {
      const EditorJS = require('@editorjs/editorjs');
      this.editor = new EditorJS({
        holder: container,
        data: data
      });

      return this.editor;
    }
  }

  save() {
    return this.editor().save();
  }
}

export default Editor;
