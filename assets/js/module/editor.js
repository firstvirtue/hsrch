'use strict';

class Editor {
  constructor(container, data, cb) {
    if(process.browser) {
      const EditorJS = require('@editorjs/editorjs');
      const ImageTool = require('@editorjs/image');
      const Header = require('@editorjs/header');
      const Embed = require('@editorjs/embed');
      const Quote = require('@editorjs/quote');
      const Delimiter = require('@editorjs/delimiter');
      const Marker = require('@editorjs/marker');

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
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                // vimeo: true
              }
            }
          },
          quote: {
            class: Quote,
            inlineToolbar: true
          },
          delimiter: Delimiter,
          marker: Marker
        },
        onReady: cb,
        /**
         * Internationalzation config
         */
        i18n: {
          /**
           * @type {I18nDictionary}
           */
          messages: {
            /**
             * Other below: translation of different UI components of the editor.js core
             */
            ui: {
              "blockTunes": {
                "toggler": {
                  "Click to tune": "클릭하여 수정",
                  "or drag to move": "또는 드래그로 이동"
                },
              },
              "inlineToolbar": {
                "converter": {
                  "Convert to": "변환"
                }
              },
              "toolbar": {
                "toolbox": {
                  "Add": "삽입"
                }
              }
            },

            /**
             * Section for translation Tool Names: both block and inline tools
             */
            toolNames: {
              "Text": "텍스트",
              "Heading": "제목",
              "List": "리스트",
              "Warning": "경고",
              "Checklist": "체크리스트",
              "Quote": "인용",
              "Code": "코드",
              "Delimiter": "구분",
              "Raw HTML": "HTML",
              "Table": "표",
              "Link": "링크",
              "Marker": "마커",
              "Bold": "강조",
              "Italic": "이탤릭",
              "InlineCode": "인라인코드",
              "Image": "사진"
            },

            /**
             * Section for passing translations to the external tools classes
             */
            tools: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
               * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
               */
              "warning": { // <-- 'Warning' tool will accept this dictionary section
                "Title": "제목",
                "Message": "메시지",
              },

              /**
               * Link is the internal Inline Tool
               */
              "link": {
                "Add a link": "링크 삽입"
              },
              /**
               * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
               */
              "stub": {
                'The block can not be displayed correctly.': '블럭이 올바르게 표시될 수 없습니다.'
              },
              "header": {
                "": ""
              },
              "image": {
                "Stretch image": "이미지 크게"
              },
              "embed": {
                "": ""
              },
            },

            /**
             * Section allows to translate Block Tunes
             */
            blockTunes: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
               * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
               *
               * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
               */
              "delete": {
                "Delete": "삭제"
              },
              "moveUp": {
                "Move up": "위로 이동"
              },
              "moveDown": {
                "Move down": "아래로 이동"
              }
            },
          }
        },
      });

      return this.editor;
    }
  }

  save() {
    return this.editor().save();
  }
}

export default Editor;
