from django.db import models
from django.core.validators import ValidationError, RegexValidator


#from django.utils.translation import gettext_lazy as _

class HexColorField(models.CharField):
    description = "Field to store colors in hexadecimal format"

    def __init__(self, *args, **kwargs):

        kwargs['max_length'] = 7
        super().__init__(*args, **kwargs)

        self.validators.append(RegexValidator(
            regex=r'^#[0-9A-Fa-f]{6}$',
            message="Color value has to be a 6 digits hexadecimal valid code",
            code="invalid_hex_color"
        ))

    def to_python(self, value):

        if value is None:
            return value

        if isinstance(value, str):
            value = value.strip()

            if not value.startswith('#'):
                value = '#' + value

            return value.upper()
        return str(value)

    def pre_save(self, model_instance, add):

        value = super().pre_save(model_instance, add)
        return self.to_python(value)

