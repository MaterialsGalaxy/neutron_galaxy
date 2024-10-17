"""
classes of datatypes from GSASII
"""

import logging

from galaxy.datatypes.binary import Binary
from galaxy.datatypes.data import Text

log = logging.getLogger(__name__)


class Gsas2Project(Binary):
    """
    GSASII .gpx project file format
    file is pickled can be read by pickle.load(fp,encoding='latin-1')
    """

    file_ext = "gpx"
    # sniffing disabled for now

    def sniff(self, filename):
        """
        Returns false and the user must manually set
        """
        return False


class Prm(Text):
    """
    GSASII .prm instrument parameter format
    """

    file_ext = "prm"

    def sniff(self, filename):
        """
        Try to guess if the file is a GSASII .prm isntrument parameter file

        >>> from galaxy.datatypes.sniff import get_test_fname
        >>> fname = get_test_fname('gsas_instrument.prm')
        >>> Prm().sniff(fname)
        True

        >>> fname = get_test_fname('gsas_instrument.instprm')
        >>> Prm().sniff(fname)
        False
        """

        header = open(filename).read(22)
        return header == "            1234567890"


class Instprm(Text):
    """
    GSASII .instprm instrument parameter format
    """

    file_ext = "instprm"

    def sniff(self, filename):
        """
        Try to guess if the file is a GSASII .instprm isntrument parameter file

        >>> from galaxy.datatypes.sniff import get_test_fname
        >>> fname = get_test_fname('gsas_instrument.instprm')
        >>> Instprm().sniff(fname)
        True

        >>> fname = get_test_fname('gsas_instrument.prm')
        >>> Instprm().sniff(fname)
        False
        """

        header = open(filename).read(50)
        return "GSAS-II instrument parameter file" in header


class RawPowderData(Text):
    """
    GSASII .raw diffraction Powder data
    """

    file_ext = "raw"
    # sniffing disabled for now

    def sniff(self, filename):
        """
        returns false and the user must manually set for now.
        """
        return False


class GsaPowderData(Text):
    """
    GSASII .gsa diffraction Powder data
    """

    file_ext = "gsa"

    def sniff(self, filename):
        """
        Try to guess if the file is a GSASII .gsa powder data file

        >>> from galaxy.datatypes.sniff import get_test_fname
        >>> fname = get_test_fname('gsas_powder.gsa')
        >>> GsaPowderData().sniff(fname)
        True

        >>> fname = get_test_fname('gsas_instrument.instprm')
        >>> GsaPowderData().sniff(fname)
        False
        """

        header = open(filename).read(70)
        result = ("Sample Run:" in header) and ("Wavelength:" in header)
        return result
