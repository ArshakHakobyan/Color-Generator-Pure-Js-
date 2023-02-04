const containers = document.querySelectorAll(".container")

document.addEventListener("keydown", (e) => {
    e.preventDefault()
    if(e.code.toLowerCase() === "space"){
        setRandomColors()
    };
})
document.addEventListener("click", (e) => {
   const type = e.target.dataset.type
   let node;
   if(type === "lock"){
        if(e.target.tagName.toLowerCase() === "i"){
            e.target.classList.toggle("fa-lock-open")
            e.target.classList.toggle("fa-lock")
        }else{
            e.target.children[0].classList.toggle("fa-lock-open")
            e.target.children[0].classList.toggle("fa-lock")
        };
    }else if(type === "copy"){
        copyToClipBoard(e.target.textContent)
    }
})
function randomColorGen() {

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`

  }
function setRandomColors(isInitial){

    const colors = isInitial ? getColorsFromHash() : [];

    containers.forEach( (container,index) => {

        const isLocked = container.querySelector("i").classList.contains("fa-lock")
        const text = container.querySelector("h2")
        const button = container.querySelector("button")

        if(isLocked){
            colors.push(text.textContent)
            return
        }

        const color = isInitial ?
            colors[index] ?
                  colors[index]
                : randomColorGen() 
            : randomColorGen()

        if(!isInitial){
            colors.push(color)
        }
        
        container.style.background = color
        text.textContent = color
        setTextColors(color,text)
        setTextColors(color,button)

    } )
    updateColorHash(colors)
  }
function setTextColors(color,text){
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? "black" : "white"
  }
function copyToClipBoard (text){
    return navigator.clipboard.writeText(text)
}
function updateColorHash (colors = []){
        
    if (Array.isArray(colors)){

        document.location.hash = colors.join("-").toString()
       
    }else{
        "Err, Param is not Array"
    }

}
function getColorsFromHash (){
    if(document.location.hash.length > 1){
        const url = document.location.hash.substring(1).split("-")
        return url
    }
    return []
}

setRandomColors(true)