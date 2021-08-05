from django.contrib import admin

from shipments.models import Flag, Message


class FlagAdmin(admin.ModelAdmin):
    list_display = ('id', 'reset', 'user', 'timestamp', 'is_flag')


class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'reset', 'sender', 'receiver', 'msg_content', 'created_at')
    list_filter = ('reset', 'sender', 'receiver')


admin.site.register(Flag, FlagAdmin)
admin.site.register(Message, MessageAdmin)