import React, { useState, useEffect, useCallback } from "react";
import { Typography, Tooltip, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import axios from "axios";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";
import DropdownInput from "./components/DropdownInput";
import AccordionSection from "./components/AccordionSection";
import ResetButton from "./components/ResetButton";
import GenerateButton from "./components/GenerateButton";
import "./App.css";

// Format string with parameters
function formatString(template, params) {
  return template.replace(/{(.*?)}/g, (match, key) => {
    return typeof params[key] !== 'undefined' ? params[key] : match;
  });
}

const App = () => {
  const [userText, setUserText] = useState("");
  const [systemText, setSystemText] = useState(
    "Ты профессиональный маркетолог-копирайтер, который создает эффективные и убедительные рекламные тексты."
  );
  const [tmp, setTmp] = useState(0.5);
  const [maxLength, setMaxLength] = useState(50);
  const [presencePenalty, setPresencePenalty] = useState(0.5);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.5);
  const [topP, setTopP] = useState(0.95);
  const [topK, setTopK] = useState(40);
  const [userChoice, setUserChoice] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const maxUserTextLength = 1000;
  const [textTypes, setTextTypes] = useState([])
  const [textSubtypes, setTextSubtypes] = useState([])

  // Reset system text
  const resetSystemText = () => {
    setSystemText(
      "Ты профессиональный маркетолог-копирайтер, который создает эффективные и убедительные рекламные тексты."
    );
  };

  // Set default model parameters
  const setDefaultParameters = () => {
    setTmp(0.5);
    setMaxLength(50);
    setPresencePenalty(0.5);
    setFrequencyPenalty(0.5);
    setTopP(0.95);
    setTopK(40);
  };

  // Generate text
  const handleSubmit = async () => {
    try {
      setIsGenerated(false);
      setOutputText("");
      setUserText("");

      const rules = await getRules(userChoice);
      const formattedSystemText = systemText + "\n" + formatString(rules[0], {secondRule: rules[1], maxLength: maxLength})

      const response = await axios.post("http://localhost:5000/generate", {
        userText,
        formattedSystemText,
        tmp,
        presencePenalty,
        frequencyPenalty,
        topP,
        topK
      });

      setOutputText(response.data.response);
      setIsGenerated(true);

    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
  };

  // Get text types discription
  const getTextTypesDiscription = useCallback(async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/subtypes/${type}`);
      if (response.status === 200) {
        const data = response.data;
        return data.map(item => `${item.type}:\n${item.description}`).join("\n\n");
      } else {
        console.error("Ошибка при получении описания подтипов текстов");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }, []);

  // Get text of subtypes
  const getTextTypes = useCallback(async (table) => {
    try {
      const response = await axios.get(`http://localhost:5000/text-types/${table}`);
      if (response.status === 200) {
        const data = response.data;
        if (table === "types_texts") {
          setTextTypes(data.map(item =>
            ({ name: item.name, description: getTextTypesDiscription(item.name) })
          ));
        } else if (table === "subtypes_texts") {
          setTextSubtypes(data)
        }
      } else {
        console.error("Ошибка при получении типов текстов");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }, [getTextTypesDiscription]);
  // Get rules for selected type
  const getRules = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/rules/${type}`);
      if (response.status === 200) {
        return response.data
      } else {
        console.error("Ошибка при получении правил");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  useEffect(() => {
    getTextTypes("types_texts");
    getTextTypes("subtypes_texts");
  }, [getTextTypes]);

  return (
    <div className="app">
      <div className="user-text-row">
          <TextInput
            className="user-text"
            label="Запрос"
            placeholder="Введите текст..."
            value={userText}
            onChange={(e) => {
            if (e.target.value.length <= maxUserTextLength) {
              setUserText(e.target.value);
            }
          }}
        />
        <Typography variant="caption" display="block" align="right">
          {userText.length}/{maxUserTextLength}
        </Typography>
      </div>

      <div className="system-row">
        <TextInput
          className="system-text"
          label="Поведение модели"
          placeholder="Введите текст..."
          value={systemText}
          onChange={(e) => setSystemText(e.target.value)}
        />
        <Tooltip title="Сбросить поведение модели" arrow>  
          <ResetButton onConfirm={resetSystemText} width={36} height={36} />
        </Tooltip>
      </div>

      <AccordionSection title="Параметры" setDefaultParameters={setDefaultParameters} addButton={true}>
        <SliderInput
          label="Креативность"
          value={tmp}
          onChange={(e, newValue) => setTmp(newValue)}
          min={0}
          max={1}
          step={0.001}
        />
        <SliderInput
          label="Максимальное количество слов"
          value={maxLength}
          onChange={(e, newValue) => setMaxLength(newValue)}
          min={1}
          max={100}
          step={1}
        />
        <SliderInput
          label="Штраф за уже использованные слова"
          value={presencePenalty}
          onChange={(e, newValue) => setPresencePenalty(newValue)}
          min={0}
          max={1}
          step={0.001} 
        />
        <SliderInput
          label="Штраф за часто повторяющиеся слова"
          value={frequencyPenalty}
          onChange={(e, newValue) => setFrequencyPenalty(newValue)}
          min={0}
          max={1}
          step={0.001}
        />
        <SliderInput
          label="Сумма вероятностей самых вероятных слов"
          value={topP}
          onChange={(e, newValue) => setTopP(newValue)}
          min={0}
          max={1}
          step={0.001}
        />
        <SliderInput
          label="Фиксированное число самых вероятных слов"
          value={topK}
          onChange={(e, newValue) => setTopK(newValue)}
          min={1}
          max={100}
          step={1}
        />
      </AccordionSection>

      <AccordionSection title="Тип текста">
        {textTypes.map((item, index) => (
          <Accordion key={index} style={{margin: "0", marginBottom: "10px"}}>
            <AccordionSummary>
              <Typography>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{whiteSpace: "pre-wrap"}}>{item.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <DropdownInput
          className="text-type-dropdown"
          label="Выберите тип текста"
          value={userChoice}
          onChange={(e) => setUserChoice(e.target.value)}
          options={textSubtypes}
        />

      </AccordionSection>

      <GenerateButton onClick={handleSubmit} />

      {isGenerated && (
        <TextInput
          className="result-text"
          placeholder="Ответ модели..."
          value={outputText}
          readOnly
        />
      )}
    </div>
  );
};

export default App;