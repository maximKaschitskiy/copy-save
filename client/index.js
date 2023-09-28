document.addEventListener("DOMContentLoaded", () => {

  const csInterface = new CSInterface()
  csInterface.requestOpenExtension("copy-save-server", "")

  // const absolutePath = "/e/maze-video/09032023.prproj"
  // const relativePath = "~/Desktop/maze-video/09032023.prproj"

  const res = {
    files: [
        "C:\\Users\\Maxim\\Desktop\\maze-video\\uploads\\IMG_20200720_164228_nEotr9ZH0.jpg",
        "C:\\Users\\Maxim\\Desktop\\maze-video\\uploads\\IMG_20200727_214131_stsl_B9uz7.jpg"
    ]
  }

  const fillValues = (array) => {
    csInterface.evalScript("$._PPP_.importArray(" + JSON.stringify(array) + ");")
  }

  fillValues(res.files)

  const body = document.querySelector(".body")
  const main = document.querySelector(".main")

  body.addEventListener("dragover", event => {
    event.preventDefault()
    main.classList.add("dragover")
  })

  body.addEventListener("dragleave", event => {
    event.preventDefault()
    main.classList.remove("dragover")
  })

  body.addEventListener("drop", event => {
    event.preventDefault()
    main.classList.remove("dragover")
    getData(event.dataTransfer)
  })

  body.addEventListener("paste", async event => {
    const data = await getData(event)
    sendData(data)
      .then(res => console.log(res))
  })

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      csInterface.evalScript("$._PPP_.getLocation()", (data) => {
        resolve(data);
      })
    })
  }

  const getData = async (event) => {
    const location = await getLocation()
    const files = event.clipboardData.files
    const textData = event.clipboardData.getData("text/plain")
    const formData = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }

    if (textData) {
      formData.append("text", textData)
    }

    formData.append("location", absolutePath)

    return formData
  }

  const sendData = data =>
    fetch(`http://localhost:3010/file`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": "true",
      },
      body: data
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
        return Promise.reject(`Ошибка: ${res.status}`)
    })

})
