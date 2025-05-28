def update_field(obj, field_name, value):
    """
    Updates a field of an object if the value is not None.

    Args:
        obj: The object to update.
        field_name (str): The name of the field to update.
        value: The new value for the field.
    """
    if value is not None:
        setattr(obj, field_name, value)
