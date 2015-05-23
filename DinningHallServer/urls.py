from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()
from server import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'DinningHallServer.views.home', name='home'),
    # url(r'^DinningHallServer/', include('DinningHallServer.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
     (r'^$',views.rootViews),
    # (r"testdata/",views.testdata),
    (r'day/', views.last_day),
    (r'month/', views.last_month),
    (r'week/', views.last_week),
    (r'year/', views.last_year),
    (r'lastdaydata', views.lastdaydata),
    (r'lastweekdata', views.lastweekdata),
    (r'lastmonthdata', views.lastmonthdata),
    (r'lastyeardata', views.lastyeardata),
    (r'selectdatedata', views.selectDateData),
    (r'select', views.select)
)
