'use strict';

class Editor {
  constructor(container) {
    if(process.browser) {
      const EditorJS = require('@editorjs/editorjs');
      new EditorJS(container);
    }
  }
}

export default Editor;
