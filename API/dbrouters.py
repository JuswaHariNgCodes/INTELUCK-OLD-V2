from .models import PctpPod
from .models import PctpBilling
from .models import PctpTp
from .models import PctpPricing
from .models import Vehicletypeandcap

class MyDBRouter(object):

    def db_for_read(self, model, **hints):
        """ reading SomeModel from otherdb """
        if model == PctpPod:
            return 'INTELUCK_LIVE20230623'
        if model == PctpBilling:
            return 'INTELUCK_LIVE20230623'
        if model == PctpTp:
            return 'INTELUCK_LIVE20230623'
        if model == PctpPricing:
            return 'INTELUCK_LIVE20230623'
        if model == Vehicletypeandcap:
            return 'INTELUCK_LIVE20230623'
        
        return None

    def db_for_write(self, model, **hints):
        """ writing SomeModel to otherdb """
        if model == PctpPod:
            return 'INTELUCK_LIVE20230623'
        if model == PctpBilling:
            return 'INTELUCK_LIVE20230623'
        if model == PctpTp:
            return 'INTELUCK_LIVE20230623'
        if model == PctpPricing:
            return 'INTELUCK_LIVE20230623'
        
        return None
    