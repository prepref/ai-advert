# Marketing Copywriter AI

A project for training language models to create effective advertising texts and marketing content.
  
##Folder: finetuning

### 📝 Description

The dataset(advertisment_instruction.csv) contains over 2,000 examples of advertising texts, slogans, and marketing materials used for language model fine-tuning. The model is trained to create:

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

### Fine-tuning with LoRA  

 - train.sh: performs LoRA fine-tuning of Qwen-2.5 model with DeepSpeed optimization and BF16 precision for marketing text generation.
 - merge.sh: combines base model with LoRA weights into final deployable model.
