MODEL_PATH="msu-rcc-lair/RuadaptQwen2.5-32B-instruct"
# MODEL_PATH="Vikhrmodels/Vikhr-Qwen-2.5-0.5b-Instruct"

OUTPUT_DIR="./lora_model/"

DS_CONFIG_PATH="./config_deepspeed.json"

GPUS_PER_NODE=$(python -c "import torch; print(torch.cuda.device_count());")
MASTER_ADDR=localhost
NNODES=1
NODE_RANK=0
MASTER_PORT=6105

DISTRIBUTED_ARGS="
    --nproc_per_node $GPUS_PER_NODE \
    --nnodes $NNODES \
    --node_rank $NODE_RANK \
    --master_addr $MASTER_ADDR \
    --master_port $MASTER_PORT
  "

torchrun $DISTRIBUTED_ARGS llama-factory-src/train.py \
    --deepspeed $DS_CONFIG_PATH \
    --stage sft \
    --do_train \
    --use_fast_tokenizer \
    --model_name_or_path $MODEL_PATH \
    --dataset train_data \
    --eval_dataset val_data \
    --template qwen \
    --flash_attn auto \
    --finetuning_type lora \
    --lora_target q_proj,v_proj\
    --output_dir $OUTPUT_DIR \
    --overwrite_cache \
    --overwrite_output_dir \
    --warmup_steps 50 \
    --weight_decay 1e-1 \
    --per_device_train_batch_size 2 \
    --gradient_accumulation_steps 8 \
    --ddp_timeout 9000 \
    --learning_rate 1e-3 \
    --lr_scheduler_type cosine \
    --logging_steps 1 \
    --cutoff_len 4096 \
    --save_steps 100 \
    --plot_loss true \
    --num_train_epochs 8 \
    --bf16 true \
    --evaluation_strategy steps \
    --eval_steps 50 \
    --load_best_model_at_end true \
    --max_grad_norm 1.0
