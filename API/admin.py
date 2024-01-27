from django.contrib import admin
from .models import PctpPod
from .models import PctpBilling
from .models import PctpTp
from .models import PctpPricing
from .models import Vehicletypeandcap
# Register your models here.

admin.site.register(PctpPod)
admin.site.register(PctpBilling)
admin.site.register(PctpTp)
admin.site.register(PctpPricing)
admin.site.register(Vehicletypeandcap)