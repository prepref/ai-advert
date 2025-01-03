import gradio as gr
import time

def _bot(message: str, history: list):
    history.append({"role": "user", "content": message})

    bot_message = "How are you?"
    history.append({"role": "assistant", "content": ""})
    for character in bot_message:
        history[-1]['content'] += character
        time.sleep(0.1)
        yield history

def app(css: str = None):

    with gr.Blocks(css_paths=css, fill_width=True) as view:
        chatbot = gr.Chatbot(type="messages", show_label=False, height=500, autoscroll=False, container=False)

        with gr.Row():
            user_text = gr.Textbox(show_label=False, autoscroll=False, container=False,
                                placeholder="Введите сообщение...", interactive=True, scale=10)
            submit_button = gr.Button("Отправить", min_width=10)

        _history = gr.State([])

        submit_button.click(fn=_bot, inputs=[user_text, _history], outputs=[chatbot])
        print(_history)

    return view
