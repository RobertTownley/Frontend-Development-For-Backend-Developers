from django.shortcuts import render
from django.views import View

from quotes.models import Quote


class QuoteView(View):

    def get(self, request):
        context = {
            'quote': Quote.objects.order_by("?").first()
        }
        return render(request, 'quote.html', context)
