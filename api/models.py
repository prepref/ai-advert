# import torch

from llama_cpp import Llama
# from transformers import pipeline


_model = None
_tokenizer = None

def load_model_llama_cpp(repo_id, filename, n_gpu_layers):
    global _model
    _model = Llama.from_pretrained(
        repo_id=repo_id,
        filename=filename,
        n_gpu_layers=n_gpu_layers
    )

def generate_model_llama_cpp(system_text, user_text, tmp,
                      presence_penalty, frequency_penalty, top_p, top_k):
    
    response = _model.create_chat_completion(
                                            messages = [
                                                {
                                                    "role": "system",
                                                    "content": system_text
                                                },
                                                {
                                                    "role": "user",
                                                    "content": user_text
                                                }
                                            ],
                                            temperature=tmp,
                                            presence_penalty=presence_penalty,
                                            frequency_penalty=frequency_penalty,
                                            top_p=top_p,
                                            top_k=top_k
                                        )['choices'][0]['message']['content']
    
    return response

# def load_transfromers(model_name, device):
#     global _model
#     global _tokenizer

#     _model = pipeline("text-generation", model=model_name, device=device)

# def generate_transformers(system_text, user_text, tmp,
#                       presence_penalty, frequency_penalty, top_p, top_k):
#     response = _model(messages = [
#                             {
#                                 "role": "system",
#                                 "content": system_text
#                          },
#                             {
#                                 "role": "user",
#                                 "content": user_text
#                             }
#                         ],
#                         max_tokens=None,
#                         temperature=0.2,
#                         presence_penalty=0.0,
#                         frequency_penalty=0.0,
#                         top_p = 0.95,
#                         top_k = 40,
#                     )['choices'][0]['message']['content']
#     pass   
