class RequestDataChanger:
    def __init__(self, request_data) -> None:
        self.data = request_data

    def __enter__(self):
        if hasattr(self.data, "_mutable"):
            self.data._mutable = True

    def __exit__(self, *args, **kwargs):
        if hasattr(self.data, "_mutable"):
            self.data._mutable = False
