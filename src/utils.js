export function getMousePos(e) {
  const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
  const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
  const target = e.target;

  return {
    x,
    y,
    target,
  };
}


// Demo Utils


export function setupSketchControls(currentFilename, filenames) {
  let currentIndex = filenames.indexOf(currentFilename)
  let next = (currentIndex + 1) % filenames.length
  let prev = (currentIndex - 1) < 0 ? filenames.length-1 : currentIndex - 1 

  let nextEle = document.querySelector(".arrow-next")
  let prevEle = document.querySelector(".arrow-prev")

  nextEle.addEventListener("click", ()=>{
        window.location.search = "?filename=" + filenames[next]
  })

  prevEle.addEventListener("click", ()=>{
        window.location.search = "?filename=" + filenames[prev]
  })

  window.addEventListener("keydown", (ev) => {

    switch (ev.key) {
      case "ArrowLeft":
        window.location.search = "?filename=" + filenames[prev]
        // window.location.reload()
        break;
      case "ArrowRight":
        window.location.search = "?filename=" + filenames[next]
        break;
    }
  })
}
export function catchThreeJSErrors(){
  let logError = console.error
  let errEle = document.querySelector("#error")

  function fixLineNumbers(line){
    return  line.replace(/\d+(\.\d+)?/, function(match) {
      // Convert the matched number to a float and subtract 2
      var number = parseFloat(match);
      var result = number - 2;

      // Convert the result back to a string and replace the original number
      return result.toString();
    });
  }
  console.error = function(...args){

    if(args[0] && args[0].indexOf("THREE") > -1){
      errEle.style.display = "block"
      // Show on screen
      let errorRegex = /^ERROR.*$/

      let lines = args[0].split("\n")
      let result = "";
      let errors = ""
      let codeLines = ""
      for(let i=0; i < lines.length; i++){
        let line = lines[i]
        if(line.length == 0) continue;
        
        let matchedError = line.match(errorRegex )
        if(matchedError){
          line = line.replace("ERROR: 0:", "Line ")
          line = fixLineNumbers(line)
          errors += `<div>${line}</div>`
        } else if(i > lines.length-10) {
          line = fixLineNumbers(line)
          let classes = []
          if(line[0].trim() ==='>'){
            classes.push( 'error-line')
          }
          if(lines[i+1] && lines[i+1][0] === ">"){
            classes.push( 'error-line--near' )
          }
          if(lines[i-1] && lines[i-1][0] === ">"){
            classes.push( 'error-line--near' )
          }
          codeLines +=`<div class="${classes.join(' ')}">${line}</div>`
        }
      }

      console.log(errors)
      errEle.innerHTML = `<div class="error-lines">${errors}</div><div class="error-code">${codeLines}</div>` 
    }
    logError("ERR", ...args)
  }

}
