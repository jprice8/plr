from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response 


class CustomPagination(LimitOffsetPagination):
	def get_paginated_response(self, data):
		return Response({
			'meta': {
				'limit': self.get_limit(self.request),
				'next': self.get_next_link(),
				'offset': self.get_offset(self.request),
				'previous': self.get_previous_link(),
				'total_count': self.count
			},
			'objects': data
		})


class MyPaginationMixin(object):

	@property 
	def paginator(self):
		"""
		The paginator instance associated with the view, or 'none'.
		"""
		if not hasattr(self, '_paginator'):
			if self.pagination_class is None:
				self._paginator = None
			else:
				self._paginator = self.pagination_class()
		return self._paginator

	def paginate_queryset(self, queryset):
		"""
		Return a single page of results, or 'None' if pagination is disabled.
		"""
		if self.paginator is None:
			return None 
		return self.paginator.paginate_queryset(
			queryset,
			self.request,
			view=self
		)

	def get_paginated_response(self, data):
		"""
		Return a paginated style 'Response' object for the given output data.
		"""
		assert self.paginator is not None
		return self.paginator.get_paginated_response(data)