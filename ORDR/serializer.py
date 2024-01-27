from rest_framework.serializers import Serializer, ModelSerializer, SerializerMethodField
from rest_framework import ORDR

# class RawQuerySerializer(Serializer):
#     name = SerializerMethodField()
#     last_name = SerializerMethodField()

#     def get_name(self, obj):
#         return obj[0]

#     def get_last_name(self, obj):
#         return obj[1]    # index value at which last_name in tuple

class ORDRserializer(ModelSerializer):
    class Meta:
        model=ORDR
        fields=('CardCode','DocDate')
    fields='_all_'
