# Marketing Copywriter AI

A project to create russian effective advertising texts and marketing content.

## Presentation

https://docs.google.com/presentation/d/1gokPx0jUHtcNelrvUXRRTUXz6KexFBFy7oXHD3INnR0/edit?usp=sharing

## Models

Base models:

- `Vikhrmodels/Vikhr-Qwen-2.5-0.5b-Instruct` (0.5B parameters)
- `msu-rcc-lair/RuadaptQwen2.5-32B-instruct` (32B parameters)

Models advantages:

- `32B Parameters Version`:
  - Continued pretraining on Russian corpus data.
  - Higher quality generation
  - Enhanced tokenizer (extended tiktoken cl100k + unigram tokenizer with 48K tokens)
  - Up to 60% faster Russian text generation compared to original Qwen-2.5-32B-Instruct
  - Better context understanding

- `0.5B Parameters Version`:
  - Fine-tuned on GrandMaster-PRO-MAX Russian dataset
  - Instruction-tuned for Russian language processing
  - 4x more efficient than base model
  - Only 1GB model size
  - Optimized for mobile devices and weak hardware
  - Perfect for local deployment

---
Model descriptions are sourced from official model cards:
- [Vikhr-Qwen-2.5-0.5B-Instruct](https://huggingface.co/Vikhrmodels/Vikhr-Qwen-2.5-0.5b-Instruct)
- [RuadaptQwen2.5-32B-instruct](https://huggingface.co/msu-rcc-lair/RuadaptQwen2.5-32B-instruct)

## Folder: finetuning

### 📝 Dataset

Source: https://huggingface.co/datasets/Johnie2Turbo/advertisment_instraction

The dataset (`advertisment_instruction.csv`) contains over 2,000 examples of advertising texts, slogans, and marketing materials used for language model fine-tuning. The model is trained to create:

- Advertising copy for various products
- Contextual advertising
- Marketing slogans
- Sales copy

File `prepare_data.py` converts training data from CSV to correct JSON format:
- `dataset_info.json`
- `train_data.json`
- `val_data.json`

### 🎯 Dataset Features

- Structured data in JSON format
- Each example contains:
  - Instruction
  - Output text
  - System prompt

### 🛠 Fine-tuning with LoRA  
Fine-tuned marketing text generation model based on Qwen-2.5, trained using [`LLaMA-Factory`](https://github.com/hiyouga/LLaMA-Factory) framework.  

 - `train.sh`: performs LoRA fine-tuning of Qwen-2.5 model with DeepSpeed optimization and BF16 precision for marketing text generation.
 - `merge.sh`: combines base model with LoRA weights into final deployable model.

Final models:

- `prepref/RuadaptQwen2.5-32B-instruct-advert`
- `prepref/Ruadapt-Qwen-2.5-0.5b-Instruct-advert`

### 📦 GGUF Quantization
Quantization of models using [`llama.cpp`](https://github.com/ggerganov/llama.cpp) framework. The file `convert_hf_to_gguf_update.py` was updated because the model `RuadaptQwen2.5-32B-instruct` has a different BPE pre-tokenizer. Therefore file `convert_hf_to_gguf.py` and folder `./models` were updated too. 

- `python convert_hf_to_gguf.py path/to/model`: Convert to quantum of `F16`
- `./bin/llama-quantize path/to/model/ggml_model_F16.gguf path/to/model/model_Q5_K_M.gguf Q5_K_M`: Convert to quantum of Q5_K_M

I decided quantize model to Q2_K and Q5_K_M because:
- `Q2_K` provides the smallest model size (2-bit quantization) and using in google colab on free GPU
- `Q5_K_M` offers good balance between model size and quality

These formats are optimal for different deployment scenarios:
- `Q2_K` for resource-constrained environments
- `Q5_K_M` for production use where quality is important

Final models in .gguf format:

- `prepref/RuadaptQwen2.5-32B-instruct-advert-GGUF`
- `prepref/Ruadapt-Qwen-2.5-0.5b-Instruct-advert-GGUF`

## Folder: ai-advert

React-based web application for generating marketing texts using AI. The application provides an intuitive interface for customizing and generating marketing content with various parameters.

### 🎯 Customizable model parameters

- `Creativity`: Controls text generation randomness (0-1)
- `Max Word Count`: Limits output length (1-100)
- `Presence Penalty`: Penalizes used words (0-1)
- `Frequency Penalty`: Penalizes word repetition (0-1)
- `Top P`: Controls probability threshold (0-1)
- `Top K`: Controls token selection range (1-100)

### 🌐 Controls

- `User Text`: Main input for user text (max 1000 characters)
- `Model Behavior`: Customizable system prompt for AI behavior

### 🛠 Technical Stack

- React 19.0.0
- Material-UI (@mui/material, @mui/styles)
- Axios for API requests
- CSS animations for loading states

## Folder: database

💾 PostgreSQL database is used to store marketing text types and rules

### 🔌 Connection Details
- Database: project-advertisement
- Host: localhost
- Port: 5432
- Logging: `./logs/database.log`

### types_texts
- Stores main text types and their general rules
- Fields:
  - `type`: Text type name (e.g., "advertisement")
  - `num_subtypes`: Number of available subtypes
  - `main_rule`: Primary generation rule

### subtypes_texts
- Contains specific rules for each text subtype
- Fields:
  - `type`: Combined type and subtype (e.g., "advertisement:1")
  - `second_rule`: Secondary generation rule
  - `description`: Detailed description of the subtype

## Folder: api

Flask-based API service.

### 📡 API Endpoints

- `/generate`: Generate marketing text with customizable parameters.
- `/text-types/<table>`: Retrieve all text types from the specified table.
- `/subtypes/<type_name>`: Retrieve subtypes for the specified type name.
- `/rules/<type>`: Retrieve rules for the specified type.

### 🌐 Public Access

- Ngrok tunnel creates public URL
- No need for port forwarding
- Secure HTTPS connection
- Real-time URL generation
- Access from any device/location
