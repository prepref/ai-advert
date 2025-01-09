import requests
import json

def generate_marketing_text(
    user_text: str,
    system_text: str = "Ты профессиональный маркетолог-копирайтер, который создает эффективные и убедительные рекламные тексты.",
    temperature: float = 0.7,
    presence_penalty: float = 0.0,
    frequency_penalty: float = 0.0,
    top_p: float = 0.95,
    top_k: int = 40
) -> str:
    """
    Generate marketing text using API.
    
    Args:
        user_text (str): Input text for generation
        system_text (str): System prompt
        temperature (float): Creativity level (0-1)
        presence_penalty (float): Penalty for token presence (0-1)
        frequency_penalty (float): Penalty for token frequency (0-1)
        top_p (float): Nucleus sampling parameter (0-1)
        top_k (int): Top-k sampling parameter (1-100)
    
    Returns:
        str: Generated text
    """
    
    # API endpoint
    url = "http://127.0.0.1:5000/generate"  # or your ngrok URL
    
    # Request data
    data = {
        "user_text": user_text,
        "system_text": system_text,
        "temperature": temperature,
        "presence_penalty": presence_penalty,
        "frequency_penalty": frequency_penalty,
        "top_p": top_p,
        "top_k": top_k
    }
    
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        
        return response.json()
        
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return None

if __name__ == "__main__":
    # Example usage
    text = generate_marketing_text(
        user_text="",
        temperature=0.5,
        presence_penalty=0.5,
        frequency_penalty=0.5,
        top_p=0.95,
        top_k=40
    )
    
    if text:
        print("Generated text:")
        print(text)
