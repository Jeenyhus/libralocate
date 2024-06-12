from django.shortcuts import render

def index(request):
    """
    Renders the main Vue.js application.
    """
    return render(request, 'index.html')
