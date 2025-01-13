MODEL_PATH="msu-rcc-lair/RuadaptQwen2.5-32B-instruct"
# MODEL_PATH="Vikhrmodels/Vikhr-Qwen-2.5-0.5b-Instruct"

LORA_PATH="./lora_model/checkpoint-100/"
RESULT="./final_model/"

CUDA_VISIBLE_DEVICES=0 llamafactory-cli export \
    --model_name_or_path $MODEL_PATH \
    --adapter_name_or_path $LORA_PATH \
    --template qwen \
    --finetuning_type lora \
    --export_dir $RESULT \
    --export_size 1 \
    --export_legacy_format False
