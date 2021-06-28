from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # auth
    path('api/users/', include('users.urls')),
    # reset
    path('api/reset/', include('reset.urls')),
    # dashboard
    path('api/dashboard/', include('dashboard.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)