# Referensi untuk konfigurasi "WSGI configuration file" di PythonAnywhere
# (tab Web -> Code -> WSGI configuration file). Isi bagian bawah file
# yang dibuat otomatis oleh PythonAnywhere dengan pola berikut:
#
#   import sys
#   path = '/home/<username>/<repo>/spatial-engine'
#   if path not in sys.path:
#       sys.path.insert(0, path)
#
#   from engine import app as application
#
# File ini sendiri tidak dipakai langsung oleh PythonAnywhere (mereka
# generate wsgi.py sendiri di /var/www/), tapi disimpan di sini sebagai
# dokumentasi/referensi isi yang perlu ditempel.

import sys
import os

path = os.path.dirname(os.path.abspath(__file__))
if path not in sys.path:
    sys.path.insert(0, path)

from engine import app as application
