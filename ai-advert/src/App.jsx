import React, { useState } from "react";
import { Typography, Tooltip } from "@mui/material";
import axios from "axios";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";
import DropdownInput from "./components/DropdownInput";
import AccordionSection from "./components/AccordionSection";
import ResetButton from "./components/ResetButton";
import GenerateButton from "./components/GenerateButton";
import "./App.css";

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

  const resetSystemText = () => {
    setSystemText(
      "Ты профессиональный маркетолог-копирайтер, который создает эффективные и убедительные рекламные тексты."
    );
  };

  const setDefaultParameters = () => {
    setTmp(0.5);
    setMaxLength(50);
    setPresencePenalty(0.5);
    setFrequencyPenalty(0.5);
    setTopP(0.95);
    setTopK(40);
  };

  const handleSubmit = async () => {
    try {
      setIsGenerated(false);
      setOutputText("");

      await new Promise(resolve => setTimeout(resolve, 5000));

      /*
      const response = await axios.post("/api/generate", {
        systemText,
        userText,
        tmp,
        presencePenalty,
        frequencyPenalty,
        topP,
        topK,
        maxLength,
        userChoice,
      });
      setOutputText(response.data.output);
      */
      
      setOutputText("Меня зовут вася");
      setIsGenerated(true);
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
  };

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

      <AccordionSection title="Вид текста">
        <DropdownInput
          label="Выберите нужный вид текста"
          value={userChoice}
          onChange={(e) => setUserChoice(e.target.value)}
          options={[
            { value: "rule1", label: "Правило 1" },
            { value: "rule2", label: "Правило 2" },
          ]}
        />
      </AccordionSection>

      <GenerateButton onClick={handleSubmit} />

      {isGenerated && (
        <TextInput
          className="result-text"
          label="Результат"
          placeholder="Ответ модели..."
          value={outputText}
          readOnly
        />
      )}
    </div>
  );
};

export default App;