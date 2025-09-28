"""
Description : client.py - 📌 ConnectWon API 클라이언트
Author : Shiwoo Min
Date : 2025-09-28
"""

import requests
from dataclasses import asdict
from typing import Any, Dict, Optional, Type, TypeVar
from .models import AnalysisRequest, AnalysisResult, ScrapingTask, ScrapingResult
from .errors import ApiError

T = TypeVar("T")


class ConnectWonClient:
    """
    ConnectWon API 호출용 클라이언트 클래스
    """
    def __init__(self, base_url: str, api_key: Optional[str] = None, timeout: int = 30):
        """
        클라이언트 초기화

        Args:
            base_url (str): API 서버 기본 URL
            api_key (Optional[str]): 인증용 API 키
            timeout (int): 요청 타임아웃 (초)
        """
        self.base_url = base_url.rstrip("/")  # URL 마지막 '/' 제거
        self.api_key = api_key
        self.timeout = timeout

    def _headers(self) -> Dict[str, str]:
        """
        요청 헤더 생성
        """
        headers = {"Accept": "application/json"}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"
        return headers

    def _request(self, path: str, payload: Dict[str, Any], model: Type[T]) -> T:
        """
        공통 요청 처리

        Args:
            path (str): API 엔드포인트 경로
            payload (Dict[str, Any]): 요청 JSON 데이터
            model (Type[T]): 응답 매핑할 dataclass 모델

        Returns:
            T: 변환된 응답 dataclass

        Raises:
            ApiError: API에서 에러 응답을 반환한 경우
        """
        url = f"{self.base_url}/{path.lstrip('/')}"
        res = requests.post(url, json=payload, headers=self._headers(), timeout=self.timeout)

        if not res.ok:
            raise ApiError(
                res.text,
                res.status_code,
                res.headers.get("x-request-id"),
            )

        data = res.json()
        return model(**data)

    def analyze(self, req: AnalysisRequest) -> AnalysisResult:
        """
        AI 분석 요청 → 응답 결과 반환
        """
        return self._request("analyze", asdict(req), AnalysisResult)

    def scrape(self, task: ScrapingTask) -> ScrapingResult:
        """
        웹 스크래핑 요청 → 결과 반환
        """
        return self._request("scrape", asdict(task), ScrapingResult)
