import fasthtml
from fasthtml.common import *

app, rt = fast_app()

current_instance = ""

@rt("/")
def get():
    inst_input = Input(id="instance", name="instance", placeholder="instance@domain.tld")
    if current_instance != "":
        curr_inst = P(f'Your current instance is {current_instance}')
    else:
        curr_inst = P('Please enter an instance and hit enter to get started')
    submit = Button('Submit')
    card = Card(Div(inst_input, curr_inst), Div(submit, hx_post="/", hx_swap="beforeend"))
    return Titled('Instance Explorer', card)
    
@rt("/")
def post():
    print()
    
if __name__ == "__main__":
    serve()