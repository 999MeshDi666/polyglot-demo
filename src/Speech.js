import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";
import { useState } from "react";

const dict = [
  {
    lang: "en-US",
    name: "Microsoft Mark - English (United States)",
    words: ["apple", "banana", "pineapple", "orange", "tangerin", "mango"],
  },
  {
    lang: "ru-RU",
    name: "Google русский",
    words: ["стул", "ствол", "дерево", "гитара", "пластик", "яшма"],
  },
];

const synth = window.speechSynthesis;
let voices = [];

let randWord;
let randWordLang;
let randSpeakerName;

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);
};
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const Speech = () => {
  const [synthWord, setSynthWord] = useState();
  const [speechWord, setSpeechWord] = useState();
  const [lang, setLang] = useState("all");
  const [checkBox, setCheckBox] = useState([
    {
      lang: "all",
      name: "All",
      isChecked: false,
    },
    {
      lang: "en-US",
      name: "English",
      isChecked: false,
    },
    {
      lang: "ru-RU",
      name: "Русский",
      isChecked: false,
    },
  ]);
  const [checked, setChecked] = useState();
  const [checkstatus, setCheckStatus] = useState([]);
  const { speak } = useSpeechSynthesis();
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setSpeechWord(result);
      console.log(result);
    },
  });

  const handleSynthWord = () => {
    let randWordIndex = Math.floor(Math.random() * 6);
    let randDictIndex = Math.floor(Math.random() * 2);

    randWordLang = dict[randDictIndex].lang;
    randSpeakerName = dict[randDictIndex].name;
    randWord = dict[randDictIndex].words[randWordIndex];

    voices.forEach((voice) => {
      if (randSpeakerName === voice.name) {
        speak({ text: randWord, voice: voice });
      }
    });

    setSynthWord(randWord);
  };
  const handleChooseLang = (langParam) => {
    
    setCheckBox((prevCheckBox)=>prevCheckBox.map((box)=>{
          if(box.lang===langParam){
            return {...box,isChecked:!box.isChecked}
        }else return box;
        if(box.lang==="all" && langParam==="all"){
            return {...box,isChecked:    }
        }
    }))

    setLang(langParam);

};

console.log(checkBox);

  return (
    <div className="speech-block">
      <div className="check">
        {checkBox.map((item) => (
          <fieldset key={item.lang}>
            <label htmlFor={item.lang}>{item.name}</label>
            <input
              type="checkbox"
              id={item.lang}
              className="speechLang"
              onChange={() => handleChooseLang(item.lang)}
              checked={item.isChecked}
            //   disabled={!item.isChecked && item.lang!=="all" ? true : false}
            ></input>
          </fieldset>
        ))}
      </div>

      <div className="speech">
        <h1 className="speech-title" id="synthTitle">
          {synthWord}
        </h1>
        <h1 className="speech-title" id="speechTitle">
          {speechWord}
        </h1>
        <div>
          <button
            className="speech-btn speech-btn_focused"
            id="speechBtn"
            onMouseDown={listen}
            onMouseUp={stop}
          >
            Speech
          </button>
          <button
            className="speech-btn"
            id="synthBtn"
            onClick={handleSynthWord}
          >
            Synth
          </button>
        </div>
      </div>
    </div>
  );
};

export default Speech;
