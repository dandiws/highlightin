const languages = {
  generic: 'Generic',
  assembly: 'Assembly',
  avrassembly: 'AVR',
  cordpro: 'CordPro',
  cpp: 'C/C++',
  csharp: 'C#',
  css: 'CSS',
  cython: 'Cython',
  diff: 'diff',
  docker: 'Dockerfile',
  golang: 'Go',
  groovy: 'Groovy',
  html: 'HTML',
  conf: 'Ini',
  java: 'Java',
  javascript: 'Javascript',
  json: 'JSON',
  kotlin: 'Kotlin',
  less: 'LESS',
  lua: 'LUA',
  markdown: 'Markdown',
  matlab: 'Matlab/Octave',
  nsis: 'NSIS',
  php: 'PHP',
  powershell: 'Powerhsell',
  prolog: 'Prolog',
  purebasic: 'PureBasic',
  python: 'Python',
  raw: 'RAW',
  ruby: 'Ruby',
  rust: 'Rust',
  scss: 'SCSS',
  shell: 'Shellscript',
  sql: 'SQL',
  squirrel: 'Squirrel',
  swift: 'Swift',
  typescript: 'Typescript',
  verilog: 'Verilog',
  vhdl: 'VHDL',
  visualbasic: 'VisualBasic',
  xml: 'XML',
  yaml: 'YAML',
}

const codeType = document.getElementById('code-type')
for (const key in languages) {
    const option = document.createElement('option')
    option.value = key
    option.innerHTML = languages[key]
    codeType.appendChild(option)
}

function convertToNonBreakingSpace(text){
  return text.replace(/ /g,'&nbsp;')
}

const highlight = ({ autoSelect }) => {
  const codeBox = document.getElementById('code-box')
  const codeBlock = document.createElement('pre')
  codeBlock.innerHTML = document.getElementById('code-input').value
  codeBox.innerHTML = ''
  codeBox.appendChild(codeBlock)

  var myEnlighter = new EnlighterJS(codeBlock, {
    language: codeType.options[codeType.selectedIndex].value,
    // showLinenumbers: false,
    infoButton: false,
    windowButton: false,
  });
  
  // enable highlighting
  myEnlighter.enlight(true);
  const output = myEnlighter.output

  output.getChildren().forEach(li => {
    li.getChildren().forEach(span=>{
      span.innerHTML = convertToNonBreakingSpace(span.innerHTML)
    })
  });
  const selectAllBtn = new Element('a',{
    href:'#',
    'class':'EnlighterJSSelectAllButton',
    title: 'Select all',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7zM5.002 8L5 20h10V8H5.002zM9 6h8v10h2V4H9v2zm-2 5h6v2H7v-2zm0 4h6v2H7v-2z"/></svg>`,
    events: {
      click: (e)=>{
        e.preventDefault()
        window.getSelection().selectAllChildren(output);
      }
    }
  })
  var toolbar = output.getParent().getChildren('.EnlighterJSToolbar')
  toolbar.grab(selectAllBtn)

  if(autoSelect){
    window.getSelection().selectAllChildren(output);
  }
}


document.getElementById('highlight-btn').onclick = () => {
  highlight({autoSelect:false})
}
document.getElementById('highlight-btn-select').onclick = () => {
  highlight({autoSelect:true})
}