const fs = require('fs')
const readline = require('readline')
var player = require('play-sound')(opts = {})
var timeline = 0
var inverval 
var timelines = []
var speaker = []
var audiooutput = ''
var port = []


console.log(`${fs.existsSync('audiolink.txt')?'':'Stop: There no audiolink.txt for linking the audio event'}`)
console.log(`${fs.existsSync('speaker.speech')?'':'Warn: There no speaker.speech for excuting a speaking event'}`)
console.log(`${fs.existsSync('timeline.time')?'':'Warn: There no timeline.time for excuting a lighting event'}`)
if (fs.existsSync('timeline.time') && fs.existsSync('speaker.speech')){
  var read = readline.createInterface({
    input: fs.createReadStream('timeline.time')
  })
  var readspeaker = readline.createInterface({
    input: fs.createReadStream('speaker.speech')
  })
  readspeaker.on('line',(data1)=>{
    speaker.push(data1)
  })
  
  readspeaker.on(`close`,()=>{
    console.log(speaker)
  })
  read.on('line',(data)=>{
    timelines.push(data)
  })
  read.on('close',()=>{
    console.log(timelines)
    main()
  })
} else {
  process.exit(1)
}
if (fs.existsSync('audiolink.txt')){
  var readlineaudio = readline.createInterface({
    input: fs.createReadStream('audiolink.txt')
  })
  readlineaudio.on('line',(data)=>{
    audiooutput = data.split('AudioPath: ').join('')
  })

  readlineaudio.on('close',()=>{
    player.play(audiooutput, function(err){})
    console.log(audiooutput)
  })

} else {
  process.exit(1)
}



var combine = ``
function main(){
  // console.log(timelines)
  var index = 1
  inverval = setInterval(()=>{
      timeline++
      // console.log(timeline < parseInt(timelines[index]))
      if (timeline < parseInt(timelines[index])){
        var cleanup = timelines[index].substring(timelines[index].length,timelines[index].indexOf(' '))
        cleanup = cleanup.split(' ').join('')
        combine = ``
        if (cleanup.includes(',')){
          var multiplespeaker = cleanup.split(',')
          for (let i = 0;i<multiplespeaker.length;i++){
            for (let v =0; v<speaker.length;v++){
              if (speaker[v].includes(multiplespeaker[i])){
                var selectspeaker = speaker[v].substring(speaker[v].length,speaker[v].indexOf(' ')) 
                combine+= selectspeaker 
                + `${i >= multiplespeaker.length-1?'': ', '}`
              }
            }
          }
        } else {
          for (let i =0; i< speaker.length;i++){
            if (speaker[i].includes(cleanup)){
              var selectspeaker = speaker[i].substring(speaker[i].length,speaker[i].indexOf(' '))
              combine+= selectspeaker.split(' ').join('')
              break
            }
          }
        }
        
      } else {
          if (index < timelines.length){
            index++
            combine = combine
          }
      }
      console.log(`${timeline}: Speech: ${combine == '(Shortname:FullName)'?'No one':combine} is speaking`)
  },1000)

}

function LEDLightUP(data){

}