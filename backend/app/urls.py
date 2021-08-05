from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # auth
    path('api/users/', include('users.urls')),
    # reset
    path('api/reset/', include('reset.urls')),
    # dashboard
    path('api/dashboard/', include('dashboard.urls')),
    # shipments
    path('api/shipments/', include('shipments.urls')),
    # incoming
    path('api/incoming/', include('incoming.urls')),
    # forgot password
    re_path(r'^api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)