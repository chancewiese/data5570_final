{"filter":false,"title":"urls.py","tooltip":"/event-registration/backend/backend/urls.py","ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":19,"column":18},"end":{"row":19,"column":18},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"hash":"dd6cad5a8dc29fd7a670777d8e09a4fd68a49cd6","undoManager":{"mark":23,"position":23,"stack":[[{"start":{"row":6,"column":1},"end":{"row":7,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":7,"column":0},"end":{"row":8,"column":42},"action":"insert","lines":["from django.conf import settings","from django.conf.urls.static import static"],"id":3}],[{"start":{"row":14,"column":81},"end":{"row":15,"column":0},"action":"insert","lines":["",""],"id":4},{"start":{"row":15,"column":0},"end":{"row":15,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":15,"column":4},"end":{"row":16,"column":80},"action":"insert","lines":["if settings.DEBUG:","    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)"],"id":5}],[{"start":{"row":16,"column":4},"end":{"row":16,"column":8},"action":"insert","lines":["    "],"id":6}],[{"start":{"row":15,"column":4},"end":{"row":16,"column":84},"action":"remove","lines":["if settings.DEBUG:","        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)"],"id":7}],[{"start":{"row":15,"column":0},"end":{"row":15,"column":4},"action":"remove","lines":["    "],"id":8},{"start":{"row":14,"column":81},"end":{"row":15,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":15,"column":1},"end":{"row":16,"column":0},"action":"insert","lines":["",""],"id":9},{"start":{"row":16,"column":0},"end":{"row":17,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":17,"column":0},"end":{"row":18,"column":84},"action":"insert","lines":["if settings.DEBUG:","        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)"],"id":10}],[{"start":{"row":18,"column":4},"end":{"row":18,"column":8},"action":"remove","lines":["    "],"id":11}],[{"start":{"row":1,"column":0},"end":{"row":8,"column":42},"action":"remove","lines":["from django.contrib import admin","from django.urls import path, include","from rest_framework_simplejwt.views import (","    TokenObtainPairView,","    TokenRefreshView,",")","from django.conf import settings","from django.conf.urls.static import static"],"id":12},{"start":{"row":1,"column":0},"end":{"row":8,"column":42},"action":"insert","lines":["from django.contrib import admin","from django.urls import path, include","from rest_framework_simplejwt.views import (","    TokenObtainPairView,","    TokenRefreshView,",")","from django.conf import settings","from django.conf.urls.static import static"]}],[{"start":{"row":10,"column":0},"end":{"row":15,"column":1},"action":"remove","lines":["urlpatterns = [","    path('admin/', admin.site.urls),","    path('api/', include('events.urls')),  # This will add the /api prefix","    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),","    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),","]"],"id":14},{"start":{"row":10,"column":0},"end":{"row":15,"column":1},"action":"insert","lines":["urlpatterns = [","    path('admin/', admin.site.urls),","    path('api/', include('events.urls')),","    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),","    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),","]"]}],[{"start":{"row":17,"column":0},"end":{"row":17,"column":18},"action":"remove","lines":["if settings.DEBUG:"],"id":15},{"start":{"row":17,"column":0},"end":{"row":17,"column":18},"action":"insert","lines":["if settings.DEBUG:"]}],[{"start":{"row":18,"column":4},"end":{"row":18,"column":80},"action":"remove","lines":["urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)"],"id":16},{"start":{"row":18,"column":4},"end":{"row":18,"column":80},"action":"insert","lines":["urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)"]}],[{"start":{"row":18,"column":80},"end":{"row":19,"column":0},"action":"insert","lines":["",""],"id":17},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":19,"column":4},"end":{"row":19,"column":82},"action":"insert","lines":["urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)"],"id":18}],[{"start":{"row":14,"column":81},"end":{"row":15,"column":0},"action":"insert","lines":["",""],"id":19},{"start":{"row":15,"column":0},"end":{"row":15,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":15,"column":4},"end":{"row":15,"column":81},"action":"insert","lines":["path('api/media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),"],"id":20}],[{"start":{"row":8,"column":42},"end":{"row":9,"column":0},"action":"insert","lines":["",""],"id":21}],[{"start":{"row":9,"column":0},"end":{"row":9,"column":37},"action":"insert","lines":["from django.views.static import serve"],"id":22}],[{"start":{"row":1,"column":0},"end":{"row":9,"column":37},"action":"remove","lines":["from django.contrib import admin","from django.urls import path, include","from rest_framework_simplejwt.views import (","    TokenObtainPairView,","    TokenRefreshView,",")","from django.conf import settings","from django.conf.urls.static import static","from django.views.static import serve"],"id":23},{"start":{"row":1,"column":0},"end":{"row":9,"column":37},"action":"insert","lines":["from django.contrib import admin","from django.urls import path, include","from rest_framework_simplejwt.views import (","    TokenObtainPairView,","    TokenRefreshView,",")","from django.conf import settings","from django.conf.urls.static import static","from django.views.static import serve"]}],[{"start":{"row":12,"column":4},"end":{"row":16,"column":81},"action":"remove","lines":["path('admin/', admin.site.urls),","    path('api/', include('events.urls')),","    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),","    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),","    path('api/media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),"],"id":24},{"start":{"row":12,"column":4},"end":{"row":17,"column":81},"action":"insert","lines":["path('admin/', admin.site.urls),","    path('api/', include('events.urls')),","    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),","    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),","    # Add this new path to serve media files through the API","    path('api/media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),"]}],[{"start":{"row":16,"column":0},"end":{"row":16,"column":60},"action":"remove","lines":["    # Add this new path to serve media files through the API"],"id":25},{"start":{"row":15,"column":81},"end":{"row":16,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":19,"column":0},"end":{"row":21,"column":82},"action":"remove","lines":["if settings.DEBUG:","    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)","    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)"],"id":26},{"start":{"row":19,"column":0},"end":{"row":20,"column":80},"action":"insert","lines":["if settings.DEBUG:","    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)"]}]]},"timestamp":1733440978374}