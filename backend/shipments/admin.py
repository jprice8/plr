from django.contrib import admin

from shipments.models import Shipping, Flag, Message


class FlagAdmin(admin.ModelAdmin):
    list_display = ('id', 'reset', 'user', 'timestamp', 'is_flag')


class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'reset', 'sender', 'receiver', 'msg_content', 'created_at')
    list_filter = ('reset', 'sender', 'receiver')


class ShippingAdmin(admin.ModelAdmin):
    list_display = ('id', 'reset_ids', 'week', 'year', 'facility_code', 'sender', 'tracking_number', 'created_at')
    list_filter = ('week', 'year', 'facility_code')


admin.site.register(Flag, FlagAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Shipping, ShippingAdmin)