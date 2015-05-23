# Create your views here.
from django.http import  HttpResponse
from django.template import Context,loader,RequestContext
import json
import os
import socket
import pickle


socketFile = "/Users/chenyi/Desktop/realsoc.d"


def rootViews(request):
    temp = loader.get_template("index.html")
    cox = Context({})
    return HttpResponse(temp.render(cox))



def last_day(request):
    temp = loader.get_template("day.html")
    cox = Context({})
    return HttpResponse(temp.render(cox))

def last_month(request):
    temp = loader.get_template("month.html")
    cox = Context({})
    return HttpResponse(temp.render(cox))

def last_week(request):
    temp = loader.get_template("week.html")
    cox = Context({})
    return HttpResponse(temp.render(cox))

def last_year(request):
    temp = loader.get_template("year.html")
    cox = Context({})
    return HttpResponse(temp.render(cox))

def lastdaydata(request):
    localreq = {
        "flag": 'd',
    }
    my_Socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    my_Socket.connect(socketFile)
    my_Socket.send(pickle.dumps(localreq))
    data = my_Socket.recv(30000)
    print(data)

    return HttpResponse(data,content_type='json')

def lastweekdata(request):
    localreq = {
        "flag": 'w',
    }
    my_Socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    my_Socket.connect(socketFile)
    my_Socket.send(pickle.dumps(localreq))
    data = my_Socket.recv(30000)
    print(data)

    return HttpResponse(data,content_type='json')

def lastmonthdata(request):
    localreq = {
        "flag": 'm',
    }
    my_Socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    my_Socket.connect(socketFile)
    my_Socket.send(pickle.dumps(localreq))
    data = my_Socket.recv(30000)
    print(data)

    return HttpResponse(data,content_type='json')

def lastyeardata(request):
    localreq = {
        "flag": 'y',
    }
    my_Socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    my_Socket.connect(socketFile)
    my_Socket.send(pickle.dumps(localreq))
    data = my_Socket.recv(30000)
    print(data)

    return HttpResponse(data,content_type='json')

def select(request):
    temp = loader.get_template("select.html")
    cox = Context({})
    return HttpResponse(temp.render(cox))

def selectDateData(request):
    localreq = {
        "flag": 's',
        "data": json.loads(request.GET["json"])
    }
    my_Socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    my_Socket.connect(socketFile)
    my_Socket.send(pickle.dumps(localreq))
    data = my_Socket.recv(30000)
    print(data)

    return HttpResponse(data,content_type='json')