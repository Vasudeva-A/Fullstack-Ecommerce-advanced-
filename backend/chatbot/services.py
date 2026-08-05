from langchain_ollama import ChatOllama
from app.models import *
llm = ChatOllama(
    model="llama3.2",
    temperature=0
)
def get_products():

    products = Product.objects.select_related("cate").all()

    return products

def create_context():

    products = get_products()

    context = ""

    for product in products:

        context += f"""
Product Name : {product.name}

Category : {product.cate.name}

Original Price : ₹{product.original_price}

Offer Price : ₹{product.offer_price}

Description : {product.description}

Trending : {"Yes" if product.is_trend else "No"}

------------------------------------
"""

    return context


def ask_chatbot(question):

    context = create_context()

    prompt = f"""
You are an AI assistant for my ecommerce website.

Use ONLY the product information below.

{context}

Customer Question:

{question}

Rules:

1. Never invent products.

2. Never invent prices.

3. If information is unavailable say:

"Sorry, I couldn't find that information."
"""

    response = llm.invoke(prompt)

    return response.content