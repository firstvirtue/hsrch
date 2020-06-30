'use strict';

class Editor {
  constructor(container, data, cb) {
    if(process.browser) {
      const EditorJS = require('@editorjs/editorjs');
      const ImageTool = require('@editorjs/image');
      const Header = require('@editorjs/header');
      const Embed = require('@editorjs/embed');

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
          }
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
                  "Click to tune": "Нажмите, чтобы настроить",
                  "or drag to move": "или перетащите"
                },
              },
              "inlineToolbar": {
                "converter": {
                  "Convert to": "Конвертировать в"
                }
              },
              "toolbar": {
                "toolbox": {
                  "Add": "Добавить"
                }
              }
            },

            /**
             * Section for translation Tool Names: both block and inline tools
             */
            toolNames: {
              "Text": "Параграф",
              "Heading": "Заголовок",
              "List": "Список",
              "Warning": "Примечание",
              "Checklist": "Чеклист",
              "Quote": "Цитата",
              "Code": "Код",
              "Delimiter": "Разделитель",
              "Raw HTML": "HTML-фрагмент",
              "Table": "Таблица",
              "Link": "Ссылка",
              "Marker": "Маркер",
              "Bold": "Полужирный",
              "Italic": "Курсив",
              "InlineCode": "Моноширинный",
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
                "Title": "Название",
                "Message": "Сообщение",
              },

              /**
               * Link is the internal Inline Tool
               */
              "link": {
                "Add a link": "Вставьте ссылку"
              },
              /**
               * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
               */
              "stub": {
                'The block can not be displayed correctly.': 'Блок не может быть отображен'
              },
              "header": {
                "": ""
              },
              "image": {
                "": ""
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
                "Delete": "Удалить"
              },
              "moveUp": {
                "Move up": "Переместить вверх"
              },
              "moveDown": {
                "Move down": "Переместить вниз"
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
