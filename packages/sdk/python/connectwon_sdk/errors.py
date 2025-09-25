"""
Description : errors.py - 📌 SDK 공통 에러와 재시도 규칙
Author : Shiwoo Min
Date : 2025-09-20
"""
from typing import Any, Dict, Optional

class ApiError(Exception):
    """API 오류 표준 클래스"""

    def __init__(
        self,
        message: str,
        status: int,
        request_id: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message)
        self.status = status
        self.request_id = request_id
        self.details = details

    def to_dict(self) -> Dict[str, Any]:
        """에러를 딕셔너리로 변환"""
        result = {
            "name": self.__class__.__name__,
            "message": str(self),
            "status": self.status,
        }
        if self.request_id is not None:
            result["request_id"] = self.request_id
        if self.details is not None:
            result["details"] = self.details
        return result

class TimeoutError(Exception):
    """네트워크 타임아웃 오류"""

    def __init__(self, message: str = "Request timed out"):
        super().__init__(message)

class NetworkError(Exception):
    """네트워크 일반 오류"""

    def __init__(self, message: str = "Network error"):
        super().__init__(message)

def is_retryable_status(status: int) -> bool:
    """429/5xx 재시도 대상 확인"""
    return status == 429 or (500 <= status < 600)
