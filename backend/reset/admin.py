from django.contrib import admin
from .models import Par, Itemreset


class ParAdmin(admin.ModelAdmin):
    list_display = ('facility_code', 'location_id', 'location_name', 'mfr', 'imms', 'description', 'ext_delta', 'review_date')
    list_filter = ('review_date',)


class ItemresetAdmin(admin.ModelAdmin):
    list_display = ('id', 'par', 'user', 'reset_level', 'send_back_confirmed', 'week', 'year', 'last_updated')

admin.site.register(Par, ParAdmin)
admin.site.register(Itemreset, ItemresetAdmin)
