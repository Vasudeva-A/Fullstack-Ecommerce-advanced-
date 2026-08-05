from rest_framework.views import APIView
from rest_framework.response import Response

from .services import ask_chatbot


class ChatAPIView(APIView):

    def post(self, request):

        question = request.data.get("message")

        answer = ask_chatbot(question)

        return Response({
            "answer": answer
        })