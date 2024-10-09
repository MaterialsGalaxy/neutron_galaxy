"""
classes of datatypes from GSASII
"""
import logging
from galaxy.datatypes.data import Text
from galaxy.datatypes.sniff import  build_sniff_from_prefix

log = logging.getLogger(__name__)


class InstrumentParameter(Text):
    """
    GSASII .prm instrument parameter format
    """
    file_ext = "prm"
    def sniff (self, filename):
        header = open(filename).read(22)
        return header == "            1234567890"
    

class InstrumentParameter2(Text):
    """
    GSASII .instprm instrument parameter format
    """
    file_ext = "instprm"
    def sniff (self, filename):
        header = open(filename).read(50)
        return "GSAS-II instrument parameter file" in header
    
@build_sniff_from_prefix
class RawPowderData(Text):
    """
    GSASII .raw neutron diffraction Powder data 
    """
    file_ext = "raw"
    def sniff (self, filename):

        return False