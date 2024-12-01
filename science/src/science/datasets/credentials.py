from typing import Any, Dict

from kedro.io import AbstractDataset


class CredentialsDataset(AbstractDataset):
    def __init__(self, credentials: Dict[str, Any] | None = None):
        self._credentials = credentials

    def _load(self) -> dict | None:
        return self._credentials

    def _save(self) -> None:
        print("save")

    def _describe(self) -> Dict[str, Any]:
        return dict(credentials=self._credentials)
