# Marketing Copywriter AI

A project to create effective advertising texts and marketing content.
  
## Folder: finetuning

### 📝 Dataset

The dataset (`advertisment_instruction.csv`) contains over 2,000 examples of advertising texts, slogans, and marketing materials used for language model fine-tuning. The model is trained to create:

- Advertising copy for various products
- Contextual advertising
- Marketing slogans
- Sales copy

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

### 📦 GGUF Quantization
Quantization of models using [`llama.cpp`](https://github.com/ggerganov/llama.cpp) framework. The file `convert_hf_to_gguf_update.py` was updated because the model `RuadaptQwen2.5-32B-instruct` has a different BPE pre-tokenizer. Therefore file `convert_hf_to_gguf.py` and folder `./models` were updated too. 

- `python convert_hf_to_gguf.py path/to/model`: Convert to quantum of `f16`
- `./bin/llama-quantize path/to/model/ggml_model_f16.gguf path/to/model/model_Q5_K_M.gguf Q5_K_M`: Convert to quantum of Q5_K_M

I decided quantize model to Q2_K and Q5_K_M because:
- `Q2_K` provides the smallest model size (2-bit quantization) and using in google colab on free GPU
- `Q5_K_M` offers the best balance between model size and quality  
These formats are optimal for different deployment scenarios:
- `Q2_K` for resource-constrained environments
- `Q5_K_M` for production use where quality is important
